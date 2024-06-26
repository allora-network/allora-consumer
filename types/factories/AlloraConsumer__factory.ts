/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  AlloraConsumer,
  AlloraConsumerInterface,
  AlloraConsumerConstructorArgsStruct,
} from "../AlloraConsumer";

const _abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "args",
        type: "tuple",
        internalType: "struct AlloraConsumerConstructorArgs",
        components: [
          {
            name: "owner",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "NETWORK_INFERENCE_DATA_TYPEHASH",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "acceptOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addDataProvider",
    inputs: [
      {
        name: "dataProvider",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "eip712Domain",
    inputs: [],
    outputs: [
      {
        name: "fields",
        type: "bytes1",
        internalType: "bytes1",
      },
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "version",
        type: "string",
        internalType: "string",
      },
      {
        name: "chainId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "verifyingContract",
        type: "address",
        internalType: "address",
      },
      {
        name: "salt",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "extensions",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "futureDataValiditySeconds",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNetworkInferenceMessage",
    inputs: [
      {
        name: "networkInferenceData",
        type: "tuple",
        internalType: "struct NetworkInferenceData",
        components: [
          {
            name: "networkInference",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "confidenceIntervalPercentiles",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "confidenceIntervalValues",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "timestamp",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "topicId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTopicValue",
    inputs: [
      {
        name: "topicId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "extraData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct TopicValue",
        components: [
          {
            name: "recentValue",
            type: "uint192",
            internalType: "uint192",
          },
          {
            name: "recentValueTime",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "confidenceIntervalPercentiles",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "confidenceIntervalValues",
            type: "uint256[]",
            internalType: "uint256[]",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pastDataValiditySeconds",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pendingOwner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeDataProvider",
    inputs: [
      {
        name: "dataProvider",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "switchedOn",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "topicValue",
    inputs: [
      {
        name: "topicId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "extraData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "recentValue",
        type: "uint192",
        internalType: "uint192",
      },
      {
        name: "recentValueTime",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "turnOffConsumer",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "turnOnConsumer",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateFutureDataValiditySeconds",
    inputs: [
      {
        name: "_futureDataValiditySeconds",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updatePastDataValiditySeconds",
    inputs: [
      {
        name: "_pastDataValiditySeconds",
        type: "uint48",
        internalType: "uint48",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "validDataProvider",
    inputs: [
      {
        name: "dataProvider",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "verifyNetworkInference",
    inputs: [
      {
        name: "nd",
        type: "tuple",
        internalType: "struct AlloraConsumerNetworkInferenceData",
        components: [
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "networkInference",
            type: "tuple",
            internalType: "struct NetworkInferenceData",
            components: [
              {
                name: "networkInference",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "confidenceIntervalPercentiles",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "confidenceIntervalValues",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "timestamp",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "topicId",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "extraData",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "networkInference",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "confidenceIntervalPercentiles",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "confidenceIntervalValues",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "dataProvider",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "verifyNetworkInferenceViewOnly",
    inputs: [
      {
        name: "nd",
        type: "tuple",
        internalType: "struct AlloraConsumerNetworkInferenceData",
        components: [
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "networkInference",
            type: "tuple",
            internalType: "struct NetworkInferenceData",
            components: [
              {
                name: "networkInference",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "confidenceIntervalPercentiles",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "confidenceIntervalValues",
                type: "uint256[]",
                internalType: "uint256[]",
              },
              {
                name: "timestamp",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "topicId",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "extraData",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "networkInference",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "confidenceIntervalPercentiles",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "confidenceIntervalValues",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "dataProvider",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AlloraConsumerAdminTurnedOff",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "AlloraConsumerAdminTurnedOn",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "AlloraConsumerOwnerAddedDataProvider",
    inputs: [
      {
        name: "dataProvider",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AlloraConsumerOwnerRemovedDataProvider",
    inputs: [
      {
        name: "dataProvider",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AlloraConsumerOwnerUpdatedFutureDataValiditySeconds",
    inputs: [
      {
        name: "futureDataValiditySeconds",
        type: "uint48",
        indexed: false,
        internalType: "uint48",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AlloraConsumerOwnerUpdatedPastDataValiditySeconds",
    inputs: [
      {
        name: "pastDataValiditySeconds",
        type: "uint48",
        indexed: false,
        internalType: "uint48",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AlloraConsumerVerifiedData",
    inputs: [
      {
        name: "topicId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "numericData",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "dataProvider",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "extraData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AlloraConsumerVerifiedNetworkInferenceData",
    inputs: [
      {
        name: "networkInference",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "topicId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "extraData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AlloraConsumerVerifiedNetworkInferenceDataAndInterval",
    inputs: [
      {
        name: "networkInference",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "topicId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "extraData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EIP712DomainChanged",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferStarted",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AlloraConsumerInvalidAggregator",
    inputs: [],
  },
  {
    type: "error",
    name: "AlloraConsumerInvalidConfidenceIntervals",
    inputs: [],
  },
  {
    type: "error",
    name: "AlloraConsumerInvalidDataProvider",
    inputs: [],
  },
  {
    type: "error",
    name: "AlloraConsumerInvalidDataTime",
    inputs: [],
  },
  {
    type: "error",
    name: "AlloraConsumerInvalidDataValiditySeconds",
    inputs: [],
  },
  {
    type: "error",
    name: "AlloraConsumerNoDataProvided",
    inputs: [],
  },
  {
    type: "error",
    name: "AlloraConsumerNotSwitchedOn",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidShortString",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeCastOverflowedUintDowncast",
    inputs: [
      {
        name: "bits",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "StringTooLong",
    inputs: [
      {
        name: "str",
        type: "string",
        internalType: "string",
      },
    ],
  },
] as const;

const _bytecode =
  "0x6101606040526005805460ff191660011790556007805467012c000000000e106001600160601b03199091161790553480156200003b57600080fd5b5060405162001eee38038062001eee8339810160408190526200005e916200028f565b6040518060400160405280600e81526020016d20b63637b930a1b7b739bab6b2b960911b815250604051806040016040528060018152602001603160f81b815250620000b9620000b36200018260201b60201c565b62000186565b620000c6826002620001a4565b61012052620000d7816003620001a4565b61014052815160208084019190912060e052815190820120610100524660a0526200016560e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c05280516200017b9062000186565b50620004bb565b3390565b600180546001600160a01b0319169055620001a181620001dd565b50565b6000602083511015620001c457620001bc836200022d565b9050620001d7565b81620001d184826200037a565b5060ff90505b92915050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080829050601f8151111562000264578260405163305a27a960e01b81526004016200025b919062000446565b60405180910390fd5b8051620002718262000496565b179392505050565b634e487b7160e01b600052604160045260246000fd5b600060208284031215620002a257600080fd5b604051602081016001600160401b0381118282101715620002c757620002c762000279565b60405282516001600160a01b0381168114620002e257600080fd5b81529392505050565b600181811c908216806200030057607f821691505b6020821081036200032157634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200037557600081815260208120601f850160051c81016020861015620003505750805b601f850160051c820191505b8181101562000371578281556001016200035c565b5050505b505050565b81516001600160401b0381111562000396576200039662000279565b620003ae81620003a78454620002eb565b8462000327565b602080601f831160018114620003e65760008415620003cd5750858301515b600019600386901b1c1916600185901b17855562000371565b600085815260208120601f198616915b828110156200041757888601518255948401946001909101908401620003f6565b5085821015620004365787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600060208083528351808285015260005b81811015620004755785810183015185820160400152820162000457565b506000604082860101526040601f19601f8301168501019250505092915050565b80516020808301519190811015620003215760001960209190910360031b1b16919050565b60805160a05160c05160e0516101005161012051610140516119d862000516600039600061081c015260006107f101526000610f7e01526000610f5601526000610eb101526000610edb01526000610f0501526119d86000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c8063ae3ed659116100b8578063e8b909071161007c578063e8b9090714610312578063f170cf9814610347578063f2fde38b1461035a578063f52cbe771461036d578063f9244dd714610390578063fde6e58f146103a357600080fd5b8063ae3ed659146102c1578063bc62b5cb146102c9578063d395c95e146102dc578063d4b8edd3146102f9578063e30c39781461030157600080fd5b8063760dbc471161010a578063760dbc47146101c857806379ba5097146101db5780637b5e6ad8146101e357806384b0196e146102035780638da5cb5b1461021e578063a23595461461024357600080fd5b806303117fbd14610147578063129c1a731461015c57806350910ad61461018a5780636ec656a61461019d578063715018a6146101c0575b600080fd5b61015a6101553660046112a6565b6103bc565b005b60075461016e9065ffffffffffff1681565b60405165ffffffffffff90911681526020015b60405180910390f35b61015a6101983660046112d5565b610452565b6101b06101ab36600461152d565b6104ae565b604051610181949392919061161c565b61015a6104cd565b6101b06101d636600461152d565b6104e1565b61015a610635565b6101f66101f1366004611661565b6106b4565b60405161018191906116dc565b61020b6107e3565b6040516101819796959493929190611793565b6000546001600160a01b03165b6040516001600160a01b039091168152602001610181565b61029a610251366004611803565b600460209081526000928352604090922081518083018401805192815290840192909301919091209152546001600160c01b03811690600160c01b90046001600160401b031682565b604080516001600160c01b0390931683526001600160401b03909116602083015201610181565b61015a61086c565b61015a6102d73660046112a6565b6108a9565b6005546102e99060ff1681565b6040519015158152602001610181565b61015a610926565b6001546001600160a01b031661022b565b6103397fad360c6a3a13ff7a0550a99e0e83a24f20ea197a6e42da35281ef62579c5332281565b604051908152602001610181565b610339610355366004611849565b610966565b61015a6103683660046112d5565b6109e1565b6102e961037b3660046112d5565b60066020526000908152604090205460ff1681565b61015a61039e3660046112d5565b610a52565b60075461016e90600160301b900465ffffffffffff1681565b6103c4610aab565b8065ffffffffffff166000036103ed5760405163c469d5e360e01b815260040160405180910390fd5b600780546bffffffffffff0000000000001916600160301b65ffffffffffff8481168202929092179283905560405192041681527fe6c064ad2382c001ee1d6eef8a061af28d834451f507593a25822a967880edab906020015b60405180910390a150565b61045a610aab565b6001600160a01b038116600081815260066020908152604091829020805460ff1916600117905590519182527f8042bd7385daff8fe89536683f5922dcaf1d14b07486b217e068aebd9f5e7b8b9101610447565b600060608060006104be85610b05565b92989197509550909350915050565b6104d5610aab565b6104df6000610c5a565b565b600060608060006104f185610b05565b6040805160808101909152939750919550935091508061051086610c73565b6001600160c01b0316815260200161052742610cab565b6001600160401b0316815260200184815260200183815250600460008760200151608001518152602001908152602001600020866020015160a001516040516105709190611885565b908152604080519182900360209081019092208351848401516001600160401b0316600160c01b026001600160c01b0390911617815590830151805191926105c09260018501929091019061124f565b50606082015180516105dc91600284019160209091019061124f565b50505060208501516060810151608082015160a0909201516040517f67988a57968d05ff92430e53e6e766fa9aff659c741d85f0797f84c09526eef29361062693899390926118a1565b60405180910390a19193509193565b60015433906001600160a01b031681146106a85760405162461bcd60e51b815260206004820152602960248201527f4f776e61626c6532537465703a2063616c6c6572206973206e6f7420746865206044820152683732bb9037bbb732b960b91b60648201526084015b60405180910390fd5b6106b181610c5a565b50565b60408051608081018252600080825260208201526060918101829052818101919091526000848152600460205260409081902090516106f690859085906118d0565b90815260408051918290036020908101832060808401835280546001600160c01b03811685526001600160401b03600160c01b90910416848301526001810180548451818502810185018652818152929486019383018282801561077957602002820191906000526020600020905b815481526020019060010190808311610765575b50505050508152602001600282018054806020026020016040519081016040528092919081815260200182805480156107d157602002820191906000526020600020905b8154815260200190600101908083116107bd575b50505050508152505090509392505050565b6000606080828080836108177f00000000000000000000000000000000000000000000000000000000000000006002610ce1565b6108427f00000000000000000000000000000000000000000000000000000000000000006003610ce1565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b610874610aab565b6005805460ff191690556040517f6567f235036031650de3c95c30a7ef81229fc452d7c2ad21843d7e912cdebf8890600090a1565b6108b1610aab565b8065ffffffffffff166000036108da5760405163c469d5e360e01b815260040160405180910390fd5b6007805465ffffffffffff191665ffffffffffff83169081179091556040519081527fe8f4786a82e299e9a9029aa99f9e3bd8f1e47c68e95d40cd6b0d37878c1724eb90602001610447565b61092e610aab565b6005805460ff191660011790556040517f5f2c3b6787fdae3e2b69ffcc8a4f3cb7e614f4c783582fe33d9131bd763cad8690600090a1565b60006109db7fad360c6a3a13ff7a0550a99e0e83a24f20ea197a6e42da35281ef62579c533228360000151846060015185608001518660a00151876020015188604001516040516020016109c097969594939291906118e0565b60405160208183030381529060405280519060200120610d8d565b92915050565b6109e9610aab565b600180546001600160a01b0383166001600160a01b03199091168117909155610a1a6000546001600160a01b031690565b6001600160a01b03167f38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e2270060405160405180910390a350565b610a5a610aab565b6001600160a01b038116600081815260066020908152604091829020805460ff1916905590519182527f5ca017314c73fbd4d01bb3ddc118930fecc38178e8144d06df9d363dfc51bfe49101610447565b6000546001600160a01b031633146104df5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161069f565b6005546000906060908190839060ff16610b3257604051634906b59b60e01b815260040160405180910390fd5b6020808601516040810151519101515114610b60576040516332a674c560e21b815260040160405180910390fd5b6020850151606001516007544290610b809065ffffffffffff1683611931565b1080610ba757506007548190610ba590600160301b900465ffffffffffff1642611931565b105b15610bc55760405163e684c29560e01b815260040160405180910390fd5b610c12610c0b610bd88860200151610966565b7f19457468657265756d205369676e6564204d6573736167653a0a3332000000006000908152601c91909152603c902090565b8751610dba565b9150610c1d82610dde565b610c3a576040516334bcc6ab60e21b815260040160405180910390fd5b506020948501518051958101516040909101519596909594509092509050565b600180546001600160a01b03191690556106b181610e15565b60006001600160c01b03821115610ca7576040516306dfcc6560e41b815260c060048201526024810183905260440161069f565b5090565b60006001600160401b03821115610ca757604080516306dfcc6560e41b815260048101919091526024810183905260440161069f565b606060ff8314610cfb57610cf483610e65565b90506109db565b818054610d0790611952565b80601f0160208091040260200160405190810160405280929190818152602001828054610d3390611952565b8015610d805780601f10610d5557610100808354040283529160200191610d80565b820191906000526020600020905b815481529060010190602001808311610d6357829003601f168201915b5050505050905092915050565b60006109db610d9a610ea4565b8360405161190160f01b8152600281019290925260228201526042902090565b6000806000610dc98585610fd4565b91509150610dd681611019565b509392505050565b600080546001600160a01b03838116911614806109db5750506001600160a01b031660009081526006602052604090205460ff1690565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60606000610e7283611163565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148015610efd57507f000000000000000000000000000000000000000000000000000000000000000046145b15610f2757507f000000000000000000000000000000000000000000000000000000000000000090565b610fcf604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b905090565b600080825160410361100a5760208301516040840151606085015160001a610ffe8782858561118b565b94509450505050611012565b506000905060025b9250929050565b600081600481111561102d5761102d61198c565b036110355750565b60018160048111156110495761104961198c565b036110965760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161069f565b60028160048111156110aa576110aa61198c565b036110f75760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161069f565b600381600481111561110b5761110b61198c565b036106b15760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161069f565b600060ff8216601f8111156109db57604051632cd44ac360e21b815260040160405180910390fd5b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156111c25750600090506003611246565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611216573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661123f57600060019250925050611246565b9150600090505b94509492505050565b82805482825590600052602060002090810192821561128a579160200282015b8281111561128a57825182559160200191906001019061126f565b50610ca79291505b80821115610ca75760008155600101611292565b6000602082840312156112b857600080fd5b813565ffffffffffff811681146112ce57600080fd5b9392505050565b6000602082840312156112e757600080fd5b81356001600160a01b03811681146112ce57600080fd5b634e487b7160e01b600052604160045260246000fd5b60405160c081016001600160401b0381118282101715611336576113366112fe565b60405290565b604051606081016001600160401b0381118282101715611336576113366112fe565b604051601f8201601f191681016001600160401b0381118282101715611386576113866112fe565b604052919050565b600082601f83011261139f57600080fd5b81356001600160401b038111156113b8576113b86112fe565b6113cb601f8201601f191660200161135e565b8181528460208386010111156113e057600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f83011261140e57600080fd5b813560206001600160401b03821115611429576114296112fe565b8160051b61143882820161135e565b928352848101820192828101908785111561145257600080fd5b83870192505b8483101561147157823582529183019190830190611458565b979650505050505050565b600060c0828403121561148e57600080fd5b611496611314565b90508135815260208201356001600160401b03808211156114b657600080fd5b6114c2858386016113fd565b602084015260408401359150808211156114db57600080fd5b6114e7858386016113fd565b6040840152606084013560608401526080840135608084015260a084013591508082111561151457600080fd5b506115218482850161138e565b60a08301525092915050565b60006020828403121561153f57600080fd5b81356001600160401b038082111561155657600080fd5b908301906060828603121561156a57600080fd5b61157261133c565b82358281111561158157600080fd5b61158d8782860161138e565b8252506020830135828111156115a257600080fd5b6115ae8782860161147c565b6020830152506040830135828111156115c657600080fd5b6115d28782860161138e565b60408301525095945050505050565b600081518084526020808501945080840160005b83811015611611578151875295820195908201906001016115f5565b509495945050505050565b84815260806020820152600061163560808301866115e1565b828103604084015261164781866115e1565b91505060018060a01b038316606083015295945050505050565b60008060006040848603121561167657600080fd5b8335925060208401356001600160401b038082111561169457600080fd5b818601915086601f8301126116a857600080fd5b8135818111156116b757600080fd5b8760208285010111156116c957600080fd5b6020830194508093505050509250925092565b6020815260018060c01b0382511660208201526001600160401b036020830151166040820152600060408301516080606084015261171d60a08401826115e1565b90506060840151601f1984830301608085015261173a82826115e1565b95945050505050565b60005b8381101561175e578181015183820152602001611746565b50506000910152565b6000815180845261177f816020860160208601611743565b601f01601f19169290920160200192915050565b60ff60f81b8816815260e0602082015260006117b260e0830189611767565b82810360408401526117c48189611767565b606084018890526001600160a01b038716608085015260a0840186905283810360c085015290506117f581856115e1565b9a9950505050505050505050565b6000806040838503121561181657600080fd5b8235915060208301356001600160401b0381111561183357600080fd5b61183f8582860161138e565b9150509250929050565b60006020828403121561185b57600080fd5b81356001600160401b0381111561187157600080fd5b61187d8482850161147c565b949350505050565b60008251611897818460208701611743565b9190910192915050565b8481528360208201528260408201526080606082015260006118c66080830184611767565b9695505050505050565b8183823760009101908152919050565b87815286602082015285604082015284606082015260e06080820152600061190b60e0830186611767565b82810360a084015261191d81866115e1565b905082810360c08401526117f581856115e1565b808201808211156109db57634e487b7160e01b600052601160045260246000fd5b600181811c9082168061196657607f821691505b60208210810361198657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052602160045260246000fdfea264697066735822122072a87f42d216dac263fcccfca437bcd86d8db03dfaf79bc54b5b21f8b4cea99b64736f6c63430008150033";

type AlloraConsumerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AlloraConsumerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AlloraConsumer__factory extends ContractFactory {
  constructor(...args: AlloraConsumerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    args: AlloraConsumerConstructorArgsStruct,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(args, overrides || {});
  }
  override deploy(
    args: AlloraConsumerConstructorArgsStruct,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(args, overrides || {}) as Promise<
      AlloraConsumer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): AlloraConsumer__factory {
    return super.connect(runner) as AlloraConsumer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AlloraConsumerInterface {
    return new Interface(_abi) as AlloraConsumerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AlloraConsumer {
    return new Contract(address, _abi, runner) as unknown as AlloraConsumer;
  }
}
