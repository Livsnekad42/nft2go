import { ApiPromise, WsProvider } from '@polkadot/api';

export class ConfigRMRK {
    wsProvider: WsProvider;
    //@ts-ignore
    api: ApiPromise | null;
  //WS_PROVIDER=`ws://192.168.88.244:10110`;
   //  WS_PROVIDER=`ws://176.197.96.134:10110`;
    //WS_PROVIDER=`wss://rmrk.nft2go.io`;
  WS_PROVIDER=`wss://kusama-rpc.polkadot.io`;
  //WS_PROVIDER=`wss://westend-rpc.polkadot.io`;

    private static instance: ConfigRMRK;

    constructor ()  {
        this.wsProvider = new WsProvider(this.WS_PROVIDER);
    }

    public connectPolkadot = async () => {
        ApiPromise.create({ provider: this.wsProvider }).then(apiConn => {
            this.api = apiConn;
            console.log(`COnnect1 to Polkadot node ${this.WS_PROVIDER}`);
        });
        ConfigRMRK.instance = this;
    }

    public static getConfigRMRK(): ConfigRMRK {
        if (!ConfigRMRK.instance) {
            ConfigRMRK.instance = new ConfigRMRK();
        }
        return ConfigRMRK.instance;
    }

    public async getApi(): Promise<ApiPromise> {
        if (!this.api) {
            this.api = await ApiPromise.create({ provider: this.wsProvider });
        }

        this.api = await this.api.isReady;
       // console.log(this.api);

        return Promise.resolve(this.api);
    }

    public async createID() {

    }
}

export const rmrkConf = new ConfigRMRK();
