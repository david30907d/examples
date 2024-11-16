import { Squid } from "@0xsquid/sdk"; // Import Squid SDK
import { ethers } from "ethers"; // Import ethers library
import * as dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from .env file
import { ChainType } from "@0xsquid/squid-types";
import erc20Abi from "../erc20Abi";
import aaveAbi from "../aaveAbi";  

// Retrieve environment variables
const privateKey: string = process.env.PRIVATE_KEY!;
const integratorId: string = process.env.INTEGRATOR_ID!;
const FROM_CHAIN_RPC: string = process.env.FROM_CHAIN_RPC_ENDPOINT!;

if (!privateKey || !integratorId || !FROM_CHAIN_RPC) {
  console.error("Missing environment variables. Ensure PRIVATE_KEY, INTEGRATOR_ID, and FROM_CHAIN_RPC_ENDPOINT are set.");
  process.exit(1);
}

// Define chain and token addresses
const fromChainId = "42161"; // BNB chain ID
const toChainId = "10"; // Arbitrum chain ID
const fromToken = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"; // USDT token address on BNB
const toToken = "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"; // USDC token address on Arbitrum
const usdcOptimismAddress: string = "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"
const aavePoolAddress: string = "0x794a61358D6845594F94dc1DB02A252b5b4814aD"

// Define the amount to be sent (in smallest unit, e.g., wei for Ethereum)
const amount = "500000"; 

// Set up JSON RPC provider and signer using the private key and RPC URL
const provider = new ethers.providers.JsonRpcProvider(FROM_CHAIN_RPC);
const signer = new ethers.Wallet(privateKey, provider);

  // Approve the lending contract to spend the erc20
  const erc20Interface = new ethers.utils.Interface(erc20Abi);
  const approvalerc20 = erc20Interface.encodeFunctionData("approve", [
    aavePoolAddress,
    ethers.constants.MaxUint256,
  ]);

  // Create contract interface and encode deposit function for Radiant lending pool
  const aavePoolInterface = new ethers.utils.Interface(
    aaveAbi
  );
  console.log("aavePoolInterface", aavePoolInterface)
  const depositEncodedData = aavePoolInterface.encodeFunctionData(
    "supply",
    [
      usdcOptimismAddress,
      "0",
      // "0x806686442aF382B627818D08dA93c96C2Fb0a981",
      signer.address,
      0,
    ]
  );

// Initialize the Squid client with the base URL and integrator ID
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
  // Initialize Squid SDK
  const squid = getSDK();
  await squid.init();
  console.log("Initialized Squid SDK");

  // Set up parameters for swapping tokens
  const params = {
    fromAddress: signer.address,
    fromChain: fromChainId,
    fromToken: fromToken,
    fromAmount: amount,
    toChain: toChainId,
    toToken: toToken,
    toAddress: signer.address,
    enableBoost: true,
    postHooks: {
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
          estimatedGas: "50000",
        },
      ],
      provider: "Squid", //This should be the name of your product or application that is triggering the hook
      description: "aave Lend",
      logoURI: "https://pbs.twimg.com/profile_images/1548647667135291394/W2WOtKUq_400x400.jpg", //This should be your product or applications logo
    },
  };

  console.log("Parameters:", params); // Printing the parameters for QA

  // Get the swap route using Squid SDK
  const { route, requestId } = await squid.getRoute(params);
  console.log("Calculated route:", route.estimate.toAmount);

  const transactionRequest = route.transactionRequest;

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