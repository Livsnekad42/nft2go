export interface IFileInterface {
    data: {
    "cidInfosList": {
        "storageJobsList": [
            {
                "id": string,
                "apiId": string,
                "cid": string,
                "errorCause": string,
                "createdAt": number,
                "status": number,
                "dealInfoList": [
                    {
                        "proposalCid": string,
                        "stateId": number,
                        "stateName": string,
                        "miner": string,
                        "pieceCid": string,
                        "size": number,
                        "pricePerEpoch": number,
                        "startEpoch": number,
                        "duration": number,
                        "dealId": number,
                        "activationEpoch": number,
                        "message": string
                    }
                ],
                "dealErrorsList": [
                    {
                        "proposalCid": string,
                        "miner": string,
                        "message": string
                    }
                ]
            }
        ],
        "more": boolean,
        "nextPageToken": string
    },
    "summary": {
        "queuedStorageJobsList": [
            Array<string>
        ],
        "executingStorageJobsList": [
            Array<string>
        ],
        "finalStorageJobsList": [
            Array<string>
        ]
    }
    }

}

export interface IFileList {
    data : [
        {
            "id": number,
            "type": string,
            "name": string,
            "cid": string,
            "createdAt": string,
            "cidInfo": {
                "cid": string,
                "latestPushedStorageConfig": {},
                "currentStorageInfo": {
                    "jobId": string,
                    "cid": string,
                    "created": string,
                    "hot": {
                        "enabled": boolean
                    },
                    "cold": {
                        "enabled": boolean,
                        "filecoin": {
                            "dataCid": number,
                            "size": number,
                            "proposalsList": {
                                "dealId": number,
                                "renewed": boolean,
                                "duration": number,
                                "startEpoch": number,
                                "miner": string,
                                "epochPrice": number,
                                "pieceCid": string
                            }
                        }
                    }
                },
                "queuedStorageJobsList": {},
                "executingStorageJob": {}
            }
        }
        ]
}

export interface ISingleFile {
    "id": number,
    "type": string,
    "name": string,
    "cid": string,
    "createdAt": string,
    "cidInfo": {
        "cid": string,
        "latestPushedStorageConfig": {
            'hot' : {
                'enabled': boolean
                'allowUnfreeze' : boolean
                'unfreezeMaxPrice' : number,
                'ipfs' : {
                    'addTimeout': number
                }
            },
            "cold": {
                "enabled": boolean,
                "filecoin": {
                    "replicationFactor": number,
                    "dealMinDuration": number,
                    "excludedMinersList": [
                        string
                    ],
                    "trustedMinersList": [
                        string
                    ],
                    "countryCodesList": [
                        string
                    ],
                    "address": string,
                    "maxPrice": number,
                    "fastRetrieval": boolean,
                    "dealStartOffset": number,
                    "verifiedDeal": boolean,
                    "renew": {
                        "enabled": boolean,
                        "threshold": number
                    }
                }
            }
        },
        "currentStorageInfo": {
            "jobId": string,
            "cid": string,
            "created": string,
            "hot": {
                "enabled": boolean
            },
            "cold": {
                "enabled": boolean,
                "filecoin": {
                    "dataCid": number,
                    "size": number,
                    "proposalsList": {
                        "dealId": number,
                        "renewed": boolean,
                        "duration": number,
                        "startEpoch": number,
                        "miner": string,
                        "epochPrice": number,
                        "pieceCid": string
                    }
                }
            }
        },
        "queuedStorageJobsList": {},
        "executingStorageJob": {}
    }
}

export interface IDealInfoListElement {
    "proposalCid":	string,
    "stateId": number,
    "stateName": string,
    "miner": string,
    "pieceCid": string,
    "size": number,
    "pricePerEpoch": number,
    "startEpoch": number,
    "duration": number,
    "dealId": number,
    "activationEpoch": number,
    "message": string
}