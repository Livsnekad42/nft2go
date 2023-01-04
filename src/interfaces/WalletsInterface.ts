export interface IWalletsInterface {
    "id": string,
    "addressesList": [
        {
            "name": string,
            "address": string,
            "type": string,
            "balance": 0,
            makeDefault: boolean
        }
    ]

}

export interface ISingleWallet {
            "name": string,
            "address": string,
            "type": string,
            "balance": 0,
            makeDefault: boolean
}