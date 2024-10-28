/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface FundraiserFactoryInterface extends utils.Interface {
  functions: {
    "currentId()": FunctionFragment;
    "createFundraiser(string,string[],string[],string,string,address,uint256)": FunctionFragment;
    "fundraisersCount()": FunctionFragment;
    "fundraisers(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "currentId"
      | "createFundraiser"
      | "fundraisersCount"
      | "fundraisers",
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "currentId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "createFundraiser",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<string>[],
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "fundraisersCount",
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: "fundraisers",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
  ): string;

  decodeFunctionResult(functionFragment: "currentId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createFundraiser",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "fundraisersCount",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "fundraisers",
    data: BytesLike,
  ): Result;

  events: {
    "FundraiserCreated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FundraiserCreated"): EventFragment;
}

export interface FundraiserCreatedEventObject {
  fundraiser: string;
  owner: string;
}
export type FundraiserCreatedEvent = TypedEvent<
  [string, string],
  FundraiserCreatedEventObject
>;

export type FundraiserCreatedEventFilter =
  TypedEventFilter<FundraiserCreatedEvent>;

export interface FundraiserFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FundraiserFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    currentId(overrides?: CallOverrides): Promise<[BigNumber]>;

    createFundraiser(
      name: PromiseOrValue<string>,
      images: PromiseOrValue<string>[],
      categories: PromiseOrValue<string>[],
      description: PromiseOrValue<string>,
      region: PromiseOrValue<string>,
      beneficiary: PromiseOrValue<string>,
      goal: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    fundraisersCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    fundraisers(
      limit: PromiseOrValue<BigNumberish>,
      offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[string[]] & { coll: string[] }>;
  };

  currentId(overrides?: CallOverrides): Promise<BigNumber>;

  createFundraiser(
    name: PromiseOrValue<string>,
    images: PromiseOrValue<string>[],
    categories: PromiseOrValue<string>[],
    description: PromiseOrValue<string>,
    region: PromiseOrValue<string>,
    beneficiary: PromiseOrValue<string>,
    goal: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  fundraisersCount(overrides?: CallOverrides): Promise<BigNumber>;

  fundraisers(
    limit: PromiseOrValue<BigNumberish>,
    offset: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<string[]>;

  callStatic: {
    currentId(overrides?: CallOverrides): Promise<BigNumber>;

    createFundraiser(
      name: PromiseOrValue<string>,
      images: PromiseOrValue<string>[],
      categories: PromiseOrValue<string>[],
      description: PromiseOrValue<string>,
      region: PromiseOrValue<string>,
      beneficiary: PromiseOrValue<string>,
      goal: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    fundraisersCount(overrides?: CallOverrides): Promise<BigNumber>;

    fundraisers(
      limit: PromiseOrValue<BigNumberish>,
      offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<string[]>;
  };

  filters: {
    "FundraiserCreated(address,address)"(
      fundraiser?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
    ): FundraiserCreatedEventFilter;
    FundraiserCreated(
      fundraiser?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
    ): FundraiserCreatedEventFilter;
  };

  estimateGas: {
    currentId(overrides?: CallOverrides): Promise<BigNumber>;

    createFundraiser(
      name: PromiseOrValue<string>,
      images: PromiseOrValue<string>[],
      categories: PromiseOrValue<string>[],
      description: PromiseOrValue<string>,
      region: PromiseOrValue<string>,
      beneficiary: PromiseOrValue<string>,
      goal: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    fundraisersCount(overrides?: CallOverrides): Promise<BigNumber>;

    fundraisers(
      limit: PromiseOrValue<BigNumberish>,
      offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    currentId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createFundraiser(
      name: PromiseOrValue<string>,
      images: PromiseOrValue<string>[],
      categories: PromiseOrValue<string>[],
      description: PromiseOrValue<string>,
      region: PromiseOrValue<string>,
      beneficiary: PromiseOrValue<string>,
      goal: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    fundraisersCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fundraisers(
      limit: PromiseOrValue<BigNumberish>,
      offset: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
