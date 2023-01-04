import {ICollectionOpenSea, INFTOpenSea} from "../interfaces/NFTInterface";
import {
    getAllOpenSeaCollections, getAllOpenSeaNFTs, getAnyOpenSeaCollection,
    getAnyOpenSeaNFT, getCollectionNFTs1, getCollectionNFTs2, getMyOpenSeaCollections, getMyOpenSeaNFTs
} from "../requests/axiosRequests";
import {makeAutoObservable, runInAction, toJS} from "mobx";
import nftStore from "./nftStore";

class OpenseaStore {

    constructor() {
        makeAutoObservable(this);
    }

    openseaCollection: ICollectionOpenSea = {
        "banner_image_url": "",
        "chat_url": "",
        "countViews": 0,
        "created_date": "",
        "default_to_fiat": true,
        "description": "",
        "dev_buyer_fee_basis_points": "",
        "dev_seller_fee_basis_points": "",
        "discord_url": "",
        "display_data": {},
        "editors": [
            {
                "address": "",
                "config": "",
                "profile_img_url": "",
                "user": {}
            }
        ],
        "external_url": "",
        "featured": true,
        "featured_image_url": "",
        "hidden": true,
        "id": "",
        "image_url": "",
        "instagram_username": "",
        "is_subject_to_whitelist": true,
        "large_image_url": "",
        "medium_username": "",
        "name": "",
        "nfts": [
            {
                "animation_original_url": "",
                "animation_url": "",
                "background_color": "",
                "collection": {
                    "id": "",
                    "slug": "",
                    "payout_address": "",
                    "name": "",
                    "description": "",
                    "image_url": ""
                },
                "collectionSlug": "",
                "contract": {},
                "contractAddress": "",
                "countViews": 0,
                "creator": {
                    "address": "",
                    "config": "",
                    "profile_img_url": "",
                    "user": {}
                },
                "creatorAddress": "",
                "decimals": "",
                "description": "",
                "external_link": "",
                "id": 0,
                "image_original_url": "",
                "image_preview_url": "",
                "image_thumbnail_url": "",
                "isFavorite": false,
                "image_url": "",
                "is_presale": "",
                "last_sale": 0,
                "listing_date": "",
                "name": "",
                "num_sales": 0,
                "owner": {
                    "address": "",
                    "config": "",
                    "profile_img_url": "",
                    "user": {}
                },
                "ownerAddress": "",
                "permalink": "",
                "sell_orders": [
                    {
                        approved_on_chain: false,
                        base_price: '',
                        bounty_multiple: '',
                        calldata: '',
                        cancelled: false,
                        closing_date: '',
                        closing_extendable: false,
                        created_date: '',
                        current_bounty: '',
                        current_price: '',
                        exchange: '',
                        expiration_time: 0,
                        extra: '',
                        fee_method: 0,
                        fee_recipient: '',
                        finalized: true,
                        how_to_call: 0,
                        listing_time: 0,
                        maker: '',
                        maker_protocol_fee: '',
                        maker_referrer_fee: '',
                        maker_relayer_fee: '',
                        marked_invalid: false,
                        metadata: '',
                        nftId: 0,
                        order_hash: '',
                        payment_token: '',
                        payment_token_contract: '',
                        prefixed_hash: '',
                        quantity: '',
                        r: '',
                        replacement_pattern: '',
                        s: '',
                        sale_kind: 0,
                        salt: '',
                        side: 0,
                        static_extradata: '',
                        static_target: '',
                        taker: '',
                        taker_protocol_fee: '',
                        taker_relayer_fee: '',
                        target: '',
                        v: 0
                    }
                ],
                "token_id": "",
                "token_metadata": "",
                "top_bid": "",
                "traits": [
                    {}
                ],
                "transfer_fee": "",
                "transfer_fee_payment_token": ""
            }
        ],
        "only_proxied_transfers": true,
        "opensea_buyer_fee_basis_points": "",
        "opensea_seller_fee_basis_points": "",
        "payout_address": "",
        "require_email": true,
        "safelist_request_status": "",
        "short_description": "",
        "slug": "",
        "telegram_url": "",
        "twitter_username": "",
        "wiki_url": ""
    }

    openseaCollections: any = {
        collections: [{
            "banner_image_url": "",
            "chat_url": "",
            "countViews": 0,
            "created_date": "",
            "default_to_fiat": true,
            "description": "",
            "dev_buyer_fee_basis_points": "",
            "dev_seller_fee_basis_points": "",
            "discord_url": "",
            "display_data": {},
            "editors": [
                {
                    "address": "",
                    "config": "",
                    "profile_img_url": "",
                    "user": {}
                }
            ],
            "external_url": "",
            "featured": true,
            "featured_image_url": "",
            "hidden": true,
            "id": "",
            "image_url": "",
            "instagram_username": "",
            "is_subject_to_whitelist": true,
            "large_image_url": "",
            "medium_username": "",
            "name": "",
            "nfts": [
                {
                    "animation_original_url": "",
                    "animation_url": "",
                    "background_color": "",
                    "collection": {
                        "id": "",
                        "slug": "",
                        "payout_address": "",
                        "name": "",
                        "description": "",
                        "image_url": ""
                    },
                    "collectionSlug": "",
                    "contract": {},
                    "contractAddress": "",
                    "countViews": 0,
                    "creator": {
                        "address": "",
                        "config": "",
                        "profile_img_url": "",
                        "user": {}
                    },
                    "creatorAddress": "",
                    "decimals": "",
                    "description": "",
                    "external_link": "",
                    "id": 0,
                    "image_original_url": "",
                    "image_preview_url": "",
                    "image_thumbnail_url": "",
                    "image_url": "",
                    "is_presale": "",
                    "last_sale": 0,
                    "listing_date": "",
                    "name": "",
                    "num_sales": 0,
                    "owner": {
                        "address": "",
                        "config": "",
                        "profile_img_url": "",
                        "user": {}
                    },
                    "ownerAddress": "",
                    "permalink": "",
                    "sell_orders": [
                        {}
                    ],
                    "token_id": "",
                    "token_metadata": "",
                    "top_bid": "",
                    "traits": [
                        {}
                    ],
                    "transfer_fee": "",
                    "transfer_fee_payment_token": ""
                }
            ],
            "only_proxied_transfers": true,
            "opensea_buyer_fee_basis_points": "",
            "opensea_seller_fee_basis_points": "",
            "payout_address": "",
            "require_email": true,
            "safelist_request_status": "",
            "short_description": "",
            "slug": "",
            "telegram_url": "",
            "twitter_username": "",
            "wiki_url": ""
        }],
        pagination : {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    }

    openseaMyCollections: any = {
        collections: [{
            "banner_image_url": "",
            "chat_url": "",
            "countViews": 0,
            "created_date": "",
            "default_to_fiat": true,
            "description": "",
            "dev_buyer_fee_basis_points": "",
            "dev_seller_fee_basis_points": "",
            "discord_url": "",
            "display_data": {},
            "editors": [
                {
                    "address": "",
                    "config": "",
                    "profile_img_url": "",
                    "user": {}
                }
            ],
            "external_url": "",
            "featured": true,
            "featured_image_url": "",
            "hidden": true,
            "id": "",
            "image_url": "",
            "instagram_username": "",
            "is_subject_to_whitelist": true,
            "large_image_url": "",
            "medium_username": "",
            "name": "",
            "nfts": [
                {
                    "animation_original_url": "",
                    "animation_url": "",
                    "background_color": "",
                    "collection": {
                        "id": "",
                        "slug": "",
                        "payout_address": "",
                        "name": "",
                        "description": "",
                        "image_url": ""
                    },
                    "collectionSlug": "",
                    "contract": {},
                    "contractAddress": "",
                    "countViews": 0,
                    "creator": {
                        "address": "",
                        "config": "",
                        "profile_img_url": "",
                        "user": {}
                    },
                    "creatorAddress": "",
                    "decimals": "",
                    "description": "",
                    "external_link": "",
                    "id": 0,
                    "image_original_url": "",
                    "image_preview_url": "",
                    "image_thumbnail_url": "",
                    "image_url": "",
                    "is_presale": "",
                    "last_sale": 0,
                    "listing_date": "",
                    "name": "",
                    "num_sales": 0,
                    "owner": {
                        "address": "",
                        "config": "",
                        "profile_img_url": "",
                        "user": {}
                    },
                    "ownerAddress": "",
                    "permalink": "",
                    "sell_orders": [
                        {
                            approved_on_chain: false,
                            base_price: '',
                            bounty_multiple: '',
                            calldata: '',
                            cancelled: false,
                            closing_date: '',
                            closing_extendable: false,
                            created_date: '',
                            current_bounty: '',
                            current_price: '',
                            exchange: '',
                            expiration_time: 0,
                            extra: '',
                            fee_method: 0,
                            fee_recipient: '',
                            finalized: true,
                            how_to_call: 0,
                            listing_time: 0,
                            maker: '',
                            maker_protocol_fee: '',
                            maker_referrer_fee: '',
                            maker_relayer_fee: '',
                            marked_invalid: false,
                            metadata: '',
                            nftId: 0,
                            order_hash: '',
                            payment_token: '',
                            payment_token_contract: '',
                            prefixed_hash: '',
                            quantity: '',
                            r: '',
                            replacement_pattern: '',
                            s: '',
                            sale_kind: 0,
                            salt: '',
                            side: 0,
                            static_extradata: '',
                            static_target: '',
                            taker: '',
                            taker_protocol_fee: '',
                            taker_relayer_fee: '',
                            target: '',
                            v: 0
                        }
                    ],
                    "token_id": "",
                    "token_metadata": "",
                    "top_bid": "",
                    "traits": [
                        {}
                    ],
                    "transfer_fee": "",
                    "transfer_fee_payment_token": ""
                }
            ],
            "only_proxied_transfers": true,
            "opensea_buyer_fee_basis_points": "",
            "opensea_seller_fee_basis_points": "",
            "payout_address": "",
            "require_email": true,
            "safelist_request_status": "",
            "short_description": "",
            "slug": "",
            "telegram_url": "",
            "twitter_username": "",
            "wiki_url": ""
        }],
        pagination: {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    }

    openseaNFT: INFTOpenSea = {
        "animation_original_url": "",
        "animation_url": "",
        "background_color": "",
        "collection": {
            "id": "",
            "slug": "",
            "payout_address": "",
            "name": "",
            "description": "",
            "image_url": ""
        },
        "collectionSlug": "",
        "contract": {},
        "contractAddress": "",
        "countViews": 0,
        "creator": {
            "address": "",
            "config": "",
            "profile_img_url": "",
            "user": {},
        },
        "creatorAddress": "",
        "decimals": "",
        "description": "",
        "external_link": "",
        "id": 0,
        "isFavorite": false,
        "image_original_url": "",
        "image_preview_url": "",
        "image_thumbnail_url": "",
        "image_url": "",
        "is_presale": "",
        "last_sale": 0,
        "listing_date": "",
        "name": "",
        "num_sales": 0,
        "owner": {
            "address": "",
            "config": "",
            "profile_img_url": "",
            "user": {},
        },
        "ownerAddress": "",
        "permalink": "",
        "sell_orders": [
            {
                approved_on_chain: false,
                base_price: '',
                bounty_multiple: '',
                calldata: '',
                cancelled: false,
                closing_date: '',
                closing_extendable: false,
                created_date: '',
                current_bounty: '',
                current_price: '',
                exchange: '',
                expiration_time: 0,
                extra: '',
                fee_method: 0,
                fee_recipient: '',
                finalized: true,
                how_to_call: 0,
                listing_time: 0,
                maker: '',
                maker_protocol_fee: '',
                maker_referrer_fee: '',
                maker_relayer_fee: '',
                marked_invalid: false,
                metadata: '',
                nftId: 0,
                order_hash: '',
                payment_token: '',
                payment_token_contract: '',
                prefixed_hash: '',
                quantity: '',
                r: '',
                replacement_pattern: '',
                s: '',
                sale_kind: 0,
                salt: '',
                side: 0,
                static_extradata: '',
                static_target: '',
                taker: '',
                taker_protocol_fee: '',
                taker_relayer_fee: '',
                target: '',
                v: 0
            }
        ],
        "token_id": "",
        "token_metadata": "",
        "top_bid": "",
        "traits": [
            {},
        ],
        "transfer_fee": "",
        "transfer_fee_payment_token": ""
    }

    openseaNFTs: any = {
        nfts: [{
            "animation_original_url": "",
            "animation_url": "",
            "background_color": "",
            "collection": {
                "id": "",
                "slug": "",
                "payout_address": "",
                "name": "",
                "description": "",
                "image_url": ""
            },
            "collectionSlug": "string",
            "contract": {},
            "contractAddress": "string",
            "countViews": 0,
            "creator": {
                "address": "",
                "config": "",
                "profile_img_url": "",
                "user": {},
            },
            "creatorAddress": "",
            "decimals": "",
            "description": "",
            "external_link": "",
            "id": 0,
            "image_original_url": "",
            "image_preview_url": "",
            "image_thumbnail_url": "",
            "image_url": "",
            "is_presale": "",
            "last_sale": 0,
            "listing_date": "",
            "name": "",
            "num_sales": 0,
            "owner": {
                "address": "",
                "config": "",
                "profile_img_url": "",
                "user": {},
            },
            "ownerAddress": "",
            "permalink": "",
            "sell_orders": [
                {
                    approved_on_chain: false,
                    base_price: '',
                    bounty_multiple: '',
                    calldata: '',
                    cancelled: false,
                    closing_date: '',
                    closing_extendable: false,
                    created_date: '',
                    current_bounty: '',
                    current_price: '',
                    exchange: '',
                    expiration_time: 0,
                    extra: '',
                    fee_method: 0,
                    fee_recipient: '',
                    finalized: true,
                    how_to_call: 0,
                    listing_time: 0,
                    maker: '',
                    maker_protocol_fee: '',
                    maker_referrer_fee: '',
                    maker_relayer_fee: '',
                    marked_invalid: false,
                    metadata: '',
                    nftId: 0,
                    order_hash: '',
                    payment_token: '',
                    payment_token_contract: '',
                    prefixed_hash: '',
                    quantity: '',
                    r: '',
                    replacement_pattern: '',
                    s: '',
                    sale_kind: 0,
                    salt: '',
                    side: 0,
                    static_extradata: '',
                    static_target: '',
                    taker: '',
                    taker_protocol_fee: '',
                    taker_relayer_fee: '',
                    target: '',
                    v: 0
                }
            ],
            "token_id": "",
            "token_metadata": "",
            "top_bid": "",
            "traits": [
                {},
            ],
            "transfer_fee": "",
            "transfer_fee_payment_token": ""
        }],
        pagination : {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    }

    openseaCollNFTs: any = {
        nfts: [{
            "animation_original_url": "",
            "animation_url": "",
            "background_color": "",
            "collection": {
                "id": "",
                "slug": "",
                "payout_address": "",
                "name": "",
                "description": "",
                "image_url": ""
            },
            "collectionSlug": "string",
            "contract": {},
            "contractAddress": "string",
            "countViews": 0,
            "creator": {
                "address": "",
                "config": "",
                "profile_img_url": "",
                "user": {},
            },
            "creatorAddress": "",
            "decimals": "",
            "description": "",
            "external_link": "",
            "id": 0,
            "image_original_url": "",
            "image_preview_url": "",
            "image_thumbnail_url": "",
            "image_url": "",
            "is_presale": "",
            "last_sale": 0,
            "listing_date": "",
            "name": "",
            "num_sales": 0,
            "owner": {
                "address": "",
                "config": "",
                "profile_img_url": "",
                "user": {},
            },
            "ownerAddress": "",
            "permalink": "",
            "sell_orders": [
                {
                    approved_on_chain: false,
                    base_price: '',
                    bounty_multiple: '',
                    calldata: '',
                    cancelled: false,
                    closing_date: '',
                    closing_extendable: false,
                    created_date: '',
                    current_bounty: '',
                    current_price: '',
                    exchange: '',
                    expiration_time: 0,
                    extra: '',
                    fee_method: 0,
                    fee_recipient: '',
                    finalized: true,
                    how_to_call: 0,
                    listing_time: 0,
                    maker: '',
                    maker_protocol_fee: '',
                    maker_referrer_fee: '',
                    maker_relayer_fee: '',
                    marked_invalid: false,
                    metadata: '',
                    nftId: 0,
                    order_hash: '',
                    payment_token: '',
                    payment_token_contract: '',
                    prefixed_hash: '',
                    quantity: '',
                    r: '',
                    replacement_pattern: '',
                    s: '',
                    sale_kind: 0,
                    salt: '',
                    side: 0,
                    static_extradata: '',
                    static_target: '',
                    taker: '',
                    taker_protocol_fee: '',
                    taker_relayer_fee: '',
                    target: '',
                    v: 0
                }
            ],
            "token_id": "",
            "token_metadata": "",
            "top_bid": "",
            "traits": [
                {},
            ],
            "transfer_fee": "",
            "transfer_fee_payment_token": ""
        }],
        pagination : {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    }

    openseaMyNFTs: any = {
       nfts: [{
            "animation_original_url": "",
            "animation_url": "",
            "background_color": "",
            "collection": {
                "id": "",
                "slug": "",
                "payout_address": "",
                "name": "",
                "description": "",
                "image_url": "",
            },
            "collectionSlug": "string",
            "contract": {},
            "contractAddress": "string",
            "countViews": 0,
            "creator": {
                "address": "",
                "config": "",
                "profile_img_url": "",
                "user": {},
            },
            "creatorAddress": "",
            "decimals": "",
            "description": "",
            "external_link": "",
            "id": 0,
            "image_original_url": "",
            "image_preview_url": "",
            "image_thumbnail_url": "",
            "image_url": "",
            "is_presale": "",
            "last_sale": 0,
            "listing_date": "",
            "name": "",
            "num_sales": 0,
            "owner": {
                "address": "",
                "config": "",
                "profile_img_url": "",
                "user": {},
            },
            "ownerAddress": "",
            "permalink": "",
            "sell_orders": [
                {
                    approved_on_chain: false,
                    base_price: '',
                    bounty_multiple: '',
                    calldata: '',
                    cancelled: false,
                    closing_date: '',
                    closing_extendable: false,
                    created_date: '',
                    current_bounty: '',
                    current_price: '',
                    exchange: '',
                    expiration_time: 0,
                    extra: '',
                    fee_method: 0,
                    fee_recipient: '',
                    finalized: true,
                    how_to_call: 0,
                    listing_time: 0,
                    maker: '',
                    maker_protocol_fee: '',
                    maker_referrer_fee: '',
                    maker_relayer_fee: '',
                    marked_invalid: false,
                    metadata: '',
                    nftId: 0,
                    order_hash: '',
                    payment_token: '',
                    payment_token_contract: '',
                    prefixed_hash: '',
                    quantity: '',
                    r: '',
                    replacement_pattern: '',
                    s: '',
                    sale_kind: 0,
                    salt: '',
                    side: 0,
                    static_extradata: '',
                    static_target: '',
                    taker: '',
                    taker_protocol_fee: '',
                    taker_relayer_fee: '',
                    target: '',
                    v: 0,
                }
            ],
            "token_id": "",
            "token_metadata": "",
            "top_bid": "",
            "traits": [
                {},
            ],
            "transfer_fee": "",
            "transfer_fee_payment_token": "",
        }],
        pagination : {
            page: 0,
            pageSize: 0,
            count: 0
        },
        totalPages: 1
    }


    setMyCollsPageSize(size: number) {
        runInAction(() => {
            this.openseaMyCollections.pagination.pageSize = size
        })
    }

    async setMyCollsTotalPages() {
        let count = this.openseaMyCollections.pagination.count;
        let pageSize = this.openseaMyCollections.pagination.pageSize;
        if (count <= pageSize) {
            runInAction(() => {
                this.openseaMyCollections.totalPages = 1;
            })
        } else {
            if (Number.isInteger(count / pageSize)) {
                this.openseaMyCollections.totalPages = count / pageSize;
            } else {
                this.openseaMyCollections.totalPages = Math.floor(count / pageSize) + 1;
            }
        }
    }

    async setMyNFTsTotalPages() {
        let count = this.openseaMyNFTs.pagination.count;
        let pageSize = this.openseaMyNFTs.pagination.pageSize;
        if (count <= pageSize) {
            runInAction(() => {
                this.openseaMyNFTs.totalPages = 1;
            })
        } else {
            runInAction(() => {
                if (Number.isInteger(count / pageSize)) {
                    this.openseaMyNFTs.totalPages = count / pageSize;
                } else {
                    this.openseaMyNFTs.totalPages = Math.floor(count / pageSize) + 1;
                }

            })
        }
        console.log(toJS(this.openseaNFTs.pagination))
        console.log(toJS(this.openseaNFTs.totalPages))
    }

    async setAllCollsTotalPages() {
        let count = this.openseaCollections.pagination.count;
        let pageSize = this.openseaCollections.pagination.pageSize;
        if (count <= pageSize) {
            runInAction(() => {
                this.openseaCollections.totalPages = 1;
            })
        } else {
            if (Number.isInteger(count / pageSize)) {
                this.openseaCollections.totalPages = count / pageSize;
            } else {
                this.openseaCollections.totalPages = Math.floor(count / pageSize) + 1;
            }
        }
    }
    async setAllNFTsTotalPages() {
        let count = this.openseaNFTs.pagination.count;
        let pageSize = this.openseaNFTs.pagination.pageSize;
        if (count <= pageSize) {
            runInAction(() => {
                this.openseaNFTs.totalPages = 1;
            })
        } else {
            if (Number.isInteger(count / pageSize)) {
                this.openseaNFTs.totalPages = count / pageSize;
            } else {
                this.openseaNFTs.totalPages = Math.floor(count / pageSize) + 1;
            }
        }
    }


    async setMyNFTsPageSize(size: number) {
        runInAction(() => {
            this.openseaMyNFTs.pagination.pageSize = size
        })
    }

    async setAllCollsPageSize(size: number) {
        runInAction(() => {
            this.openseaCollections.pagination.pageSize = size
        })
    }
    setALlNFTsPageSize(size: number) {
        runInAction(() => {
            this.openseaNFTs.pagination.pageSize = size
        })
    }







    async getSingleNFT(id: string) {
        let resp = await getAnyOpenSeaNFT(id);
        console.log(resp);
        runInAction( async () => {
            try {
                this.openseaNFT = resp.data;
                console.log(toJS(this.openseaNFT))
            }
            catch (e) {
                console.log(e);
            }
        });
    }

    async getSingleCollection(id: string) {
        let resp = await getAnyOpenSeaCollection(id);
        console.log('sing', resp);
        runInAction(() => {
                this.openseaCollection = resp.data.collection;
                console.log('bla', toJS(this.openseaCollection))
        });
    }

    async getMyCollections(page: number = 1, pageSize: number = 10, query: string = "", reload: boolean = true) {
        let params: any = {};
        if (!!query) {
            params["query"] = query;
        }
        params.page = page;
        params.pageSize = pageSize;
        let resp = await getMyOpenSeaCollections(params);
        console.log(resp);
        try {
            runInAction(() => {
                if (reload) {
                    this.openseaMyCollections.collections = resp.data.collections;
                    this.openseaMyCollections.pagination = resp.data.pagination;
                } else {
                    this.openseaMyCollections.collections.push(...resp.data.collections);
                    this.openseaMyCollections.pagination = resp.data.pagination;
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    async getMyNFTs(page: number = 1, pageSize: number = 10,  query: string = "", typeContent: string = "", priceMin: any = "", priceMax: any = "", reload: boolean = true) {
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
        let resp = await getMyOpenSeaNFTs(params);
        console.log(resp);
        try {
            runInAction(() => {
                if (reload) {
                    this.openseaMyNFTs.nfts = resp.data.nfts;
                    this.openseaMyNFTs.pagination = resp.data.pagination;
                } else {
                    this.openseaMyNFTs.nfts.push(...resp.data.nfts);
                    this.openseaMyNFTs.pagination = resp.data.pagination;
                }
            })
        }
        catch (e) {
            console.log(e);
        }
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
                this.openseaCollNFTs.nfts = nfts;
                this.openseaCollNFTs.pagination = resp.data.pagination;
            } else {
                this.openseaCollNFTs.nfts.push(...nfts);
                this.openseaCollNFTs.pagination = resp.data.pagination;
            }
        })
    }

    async getAllNFTs(page: number = 1, pageSize: number = 10, query: string = "", typeContent: string = "", priceMin: any = "", priceMax: any = "", reload: boolean = true) {
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
        let resp = await getAllOpenSeaNFTs(params);
        console.log(resp);
        try {

            runInAction(() => {
                if (reload) {
                    this.openseaNFTs.nfts = resp.data.nfts;
                    this.openseaNFTs.pagination = resp.data.pagination;
                } else {
                    this.openseaNFTs.nfts.push(...resp.data.nfts);
                    this.openseaNFTs.pagination = resp.data.pagination;
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    async getAllCollections(page: number = 1, pageSize: number = 10, query: string = "", reload: boolean = true) {
        let params: any = {};
        if (!!query) {
            params["query"] = query;
        }
        params.page = page;
        params.pageSize = pageSize;
        let resp = await getAllOpenSeaCollections(params);
            runInAction(() => {
                if (reload) {
                    this.openseaCollections.collections = resp.data.collections;
                    this.openseaCollections.pagination = resp.data.pagination;
                } else {
                    this.openseaCollections.collections.push(...resp.data.collections);
                    this.openseaCollections.pagination = resp.data.pagination;
                }

            })
    }

}

export default new OpenseaStore();