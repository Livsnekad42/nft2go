import React from 'react';
import userStore from "../stores/userStore";
import { getFile } from "../requests/axiosRequests";
import {observer} from "mobx-react";
import rmrkStore from "../stores/rmrkStore";
import {toJS} from "mobx";
import history from "../settings/history";
import {Link} from "react-router-dom";
import { publicIP} from "../settings/utils";
var mime = require('mime-types');
const MyNFT = observer(
    class NFTs extends React.Component {

        constructor(props:any) {
            super(props);

            this.saveByteArray = this.saveByteArray.bind(this);
            this.downloadFile = this.downloadFile.bind(this);
            this.handlerName = this.handlerName.bind(this);
            this.addNewFolder = this.addNewFolder.bind(this);
            this.deleteFile = this.deleteFile.bind(this);
            this.deleteFolder = this.deleteFolder.bind(this);
            this.refreshPage = this.refreshPage.bind(this);
            this.renameFolder = this.renameFolder.bind(this);
            this.replaceStorageInfo = this.replaceStorageInfo.bind(this);
            this.getInfo = this.getInfo.bind(this);
            this.getExtension = this.getExtension.bind(this);
            this.makeNFT = this.makeNFT.bind(this);
        }

        result: Array<object> = [];

        state = {
            name: '',
            parentId: undefined,
            newName: ''
        }

        componentDidMount() {
            userStore.getFolderList();

            //   this.setState(this.props.userStore.files);
            // console.log(this.props.userStore.files)
        }

        saveByteArray = (function () {
            let a = document.createElement("a");
            document.body.appendChild(a);
            // a.style = "display: none";
            return function (data: any, name: any) {
                let blob = new Blob(data, {type: "octet/stream"}),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = name;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());


   /*     downloadFile(_file: any) {
            console.log(_file);
            getFile( _file.cid).then((response) => {
                const byteNumbers = new Uint8Array(response.data.content.data);
                const url = window.URL.createObjectURL(new Blob([byteNumbers]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', _file.name); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
        }
*/
        downloadFile(_file: any) {
            console.log(_file);
            getFile( _file.cid).then((response) => {
                const byteNumbers = new Uint8Array(response.data.content.data);
                const url = window.URL.createObjectURL(new Blob([byteNumbers]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', _file.name); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
        }


        deleteFile(_file: any) {
            userStore.deleteFile(_file.cid);
        }

        deleteFolder(_folder: any) {
            userStore.deleteFolder(_folder.id);
        }


        async addNewFolder(event: React.MouseEvent<HTMLButtonElement>) {
            event.preventDefault();
            try {
                let newFolder = await userStore.setNewFolder(this.state.name, userStore.currentFolder.id);
                this.setState({ name: ''})
                userStore.getFolderList();
                return newFolder;
            }
            catch (e) {
                console.log(e);
            }
        }

        getExtension = (string: string, prevExt = ''): string => {
            let ext = mime.extension(mime.contentType(string));
            console.log(string);
            console.log(ext);
            let newString = string.substring(0, string.lastIndexOf('.'));
            return ext ? this.getExtension(newString, '.' + ext + prevExt) : prevExt
        }

        renameFolder(event: React.MouseEvent<HTMLButtonElement>, name : string, baseName: string, id: number) {
            let ext = this.getExtension(baseName)
            console.log('rename', ext)
            event.preventDefault();
            userStore.renameFolder(name + ext, id).then(() => {
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                userStore.getFolderList();
            })

        }

        handlerName(event: React.ChangeEvent<HTMLInputElement>) {
            this.setState({
                name: event.target.value,
                parentId: this.state.parentId
            });
        }


        refreshPage(id: string) {
            console.log('id', id);
            userStore.setCurrentFolder(id);
            userStore.getFolderList();
        }

        async makeNFT(name: string, cid: string) {
            try {
                let cidInfo = await this.getInfo(cid);
                let cidHash = await cidInfo?.data.cidInfo.cid;
                let formattedURL = `https://${publicIP}/ipfs/${cidHash}`;
                rmrkStore.mintedNFT.nft.metadata.image = formattedURL;
                rmrkStore.mintedNFT.currentCid = cidHash;
                console.log(toJS(rmrkStore.mintedNFT));
                history.push('/profile/rmrk/addMeta')
            }
            catch (e) {
                console.log(e);
            }

        }

        async getInfo(cid: string) {
            let data  = await userStore.getFileStorageInfo(cid);
            return data;
        }

        replaceStorageInfo(config: object) {
            userStore.replaceStorageInfo(config).then(() => userStore.getFolderList()).catch(e => console.log(e))
        }

        render() {

            return (
                <div>
                    {!!rmrkStore.singleNFTResponse.id &&
                    <div className='rmrk-coll' key={rmrkStore.singleNFTResponse.id}>
                        <h2>{rmrkStore.singleNFTResponse.name}</h2>
                        <p>ID: {rmrkStore.singleNFTResponse.id}</p>
                        <p>RMRK ID: {rmrkStore.singleNFTResponse.instance}</p>
                        <img src={rmrkStore.singleNFTResponse.metadata} alt="" className='rmrk-img'></img>

                        <Link to={'/nfts/collections/' + rmrkStore.singleNFTResponse.collectionData.id}>
                            <p> Коллекция: {rmrkStore.singleNFTResponse.collectionData.id}</p>
                        </Link>
                    </div>
                    }
                </div>
            )
        }
    }
)


export default MyNFT;
