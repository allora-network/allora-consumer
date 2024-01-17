/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export type NumericDataStruct = {
  topicId: BigNumberish;
  timestamp: BigNumberish;
  numericValue: BigNumberish;
  extraData: BytesLike;
};

export type NumericDataStructOutput = [
  topicId: bigint,
  timestamp: bigint,
  numericValue: bigint,
  extraData: string
] & {
  topicId: bigint;
  timestamp: bigint;
  numericValue: bigint;
  extraData: string;
};

export type SignedNumericDataStruct = {
  signature: BytesLike;
  numericData: NumericDataStruct;
};

export type SignedNumericDataStructOutput = [
  signature: string,
  numericData: NumericDataStructOutput
] & { signature: string; numericData: NumericDataStructOutput };

export type UpshotAdapterNumericDataStruct = {
  signedNumericData: SignedNumericDataStruct[];
  extraData: BytesLike;
};

export type UpshotAdapterNumericDataStructOutput = [
  signedNumericData: SignedNumericDataStructOutput[],
  extraData: string
] & { signedNumericData: SignedNumericDataStructOutput[]; extraData: string };

export interface UpshotAdapterBringPredictionOnChainExampleInterface
  extends Interface {
  getFunction(
    nameOrSignature:
      | "acceptOwnership"
      | "callProtocolFunctionWithExistingIndexValue"
      | "callProtocolFunctionWithUpshotAdapterPredictionValue"
      | "owner"
      | "pendingOwner"
      | "renounceOwnership"
      | "setUpshotAdapterContract"
      | "transferOwnership"
      | "upshotAdapter"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "OwnershipTransferStarted" | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "callProtocolFunctionWithExistingIndexValue",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "callProtocolFunctionWithUpshotAdapterPredictionValue",
    values: [BigNumberish, UpshotAdapterNumericDataStruct]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setUpshotAdapterContract",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upshotAdapter",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "callProtocolFunctionWithExistingIndexValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "callProtocolFunctionWithUpshotAdapterPredictionValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUpshotAdapterContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upshotAdapter",
    data: BytesLike
  ): Result;
}

export namespace OwnershipTransferStartedEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface UpshotAdapterBringPredictionOnChainExample
  extends BaseContract {
  connect(
    runner?: ContractRunner | null
  ): UpshotAdapterBringPredictionOnChainExample;
  waitForDeployment(): Promise<this>;

  interface: UpshotAdapterBringPredictionOnChainExampleInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  acceptOwnership: TypedContractMethod<[], [void], "nonpayable">;

  callProtocolFunctionWithExistingIndexValue: TypedContractMethod<
    [protocolFunctionArgument: BigNumberish, topicId: BigNumberish],
    [void],
    "payable"
  >;

  callProtocolFunctionWithUpshotAdapterPredictionValue: TypedContractMethod<
    [
      protocolFunctionArgument: BigNumberish,
      upshotAdapterData: UpshotAdapterNumericDataStruct
    ],
    [void],
    "payable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  pendingOwner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setUpshotAdapterContract: TypedContractMethod<
    [upshotAdapter_: AddressLike],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  upshotAdapter: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "acceptOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "callProtocolFunctionWithExistingIndexValue"
  ): TypedContractMethod<
    [protocolFunctionArgument: BigNumberish, topicId: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "callProtocolFunctionWithUpshotAdapterPredictionValue"
  ): TypedContractMethod<
    [
      protocolFunctionArgument: BigNumberish,
      upshotAdapterData: UpshotAdapterNumericDataStruct
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pendingOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setUpshotAdapterContract"
  ): TypedContractMethod<[upshotAdapter_: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "upshotAdapter"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "OwnershipTransferStarted"
  ): TypedContractEvent<
    OwnershipTransferStartedEvent.InputTuple,
    OwnershipTransferStartedEvent.OutputTuple,
    OwnershipTransferStartedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferStarted(address,address)": TypedContractEvent<
      OwnershipTransferStartedEvent.InputTuple,
      OwnershipTransferStartedEvent.OutputTuple,
      OwnershipTransferStartedEvent.OutputObject
    >;
    OwnershipTransferStarted: TypedContractEvent<
      OwnershipTransferStartedEvent.InputTuple,
      OwnershipTransferStartedEvent.OutputTuple,
      OwnershipTransferStartedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
