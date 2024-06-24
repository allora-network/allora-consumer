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
  AlloraConsumerBringPredictionOnChainExample,
  AlloraConsumerBringPredictionOnChainExampleInterface,
} from "../AlloraConsumerBringPredictionOnChainExample";

const _abi = [
  {
    type: "function",
    name: "acceptOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "alloraConsumer",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IAlloraConsumer",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "callProtocolFunctionWithAlloraTopicInference",
    inputs: [
      {
        name: "protocolFunctionArgument",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "alloraNetworkInferenceData",
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
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "callProtocolFunctionWithExistingValue",
    inputs: [
      {
        name: "protocolFunctionArgument",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "topicId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
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
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAlloraConsumerContract",
    inputs: [
      {
        name: "alloraConsumer_",
        type: "address",
        internalType: "contract IAlloraConsumer",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
] as const;

const _bytecode =
  "0x6080604052600280546001600160a01b031916734341a3f0a350c2428184a727bab86e16d4ba701817905534801561003657600080fd5b5061004033610045565b6100b1565b600180546001600160a01b031916905561005e81610061565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610a57806100c06000396000f3fe6080604052600436106100865760003560e01c80638da5cb5b116100595780638da5cb5b146101065780638e40672814610124578063b9df572a14610137578063e30c397814610157578063f2fde38b1461017557600080fd5b80631183d3201461008b57806360d5d371146100c7578063715018a6146100dc57806379ba5097146100f1575b600080fd5b34801561009757600080fd5b506002546100ab906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b6100da6100d5366004610534565b610195565b005b3480156100e857600080fd5b506100da6102bd565b3480156100fd57600080fd5b506100da6102d1565b34801561011257600080fd5b506000546001600160a01b03166100ab565b6100da610132366004610556565b61034b565b34801561014357600080fd5b506100da6101523660046105b9565b6103db565b34801561016357600080fd5b506001546001600160a01b03166100ab565b34801561018157600080fd5b506100da6101903660046105b9565b610405565b60408051630f6bcd5b60e31b815260048101839052602481019190915260006044820181905290734341a3f0a350c2428184a727bab86e16d4ba701890637b5e6ad890606401600060405180830381865afa1580156101f8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261022091908101906106b7565b9050428160200151610e10610235919061077f565b67ffffffffffffffff1610156102b85760405162461bcd60e51b815260206004820152603860248201527f416c6c6f7261436f6e73756d65724272696e6750726564696374696f6e4f6e4360448201527f6861696e4578616d706c653a207374616c652076616c7565000000000000000060648201526084015b60405180910390fd5b505050565b6102c5610476565b6102cf60006104d0565b565b60015433906001600160a01b0316811461033f5760405162461bcd60e51b815260206004820152602960248201527f4f776e61626c6532537465703a2063616c6c6572206973206e6f7420746865206044820152683732bb9037bbb732b960b91b60648201526084016102af565b610348816104d0565b50565b60405163760dbc4760e01b815260009081908190734341a3f0a350c2428184a727bab86e16d4ba70189063760dbc47906103899087906004016108a6565b6000604051808303816000875af11580156103a8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103d091908101906109a1565b505050505050505050565b6103e3610476565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b61040d610476565b600180546001600160a01b0383166001600160a01b0319909116811790915561043e6000546001600160a01b031690565b6001600160a01b03167f38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e2270060405160405180910390a350565b6000546001600160a01b031633146102cf5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102af565b600180546001600160a01b031916905561034881600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000806040838503121561054757600080fd5b50508035926020909101359150565b6000806040838503121561056957600080fd5b82359150602083013567ffffffffffffffff81111561058757600080fd5b83016060818603121561059957600080fd5b809150509250929050565b6001600160a01b038116811461034857600080fd5b6000602082840312156105cb57600080fd5b81356105d6816105a4565b9392505050565b634e487b7160e01b600052604160045260246000fd5b6040516080810167ffffffffffffffff81118282101715610616576106166105dd565b60405290565b600082601f83011261062d57600080fd5b8151602067ffffffffffffffff8083111561064a5761064a6105dd565b8260051b604051601f19603f8301168101818110848211171561066f5761066f6105dd565b60405293845285810183019383810192508785111561068d57600080fd5b83870191505b848210156106ac57815183529183019190830190610693565b979650505050505050565b6000602082840312156106c957600080fd5b815167ffffffffffffffff808211156106e157600080fd5b90830190608082860312156106f557600080fd5b6106fd6105f3565b82516001600160c01b038116811461071457600080fd5b81526020830151828116811461072957600080fd5b602082015260408301518281111561074057600080fd5b61074c8782860161061c565b60408301525060608301518281111561076457600080fd5b6107708782860161061c565b60608301525095945050505050565b67ffffffffffffffff8181168382160190808211156107ae57634e487b7160e01b600052601160045260246000fd5b5092915050565b6000808335601e198436030181126107cc57600080fd5b830160208101925035905067ffffffffffffffff8111156107ec57600080fd5b8036038213156107fb57600080fd5b9250929050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6000808335601e1984360301811261084257600080fd5b830160208101925035905067ffffffffffffffff81111561086257600080fd5b8060051b36038213156107fb57600080fd5b81835260006001600160fb1b0383111561088d57600080fd5b8260051b80836020870137939093016020019392505050565b6020815260006108b683846107b5565b606060208501526108cb608085018284610802565b915050602084013560be198536030181126108e557600080fd5b601f19848303810160408601529085018035835290610907602083018361082b565b60c0602086015261091c60c086018284610874565b91505061092c604084018461082b565b858303604087015261093f838284610874565b92505050606083013560608501526080830135608085015261096460a08401846107b5565b935084820360a0860152610979828583610802565b9450505061098a60408701876107b5565b9250818685030160608701526106ac848483610802565b600080600080608085870312156109b757600080fd5b84519350602085015167ffffffffffffffff808211156109d657600080fd5b6109e28883890161061c565b945060408701519150808211156109f857600080fd5b50610a058782880161061c565b9250506060850151610a16816105a4565b93969295509093505056fea264697066735822122059c9853f8737fee471f58cb5019d88d289b7280add49b70d83a5bcf1b6363c7864736f6c63430008150033";

type AlloraConsumerBringPredictionOnChainExampleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AlloraConsumerBringPredictionOnChainExampleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AlloraConsumerBringPredictionOnChainExample__factory extends ContractFactory {
  constructor(
    ...args: AlloraConsumerBringPredictionOnChainExampleConstructorParams
  ) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      AlloraConsumerBringPredictionOnChainExample & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): AlloraConsumerBringPredictionOnChainExample__factory {
    return super.connect(
      runner
    ) as AlloraConsumerBringPredictionOnChainExample__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AlloraConsumerBringPredictionOnChainExampleInterface {
    return new Interface(
      _abi
    ) as AlloraConsumerBringPredictionOnChainExampleInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AlloraConsumerBringPredictionOnChainExample {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as AlloraConsumerBringPredictionOnChainExample;
  }
}
