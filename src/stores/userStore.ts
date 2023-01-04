import {
    setSessionDuration,
    getWallets,
    getFolder,
    setNewFolder,
    deleteFile,
    deleteFolder,
    renameFolder, getFileStorageInfo, replaceStorageInfo, getMyProfile
} from './../requests/axiosRequests';
import {runInAction, makeAutoObservable} from 'mobx';

import {IWalletsInterface,  ISingleWallet } from '../interfaces/WalletsInterface';
import { IFileList } from "../interfaces/FIleInterface";
import React from "react";
import {setToastInfo, setToastSuccess} from "../settings/utils";

class UserStore {

    constructor() {
        makeAutoObservable(this)
    }

    wallets: IWalletsInterface = {
        id: '',
        addressesList: [{
            name: '',
            address: '',
            type: '',
            balance: 0,
            makeDefault: false
        }]
    }

    currentFolder = {
        id: ''
    }

    priceUSD = 0

    files: IFileList = {
        data : [
            {
                "id": 0,
                "type": '',
                "name": "",
                "cid": "",
                "createdAt": "",
                "cidInfo": {
                    "cid": "",
                    "latestPushedStorageConfig": {},
                    "currentStorageInfo": {
                        "jobId": "",
                        "cid": "",
                        "created": "",
                        "hot": {
                            "enabled": true
                        },
                        "cold": {
                            "enabled": true,
                            "filecoin": {
                                "dataCid": 0,
                                "size": 0,
                                "proposalsList": {
                                    "dealId": 0,
                                    "renewed": true,
                                    "duration": 0,
                                    "startEpoch": 0,
                                    "miner": "",
                                    "epochPrice": 0,
                                    "pieceCid": ""
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

    user = {
        address: "",
        username: "",
        avatar: 'url',
        background: 'url'
    }

    section2 = false
    section3 = false
    section4 = false
    mnemoNew = [""]
    shuffledMnemo = [""]
    checkedMnemo = [""]

    shuffleMnemonic = (mnemo : string) => {
        let mnemonicArray = mnemo.split(' ');
        let currentIndex = mnemonicArray.length, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [mnemonicArray[currentIndex], mnemonicArray[randomIndex]] = [
                mnemonicArray[randomIndex], mnemonicArray[currentIndex]];
        }
        runInAction(() => {
            this.shuffledMnemo = mnemonicArray
        })
    }

    setSection(number: number) {
        if (number === 2) {
            runInAction(() => {
                this.section2 = true;
                this.section3 = false;
                this.section4 = false;
                this.checkedMnemo = [""];
            })
        } else if (number === 3) {
            runInAction(() => {
                this.section2 = false;
                this.section3 = true;
                this.section4 = false;
            })
        } else if (number === 4) {
            runInAction(() => {
                this.section2 = false;
                this.section3 = false;
                this.section4 = true;
            })
        }


    }

    async getMyInfo() {
        try {
            let user = await getMyProfile();
            console.log(user.data)
            runInAction(() => {
                this.user = user.data;
            })
        }
        catch (e) {
            console.log(e);
        }
    }


     async getUSD() {
         let { price } = JSON.parse(await (await fetch('https://api3.binance.com/api/v3/avgPrice?symbol=KSMUSDT')).text())
         runInAction(() => {
             this.priceUSD = price;
         })

    }


    setId(id: string) {
        runInAction(() => {
            this.wallets.id = id;
        })

    }

    setCurrentFolder(id: string) {
        runInAction(() => {
            this.currentFolder.id = id;
        })

    }

    addWallet(wallet: ISingleWallet) {
        runInAction(() => {
            this.wallets.addressesList.push(wallet)
        })
    }

    setSessionDuration(data: object) {
        return setSessionDuration(data).then((res) => {}, () => {})
    }

    getWalletList = async () => {
        try {
            let res = await getWallets();
            runInAction(() => {
                this.wallets.id = res.data.id;
                this.wallets.addressesList = res.data.addressesList;
            })
        }
         catch (e) {
            console.log(e);
             let res = await getWallets();
             runInAction(() => {
                 this.wallets.id = res.data.id;
                 this.wallets.addressesList = res.data.addressesList;
             })

         }
    }

    async getFileStorageInfo(cid: string) {
        try {
            let res = await getFileStorageInfo({ cid: cid });
            console.log(res)
            return res;
        }
        catch (e) {
            console.log(e)
        }
    }


    async getFolderList() {
        let files = await getFolder(this.currentFolder.id);
        runInAction(() => {
            this.files.data = files.data.subFolder;
        })
      //  return files;
        return;
    }

    async setNewFolder(name: string, parentId: any = undefined) {
        try {
            let files = await setNewFolder({name: name, parentId: parentId});
            setToastSuccess('Папка создана!')
            return files;
        }
        catch (e) {
            console.log(e);
        }
    }

    async renameFolder(name: string, id: number) {
        let newFile = await renameFolder({name: name, id: id});
        return newFile;
    }

    deleteFile(cid: string) {
        deleteFile({'cid': cid}).then((res) => {
            setToastInfo('Файл удалён!')
            this.getFolderList();
        }, (err) => {console.log(err)});
    }

    deleteFolder(id: string) {
        deleteFolder({'id': id}).then((res) => {
            setToastInfo('Папка удалена!')
            this.getFolderList();
        }, (err) => {console.log(err)});
    }

    replaceStorageInfo(config: object) {
        return replaceStorageInfo(config)
    }

}

export interface IUserStore extends UserStore {};
export default new UserStore();
const AuthContext = React.createContext(new UserStore());
export const useAuthContext = () => React.useContext(AuthContext);
