// Import necessary libraries
import { ethers } from "ethers";
import { Squid } from "@0xsquid/sdk";

// Load environment variables from the .env file
import * as dotenv from "dotenv";
dotenv.config();

// Load environment variables from .env file
const privateKey: string = process.env.PRIVATE_KEY!;
const integratorId: string = process.env.INTEGRATOR_ID!;
const FROM_CHAIN_RPC: string = process.env.RPC_ENDPOINT!;
const aavePoolAddress: string = "0x794a61358D6845594F94dc1DB02A252b5b4814aD"
const usdcArbitrumAddress: string = "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
const usdcOptimismAddress: string = "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"

// Define chain and token addresses
const fromChainId = "42161"; // Binance
const toChainId = "10"; // Arbitrum
const fromToken = usdcArbitrumAddress; // Define departing token
// Define amount to be sent
const amount = "100000";

// Set up JSON RPC provider and signer using the private key and RPC URL
const provider = new ethers.providers.JsonRpcProvider(FROM_CHAIN_RPC);
const signer = new ethers.Wallet(privateKey, provider);
console.log("signer", signer.address)


// Import erc20 contract ABI
import erc20Abi from "../abi/erc20Abi";
import aaveAbi from "../abi/aaveAbi";  
import { ChainType, RouteRequest } from "@0xsquid/squid-types";


// Function to get Squid SDK instance
const getSDK = (): Squid => {
  const squid = new Squid({
    baseUrl: "https://apiplus.squidrouter.com",
    integratorId: integratorId,
  });
  return squid;
};

// Function to approve the transactionRequest.target to spend fromAmount of fromToken
const approveSpending = async (transactionRequestTarget: string, fromToken: string, fromAmount: string) => {
  const erc20Abi = [
    "function approve(address spender, uint256 amount) public returns (bool)"
  ];
  const tokenContract = new ethers.Contract(fromToken, erc20Abi, signer);
  try {
    const tx = await tokenContract.approve(transactionRequestTarget, fromAmount);
    await tx.wait();
    console.log(`Approved ${fromAmount} tokens for ${transactionRequestTarget}`);
  } catch (error) {
    console.error('Approval failed:', error);
    throw error;
  }
};


// Main function
(async () => {
  // Set up JSON RPC provider and signer for source chain (Ethereum)
  const provider = new ethers.providers.JsonRpcProvider(FROM_CHAIN_RPC);
  const signer = new ethers.Wallet(privateKey, provider);

  // Initialize Squid SDK
  const squid = getSDK();
  await squid.init();
  console.log("Initialized Squid SDK");

  // Creating Contract interfaces
  // Approve the lending contract to spend the erc20
  const erc20Interface = new ethers.utils.Interface(erc20Abi);
  const approvalerc20 = erc20Interface.encodeFunctionData("approve", [
    aavePoolAddress,
    ethers.constants.MaxUint256,
  ]);

  // Create contract interface and encode deposit function for Radiant lending pool
  const radiantLendingPoolInterface = new ethers.utils.Interface(
    aaveAbi
  );
  const depositEncodedData = radiantLendingPoolInterface.encodeFunctionData(
    "supply",
    [
      usdcOptimismAddress,
      "0",
      "0x43cd745Bd5FbFc8CfD79ebC855f949abc79a1E0C",
      // signer.address,
      0,
    ]
  );

  
  
  // Set up parameters for swapping tokens and depositing into Radiant lending pool
  const params = {
    fromAddress: signer.address,
    fromChain: fromChainId,
    fromToken: fromToken,
    fromAmount: amount,
    toChain: toChainId,
    toToken: usdcOptimismAddress,
    toAddress: signer.address,
    slippage: 1, //optional, Squid will dynamically calculate if removed
    quoteOnly: false,
    enableBoost: true,
    postHook: {
      chainType: ChainType.EVM,
      calls: [
        {
          chainType: ChainType.EVM, 
          callType: 1,// SquidCallType.FULL_TOKEN_BALANCE
          target: usdcOptimismAddress,
          value: "0", // this will be replaced by the full native balance of the multicall after the swap
          callData: approvalerc20,
          payload: {
            tokenAddress: usdcOptimismAddress,
            inputPos: 1,
          },
          estimatedGas: "50000",
        },
        {
          chainType: ChainType.EVM,
          callType: 1, // SquidCallType.FULL_TOKEN_BALANCE
          target: aavePoolAddress,
          value: "0",
          callData: depositEncodedData,
          payload: {
            tokenAddress: usdcOptimismAddress,
            inputPos: 1,
          },
          estimatedGas: "500000",
        },
      ],
      provider: "Squid", //This should be the name of your product or application that is triggering the hook
      description: "Aave Lend",
      logoURI: "https://pbs.twimg.com/profile_images/1548647667135291394/W2WOtKUq_400x400.jpg", //This should be your product or applications logo
    },
  };
  

  console.log("Parameters:", params); // Printing the parameters for QA

  // Get the swap route using Squid SDK
  const { route, requestId } = await squid.getRoute(params as RouteRequest);
  console.log("Calculated route:", route.estimate.toAmount);

  const transactionRequest = route.transactionRequest;
  // console.log("transactionRequest", transactionRequest)
  // Approve the transactionRequest.target to spend fromAmount of fromToken
  await approveSpending(transactionRequest.target, fromToken, amount);


  // Execute the swap transaction
  const tx = (await squid.executeRoute({
    signer,
    route,
  })) as unknown as ethers.providers.TransactionResponse;
  const txReceipt = await tx.wait();

  // Show the transaction receipt with Axelarscan link
  const axelarScanLink = "https://axelarscan.io/gmp/" + txReceipt.transactionHash;
  console.log(`Finished! Check Axelarscan for details: ${axelarScanLink}`);

  // Wait a few seconds before checking the status
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Parameters for checking the status of the transaction
  const getStatusParams = {
    transactionId: txReceipt.transactionHash,
    requestId: requestId,
    integratorId: integratorId,
    fromChainId: fromChainId,
    toChainId: toChainId,
  };

  const completedStatuses = ["success", "partial_success", "needs_gas", "not_found"];
  const maxRetries = 10; // Maximum number of retries for status check
  let retryCount = 0;
  let status = await squid.getStatus(getStatusParams);

  // Loop to check the transaction status until it is completed or max retries are reached
  console.log(`Initial route status: ${status.squidTransactionStatus}`);

  do {
    try {
      // Wait a few seconds before checking the status
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Retrieve the transaction's route status
      status = await squid.getStatus(getStatusParams);

      // Display the route status
      console.log(`Route status: ${status.squidTransactionStatus}`);

    } catch (error: unknown) {
      // Handle error if the transaction status is not found
      if (error instanceof Error && (error as any).response && (error as any).response.status === 404) {
        retryCount++;
        if (retryCount >= maxRetries) {
          console.error("Max retries reached. Transaction not found.");
          break;
        }
        console.log("Transaction not found. Retrying...");
        continue;
      } else {
        throw error;
      }
    }

  } while (status && !completedStatuses.includes(status.squidTransactionStatus));

  // Wait for the transaction to be mined
  console.log("Swap transaction executed:", txReceipt.transactionHash);
})();
