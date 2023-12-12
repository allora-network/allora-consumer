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
import type { NonPayableOverrides } from "../../common";
import type {
  AddTopicScript,
  AddTopicScriptInterface,
} from "../../AddTopicScript.s.sol/AddTopicScript";

const _abi = [
  {
    inputs: [],
    name: "IS_SCRIPT",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "run",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600b805462ff00ff19166201000117905534801561002157600080fd5b50610719806100316000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063c04062261461003b578063f8ccbf4714610045575b600080fd5b61004361006c565b005b600b546100589062010000900460ff1681565b604051901515815260200160405180910390f35b60405163c1978d1f60e01b815260206004820152601960248201527f5343524950545f52554e4e45525f505249564154455f4b4559000000000000006044820152600090737109709ecfa91a80626ff3989d68f67f5b1dd12d9063c1978d1f90606401602060405180830381865afa1580156100ec573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061011091906104bd565b6040516001625e79b760e01b0319815260048101829052909150600090737109709ecfa91a80626ff3989d68f67f5b1dd12d9063ffa1864990602401602060405180830381865afa158015610169573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061018d91906104d6565b60405163ce817d4760e01b81526004810184905290915073091db6cb55773f6d60eaffd0060bd79021a5f6a290737109709ecfa91a80626ff3989d68f67f5b1dd12d9063ce817d4790602401600060405180830381600087803b1580156101f357600080fd5b505af1158015610207573d6000803e3d6000fd5b5050505061024a6040518060400160405280601781526020017f42726f616463617374207374617274656420627920257300000000000000000081525083610453565b604080516101a0810182526012610160820190815271115d1a0bd554d108141c9a58d9481999595960721b61018083015281526001600160a01b03841660208201526000818301819052606082018190526080820181905273d7dba19fea80d79d647ea92c3b6b011a6ef6fdf660a0830152600160c0830181905260e0830181905273a9d209191ef18ab7ea51766ed1c6dd0eb06520c56101008401526101208301819052610e1061014084015283518181528085019094529192909181602001602082028036833701905050905073a459c3a3b7769e18e702a3b5e2decdd4956557918160008151811061034157610341610506565b6001600160a01b039283166020918202929092018101919091526040805180820182528581529182018490525163081f53f760e21b8152909185169063207d4fdc906103919084906004016105a6565b6020604051808303816000875af11580156103b0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103d491906104bd565b507f885cb69240a935d632d79c317109709ecfa91a80626ff3989d68f67f5b1dd12d60001c6001600160a01b03166376eadd366040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561043357600080fd5b505af1158015610447573d6000803e3d6000fd5b50505050505050505050565b61049882826040516024016104699291906106b9565b60408051601f198184030181529190526020810180516001600160e01b031663319af33360e01b17905261049c565b5050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b6000602082840312156104cf57600080fd5b5051919050565b6000602082840312156104e857600080fd5b81516001600160a01b03811681146104ff57600080fd5b9392505050565b634e487b7160e01b600052603260045260246000fd5b6000815180845260005b8181101561054257602081850181015186830182015201610526565b506000602082860101526020601f19601f83011685010191505092915050565b600081518084526020808501945080840160005b8381101561059b5781516001600160a01b031687529582019590820190600101610576565b509495945050505050565b60208152600082516040602084015280516101608060608601526105ce6101c086018361051c565b915060208301516105ea60808701826001600160a01b03169052565b50604083015165ffffffffffff811660a087015250606083015160c0860152608083015160e086015260a083015161010061062f818801836001600160a01b03169052565b60c085015191506101206106468189018415159052565b60e0860151925061014061065d818a018515159052565b918601516001600160a01b0316938801939093529184015165ffffffffffff90811661018088015293909101519092166101a08501526020850151848203601f1901604086015291506106b08183610562565b95945050505050565b6040815260006106cc604083018561051c565b905060018060a01b0383166020830152939250505056fea26469706673582212204f419cf27ecb800e2f87f5972aff7c689b25d06731ecdebd6b118bedcb7db15f64736f6c63430008150033";

type AddTopicScriptConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AddTopicScriptConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AddTopicScript__factory extends ContractFactory {
  constructor(...args: AddTopicScriptConstructorParams) {
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
      AddTopicScript & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): AddTopicScript__factory {
    return super.connect(runner) as AddTopicScript__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AddTopicScriptInterface {
    return new Interface(_abi) as AddTopicScriptInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AddTopicScript {
    return new Contract(address, _abi, runner) as unknown as AddTopicScript;
  }
}
