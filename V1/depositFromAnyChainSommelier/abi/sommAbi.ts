const sommAbi = [
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "contract Registry", name: "_registry", type: "address" },
      { internalType: "contract ERC20", name: "_asset", type: "address" },
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
      { internalType: "uint32", name: "_holdingPosition", type: "uint32" },
      { internalType: "bytes", name: "_holdingPositionConfig", type: "bytes" },
      { internalType: "uint256", name: "_initialDeposit", type: "uint256" },
      {
        internalType: "uint64",
        name: "_strategistPlatformCut",
        type: "uint64",
      },
      { internalType: "uint192", name: "_shareSupplyCap", type: "uint192" },
      { internalType: "address", name: "_balancerVault", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CellarWithMultiAssetDeposit__AlternativeAssetFeeTooLarge",
    type: "error",
  },
  {
    inputs: [],
    name: "CellarWithMultiAssetDeposit__AlternativeAssetNotSupported",
    type: "error",
  },
  {
    inputs: [],
    name: "CellarWithMultiAssetDeposit__CallDataLengthNotSupported",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address", name: "expectedAsset", type: "address" },
    ],
    name: "Cellar__AssetMismatch",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "adaptor", type: "address" }],
    name: "Cellar__CallToAdaptorNotAllowed",
    type: "error",
  },
  { inputs: [], name: "Cellar__CallerNotBalancerVault", type: "error" },
  { inputs: [], name: "Cellar__ContractNotShutdown", type: "error" },
  { inputs: [], name: "Cellar__ContractShutdown", type: "error" },
  {
    inputs: [{ internalType: "uint32", name: "position", type: "uint32" }],
    name: "Cellar__DebtMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "Cellar__ExpectedAddressDoesNotMatchActual",
    type: "error",
  },
  { inputs: [], name: "Cellar__ExternalInitiator", type: "error" },
  { inputs: [], name: "Cellar__FailedToForceOutPosition", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "illiquidPosition", type: "address" },
    ],
    name: "Cellar__IlliquidWithdraw",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "assetsOwed", type: "uint256" }],
    name: "Cellar__IncompleteWithdraw",
    type: "error",
  },
  { inputs: [], name: "Cellar__InvalidFee", type: "error" },
  { inputs: [], name: "Cellar__InvalidFeeCut", type: "error" },
  {
    inputs: [{ internalType: "uint32", name: "positionId", type: "uint32" }],
    name: "Cellar__InvalidHoldingPosition",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "requested", type: "uint256" },
      { internalType: "uint256", name: "max", type: "uint256" },
    ],
    name: "Cellar__InvalidRebalanceDeviation",
    type: "error",
  },
  { inputs: [], name: "Cellar__InvalidShareSupplyCap", type: "error" },
  { inputs: [], name: "Cellar__MinimumConstructorMintNotMet", type: "error" },
  { inputs: [], name: "Cellar__OracleFailure", type: "error" },
  { inputs: [], name: "Cellar__Paused", type: "error" },
  {
    inputs: [{ internalType: "uint32", name: "position", type: "uint32" }],
    name: "Cellar__PositionAlreadyUsed",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "maxPositions", type: "uint256" },
    ],
    name: "Cellar__PositionArrayFull",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint32", name: "position", type: "uint32" },
      { internalType: "uint256", name: "sharesRemaining", type: "uint256" },
    ],
    name: "Cellar__PositionNotEmpty",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint32", name: "position", type: "uint32" }],
    name: "Cellar__PositionNotInCatalogue",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint32", name: "position", type: "uint32" }],
    name: "Cellar__PositionNotUsed",
    type: "error",
  },
  { inputs: [], name: "Cellar__RemovingHoldingPosition", type: "error" },
  {
    inputs: [],
    name: "Cellar__SettingValueToRegistryIdZeroIsProhibited",
    type: "error",
  },
  { inputs: [], name: "Cellar__ShareSupplyCapExceeded", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "assets", type: "uint256" },
      { internalType: "uint256", name: "min", type: "uint256" },
      { internalType: "uint256", name: "max", type: "uint256" },
    ],
    name: "Cellar__TotalAssetDeviatedOutsideRange",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "current", type: "uint256" },
      { internalType: "uint256", name: "expected", type: "uint256" },
    ],
    name: "Cellar__TotalSharesMustRemainConstant",
    type: "error",
  },
  { inputs: [], name: "Cellar__ZeroAssets", type: "error" },
  { inputs: [], name: "Cellar__ZeroShares", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "adaptor",
        type: "address",
      },
      { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "AdaptorCalled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "adaptor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "inCatalogue",
        type: "bool",
      },
    ],
    name: "AdaptorCatalogueAltered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "AlternativeAssetDropped",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "holdingPosition",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "depositFee",
        type: "uint32",
      },
    ],
    name: "AlternativeAssetUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "depositAsset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "MultiAssetDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "position",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "PositionAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "positionId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "inCatalogue",
        type: "bool",
      },
    ],
    name: "PositionCatalogueAltered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "position",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "PositionRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "newPosition1",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newPosition2",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index1",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index2",
        type: "uint256",
      },
    ],
    name: "PositionSwapped",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldDeviation",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newDeviation",
        type: "uint256",
      },
    ],
    name: "RebalanceDeviationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newOracle",
        type: "address",
      },
    ],
    name: "SharePriceOracleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "isShutdown",
        type: "bool",
      },
    ],
    name: "ShutdownChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldPayoutAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newPayoutAddress",
        type: "address",
      },
    ],
    name: "StrategistPayoutAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "oldPlatformCut",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "newPlatformCut",
        type: "uint64",
      },
    ],
    name: "StrategistPlatformCutChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "adaptor", type: "address" }],
    name: "addAdaptorToCatalogue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "index", type: "uint32" },
      { internalType: "uint32", name: "positionId", type: "uint32" },
      { internalType: "bytes", name: "configurationData", type: "bytes" },
      { internalType: "bool", name: "inDebtArray", type: "bool" },
    ],
    name: "addPosition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "positionId", type: "uint32" }],
    name: "addPositionToCatalogue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "contract ERC20", name: "", type: "address" }],
    name: "alternativeAssetData",
    outputs: [
      { internalType: "bool", name: "isSupported", type: "bool" },
      { internalType: "uint32", name: "holdingPosition", type: "uint32" },
      { internalType: "uint32", name: "depositFee", type: "uint32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [{ internalType: "contract ERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "blockExternalReceiver",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bool", name: "checkTotalAssets", type: "bool" },
      { internalType: "uint16", name: "allowableRange", type: "uint16" },
      { internalType: "address", name: "expectedPriceRouter", type: "address" },
    ],
    name: "cachePriceRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "adaptor", type: "address" },
          { internalType: "bytes[]", name: "callData", type: "bytes[]" },
        ],
        internalType: "struct Cellar.AdaptorCall[]",
        name: "data",
        type: "tuple[]",
      },
    ],
    name: "callOnAdaptor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    name: "convertToAssets",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    name: "convertToShares",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint192", name: "_newShareSupplyCap", type: "uint192" },
    ],
    name: "decreaseShareSupplyCap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "assets", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "deposit",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "_alternativeAsset",
        type: "address",
      },
    ],
    name: "dropAlternativeAssetData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeData",
    outputs: [
      { internalType: "uint64", name: "strategistPlatformCut", type: "uint64" },
      { internalType: "uint64", name: "platformFee", type: "uint64" },
      { internalType: "uint64", name: "lastAccrual", type: "uint64" },
      {
        internalType: "address",
        name: "strategistPayoutAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "index", type: "uint32" },
      { internalType: "uint32", name: "positionId", type: "uint32" },
      { internalType: "bool", name: "inDebtArray", type: "bool" },
    ],
    name: "forcePositionOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreditPositions",
    outputs: [{ internalType: "uint32[]", name: "", type: "uint32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDebtPositions",
    outputs: [{ internalType: "uint32[]", name: "", type: "uint32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "holdingPosition",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ignorePause",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint192", name: "_newShareSupplyCap", type: "uint192" },
    ],
    name: "increaseShareSupplyCap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initiateShutdown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isPaused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "isPositionUsed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isShutdown",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "liftShutdown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "locked",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "maxDeposit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "maxMint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "maxRedeem",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "maxWithdraw",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "shares", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ERC20", name: "depositAsset", type: "address" },
      { internalType: "uint256", name: "assets", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "multiAssetDeposit",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    name: "previewDeposit",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    name: "previewMint",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ERC20", name: "depositAsset", type: "address" },
      { internalType: "uint256", name: "assets", type: "uint256" },
    ],
    name: "previewMultiAssetDeposit",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    name: "previewRedeem",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    name: "previewWithdraw",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceRouter",
    outputs: [
      { internalType: "contract PriceRouter", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC20[]", name: "tokens", type: "address[]" },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      { internalType: "uint256[]", name: "feeAmounts", type: "uint256[]" },
      { internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "receiveFlashLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "shares", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "redeem",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registry",
    outputs: [{ internalType: "contract Registry", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "adaptor", type: "address" }],
    name: "removeAdaptorFromCatalogue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "index", type: "uint32" },
      { internalType: "bool", name: "inDebtArray", type: "bool" },
    ],
    name: "removePosition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "positionId", type: "uint32" }],
    name: "removePositionFromCatalogue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "_alternativeAsset",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_alternativeHoldingPosition",
        type: "uint32",
      },
      { internalType: "uint32", name: "_alternativeAssetFee", type: "uint32" },
    ],
    name: "setAlternativeAssetData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "positionId", type: "uint32" }],
    name: "setHoldingPosition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "newDeviation", type: "uint256" },
    ],
    name: "setRebalanceDeviation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_registryId", type: "uint256" },
      {
        internalType: "contract ERC4626SharePriceOracle",
        name: "_sharePriceOracle",
        type: "address",
      },
    ],
    name: "setSharePriceOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "payout", type: "address" }],
    name: "setStrategistPayoutAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "cut", type: "uint64" }],
    name: "setStrategistPlatformCut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sharePriceOracle",
    outputs: [
      {
        internalType: "contract ERC4626SharePriceOracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "shareSupplyCap",
    outputs: [{ internalType: "uint192", name: "", type: "uint192" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "index1", type: "uint32" },
      { internalType: "uint32", name: "index2", type: "uint32" },
      { internalType: "bool", name: "inDebtArray", type: "bool" },
    ],
    name: "swapPositions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleIgnorePause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssetsWithdrawable",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "assets", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "withdraw",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default sommAbi;
