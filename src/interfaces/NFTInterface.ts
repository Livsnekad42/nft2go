export enum TypeContent {
    Img = "img",
    Video = "video",
    Document = "document",
    Audio = "audio",
    Other = "other",
}

export interface INFTCollection {
    "password": string,
    "collection": {
        "name": string,
        "symbol": string,
        "metadata": string,
        "max"?: number
    },
    "hashTags"?: Array<string>,

}


export interface IMetadata {
    "password": string,
    "collection": {
        "name": string,
        "symbol": string,
        "metadata": string,
        "max"?: number
    }
}

export interface INFT {
    "password": string,
    "collectionId": string,
    "nft": {
        "name": string,
        "instance": string,
        "metadata": string,
        "transferable"?: number,
        "sn"?: string
    },
    "hashTags"?: Array<string>
    "typeContent"?: TypeContent.Video | TypeContent.Img | TypeContent.Audio | TypeContent.Document | TypeContent.Other
}

export interface ISingleCollection {
    collection: {
        id: string,
        userID: number,
        block: number,
        name: string,
        max: number,
        issuer: string,
        symbol: string,
        metadata: string,
        meta: any,
        changes: [
            {}
        ],
        updatedAtBlock: number,
        isBlocked: boolean,
        createdAt: string,
        nfts: [
            {
                id: string,
                userID: number,
                block: number,
                collection: string,
                index: number,
                name: string,
                instance: string,
                transferable: number,
                sn: string,
                metadata: string,
                meta: any,
                data: string,
                forsale: number,
                price: any,
                reactions: {},
                changes: [
                    {}
                ],
                owner: string,
                burned: string,
                updatedAtBlock: number,
                isBlocked: boolean,
                createdAt: string,
                collectionData: {
                    id: string,
                    userID: number,
                    max: number,
                    name: string
                },
                tags: [
                    {
                        tag: string
                    }
                ],
                isFavorite?: boolean,
                countViews: number
            }
        ],
        tags: [
            {
                tag: string
            }
        ],
        isFavorite?: boolean,
        countViews: 0
    }
}

export interface ISingleCollectionInAll {
        id: string,
        userID: number,
        block: number,
        name: string,
        max: number,
        issuer: string,
        symbol: string,
        metadata: string,
        meta: any,
        changes: [
            {}
        ],
        updatedAtBlock: number,
        isBlocked: boolean,
        createdAt: string,
        nfts: [
            {
                id: string,
                userID: number,
                block: number,
                collection: string,
                index: number,
                name: string,
                instance: string,
                transferable: number,
                sn: string,
                metadata: string,
                meta: any,
                data: string,
                forsale: number,
                price: any,
                reactions: {},
                changes: [
                    {}
                ],
                owner: string,
                burned: string,
                updatedAtBlock: number,
                isBlocked: boolean,
                createdAt: string,
                collectionData: {
                    id: string,
                    userID: number,
                    max: number,
                    name: string
                },
                tags: [
                    {
                        tag: string
                    }
                ],
                isFavorite?: boolean,
                countViews: number
            }
        ],
        tags: [
            {
                tag: string
            }
        ],
        isFavorite?: boolean,
        countViews: 0
}

export interface IRMRKNFT {
    block: number
    collectionId: number
    createdAt: string
    id: string
    instance: string
    forsale: string
    metadata: string
    meta?: any,
    name: string
    parentId: any
    rmrkID: any
    sn: string
    token: string
    transferable: number
    updatedAt: string
    userID: number
}


export interface INFTRMRK {
    id: string,
    userID: number,
    block: number,
    collection: string,
    index: number,
    name: string,
    instance: string,
    transferable: number,
    sn: string,
    metadata: string,
    meta: any,
    price: any,
    data: string,
    forsale: number,
    reactions: {},
    changes: [{}],
    owner: string,
    burned: string,
    updatedAtBlock: number,
    isBlocked?: boolean,
    createdAt: string,
    collectionData: {
        id: string,
        userID: number,
        max: number,
        name: string,
        meta?: any,
    },
    tags: [
        {
            tag: string
        }
    ],
    isFavorite?: boolean,
    countViews: number
}

export interface IPagination {
    page: number,
    pageSize: number,
    count?: number,
    tagLike?: string
}

export interface INFTOpenSea {
    isFavorite: boolean;
    animation_original_url: string,
    animation_url: string,
    background_color: string,
    collection: {
        id: string,
        slug: string,
        payout_address: string,
        name: string,
        description: string,
        image_url: string
    },
    collectionSlug: string,
    contract?: {},
    contractAddress: string,
    countViews?: 0,
    creator?: {
        address: string,
        config: string,
        profile_img_url: string,
        user: {}
    },
    creatorAddress?: string,
    decimals: string,
    description: string,
    external_link: string,
    id: 0,
    image_original_url: string,
    image_preview_url: string,
    image_thumbnail_url: string,
    image_url: string,
    is_presale: string,
    last_sale: 0,
    listing_date: string,
    name: string,
    num_sales: 0,
    owner?: {
        address: string,
        config: string,
        profile_img_url: string,
        user: {}
    },
    ownerAddress: string,
    permalink: string,
    sell_orders?: [
        {
            approved_on_chain: boolean,
            base_price: string,
            bounty_multiple: string,
            calldata: string,
            cancelled: boolean,
            closing_date: string,
            closing_extendable: boolean,
            created_date: string,
            current_bounty: string,
            current_price: string,
            exchange: string,
            expiration_time: number,
            extra: string,
            fee_method: number,
            fee_recipient: any,
            finalized: boolean,
            how_to_call: number,
            listing_time: number,
            maker: any,
            maker_protocol_fee: string,
            maker_referrer_fee: string,
            maker_relayer_fee: string,
            marked_invalid: boolean,
            metadata: any,
            nftId?: number,
            order_hash: string,
            payment_token: string,
            payment_token_contract: any,
            prefixed_hash: string,
            quantity: string,
            r: string,
            replacement_pattern: string,
            s: string,
            sale_kind: number,
            salt: string,
            side: number,
            static_extradata: string,
            static_target: string,
            taker: any,
            taker_protocol_fee: string,
            taker_relayer_fee: string,
            target: string,
            v: number
        }
    ],
    token_id: string,
    token_metadata: string,
    top_bid: string,
    traits?: [
        {}
    ],
    "transfer_fee": string,
    "transfer_fee_payment_token": string
}

export interface ICollectionOpenSea {
    banner_image_url: string,
    chat_url: string,
    countViews?: 0,
    created_date: string,
    default_to_fiat: true,
    description: string,
    dev_buyer_fee_basis_points: string,
    dev_seller_fee_basis_points: string,
    discord_url: string,
    display_data: {},
    editors?: [
        {
            address: string,
            config: string,
            profile_img_url: string,
            user: {},
        }
    ],
    external_url: string,
    featured: true,
    featured_image_url: string,
    hidden: true,
    id: string,
    image_url: string,
    instagram_username: string,
    is_subject_to_whitelist: true,
    large_image_url: string,
    medium_username: string,
    name: string,
    nfts?: Array<INFTOpenSea>,
    only_proxied_transfers: true,
    opensea_buyer_fee_basis_points: string,
    opensea_seller_fee_basis_points: string,
    payout_address: string,
    require_email: true,
    safelist_request_status: string,
    short_description: string,
    slug: string,
    telegram_url: string,
    twitter_username: string,
    wiki_url: string
}