import {makeAutoObservable, runInAction, toJS} from "mobx";
import {INFTCollection, ISingleCollection} from "../interfaces/NFTInterface";
import {
    createMetaCollection,
    getAllNFT1,
    getAllNFT2,
    getAllCollections1,
    getAllCollections2,
    getAnyCollection1,
    getAnyCollection2,
    getAnyNFT1,
    getAnyNFT2,
    getTransactionByBlock,
    getMyNFTs1,
    getMyNFTs2,
    getAllFavorites1,
    getAllFavorites2,
    getMyCollections1,
    getMyCollections2,
    createMetaNFT, getByCloudFlare, createMetadata, getCollectionNFTs1, getCollectionNFTs2
} from "../requests/axiosRequests";
import {ITransaction} from "../interfaces/RMRMInterface";
import {toast} from "react-toastify";
import * as _ from 'lodash';
import nftStore from "./nftStore";

class RmrkStore {

    constructor() {
        makeAutoObservable(this);
    }

    // foreach attr in testattrs:
    //     {attr["key"]}{attr["counts"].length}
    //     foreach count in attr["counts"]:
    //         {attr["count"]}{attr["value"]}

    testAttributes = [
        {
            "key": "Background",
            "counts": [
                {
                    "count": 1266,
                    "value": "Aquamarine"
                },
                {
                    "count": 1243,
                    "value": "Army Green"
                },
                {
                    "count": 1242,
                    "value": "Blue"
                },
                {
                    "count": 1170,
                    "value": "Gray"
                },
                {
                    "count": 1232,
                    "value": "New Punk Blue"
                },
                {
                    "count": 1273,
                    "value": "Orange"
                },
                {
                    "count": 1290,
                    "value": "Purple"
                },
                {
                    "count": 1283,
                    "value": "Yellow"
                }
            ]
        },
        {
            "key": "Clothes",
            "counts": [
                {
                    "count": 64,
                    "value": "Admirals Coat"
                },
                {
                    "count": 163,
                    "value": "Bandolier"
                },
                {
                    "count": 215,
                    "value": "Bayc T Black"
                },
                {
                    "count": 140,
                    "value": "Bayc T Red"
                },
                {
                    "count": 253,
                    "value": "Biker Vest"
                },
                {
                    "count": 205,
                    "value": "Black Holes T"
                },
                {
                    "count": 42,
                    "value": "Black Suit"
                },
                {
                    "count": 334,
                    "value": "Black T"
                },
                {
                    "count": 95,
                    "value": "Blue Dress"
                },
                {
                    "count": 203,
                    "value": "Bone Necklace"
                },
                {
                    "count": 230,
                    "value": "Bone Tee"
                },
                {
                    "count": 163,
                    "value": "Caveman Pelt"
                },
                {
                    "count": 119,
                    "value": "Cowboy Shirt"
                },
                {
                    "count": 232,
                    "value": "Guayabera"
                },
                {
                    "count": 283,
                    "value": "Hawaiian"
                },
                {
                    "count": 128,
                    "value": "Hip Hop"
                },
                {
                    "count": 68,
                    "value": "Kings Robe"
                },
                {
                    "count": 144,
                    "value": "Lab Coat"
                },
                {
                    "count": 206,
                    "value": "Leather Jacket"
                },
                {
                    "count": 153,
                    "value": "Leather Punk Jacket"
                },
                {
                    "count": 213,
                    "value": "Lumberjack Shirt"
                },
                {
                    "count": 334,
                    "value": "Navy Striped Tee"
                },
                {
                    "count": 80,
                    "value": "Pimp Coat"
                },
                {
                    "count": 235,
                    "value": "Prison Jumpsuit"
                },
                {
                    "count": 103,
                    "value": "Prom Dress"
                },
                {
                    "count": 227,
                    "value": "Puffy Vest"
                },
                {
                    "count": 135,
                    "value": "Rainbow Suspenders"
                },
                {
                    "count": 284,
                    "value": "Sailor Shirt"
                },
                {
                    "count": 142,
                    "value": "Service"
                },
                {
                    "count": 144,
                    "value": "Sleeveless Logo T"
                },
                {
                    "count": 251,
                    "value": "Sleeveless T"
                },
                {
                    "count": 221,
                    "value": "Smoking Jacket"
                },
                {
                    "count": 105,
                    "value": "Space Suit"
                },
                {
                    "count": 412,
                    "value": "Striped Tee"
                },
                {
                    "count": 178,
                    "value": "Stunt Jacket"
                },
                {
                    "count": 235,
                    "value": "Tanktop"
                },
                {
                    "count": 144,
                    "value": "Tie Dye"
                },
                {
                    "count": 202,
                    "value": "Toga"
                },
                {
                    "count": 235,
                    "value": "Tuxedo Tee"
                },
                {
                    "count": 141,
                    "value": "Tweed Suit"
                },
                {
                    "count": 224,
                    "value": "Vietnam Jacket"
                },
                {
                    "count": 240,
                    "value": "Wool Turtleneck"
                },
                {
                    "count": 188,
                    "value": "Work Vest"
                }
            ]
        },
        {
            "key": "Earring",
            "counts": [
                {
                    "count": 149,
                    "value": "Cross"
                },
                {
                    "count": 222,
                    "value": "Diamond Stud"
                },
                {
                    "count": 462,
                    "value": "Gold Hoop"
                },
                {
                    "count": 439,
                    "value": "Gold Stud"
                },
                {
                    "count": 882,
                    "value": "Silver Hoop"
                },
                {
                    "count": 823,
                    "value": "Silver Stud"
                }
            ]
        },
        {
            "key": "Eyes",
            "counts": [
                {
                    "count": 487,
                    "value": "3d"
                },
                {
                    "count": 432,
                    "value": "Angry"
                },
                {
                    "count": 264,
                    "value": "Blindfold"
                },
                {
                    "count": 846,
                    "value": "Bloodshot"
                },
                {
                    "count": 49,
                    "value": "Blue Beams"
                },
                {
                    "count": 1714,
                    "value": "Bored"
                },
                {
                    "count": 710,
                    "value": "Closed"
                },
                {
                    "count": 479,
                    "value": "Coins"
                },
                {
                    "count": 407,
                    "value": "Crazy"
                },
                {
                    "count": 108,
                    "value": "Cyborg"
                },
                {
                    "count": 333,
                    "value": "Eyepatch"
                },
                {
                    "count": 394,
                    "value": "Heart"
                },
                {
                    "count": 151,
                    "value": "Holographic"
                },
                {
                    "count": 220,
                    "value": "Hypnotized"
                },
                {
                    "count": 69,
                    "value": "Laser Eyes"
                },
                {
                    "count": 350,
                    "value": "Robot"
                },
                {
                    "count": 551,
                    "value": "Sad"
                },
                {
                    "count": 233,
                    "value": "Scumbag"
                },
                {
                    "count": 750,
                    "value": "Sleepy"
                },
                {
                    "count": 352,
                    "value": "Sunglasses"
                },
                {
                    "count": 549,
                    "value": "Wide Eyed"
                },
                {
                    "count": 243,
                    "value": "X Eyes"
                },
                {
                    "count": 308,
                    "value": "Zombie"
                }
            ]
        },
        {
            "key": "Fur",
            "counts": [
                {
                    "count": 1229,
                    "value": "Black"
                },
                {
                    "count": 490,
                    "value": "Blue"
                },
                {
                    "count": 1370,
                    "value": "Brown"
                },
                {
                    "count": 406,
                    "value": "Cheetah"
                },
                {
                    "count": 636,
                    "value": "Cream"
                },
                {
                    "count": 1352,
                    "value": "Dark Brown"
                },
                {
                    "count": 175,
                    "value": "Death Bot"
                },
                {
                    "count": 215,
                    "value": "Dmt"
                },
                {
                    "count": 778,
                    "value": "Golden Brown"
                },
                {
                    "count": 496,
                    "value": "Gray"
                },
                {
                    "count": 155,
                    "value": "Noise"
                },
                {
                    "count": 511,
                    "value": "Pink"
                },
                {
                    "count": 474,
                    "value": "Red"
                },
                {
                    "count": 265,
                    "value": "Robot"
                },
                {
                    "count": 46,
                    "value": "Solid Gold"
                },
                {
                    "count": 626,
                    "value": "Tan"
                },
                {
                    "count": 77,
                    "value": "Trippy"
                },
                {
                    "count": 397,
                    "value": "White"
                },
                {
                    "count": 301,
                    "value": "Zombie"
                }
            ]
        },
        {
            "key": "Hat",
            "counts": [
                {
                    "count": 294,
                    "value": "Army Hat"
                },
                {
                    "count": 158,
                    "value": "Baby's Bonnet"
                },
                {
                    "count": 89,
                    "value": "Bandana Blue"
                },
                {
                    "count": 231,
                    "value": "Bayc Flipped Brim"
                },
                {
                    "count": 228,
                    "value": "Bayc Hat Black"
                },
                {
                    "count": 119,
                    "value": "Bayc Hat Red"
                },
                {
                    "count": 578,
                    "value": "Beanie"
                },
                {
                    "count": 262,
                    "value": "Bowler"
                },
                {
                    "count": 195,
                    "value": "Bunny Ears"
                },
                {
                    "count": 304,
                    "value": "Commie Hat"
                },
                {
                    "count": 354,
                    "value": "Cowboy Hat"
                },
                {
                    "count": 136,
                    "value": "Faux Hawk"
                },
                {
                    "count": 377,
                    "value": "Fez"
                },
                {
                    "count": 345,
                    "value": "Fisherman's Hat"
                },
                {
                    "count": 105,
                    "value": "Girl's Hair Pink"
                },
                {
                    "count": 150,
                    "value": "Girl's Hair Short"
                },
                {
                    "count": 324,
                    "value": "Halo"
                },
                {
                    "count": 252,
                    "value": "Horns"
                },
                {
                    "count": 225,
                    "value": "Irish Boho"
                },
                {
                    "count": 77,
                    "value": "King's Crown"
                },
                {
                    "count": 72,
                    "value": "Laurel Wreath"
                },
                {
                    "count": 120,
                    "value": "Party Hat 1"
                },
                {
                    "count": 107,
                    "value": "Party Hat 2"
                },
                {
                    "count": 130,
                    "value": "Police Motorcycle Helmet"
                },
                {
                    "count": 130,
                    "value": "Prussian Helmet"
                },
                {
                    "count": 182,
                    "value": "Safari"
                },
                {
                    "count": 304,
                    "value": "Sea Captain's Hat"
                },
                {
                    "count": 420,
                    "value": "Seaman's Hat"
                },
                {
                    "count": 318,
                    "value": "Short Mohawk"
                },
                {
                    "count": 235,
                    "value": "S&m Hat"
                },
                {
                    "count": 181,
                    "value": "Spinner Hat"
                },
                {
                    "count": 157,
                    "value": "Stuntman Helmet"
                },
                {
                    "count": 187,
                    "value": "Sushi Chef Headband"
                },
                {
                    "count": 65,
                    "value": "Trippy Captain's Hat"
                },
                {
                    "count": 223,
                    "value": "Vietnam Era Helmet"
                },
                {
                    "count": 110,
                    "value": "Ww2 Pilot Helm"
                }
            ]
        },
        {
            "key": "Mouth",
            "counts": [
                {
                    "count": 2272,
                    "value": "Bored"
                },
                {
                    "count": 119,
                    "value": "Bored Bubblegum"
                },
                {
                    "count": 121,
                    "value": "Bored Cigar"
                },
                {
                    "count": 710,
                    "value": "Bored Cigarette"
                },
                {
                    "count": 49,
                    "value": "Bored Dagger"
                },
                {
                    "count": 74,
                    "value": "Bored Kazoo"
                },
                {
                    "count": 88,
                    "value": "Bored Party Horn"
                },
                {
                    "count": 132,
                    "value": "Bored Pipe"
                },
                {
                    "count": 50,
                    "value": "Bored Pizza"
                },
                {
                    "count": 1551,
                    "value": "Bored Unshaven"
                },
                {
                    "count": 65,
                    "value": "Bored Unshaven Bubblegum"
                },
                {
                    "count": 94,
                    "value": "Bored Unshaven Cigar"
                },
                {
                    "count": 438,
                    "value": "Bored Unshaven Cigarette"
                },
                {
                    "count": 28,
                    "value": "Bored Unshaven Dagger"
                },
                {
                    "count": 61,
                    "value": "Bored Unshaven Kazoo"
                },
                {
                    "count": 45,
                    "value": "Bored Unshaven Party horn"
                },
                {
                    "count": 101,
                    "value": "Bored Unshaven Pipe"
                },
                {
                    "count": 26,
                    "value": "Bored Unshaven Pizza"
                },
                {
                    "count": 208,
                    "value": "Discomfort"
                },
                {
                    "count": 504,
                    "value": "Dumbfounded"
                },
                {
                    "count": 713,
                    "value": "Grin"
                },
                {
                    "count": 78,
                    "value": "Grin Diamond Grill"
                },
                {
                    "count": 91,
                    "value": "Grin Gold Grill"
                },
                {
                    "count": 116,
                    "value": "Grin Multicolored"
                },
                {
                    "count": 296,
                    "value": "Jovial"
                },
                {
                    "count": 241,
                    "value": "Phoneme L"
                },
                {
                    "count": 237,
                    "value": "Phoneme Oh"
                },
                {
                    "count": 255,
                    "value": "Phoneme  ooo"
                },
                {
                    "count": 333,
                    "value": "Phoneme Vuh"
                },
                {
                    "count": 163,
                    "value": "Phoneme Wah"
                },
                {
                    "count": 266,
                    "value": "Rage"
                },
                {
                    "count": 272,
                    "value": "Small Grin"
                },
                {
                    "count": 202,
                    "value": "Tongue Out"
                }
            ]
        }
    ]


    rmrkWallet = {
        "wallet": "",
        "balance": 0
    }

    mintedNFT = {
        "password": "",
        "collectionId": "",
        "nft": {
            "id": 0,
            "name": "",
            "metadata": {
                "image": '',
                "description": '',
                "name": '',
                'service': 'nft2go'
            },
            "sn": "",
            "instance": "",
            "transferable?": 1,
            "createdAt": ""
        },
        "hashTags": [
            ""
        ],
        "typeContent": '',
        "currentCid": '',
        "currentCidURL": '',
        "symbol": ''
    }

    tempNFT = {
        "password": "",
        "collectionId": "",
        "nft": {
            "name": "",
            "instance": "",
            "metadata": "",
            "transferable": 0,
            "sn": ""
        }
    }

    rmrkCollections = {
        collections: [],
        pagination :  {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    };
    favCollections = {
        collections: [],
        pagination :  {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    };
    rmrkNFTs: any = {
        nfts: [
            {
                "id": "",
                "userID": 0,
                "block": 0,
                "collection": "",
                "index": 0,
                "name": "",
                "instance": "",
                "transferable": 0,
                "sn": "",
                "metadata": "",
                "meta": {},
                "data": "",
                "forsale": 0,
                "price": 0,
                "reactions": {},
                "changes": [
                    {}
                ],
                "owner": "",
                "burned": "",
                "updatedAtBlock": 0,
                "isBlocked?": true,
                "createdAt": "",
                "collectionData": {
                    "id": "",
                    "userID": 0,
                    "max": 0,
                    "name": ""
                },
                "tags": [
                    {
                        "tag": ""
                    }
                ],
                "isFavorite": true,
                "countViews": 0
            }
        ],
        pagination :  {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    };
    favNFTs: any = {
        nfts: [],
        pagination :  {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    };
    myCollections = {
        collections: [],
        pagination : {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    };
    myNFTs: any = {
        nfts: [],
        pagination : {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    };

    singleCollection : ISingleCollection = {
        "collection": {
            "id": "",
            "userID": 0,
            "block": 0,
            "name": "",
            "max": 0,
            "issuer": "",
            "symbol": "",
            "metadata": "",
            "meta": {
                "name": "",
                "image": "",
                "description": ""
            },
            "changes": [{}],
            "updatedAtBlock": 0,
            "isBlocked": false,
            "createdAt": "",
            "nfts": [
                {
                    "id": "",
                    "userID": 0,
                    "block": 0,
                    "collection": "",
                    "index": 0,
                    "name": "",
                    "instance": "",
                    "transferable": 0,
                    "sn": "",
                    "metadata": "",
                    "meta": {
                        "name": "",
                        "image": "",
                        "description": ""
                    },
                    "data": "",
                    "forsale": 0,
                    "price": 0,
                    "reactions": {},
                    "changes": [{}],
                    "owner": "",
                    "burned": "",
                    "updatedAtBlock": 0,
                    "isBlocked": false,
                    "createdAt": "",
                    "collectionData": {
                        "id": "",
                        "userID": 0,
                        "max": 0,
                        "name": ""
                    },
                    "tags": [
                        {
                            "tag": ""
                        }
                    ],
                    "isFavorite": false,
                    "countViews": 0
                }
            ],
            "tags": [
                {
                    "tag": ""
                }
            ],
            "isFavorite": false,
            "countViews": 0
        }
}

    currentNFT = {
        "id": 0,
        "block": 0,
        "name": '',
        "instance": '',
        "metadata": '',
        "meta": {
            "name": "",
            "image": "",
            "description": ""
        },
        'collectionId' : 0
    }

    singleNFTResponse = {
            "id": "",
            "userID": 0,
            "block": 0,
            "collection": "",
            "index": 0,
            "name": "",
            "instance": "",
            "transferable": 0,
            "sn": "",
            "metadata": "",
            "meta": {
                "name": "",
                "image": "",
                "description": "",
                "thumb": "",
                "mediaUri": "",
                "content": "",
                "thumbnailUri": ""
            },
            "data": "",
            "forsale": 0,
            "reactions": {},
            "changes": [{}],
            "owner": "",
            "rootowner": "",
            "burned": "",
            "updatedAtBlock": 0,
            "typeContent": "",
            "isBlocked?": true,
            "createdAt": "",
            "collectionData": {
                "id": "",
                "userID": 0,
                "max": 0,
                "name": ""
            },
        "tags": [{}],
        "isFavorite": false,
        "description": ''
    }

    transAction: ITransaction = {
        "block": 0,
        "address": "",
        "opType": "",
        "status": "",
        "idEntity": "",
        "message": "",
        "createdAt": ""
    }

    getTransAction() {
        return this.transAction;
    }

    tempCIDURL = ''

    collectionNFTs = {
        nfts: [
            {
                "id": "",
                "userID": 0,
                "block": 0,
                "collection": "",
                "index": 0,
                "name": "",
                "instance": "",
                "transferable": 0,
                "sn": "",
                "metadata": "",
                "meta": {},
                "data": "",
                "forsale": 0,
                "price": 0,
                "reactions": {},
                "changes": [
                    {}
                ],
                "owner": "",
                "burned": "",
                "updatedAtBlock": 0,
                "isBlocked?": true,
                "createdAt": "",
                "collectionData": {
                    "id": "",
                    "userID": 0,
                    "max": 0,
                    "name": ""
                },
                "tags": [
                    {
                        "tag": ""
                    }
                ],
                "isFavorite": true,
                "countViews": 0
            }
        ],
        pagination :  {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    };


    mintedCollection = {
        "password": "",
        "collection": {
            "name": "",
            "symbol": "",
            "metadata": "",
            "max": 0,
            "description": ""
        },
        "hashTags": [""]
    }

    async getFav() {
        try {
            let resp1 = await getAllFavorites1();
            let resp2 = await getAllFavorites2();
            let resp = _.merge(resp1, resp2)
            runInAction(() => {
                this.favNFTs.nfts = resp.data.nfts;
                this.favCollections.collections = resp.data.collections;
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    setTransAction(data: ITransaction) {
        runInAction(() => {
            this.transAction = data;
        });
        toast(data.message);
    }

    async getInfoTransAction(block: number) {
        let resp = await getTransactionByBlock({block});
        this.setTransAction(resp.data);
    }

    setMyCollsPageSize(size: number) {
        runInAction(() => {
            this.myCollections.pagination.pageSize = size
        })
    }

    async setMyCollsTotalPages() {
        let count = this.myCollections.pagination.count;
        let pageSize = this.myCollections.pagination.pageSize;
        if (count <= pageSize) {
            runInAction(() => {
                this.myCollections.totalPages = 1;
            })
        } else {
            if (Number.isInteger(count / pageSize)) {
                this.myCollections.totalPages = count / pageSize;
            } else {
                this.myCollections.totalPages = Math.floor(count / pageSize) + 1;
            }
        }
    }

    async setMyNFTsTotalPages() {
        let count = this.myNFTs.pagination.count;
        let pageSize = this.myNFTs.pagination.pageSize;
        if (count <= pageSize) {
            runInAction(() => {
                this.myNFTs.totalPages = 1;
            })
        } else {
            runInAction(() => {
                if (Number.isInteger(count / pageSize)) {
                    this.myNFTs.totalPages = count / pageSize;
                } else {
                    this.myNFTs.totalPages = Math.floor(count / pageSize) + 1;
                }

            })
        }
        console.log(toJS(this.rmrkNFTs.pagination))
        console.log(toJS(this.rmrkNFTs.totalPages))
    }

    async setAllCollsTotalPages() {
        let count = this.rmrkCollections.pagination.count;
        let pageSize = this.rmrkCollections.pagination.pageSize;
        if (count <= pageSize) {
            runInAction(() => {
                this.rmrkCollections.totalPages = 1;
            })
        } else {
            if (Number.isInteger(count / pageSize)) {
                this.rmrkCollections.totalPages = count / pageSize;
            } else {
                this.rmrkCollections.totalPages = Math.floor(count / pageSize) + 1;
            }
        }
    }
    async setAllNFTsTotalPages() {
        let count = this.rmrkNFTs.pagination.count;
        let pageSize = this.rmrkNFTs.pagination.pageSize;
        if (count <= pageSize) {
            runInAction(() => {
                this.rmrkNFTs.totalPages = 1;
            })
        } else {
            if (Number.isInteger(count / pageSize)) {
                this.rmrkNFTs.totalPages = count / pageSize;
            } else {
                this.rmrkNFTs.totalPages = Math.floor(count / pageSize) + 1;
            }
        }
    }


   async setMyNFTsPageSize(size: number) {
        runInAction(() => {
            this.myNFTs.pagination.pageSize = size
        })
    }

    async setAllCollsPageSize(size: number) {
        runInAction(() => {
            this.rmrkCollections.pagination.pageSize = size
        })
    }
    setALlNFTsPageSize(size: number) {
        runInAction(() => {
            this.rmrkNFTs.pagination.pageSize = size
        })
    }



    async getSingleNFT(id: string) {
        console.log('got id')
        let resp: any;
        if (nftStore.rmrkVersion === 1) {
            resp = await getAnyNFT1(id);
        }
        else {
            resp = await getAnyNFT2(id);
        }

        runInAction( async () => {
            this.singleNFTResponse = resp.data;
            try {
                if (!!resp.data && !!resp.data.meta && !!resp.data.meta) {
                    this.singleNFTResponse.meta = await getByCloudFlare(resp.data.meta);
                } else {
                    this.singleNFTResponse.meta = await getByCloudFlare(resp.data.metadata);

                }

            }
            catch (e) {
                console.log(e);
            }
        });
        console.log('resp metadata', toJS(this.singleNFTResponse))
    }

    async getCurrentNFT(id: string) {
        let resp: any;
        if (nftStore.rmrkVersion === 1) {
            resp = await getAnyNFT1(id);
        }
        else {
            resp = await getAnyNFT2(id);
        }
        let _nft = resp.data;
                this.currentNFT.id = _nft.id;
                this.currentNFT.block = _nft.block;
                this.currentNFT.name = _nft.name;
                this.currentNFT.instance = _nft.instance
                if (!!this.currentNFT.meta && !!this.currentNFT.meta.image) {
                    this.currentNFT.meta = await getByCloudFlare(this.currentNFT.meta);
                } else {
                    this.currentNFT.meta = await getByCloudFlare(this.currentNFT.metadata);
                }
                this.currentNFT.collectionId = _nft.collectionId;
                runInAction(() => {
                    this.currentNFT = _nft;
                })
    }

    async getSingleCollection(id: string) {
        let resp: any;
        if (nftStore.rmrkVersion === 1) {
            resp = await getAnyCollection1(id);
        }
        else {
            resp = await getAnyCollection2(id);
        }
        let nfts: any = [];
        runInAction(async () => {
            this.singleCollection = resp.data;
            console.log(toJS(this.singleCollection));
            // if (!!this.singleCollection && !!this.singleCollection.collection.meta && !!this.singleCollection.collection.meta.image ) {
            //     this.singleCollection.collection.meta = await getByCloudFlare(this.singleCollection.collection.meta);
            // } else {
            //     this.singleCollection.collection.meta = await getByCloudFlare(this.singleCollection.collection.metadata)
            // }
            if (!!this.singleCollection && !!this.singleCollection.collection.nfts) {
                for (let _nft of this.singleCollection.collection.nfts!) {
                    let nft = _nft;
                    if (!!nft.meta && !!nft.meta.image) {
                        nft.meta = await getByCloudFlare(nft.meta);
                    } else {
                        nft.meta = await getByCloudFlare(nft.metadata);
                    }
                    nfts.push(nft);
                }
                ;
            this.singleCollection.collection.nfts = nfts;
            }
        });
    }

    setCollID(id: string) {
        runInAction(() => {
            this.tempNFT.collectionId = id;
        });
    }


    async getMyCollections(page: number = 1, pageSize: number = 10, query: string = "", typeContent: string = "", priceMin: any = "", priceMax: any = "", reload: boolean = true) {
            let resp: any;
            let params: any = {};
            if (!!query) {
                params["query"] = query;
            }
            params.page = page;
            params.pageSize = pageSize;
            if (nftStore.rmrkVersion === 1) {
                resp = await getMyCollections1(params);
            } else {
                resp = await getMyCollections2(params);
            }
                let collections: any = resp.data.collections;
                let readyCollections: any = [];
                let nfts: any = [];
                for (let coll of collections) {
                    let collection = coll;
                    // if (!!collection.meta && !!collection.meta.image) {
                    //     collection.meta = await getByCloudFlare(collection.meta);
                    // } else {
                    //     collection.meta = await getByCloudFlare(collection.metadata);
                    // }
                    for (let nft of collection.nfts) {
                        if (!!nft.meta && !!nft.meta.image) {
                            nft.meta = await getByCloudFlare(nft.meta);
                        } else {
                            nft.meta = await getByCloudFlare(nft.metadata);
                        }
                    }
                    collection.nfts = nfts;
                    readyCollections.push(collection)
                };
                runInAction(() => {
                    if (reload) {
                        this.myCollections.collections = readyCollections;
                        this.myCollections.pagination = resp.data.pagination;
                    } else {
                        // @ts-ignore
                        this.myCollections.collections.push(...readyCollections);
                        this.myCollections.pagination = resp.data.pagination;
                    }
                });
        console.log(toJS(this.myCollections.collections));
    }


    async getAllNFT(page: number = 1, pageSize: number = 10, query: string = "", typeContent: string = "", priceMin: any = "", priceMax: any = "", isViewed: boolean = false, sort: string = '',  reload: boolean = true) {
        let resp: any;
        let params: any = {};
        params.page = page;
        params.pageSize = pageSize;
        let numPriceMin = priceMin * 100000000000;
        let numPriceMax = priceMax * 100000000000;

        if (!!query) {
            params["query"] = query;
        }
        if (!!typeContent) {
            params["typeContent"] = typeContent;
        }
        if (!!numPriceMin) {
            params["priceMin"] = numPriceMin;
        }
        if (!!numPriceMax) {
            params["priceMax"] = numPriceMax;
        }

        if (!!sort) {
            params["sort"] = sort;
        }

        if (isViewed) {
            isViewed ? params["isViewed"] = 1 : params["isViewed"] = 0;
        }


        if (nftStore.rmrkVersion === 1) {
            resp = await getAllNFT1(params);
        }
        else {
            resp = await getAllNFT2(params);
        }
        let nfts: any = [];
        for (let _nft of resp.data.nfts) {
            if (_nft.id !== "2417-2efc6a7e16df8ca513-WATERFALL-WATERFALL_44-water") {
                let nft = _nft;
                // if (!!nft.meta && !!nft.meta.image) {
                //     nft.meta = await getByCloudFlare(nft.meta);
                // } else {
                //     nft.meta = await getByCloudFlare(nft.metadata);
                // }
                nft.description = _nft.meta.description;
                nfts.push(nft);
            }
            ;
        }
        runInAction(() => {
            if (reload) {
                this.rmrkNFTs.nfts = nfts;
                this.rmrkNFTs.pagination = resp.data.pagination;
            } else {
                this.rmrkNFTs.nfts.push(...nfts);
                this.rmrkNFTs.pagination = resp.data.pagination;
            }
        })
    }

    async getCollNFTs(id: string, page: number = 1, pageSize: number = 10, query: string = "", typeContent: string = "", priceMin: any = "", priceMax: any = "", reload: boolean = true) {
        let resp: any;
        let params: any = {};
        params.page = page;
        params.pageSize = pageSize;
        let numPriceMin = priceMin * 100000000000;
        let numPriceMax = priceMax * 100000000000;

        if (!!query) {
            params["query"] = query;
        }
        if (!!typeContent) {
            params["typeContent"] = typeContent;
        }
        if (!!numPriceMin) {
            params["priceMin"] = numPriceMin;
        }
        if (!!numPriceMax) {
            params["priceMax"] = numPriceMax;
        }

        if (nftStore.rmrkVersion === 1) {
            resp = await getCollectionNFTs1(id, params);
        }
        else {
            resp = await getCollectionNFTs2(id, params);
        }
        let nfts: any = [];
        for (let _nft of resp.data.nfts) {
                let nft = _nft;
                // if (!!nft.meta && !!nft.meta.image) {
                //     nft.meta = await getByCloudFlare(nft.meta);
                // } else {
                //     nft.meta = await getByCloudFlare(nft.metadata);
                // }
                nft.description = _nft.meta.description;
                nfts.push(nft);
            ;
        }
        runInAction(() => {
            if (reload) {
                this.collectionNFTs.nfts = nfts;
                this.collectionNFTs.pagination = resp.data.pagination;
            } else {
                this.collectionNFTs.nfts.push(...nfts);
                this.collectionNFTs.pagination = resp.data.pagination;
            }
        })
    }


    async getMyNFT(page: number = 1, pageSize: number = 10, query: string = "", typeContent: string = "", priceMin: any = "", priceMax: any = "", reload: boolean = true) {
        let resp: any;
        let params: any = {};
        params.page = page;
        params.pageSize = pageSize;
        let numPriceMin = priceMin * 100000000000;
        let numPriceMax = priceMax * 100000000000;

        if (!!query) {
            params["query"] = query;
        }
        if (!!typeContent) {
            params["typeContent"] = typeContent;
        }
        if (!!numPriceMin) {
            params["priceMin"] = numPriceMin;
        }
        if (!!numPriceMax) {
            params["priceMax"] = numPriceMax;
        }
        if (nftStore.rmrkVersion === 1) {
            resp = await getMyNFTs1(params);
        }
        else {
            resp = await getMyNFTs2(params);
        }
        let myNfts: any = [];
            for (let _nft of resp.data.nfts) {
                if (_nft.id !== "2417-2efc6a7e16df8ca513-WATERFALL-WATERFALL_44-water") {
                    let nft = _nft;
                    if (nft.metadata !== undefined) {
                        if (!!nft.meta && !!nft.meta.image) {
                            nft.meta = await getByCloudFlare(nft.meta);
                        } else {
                            nft.meta = await getByCloudFlare(nft.metadata);
                        }

                    };
                    nft.description = nft.meta.description;
                    myNfts.push(nft);
                };
                runInAction(() => {
                    if (reload) {
                        this.myNFTs.nfts = myNfts;
                        this.myNFTs.pagination = resp.data.pagination;
                    } else {
                        this.myNFTs.nfts.push(...myNfts);
                        this.myNFTs.pagination = resp.data.pagination;
                    }
                })
            }
    }

    async getCollFromRMRK(page: number = 1, pageSize: number = 10, query : string = "", reload: boolean = true) {
        let resp: any;
        let params: any = {};
        if (!!query) {
            params["query"] = query;
        }
        params.page = page;
        params.pageSize = pageSize;
        if (nftStore.rmrkVersion === 1) {
            resp = await getAllCollections1(params);
        }
        else {
            resp = await getAllCollections2(params);
        }
        let collections: any = resp.data.collections;
        let readyCollections: any = [];
        for (let coll of collections) {
            let collection = coll;
            //     if (!!coll.meta && !!coll.meta.image) {
            //         collection.meta = await getByCloudFlare(coll.meta);![](../../../../../../tmp/dnd_file/image.webp)
            //     } else {
            //         collection.meta = await getByCloudFlare(coll.metadata);
            //     }
            // for (let nft of collection.nfts) {
            //     if (!!nft.meta && !!nft.meta.image) {
            //         nft.meta = await getByCloudFlare(nft.meta);
            //     } else {
            //         nft.meta = await getByCloudFlare(nft.metadata);
            //     }
            // }
            readyCollections.push(collection)
        };
        runInAction(() => {
            if (reload) {
                this.rmrkCollections.collections = readyCollections;
                this.rmrkCollections.pagination = resp.data.pagination;
            } else {
                // @ts-ignore
                this.rmrkCollections.collections.push(...readyCollections);
                this.rmrkCollections.pagination = resp.data.pagination;
            }
        });
    }

   collections : Array<INFTCollection> = [];

    addCollection(collection: INFTCollection) {
        this.collections.push(collection);
    }

    async createMeta(metadata: object) {
        try {
            let resp = await createMetadata({metadata});
            return resp;
        }
        catch (e) {
            console.log(e);
        }
    }

    async createMetaCollection(metadata: object) {
       try {
           let resp = await createMetaCollection({metadata});
           return resp;
       }
       catch (e) {
           console.log(e);
       }
    }

    async createMetaNFT(metadata: object) {
        try {
            let resp = await createMetaNFT({metadata});
            return resp;
        }
        catch (e) {
            console.log(e);
        }
    }


}

export default new RmrkStore();
