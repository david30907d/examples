// Import necessary libraries
import { ethers } from "ethers";
import axios from "axios";

// Load environment variables from .env file
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
const fromToken = "0xaf88d065e77c8cc2239327c5edb3a432268e5831"; // Define departing token


// Define amount to be swapped and deposited
const amount = "1000000";

// Import erc20 contract ABI
import erc20Abi from "../abi/erc20Abi";
import aaveAbi from "../abi/aaveAbi";

// Set up JSON RPC provider and signer 
const provider = new ethers.providers.JsonRpcProvider(FROM_CHAIN_RPC);
const signer = new ethers.Wallet(privateKey, provider);



// Creating Contract interfaces

// Approve the lending contract to spend the erc20
const erc20Interface = new ethers.utils.Interface(erc20Abi);
const approvalerc20 = erc20Interface.encodeFunctionData("approve", [
  aavePoolAddress,
  ethers.constants.MaxUint256,
]);

// Create contract interface and encode deposit function for Radiant lending pool
const aaveInterface = new ethers.utils.Interface(
  aaveAbi
);
const depositEncodedData = aaveInterface.encodeFunctionData(
  "supply",
  [
    usdcOptimismAddress,
    "0", // Placeholder for dynamic balance
    signer.address,
    0,
  ]
);




// Function to get the optimal route for the swap using Squid API
const getRoute = async (params: any) => {
  try {
    const result = await axios.post(
      "https://apiplus.squidrouter.com/v2/route",

      params,
      {
        headers: {
          "x-integrator-id": integratorId,
          "Content-Type": "application/json",
        },
      } 
    );
    const requestId = result.headers["x-request-id"]; // Retrieve request ID from response headers
    return { data: result.data, requestId: requestId };
  } catch (error) {
    if (error.response) {
      console.error("API error:", error.response.data);
    }
    console.error("Error with parameters:", params);
    throw error;
  }
};


// Function to get the status of the transaction using Squid API
const getStatus = async (params: any) => {
  try {
    const result = await axios.get("https://apiplus.squidrouter.com/v2/status", {
      params: {
        transactionId: params.transactionId,
        requestId: params.requestId,
        fromChainId: params.fromChainId,
        toChainId: params.toChainId,
      },
      headers: {
        "x-integrator-id": integratorId,
      },
    });
    return result.data;
  } catch (error) {
    if (error.response) {
      console.error("API error:", error.response.data);
    }
    console.error("Error with parameters:", params);
    throw error;
  }
};

// Function to periodically check the transaction status until it completes
const updateTransactionStatus = async (txHash: string, requestId: string) => {
  const getStatusParams = {
    transactionId: txHash,
    requestId: requestId,
    fromChainId: fromChainId,
    toChainId: toChainId,
  };

  let status;
  const completedStatuses = ["success", "partial_success", "needs_gas", "not_found"];
  const maxRetries = 15; // Maximum number of retries for status check
  let retryCount = 0;

  do {
    try {
      status = await getStatus(getStatusParams);
      console.log(`Route status: ${status.squidTransactionStatus}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        retryCount++;
        if (retryCount >= maxRetries) {
          console.error("Max retries reached. Transaction not found.");
          break;
        }
        console.log("Transaction not found. Retrying...");
        await new Promise((resolve) => setTimeout(resolve, 20000)); // Wait for 10 seconds before retrying
        continue;
      } else {
        throw error; // Rethrow other errors
      }
    }

    if (!completedStatuses.includes(status.squidTransactionStatus)) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking the status again
    }
  } while (!completedStatuses.includes(status.squidTransactionStatus));
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


// Set up parameters for swapping tokens
(async () => {
  // Set up parameters for swapping tokens and depositing into Radiant lending pool
  const params = {
    fromAddress: signer.address,
    fromChain: fromChainId,
    fromToken: usdcArbitrumAddress,
    fromAmount: amount,
    toChain: toChainId,
    toToken: usdcOptimismAddress,
    toAddress: signer.address,
    slippage: 1, //optional, Squid will dynamically calculate if removed
    postHook: {
      chainType: "evm",
      //fundAmount: amount,  //only required for prehooks
      //fundToken: usdcOptimismAddress, //only required for prehooks
      calls: [
        {
          callType: 1,
          target: usdcOptimismAddress,
          value: "0", // this will be replaced by the full native balance of the multicall after the swap
          callData: approvalerc20,
          payload: {
            tokenAddress: usdcOptimismAddress, // unused in callType 2, dummy value
            inputPos: "1", // unused
          },
          estimatedGas: "50000",
          chainType: "evm",
        },
        {
          callType: 1, // SquidCallType.FULL_TOKEN_BALANCE
          target: aavePoolAddress,
          value: "0",
          callData: depositEncodedData,
          payload: {
            tokenAddress: usdcOptimismAddress,
            inputPos: "1",
          },
          estimatedGas: "50000",
          chainType: "evm",
        },
      ],
      provider: "Integration Test", //This should be the name of your product or application that is triggering the hook
      description: "Aave Lend postHook",
      logoURI: "https://pbs.twimg.com/profile_images/1548647667135291394/W2WOtKUq_400x400.jpg", //Add your product or application's logo here
    },
  };

  console.log("Parameters:", params);

  // Get the swap route using Squid API
  const routeResult = await getRoute(params);
  const route = routeResult.data.route;
  const requestId = routeResult.requestId;
  console.log("Calculated route:", route);
  console.log("requestId:", requestId);

  const transactionRequest = route.transactionRequest;

  // Approve the transactionRequest.target to spend fromAmount of usdcArbitrumAddress
  await approveSpending(transactionRequest.target, usdcArbitrumAddress, amount);

  // Execute the swap transaction
  const tx = await signer.sendTransaction({
    to: transactionRequest.target,
    data: transactionRequest.data,
    value: transactionRequest.value,
    gasLimit: (BigInt(transactionRequest.gasLimit) * BigInt(2)).toString(),
  });

  const txReceipt = await tx.wait();
  console.log("Transaction Hash: ", txReceipt.transactionHash);

  // Show the transaction receipt with Axelarscan link
  const axelarScanLink = "https://axelarscan.io/gmp/" + txReceipt.transactionHash;
  console.log(`Finished! Check Axelarscan for details: ${axelarScanLink}`);

  // Update transaction status until it completes
  await updateTransactionStatus(txReceipt.transactionHash, requestId);
})();
