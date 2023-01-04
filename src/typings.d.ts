declare module '*.json' {
    const value: { [key: string]: any };
    export default value;
}
declare module 'moment';
declare module 'react-model-viewer';

interface IRequestInit extends RequestInit {
    userId?: string;
    body?: any;
}

type BaseResponse<T> = {
    success: boolean;
    response?: T;
};

type TResponse<T> = {
    response: Response;
    body: T;
};

type TokenResponse = {
    token: string;
    refreshToken: string;
};

type ImageInfo = {
    link: string;
    type: string;
};

type FoldersResponse = {
    folder: {
        name: string,
        type: string
    },
    subFolder: SubFolder[]
};

type FileTree = {
    [folder: string]: SubFolder[]
};

type SubFolder = {
    cid: string,
    cidInfo: CidInfo,
    createdAt: string,
    id: number,
    name: string,
    type: string
};

type CidInfo = {
    cid: string,
    currentStorageInfo: StorageConfig,
    latestPushedStorageConfig: StorageConfig,
    executingStorageJob: ExecutingStorageJob
};

type ExecutingStorageJob = {
    apiId: string,
    cid: string,
    createdAt: number,
    dealErrorsList: [],
    dealInfoList: DealInfoList[],
    errorCause: string,
    id: string,
    status: number
};

type DealInfoList = {
    activationEpoch: number,
    dealId: number,
    duration: number,
    message: string,
    miner: string,
    pieceCid: string,
    pricePerEpoch: number,
    proposalCid: string,
    size: number,
    startEpoch: number,
    stateId: number,
    stateName: string
};

type StorageConfig = {
    hot: HotStorage,
    cold: ColdStorage
};

type HotStorage = {
    enabled: true,
    allowUnfreeze: true,
    unfreezeMaxPrice: 0,
    ipfs: {
        addTimeout: 0
    }
};

type ColdStorage = {
    enabled: true,
    filecoin: {
        replicationFactor: 0,
        dealMinDuration: 0,
        excludedMinersList: string[],
        trustedMinersList: string[],
        countryCodesList: string[],
        address: string,
        maxPrice: 0,
        fastRetrieval: true,
        dealStartOffset: 0,
        verifiedDeal: true,
        renew: {
            enabled: true,
            threshold: 0
        }
    }
};

type WalletsResponse = {
    id: string,
    addressesList: Wallet[]
};

type Wallet = {
    name: string,
    address: string,
    type: string,
    balance: number,
    fiatBalance: number
};


type FileDownloadResponse = {
    name: string,
    content : {
        type: string,
        data: string,
    }
};

type TransactionFee = {
    w: string,
    st: number,
    sc: number,
};

type Collection = {
    block: number,
    createdAt: string,
    id: number,
    metadata: string,
    name: string,
    nfts: Nft[],
    parentId: number | null,
    rmrkID: string,
    token: string,
    updatedAt: string,
    max: number,
    userID: number,
    issuer: string,
    changes: object[],
}
type Collections = {
    collections: Collection[]
}

type Transaction = {
    block: number,
    address: string,
    opType: string,
    status: string,
    idEntity: string,
    message: string,
    createdAt: string
}

type Nft = {
    block: number,
    index: number,
    collectionId: number,
    createdAt: string,
    id: number,
    forsale: number,
    burned: string,
    changes: object[],
    reactions: object,
    instance: string,
    metadata: string,
    isBlocked?: boolean,
    parentId: number | null,
    rmrkId: string | null,
    token: string,
    transferable: number,
    updatedAt: string,
    userId: number,
    name: string,
    owner: string,
    sn: string,
    isFavorite: boolean
}

declare module 'react-facebook'
