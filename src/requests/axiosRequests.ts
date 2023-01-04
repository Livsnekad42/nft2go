import http from '../settings/mainSettings';
import axios, {AxiosError, AxiosResponse} from "axios";
import {isLogged, setToastError} from "../settings/utils";
import {IPagination} from "../interfaces/NFTInterface";
import authStore from "../stores/authStore";

interface ErrorResp {
    msg: string,
    code: number
}
let devIPs = [
    "https://cloudflare-ipfs.com/",
    "https://ipfs.io/",
    "https://gateway.ipfs.io/",
    "https://ipfs.cf-ipfs.com/",
    "https://ipfs.infura.io/",

];

async function getIpfsUri(url: string) {
    let ipfsLength = devIPs.length;
    for (let i = 0; i < ipfsLength; i++) {
        let rand = Math.floor(Math.random() * ipfsLength) - 1;
        let correctURL = url.replace("ipfs://", devIPs[rand]);
        try {
            let response = await axios.get(correctURL);
            if (response.status === 200) {
                return correctURL;
            }
        } catch (e) {
            console.log('error --- ' + e);
            continue;
        }
    }
}







export const signIn = async (data: object) => await http.post('/api/auth/signin/', data);

export const signUp = async (data: object) => await http.post('/api/auth/signup', data);

export const signOut = async () => await http.post('/api/auth/logout');

export const verifyMail = async (data: object) => await http.post('/api/auth/verification', data);

export const getToken = async () => await http.post('/api/auth/token', {},{withCredentials: true});



export const setSessionDuration = async (data: object) => await http.post('/api/settings/session-expires', data);

export const getStorageConfig = async () => await http.get('/api/settings/get-storage-conf');

export const setStorageConfig = async (data: object) => await http.post('/api/settings/get-storage-conf', data);


export const changeLogin = async (data: object) => await http.post('/api/settings/refresh-login', data);

export const changePassword = async (data: object) => await http.post('/api/settings/refresh-password', data);



export const getWallets = async () => await http.post('/api/filecoin/wallets/list');

export const setNewWallet = async (data: object) => await http.post('/api/filecoin/wallets/new', data);

export const getBalance = async (data: object) => await http.post('/api/filecoin/wallets/balance', data);

export const sendFil = async (data: object) => await http.post('/api/filecoin/wallets/sendfil', data);



export const getDeals = async () => await http.post('/api/filecoin/deals');



export const getFilesInfoList = async () => await http.post('/api/filecoin/storage/list');

export const getFileStorageInfo = async (data: object ) => await http.post('/api/filecoin/storage/info', data);

export const replaceStorageInfo = async (data: object ) => await http.post('/api/filecoin/storage/replace', data);

export const uploadFile = async (data: FormData, body: object) => await http.post('/api/storage/upload', data, { headers: {'content-Type': 'multipart/form-data'}});

export const getFile = async (data: string ) => await http.post('/api/filecoin/cid/get', { cid: data});
//export const getFile = async (data: string ) => await http.get('/api/filecoin/cid/get', { params: { "cid": data}});

export const deleteFile = async (data: object ) => await http.post('/api/filecoin/cid/del', data);



export const getFolder = async (data: string ) => await http.get('/api/filecoin/folder/get', {params: { folderId: data} });

export const renameFolder = async (data: object ) => await http.post('/api/filecoin/folder/rename', data);

export const setNewFolder = async (data: object ) => await http.post('/api/filecoin/folder/new', data);

export const deleteFolder = async (data: object ) => await http.post('/api/filecoin/folder/del', data);



export const refreshToken = async (data: object) => await http.post('/api/auth/token', data);



/*
export const getByIPFS = async (data: string) => {

    await axios.get(`https://${devIP}/ipfs/${data}`);
}
*/


export const getByCloudFlare = async (url: any ) => {
    let newMeta: any = {};
    if (typeof url === 'string') {
        let responseURL = await getByOurIPFS(url);
        if (responseURL === 'none') {
            return url
        }
        return responseURL;
    } else if (typeof url === 'object') {
        for (let key in url) {
        // @ts-ignore
        newMeta[key] = url[key];
        if (key === 'image' && typeof newMeta[key] === 'object') {
            // @ts-ignore
            if (newMeta[key].description.includes('ipfs://')) {
                // @ts-ignore
                console.log(newMeta[key].description);
                newMeta['image'] = await getIpfsUri(newMeta['image'].description);
                console.log(newMeta[key]);
            };
        } else if (key === 'image' && typeof newMeta['image'] === 'string') {
            if (newMeta['image'].includes('ipfs://')) {
                // @ts-ignore
                newMeta['image'] = await getIpfsUri(newMeta['image']);
            }
        } else if (key === 'mediaUri' && typeof newMeta['mediaUri'] === 'string') {
            if (newMeta['mediaUri'].includes('ipfs://')) {
                // @ts-ignore
                newMeta['image'] = await getIpfsUri(newMeta['mediaUri']);
            }
        };
    }
    }
    console.log(newMeta);
    return newMeta;
}


export const getByOurIPFS = async (url: string) => {
    let correctURL = await getIpfsUri(url);
    if (!!correctURL) {
        let deeperMeta = await axios.get(correctURL);
        console.log(deeperMeta)
        if (!!deeperMeta.data && !!deeperMeta.data.image) {
            let newUrl = deeperMeta.data;
            newUrl.image = await getIpfsUri(newUrl.image);
            return newUrl;
        }
        return ''
    } else {
        return '';
    }
}
/*
export const getByOurIPFSDesc = async (data: string) => {
    let hash = data.split('/');
    let hashCid = hash[hash.length - 1];
    if (!!hashCid) {
        if (hashCid.includes('ipfs://')) {
            let correctURL = `https://${devIP}/ipfs/${hashCid.slice(12)}`;
            let resp = await axios.get(correctURL );
            let desc = resp.data.description;
            // desc = desc.replace('176.197.96.134', devIP);
            return desc;
        } else {
            let correctURL = `https://${devIP}/ipfs/${hashCid}`;
            let resp = await axios.get(correctURL );
            let desc = resp.data.description;
            // desc = desc.replace('176.197.96.134', devIP);
            return desc;
        }
    } else {
        return '';
    }
}

 */

export const getMyCollections1 = async (data: IPagination) => await http.get('/api/nft/v1/get-collection', {params: data });
export const getMyCollections2 = async (data: IPagination) => await http.get('/api/nft/v2/get-collection', {params: data });

export const getAllNFT1 = async (data: any) => await http.get('/api/market/v1/nfts', {params: data });
export const getAllNFT2 = async (data: any) => await http.get('/api/market/v2/nfts', {params: data });

export const getAnyNFT1 = async (data: string) => await http.get('/api/market/v1/nft/' + data);
export const getAnyNFT2 = async (data: string) => await http.get('/api/market/v2/nft/' + data);

export const getMyNFTs1 = async (data: any) => await http.get('/api/nft/v1/get-nft/', {params: data });
export const getMyNFTs2 = async (data: any) => await http.get('/api/nft/v2/get-nft/', {params: data });

export const getAllCollections1 = async (data: any) => await http.get('/api/market/v1/collections', {params: data });
export const getAllCollections2 = async (data: any) => await http.get('/api/market/v2/collections', {params: data });

export const getAnyCollection1 = async (data: string) => await http.get('/api/market/v1/collection/' + data);
export const getAnyCollection2 = async (data: string) => await http.get('/api/market/v2/collection/' + data);

export const getCollectionNFTs1 = async (id: string, data: any) => await http.get('/api/market/v1/collection/' + id + "/nfts/", {params: data });
export const getCollectionNFTs2 = async (id: string, data: any) => await http.get('/api/market/v2/collection/' + id + "/nfts/", {params: data });


export const createMetadata = async (data: object) => await http.post('/api/nft/v1/create-metadata', data);
export const createMetaNFT = async (data: object) => await http.post('/api/nft/v2/create-metadata-nft', data);
export const createMetaCollection = async (data: object) => await http.post('/api/nft/v2/create-metadata-collection', data);


export const addTags = async (data: object) => await http.post('/api/hashtag/set-category', data);
export const getAllTAgs = async () => await http.get('/api/hashtag/tags');

export const changeIssuerCollection = async (data: object) => await http.post('/api/nft/changeissuer-collection', data);


export const getAllFavorites1 = async () => await http.get('/api/nft/v1.favorites-list');
export const getAllFavorites2 = async () => await http.get('/api/nft/v2/favorites-list');
export const addFavorite1 = async (data: any) => await http.post('/api/nft/v1/favorites-add', data);
export const addFavorite2 = async (data: any) => await http.post('/api/nft/v2/favorites-add', data);
export const deleteFavorite1 = async (data: any) => await http.post('/api/nft/v1/favorites-del', data);
export const deleteFavorite2 = async (data: any) => await http.post('/api/nft/v2/favorites-del', data);
export const addFavoriteOpensea = async (data: any) => await http.post('/api/nft/opensea/favorites-add', data);
export const deleteFavoriteOpensea = async (data: any) => await http.post('/api/nft/opensea/favorites-del', data);






export const listNFT = async (data: object) => await http.post('/api/nft/list-nft', data);
export const buyNFT = async (data: object) => await http.post('/api/nft/buy-nft', data);
export const sendNFT = async (data: object) => await http.post('/api/nft/send-nft', data);
export const emoteNFT = async (data: object) => await http.post('/api/nft/emote-nft', data);
export const consumeNFT = async (data: object) => await http.post('/api/nft/consume-nft', data);
export const getTransactionByBlock = async (data: object) => await http.post('/api/transaction/transaction-status', data);
export const getTransactionsByUser = async (data: object) => await http.post('/api/transaction/transactions', data);


export const saveWallet = async (data: object) => await http.post('/api/settings/save-wallet', data);
export const getMyProfile = async () => await http.get('/api/settings/whoami');
export const uploadMyBG = async (data: FormData) => {
    data.append('type', 'b');
    return await http.post('/api/settings/img-upload', data, { headers: {'content-Type': 'multipart/form-data'}});
}
export const uploadMyAvatar = async (data: FormData) => {
    data.append('type', 'a');
    return await http.post('/api/settings/img-upload', data, { headers: {'content-Type': 'multipart/form-data'}});
}

export const googleAuth = async (data: object) => await http.post('/api/auth/google/access_token', data);

export const facebookAuth = async (data: object) => await http.post('/api/auth/facebook/access_token', data);



export const getMyOpenSeaCollections = async (data: any) => await http.get('/api/market/opensea/get-collection', {params: data});

export const getAllOpenSeaNFTs = async (data: any) => await http.get('/api/market/opensea/nfts', {params: data });

export const getAnyOpenSeaNFT = async (data: string) => await http.get('/api/market/opensea/nft/' + data);

export const getMyOpenSeaNFTs = async (data: any) => await http.get('/api/nft/opensea/get-nft/', {params: data});

export const getAllOpenSeaCollections = async (data: any) => await http.get('/api/market/opensea/collections', {params: data });

export const getAnyOpenSeaCollection = async (data: string) => await http.get('/api/market/opensea/collection/' + data);

export const getOpenSeaCollectionNFTs = async (id: string, data: any) => await http.get('/api/market/opensea/collection/' + id + "/nfts/", {params: data });











export function removeHeaderAuthorization() {
    delete http.defaults.headers.common["Authorization"];
};

export function setHeaderAuthorization(token: string) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

};

