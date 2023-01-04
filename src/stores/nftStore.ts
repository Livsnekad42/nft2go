import {makeAutoObservable, runInAction, toJS} from "mobx";
import { Collection as Collection2} from 'rmrk-tools';
import { Collection as Collection1} from "rmrk-tools/dist-cli/src/rmrk1.0.0/classes/collection";
import { NFT as NFT2} from "rmrk-tools";
import { NFT as NFT1} from "rmrk-tools/dist-cli/src/rmrk1.0.0/classes/nft";
import { ApiPromise, WsProvider } from '@polkadot/api';
import * as _ from 'lodash';
import {
    addTags,
    getAllCollections1,
    getAllCollections2, getAnyNFT1, getAnyNFT2, getTransactionByBlock,
    saveWallet
} from "../requests/axiosRequests";
import {rmrkConf} from "../settings/polkadot.conf";
import { KeyringPair } from "@polkadot/keyring/types";
import type { SignedBlock } from '@polkadot/types/interfaces/runtime';
import {u8aToHex} from "@polkadot/util";
import http from '../settings/mainSettings';
import rmrkStore from "./rmrkStore";
import history from "../settings/history";
const { mnemonicValidate } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/api');

class NFTStore {

    constructor() {
        this._mnemonic = '';
        makeAutoObservable(this);
    }

    public account: any;
    public api: any;
    public rmrkVersion: number = 2;
    private _mnemonic: string;



    public set mnemonic(mnemonic: string) {
        this._mnemonic = mnemonic;
    }

    public get mnemonic() {
        return this._mnemonic
    }


    public setRMRKVersion(version: string) {
        // runInAction(() => {
        //     this.rmrkVersion = parseInt(version);
        // })
        console.log(toJS( this.rmrkVersion))
    }

    public connect = async () => {
       // const wsProvider = new WsProvider('ws://192.168.0.201:9944');
       // const wsProvider = new WsProvider(`${devIP}:9944`);
        const wsProvider = new WsProvider('wss://rmrk.nft2go.io');
        this.api = new ApiPromise({ provider: wsProvider });
        console.log('bla connect')
        return this.api.isReady;
    };

    public generateMnemonic = (mnemo: string) => {
        this._mnemonic = mnemo;
        return this._mnemonic;
    }


    public getSerialNumber = async (id: string) => {
        try {
            let response = await http.get(`/api/market/v${this.rmrkVersion}/collection/${id}/nfts`);
            if (!!response && !!response.data) {
                let collectionNfts = response.data.nfts;
                return _.padStart(`${collectionNfts === undefined ? 1 : collectionNfts.length + 1}`, 16, '0');
            }
        } catch (error) {
            console.error('SN ',error);
            console.error('SN ',error.body);
        }
    }

    public validateMnemonic = (mnemonic: string, pass: string) => {
        console.log(this._mnemonic.includes(mnemonic))
        console.log(mnemonicValidate(mnemonic))
        if(mnemonicValidate(mnemonic) && this._mnemonic.includes(mnemonic)){
            this.createAccoutWithMnemonic(mnemonic, pass)
            return true
        } else if(mnemonicValidate(this._mnemonic) && mnemonic === '') {
            //@ts-ignore
            this.createAccoutWithMnemonic(this._mnemonic)
            return true
        } else {
            return false
        }
    }

    public createAccoutWithMnemonic = async (mnemonic: string, password: string) => {
        const keyring = new Keyring({type: 'sr25519', ss58Format:2});
        const account = keyring.addFromMnemonic(mnemonic);
        console.log('key1', account);
        console.log('key2', keyring);
        runInAction(() => {
            this.account = account;
            console.log(account);
            rmrkStore.rmrkWallet.wallet = account.address;
            this.getBalance(account.address);
            saveWallet({'address': account.address});
        })
        const jsonWallet = this.account.toJson(password);
        localStorage.setItem('jsw', JSON.stringify(jsonWallet));
        history.push('/lk/profile/myprofile')
    }


    public getWalletFromStorage = (pass: string) => {
        const keyring = new Keyring({type: 'sr25519', ss58Format: 2});
        const localWallet = localStorage.getItem('jsw')!;
        let parsedWallet = JSON.parse(localWallet);
        let realWallet = keyring.createFromJson(parsedWallet)
        realWallet.decodePkcs8(pass);
        console.log('rw', realWallet);
        return realWallet;
    }

    public getBalance = async (addr: string) => {
        const api = await rmrkConf.getApi();
        const { data: balance } = await api.query.system.account(addr);
        let bal: number = +`${balance.free}`;
        bal = +bal / 100000;
        runInAction(() => {
            rmrkStore.rmrkWallet.balance = bal;
        })
    }

    public getCollection = async () => {
        let resp1 = await getAllCollections1({page: 0, pageSize: 10});
        let resp2 = await getAllCollections2({page: 0, pageSize: 10});
        let resp = _.merge(resp1, resp2);
        return resp;
    }

     getWalletAfterRefresh = async () => {
        let wallet = localStorage.getItem('jsw')!;
        let parsedWallet = JSON.parse(wallet);
        //const api = await rmrkConf.getApi();
        if (!!parsedWallet && !!parsedWallet.address) {
            //@ts-ignore
            //const { data: balance } = await api.query.system.account(parsedWallet.address);
            console.log(parsedWallet.address)
            runInAction(() => {
                rmrkStore.rmrkWallet.wallet = parsedWallet.address;
               // rmrkStore.rmrkWallet.balance = balance.free.toHuman();
            })
        }
    }

    public async getTR(block: number, id:string) {
        let resp = await getTransactionByBlock({"block": block, "idEntity": id });
        console.log('status', resp);
    }

    public createCollection = async (name: string, max: number, password: string) => {
        try {
        const wallet = this.getWalletFromStorage(password);
        let link = rmrkStore.mintedCollection.collection.metadata;
        let symbol = await name.toUpperCase().replace(/ /g, '_');
            const collection = this.rmrkVersion === 2 ? new Collection2(
                    0,
                    max,
                    wallet!.address,
                    symbol,
                    Collection2.generateId(u8aToHex(wallet!.publicKey), symbol),
                    //@ts-ignore
                    link,
                ) :
                new Collection1(
                    0,
                    name,
                    ~~max,
                    wallet!.address,
                    symbol,
                    Collection1.generateId(u8aToHex(wallet!.publicKey), symbol),
                    //@ts-ignore
                    link,
                );
        try {
            const resp = await this.collectionMint(collection, wallet, (_block: any) => {
                try {
                    const address = _block.block.header.number.toNumber();
                    console.log('address', address)
                } catch (e) {
                    console.error(`[Error comission pay mint]: ${e}`);
                }
            });
            console.log('mint resp', resp);
            const addressBlock: number = resp.block.block.header.number.toNumber();
            console.log(addressBlock);
        } catch (e) {
            console.error(`*---create collection Error: ${e}`);
        } }
        catch (e) {
            throw new Error('Неверный пароль')
        }
    }

    public createNFT = async (name: string, tags = [''], typeContent = '', password: string) => {
        try {
        const wallet = this.getWalletFromStorage(password);
        const link = rmrkStore.mintedNFT.currentCidURL;
        const instance = name.replace(/ /g, '_').toUpperCase()
        const symbol = name.toUpperCase().replace(/ /g, '_');

            const nft = this.rmrkVersion === 2 ? new NFT2({
                    block: 0,
                    collection: rmrkStore.tempNFT.collectionId,
                    symbol: symbol,
                    transferable: 1,
                    // @ts-ignore
                    sn: await this.getSerialNumber(rmrkStore.tempNFT.collectionId),
                    metadata: link,
                    owner: wallet
                }) :
                new NFT1(
                    0,
                    rmrkStore.tempNFT.collectionId,
                    name,
                    instance,
                    1,
                    // @ts-ignore
                    await this.getSerialNumber(rmrkStore.tempNFT.collectionId),
                    link,
                );
        try {
            const resp = await this.nftMint(nft, wallet, (_block: any) => {
                try {
                    const address = _block.block.header.number.toNumber();
                    console.log('address', address)
                } catch (e) {
                    console.error(`[Error comission pay mint]: ${e}`);
                }
            });
            console.log('mint resp', resp);
            const addressBlock: number = resp.block.block.header.number.toNumber();
            await addTags({hashTags: tags, typeContent, 'nft': {'id': addressBlock, 'v': this.rmrkVersion === 2 ? 'rmrk2.0.0' : 'rmrk1.0.0'}});
            console.log(addressBlock);
        } catch (e) {
            console.error(`*---create nft Error: ${e}`);
        } }
        catch (e) {
            throw new Error('Неверный пароль')
        }
    }

    public buyNFT = async (id: string, password: string) => {
        //@ts-ignore
        let nftData = this.rmrkVersion === 2 ? await getAnyNFT2(id) : await getAnyNFT1(id);
        console.log('nftdata', nftData);
        const wallet = this.getWalletFromStorage(password);
       // let link = await getByCloudFlare(nftData.data.meta);
        let link = nftData.data.meta.image;
        let name = nftData.data.meta.name;
        let sn = nftData.data.sn;
        let block = nftData.data.block;
        let collection = nftData.data.collection;
        let symbol = nftData.data.meta.name.toUpperCase().replace(/ /g, '_');
        const nft = this.rmrkVersion === 2 ? new NFT2({
                block,
                collection,
                symbol,
                transferable: 1,
                sn: sn,
                metadata: link,
                owner: wallet
            }) :
            new NFT1(
                block,
                collection,
                name,
                symbol,
                1,
                sn,
                link,
            );
        nft.owner = nftData.data.owner;
        nft.forsale = nftData.data.forsale;
        nft.reactions = nftData.data.reactions;
        nft.changes = nftData.data.changes;
        nft.burned = nftData.data.burned;
        try {
            const resp = await this.nftBuy(nft, wallet, nft.forsale, nft.owner, (_block: any) => {
                try {
                    const address = _block.block.header.number.toNumber();
                    console.log('address', address)
                } catch (e) {
                    console.error(`[Error comission pay mint]: ${e}`);
                }
            });
            const addresssBlock: number = resp.block.block.header.number.toNumber();

            console.log(addresssBlock);
        } catch (e) {
            console.error(`*---buy nft Error: ${e}`);
        }
    }

    public listNFT = async (id: string, price: number, password: string) => {
        //@ts-ignore
        let nftData = this.rmrkVersion === 2 ? await getAnyNFT2(id) : await getAnyNFT1(id);
        const wallet = this.getWalletFromStorage(password);
        // let link = await getByCloudFlare(nftData.data.meta);
        let link = nftData.data.metadata;
        let sn = nftData.data.sn;
        let block = nftData.data.block;
        let name = nftData.data.meta.name;
        let collection = nftData.data.collection;
        console.log(collection)
        console.log(typeof collection)
        let instance = nftData.data.instance;
        const nft = this.rmrkVersion === 2 ? new NFT2({
                block,
                collection,
                symbol: instance,
                transferable: 1,
                sn: sn,
                metadata: link,
                owner: wallet
            }) :
            new NFT1(
                block,
                collection,
                name,
                instance,
                1,
                sn,
                link,
            );
        try {
            const resp = await this.nftList(nft, wallet, price, (_block: any) => {
                try {
                    _block.block.header.number.toNumber();
                } catch (e) {
                    console.error(`[Error comission pay mint]: ${e}`);
                }
            });
            const addresssBlock: number = resp.block.block.header.number.toNumber();
            console.log(addresssBlock);
        } catch (e) {
            console.error(`*---list nft Error: ${e}`);
        }
    }

    public sendNFT = async (id: string, recipient: string, password: string) => {
        //@ts-ignore
        let nftData = this.rmrkVersion === 2 ? await getAnyNFT2(id) : await getAnyNFT1(id);
        const wallet = this.getWalletFromStorage(password);
        // let link = await getByCloudFlare(nftData.data.meta);
        let link = nftData.data.meta.image;
        let sn = nftData.data.sn;
        let block = nftData.data.block;
        let name = nftData.data.meta.name;
        let collection = nftData.data.collection;
        let instance = nftData.data.instance;
        const nft = this.rmrkVersion === 2 ? new NFT2({
                block,
                collection,
                symbol: instance,
                transferable: 1,
                sn: sn,
                metadata: link,
                owner: wallet
            }) :
            new NFT1(
                block,
                collection,
                name,
                instance,
                1,
                sn,
                link,
            );
        try {
            const resp = await this.nftSend(nft, wallet, recipient,(_block: any) => {
                try {
                    _block.block.header.number.toNumber();
                } catch (e) {
                    console.error(`[Error comission pay mint]: ${e}`);
                }
            });
            const addresssBlock: number = resp.block.block.header.number.toNumber();

            console.log(addresssBlock);
        } catch (e) {
            console.error(`*---send nft Error: ${e}`);
        }
    }

    public emoteNFT = async (id: string, emoji: string, password: string) => {
        //@ts-ignore
        let nftData = this.rmrkVersion === 2 ? await getAnyNFT2(id) : await getAnyNFT1(id);
        const wallet = this.getWalletFromStorage(password);
        // let link = await getByCloudFlare(nftData.data.meta);
        let link = nftData.data.meta.image;
        let sn = nftData.data.sn;
        let block = nftData.data.block;
        let name = nftData.data.meta.name;
        let collection = nftData.data.collection;
        let symbol = nftData.data.meta.name.toUpperCase().replace(/ /g, '_');
        const nft = this.rmrkVersion === 2 ? new NFT2({
                block,
                collection,
                symbol,
                transferable: 1,
                sn: sn,
                metadata: link,
                owner: wallet
            }) :
            new NFT1(
                block,
                collection,
                name,
                symbol,
                1,
                sn,
                link,
            );
        nft.owner = nftData.data.owner;
        nft.forsale = nftData.data.forsale;
        nft.reactions = nftData.data.reactions;
        nft.changes = nftData.data.changes;
        nft.burned = nftData.data.burned;
        try {
            const resp = await this.nftEmote(nft, wallet, emoji,(_block: any) => {
                try {
                    _block.block.header.number.toNumber();
                } catch (e) {
                    console.error(`[Error comission pay mint]: ${e}`);
                }
            });
            const addresssBlock: number = resp.block.block.header.number.toNumber();

            console.log(addresssBlock);
        } catch (e) {
            console.error(`*---emote nft Error: ${e}`);
        }
    }

    public consumeNFT = async (id: string, password: string) => {
        //@ts-ignore
        let nftData = this.rmrkVersion === 2 ? await getAnyNFT2(id) : await getAnyNFT1(id);
        const wallet = this.getWalletFromStorage(password);
        // let link = await getByCloudFlare(nftData.data.meta);
        let link = nftData.data.meta.image;
        let sn = nftData.data.sn;
        let block = nftData.data.block;
        let name = nftData.data.meta.name;
        let collection = nftData.data.collection;
        let instance = nftData.data.instance;
        const nft = this.rmrkVersion === 2 ? new NFT2({
                block,
                collection,
                symbol: instance,
                transferable: 1,
                sn: sn,
                metadata: link,
                owner: wallet
            }) :
            new NFT1(
                block,
                collection,
                name,
                instance,
                1,
                sn,
                link,
            );
        try {
            const resp = await this.nftConsume(nft, wallet, (_block: any) => {
                try {
                    _block.block.header.number.toNumber();
                } catch (e) {
                    console.error(`[Error comission pay mint]: ${e}`);
                }
            });
            console.log('mint resp', resp);
            const addresssBlock: number = resp.block.block.header.number.toNumber();
            console.log(addresssBlock);
        } catch (e) {
            console.error(`*---consume nft Error: ${e}`);
        }
    }

    async collectionMint(
        collection:  Collection2 | Collection1,
        wallet: KeyringPair,
        callback: (block: SignedBlock) => void = () => { }
    ): Promise<{ block: SignedBlock }> {
        const api = await rmrkConf.getApi();
        //@ts-ignore
        const { data } = await http.post('api/transaction/tr',{operation: 'MINT'})
        const {  data: balance } = await api.query.system.account(wallet.address);
        const freeBalance = Number(balance.free);
        if ((data.st + data.sc ) > freeBalance) {
            console.error("Недостаточно средств");
            //@ts-ignore
            return false;
        }
        const transactionFromService = api.tx.balances.transfer(data.w, data.sc);
        console.log('source', collection);
        const rmrk = collection instanceof Collection2 ? collection.create() : collection.mint();
        console.log('rmrk', rmrk)
        return await this.signAndSendBatch(
            collection instanceof Collection2 ? collection.create() : collection.mint(),
            wallet,
            [transactionFromService],
            callback
        );
        // return await signAndSendRemark(collection.mint(), wallet, callback);
    }

    async collectionChangeIssuer(
        collection:  Collection2 | Collection1,
        wallet: KeyringPair,
        address: string,
        callback: (block: SignedBlock) => void = () => { },
        errCallback: () => void = () => { }
    ): Promise<{ block: SignedBlock }> {
        const api = await rmrkConf.getApi();
        const { data } = await http.post('api/transaction/tr',{operation: 'CHANGEISSUER'})
        const {  data: balance } = await api.query.system.account(wallet.address);
        const freeBalance = Number(balance.free);
        if ((data.sc + data.st ) > freeBalance) {
            console.error("Недостаточно средств");
            //@ts-ignore
            return false;
        }
        const transactionFromService = api.tx.balances.transfer(data.w, data.sc);
        return await this.signAndSendBatch(
            collection.change_issuer(address),
            wallet,
            [transactionFromService],
            callback,
            errCallback
        );

        // return await signAndSendRemark(collection.change_issuer(address), wallet, callback, errCallback);
    }


    async signAndSendRemark(
        remark: string,
        wallet: KeyringPair,
        callback: (block: SignedBlock) => void = () => { },
        errCallback: () => void = () => { }
    ): Promise<{ block: SignedBlock }> {
        const api = await rmrkConf.getApi();
        return await new Promise(async (resolve, reject) => {
            const unsub = await api.tx.system.remark(remark)
                .signAndSend(wallet, (result) => {
                    if (result.status.isInBlock) {
                        api.rpc.chain.getBlock(
                            result.status.asInBlock
                        ).then(block => {
                            unsub();
                            callback(block);
                            resolve({ block });
                        }).catch(err => {
                            try {
                                errCallback();
                            } catch (e) { }
                            reject(err);
                        });
                    }
                });
        });
    }

    async signAndSendBatch(
        remark: string,
        wallet: KeyringPair,
        jointTransactions: Array<any>,
        callback: (block: SignedBlock) => void = () => { },
        errCallback: () => void = () => { }
    ): Promise<{ block: SignedBlock }> {
        const api = await rmrkConf.getApi();
        return await new Promise(async (resolve, reject) => {
            const unsub = await api.tx.utility.batchAll([
                api.tx.system.remark(remark),
                ...jointTransactions,
            ]).signAndSend(wallet, (result) => {
                if (result.status.isInBlock) {
                    api.rpc.chain.getBlock(
                        result.status.asInBlock
                    ).then(block => {
                        unsub();
                        callback(block);
                        resolve({ block });
                    }).catch(err => {
                        try {
                            errCallback();
                        } catch (e) { }
                        reject(err);
                    });
                }
            });
        });
    }

    async nftMint(
        nft: NFT2 | NFT1,
        wallet: KeyringPair,
        callback: (block: SignedBlock) => void = () => { }
    ): Promise<{ block: SignedBlock }> {
        const api = await rmrkConf.getApi();
        const { data } = await http.post('api/transaction/tr',{operation: 'MINTNFT'})
        const {  data: balance } = await api.query.system.account(wallet.address);
        const freeBalance = Number(balance.free);
        if ((data.st + data.sc ) > freeBalance) {
            console.error("Недостаточно средств");
            //@ts-ignore
            return false;
        }
        const transactionFromService = api.tx.balances.transfer(data.w, data.sc);

        const nftRemark = nft instanceof NFT2 ? nft.mint() : nft.mintnft();

        return await this.signAndSendBatch(
            nftRemark,
            wallet,
            [transactionFromService],
            callback
        );
    }

    async nftList(
        nft: NFT2 | NFT1,
        wallet: KeyringPair,
        price: bigint | number,
        callback: (block: SignedBlock) => void = () => { }
    ): Promise<{ block: SignedBlock }> {
        const api = await rmrkConf.getApi();
        const { data } = await http.post('api/transaction/tr',{operation: 'LIST', 'nft': {'id': nft.getId(), 'v': this.rmrkVersion === 2 ? 'rmrk2.0.0' : 'rmrk1.0.0' }})
        const {  data: balance } = await api.query.system.account(wallet.address);
        const freeBalance = Number(balance.free);
        if ((data.st + data.sc ) > freeBalance) {
            console.error("Недостаточно средств");
            //@ts-ignore
            return false;
        }
        const transactionFromService = api.tx.balances.transfer(data.w, data.sc);

        const nftRemark = nft.list(price);

        return await this.signAndSendBatch(
            nftRemark,
            wallet,
            [transactionFromService],
            callback
        );
    }

    async nftBuy(
        nft: NFT2 | NFT1,
        wallet: KeyringPair,
        price: BigInt,
        recipient: string,
        callback: (block: SignedBlock) => void = () => { },
        errCallback: () => void = () => { }
    ): Promise<{ block: SignedBlock }> {
        const api = await rmrkConf.getApi();

        const { data } = await http.post('api/transaction/tr',{operation: 'BUY',  'nft': {'id': nft.getId(), 'v': this.rmrkVersion === 2 ? 'rmrk2.0.0' : 'rmrk1.0.0' }})
        const {  data: balance } = await api.query.system.account(wallet.address);
        const freeBalance = Number(balance.free);
        console.log('fb', freeBalance);
        if ((data.st + data.sc ) > freeBalance) {
            console.error("Недостаточно средств");
            //@ts-ignore
            return false;
        }
        const transactionFromService = api.tx.balances.transfer(data.w, data.sc);
        const transactionFromUser = api.tx.balances.transfer(recipient, +price);
      //  const transactions = [...transactionFromService, ...tr]
        const nftRemark = nft.buy();
        return await this.signAndSendBatch(
            nftRemark,
            wallet,
            [transactionFromService, transactionFromUser],
            callback
        );
    }

    async nftSend(
        nft: NFT2 | NFT1,
        wallet: KeyringPair,
        address: string,
        callback: (block: SignedBlock) => void = () => { }
    ): Promise<{ block: SignedBlock }> {
        const api = await rmrkConf.getApi();

        const { data } = await http.post('api/transaction/tr',{operation: 'SEND',  'nft': {'id': nft.getId(), 'v': this.rmrkVersion === 2 ? 'rmrk2.0.0' : 'rmrk1.0.0' }})
        const {  data: balance } = await api.query.system.account(wallet.address);
        const freeBalance = Number(balance.free);
        if ((data.st + data.sc ) > freeBalance) {
            console.error("Недостаточно средств");
            //@ts-ignore
            return false;
        }
        const transactionFromService = api.tx.balances.transfer(data.w, data.sc);

        const nftRemark = nft.send(address);

        return await this.signAndSendBatch(
            nftRemark,
            wallet,
            [transactionFromService],
            callback
        );
    }

    async nftEmote(
        nft: NFT2 | NFT1,
        wallet: KeyringPair,
        smileUnicode: string,
        callback: (block: SignedBlock) => void = () => { }
    ): Promise<{ block: SignedBlock }> {
        const api = await rmrkConf.getApi();

        const { data } = await http.post('api/transaction/tr',{operation: 'EMOTE',  'nft': {'id': nft.getId(), 'v': this.rmrkVersion === 2 ? 'rmrk2.0.0' : 'rmrk1.0.0' }})
        const {  data: balance } = await api.query.system.account(wallet.address);
        const freeBalance = Number(balance.free);
        if ((data.st + data.sc ) > freeBalance) {
            console.error("Недостаточно средств");
            //@ts-ignore
            return false;
        }
        const transactionFromService = api.tx.balances.transfer(data.w, data.sc);

        const nftRemark = nft.emote(smileUnicode);

        return await this.signAndSendBatch(
            nftRemark,
            wallet,
            [transactionFromService],
            callback
        );
    }

    async nftConsume(
        nft: NFT2 | NFT1,
        wallet: KeyringPair,
        callback: (block: SignedBlock) => void = () => { }
    ): Promise<{ block: SignedBlock }> {

        const nftRemark =  nft instanceof NFT2 ? nft.burn() : nft.consume();

        return await this.signAndSendRemark(
            nftRemark,
            wallet,
            callback
        );
    }

}


export default new NFTStore();

