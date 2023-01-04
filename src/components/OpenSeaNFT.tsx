import React from 'react';
import userStore from "../stores/userStore";
import {observer} from "mobx-react";
import rmrkStore from "../stores/rmrkStore";
import * as H from "history";
import { Link } from "react-router-dom";
import FormDialog from "./Popups";
import NFTGraphPrice from "./NFTGraphPrice";
import ModelViewer from 'react-model-viewer';
import openseaStore from "../stores/openseaStore";
export interface IRouteComponentProps<P> {
    match: IMatch<P>;
    location: H.Location;
    history: H.History;
    staticContext?: any;
}

export interface IMatch<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

interface IState {
    isOpenBuy: boolean,
    isOpenEmote: boolean,
    isOpenSend: boolean,
    isOpenList: boolean,
    isOpenConsume: boolean,
    activeNFT: string
}

const OpenSeaNFT = observer(
    class NFTs extends React.Component<IRouteComponentProps<any>, IState> {

        constructor(props:any) {
            super(props);
            // this.handlerName = this.handlerName.bind(this);
            this.getInfo = this.getInfo.bind(this);
            //  this.makeNFT = this.makeNFT.bind(this);
            this.state = {
                isOpenBuy: false,
                isOpenEmote: false,
                isOpenSend: false,
                isOpenList: false,
                isOpenConsume: false,
                activeNFT: ''
            }
        }

        handleOpenSend = (event: React.MouseEvent<HTMLButtonElement>, nftID: string) => {
            event.preventDefault();
            this.setState({ isOpenSend: !this.state.isOpenSend, activeNFT : nftID});
        };

        handleOpenBuy = (event: React.MouseEvent<HTMLButtonElement>, nftID: string) => {
            event.preventDefault();
            this.setState({isOpenBuy : !this.state.isOpenBuy, activeNFT : nftID});
        };

        handleOpenEmote = (event: React.MouseEvent<HTMLButtonElement>, nftID: string) => {
            event.preventDefault();
            this.setState({isOpenEmote : !this.state.isOpenEmote, activeNFT : nftID});
        };

        handleOpenList = (event: React.MouseEvent<HTMLButtonElement>, nftID: string) => {
            event.preventDefault();
            this.setState({isOpenList : !this.state.isOpenList, activeNFT : nftID});
        };

        handleOpenConsume = (event: React.MouseEvent<HTMLButtonElement>, nftID: string) => {
            event.preventDefault();
            this.setState({isOpenConsume : !this.state.isOpenConsume, activeNFT : nftID});
        };

        currID = this.props.match.params.id;

        sliderSettings = {
            nav: true,
            mouseDrag: true,
            items: 1,
            fixedWidth: 222,
            gutter: 10,
            center: true,
            responsive: {
                1024: {
                    items: 5
                },
                768: {
                    items: 4
                },
                480: {
                    items:2
                }
            }
        };


        result: Array<object> = [];

        componentDidMount() {
            openseaStore.getSingleNFT(this.currID);
            userStore.getUSD();
        }
        /*
                handlerName(event: React.ChangeEvent<HTMLInputElement>) {
                    this.setState({
                        name: event.target.value,
                        parentId: this.state.parentId
                    });
                }



                async makeNFT(name: string, cid: string) {
                    try {
                        let cidInfo = await this.getInfo(cid);
                        let cidHash = await cidInfo?.data.cidInfo.cid;
                        let formattedURL = `http://${publicIP}/${cidHash}`;
                        rmrkStore.mintedNFT.nft.metadata.image = formattedURL;
                        rmrkStore.mintedNFT.currentCid = cidHash;
                        console.log(toJS(rmrkStore.mintedNFT));
                        history.push('/profile/rmrk/addMeta')
                    }
                    catch (e) {
                        console.log(e);
                    }

                }
        */
        async getInfo(cid: string) {
            let data  = await userStore.getFileStorageInfo(cid);
            return data;
        }

        getCryptoPrice(val: number) {
            let interimPrice = String(val / 1000000000000)
            let currentPrice = (interimPrice.length <= 6) ? interimPrice : interimPrice.slice(0, 5)
            return currentPrice
        }

        getRandomAttributes(val: number) {
            return Math.floor(Math.random() * (val - 1)) + 1;
        }

        render() {
            // @ts-ignore
            // @ts-ignore
            // @ts-ignore
            return (
                <>
                    {!!rmrkStore.singleNFTResponse &&
                        <section className="bg-half-100 w-100 pt-5">
                            <div className="container">
                                <div className="row mt-1 mb-5">
                                    <div className="col-md-6">
                                        <div className="position-relative">
                                            {openseaStore.openseaNFT ?
                                                <img src={openseaStore.openseaNFT.image_url} className="img-fluid rounded-md shadow-md" alt=""/>  : <></>}
                                            <div className="position-absolute top-0 start-0 mt-3 ms-3">

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mt-4 mt-sm-0 pt-5">
                                        <div className="ms-lg-4">
                                            <div className="row mb-4">
                                                <div className="d-flex align-items-center col-12 col-md-6">
                                                    <p className="nft-text">Владелец:&nbsp;</p>
                                                    <Link to="#" className="d-flex align-items-center nft-text-value">
                                                        {openseaStore.openseaNFT.ownerAddress && openseaStore.openseaNFT.ownerAddress.length <= 15 ?
                                                            openseaStore.openseaNFT.ownerAddress : openseaStore.openseaNFT.ownerAddress && openseaStore.openseaNFT.ownerAddress.slice(0, 14) + '...'}
                                                        <div className="nft-icon-right">
                                                            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M21.9703 13.7401C21.5995 13.2282 21.3998 12.6122 21.3998 11.9801C21.3998 11.348 21.5995 10.732 21.9703 10.2201L22.7303 9.17009C22.8232 9.04188 22.8844 8.89343 22.9087 8.73696C22.9331 8.58049 22.9199 8.42048 22.8703 8.27009C22.8202 8.12128 22.7364 7.98608 22.6253 7.87505C22.5143 7.76403 22.3791 7.68019 22.2303 7.63009L21.0003 7.23009C20.3978 7.03573 19.8726 6.65494 19.5005 6.14269C19.1284 5.63043 18.9288 5.01321 18.9303 4.38009V3.08009C18.9302 2.92226 18.8927 2.76669 18.8209 2.62612C18.7492 2.48554 18.6451 2.36395 18.5174 2.27129C18.3896 2.17863 18.2417 2.11753 18.0858 2.09299C17.9299 2.06845 17.7704 2.08116 17.6203 2.13009L16.3803 2.53009C15.7783 2.72489 15.1301 2.72437 14.5285 2.5286C13.9268 2.33283 13.4024 1.95184 13.0303 1.44009L12.2703 0.390093C12.1733 0.268401 12.05 0.170138 11.9098 0.102604C11.7696 0.0350698 11.6159 0 11.4603 0C11.3047 0 11.151 0.0350698 11.0108 0.102604C10.8705 0.170138 10.7473 0.268401 10.6503 0.390093L9.8903 1.44009C9.5182 1.95184 8.99382 2.33283 8.39214 2.5286C7.79046 2.72437 7.14229 2.72489 6.5403 2.53009L5.3003 2.13009C5.15024 2.08116 4.99073 2.06845 4.83481 2.09299C4.6789 2.11753 4.531 2.17863 4.40323 2.27129C4.27546 2.36395 4.17143 2.48554 4.09966 2.62612C4.02789 2.76669 3.99042 2.92226 3.9903 3.08009V4.38009C3.99183 5.01321 3.79216 5.63043 3.4201 6.14269C3.04804 6.65494 2.52284 7.03573 1.9203 7.23009L0.690299 7.63009C0.54149 7.68019 0.406287 7.76403 0.29526 7.87505C0.184234 7.98608 0.100395 8.12128 0.0502989 8.27009C0.000710461 8.42048 -0.0124558 8.58049 0.0118837 8.73696C0.0362232 8.89343 0.0973726 9.04188 0.190299 9.17009L0.950299 10.2201C1.32114 10.732 1.52081 11.348 1.52081 11.9801C1.52081 12.6122 1.32114 13.2282 0.950299 13.7401L0.190299 14.7901C0.0973726 14.9183 0.0362232 15.0668 0.0118837 15.2232C-0.0124558 15.3797 0.000710461 15.5397 0.0502989 15.6901C0.100395 15.8389 0.184234 15.9741 0.29526 16.0851C0.406287 16.1962 0.54149 16.28 0.690299 16.3301L1.9203 16.7301C2.52284 16.9245 3.04804 17.3052 3.4201 17.8175C3.79216 18.3298 3.99183 18.947 3.9903 19.5801V20.8801C3.99042 21.0379 4.02789 21.1935 4.09966 21.3341C4.17143 21.4746 4.27546 21.5962 4.40323 21.6889C4.531 21.7816 4.6789 21.8427 4.83481 21.8672C4.99073 21.8917 5.15024 21.879 5.3003 21.8301L6.5303 21.4301C7.13357 21.232 7.7842 21.2309 8.38817 21.4268C8.99215 21.6227 9.51819 22.0056 9.8903 22.5201L10.6503 23.5701C10.7437 23.6972 10.8656 23.8006 11.0064 23.8718C11.1471 23.9431 11.3026 23.9802 11.4603 23.9802C11.618 23.9802 11.7735 23.9431 11.9142 23.8718C12.055 23.8006 12.1769 23.6972 12.2703 23.5701L13.0303 22.5201C13.403 22.0063 13.9291 21.624 14.5329 21.4281C15.1366 21.2323 15.787 21.233 16.3903 21.4301L17.6203 21.8301C17.7704 21.879 17.9299 21.8917 18.0858 21.8672C18.2417 21.8427 18.3896 21.7816 18.5174 21.6889C18.6451 21.5962 18.7492 21.4746 18.8209 21.3341C18.8927 21.1935 18.9302 21.0379 18.9303 20.8801V19.5801C18.9288 18.947 19.1284 18.3298 19.5005 17.8175C19.8726 17.3052 20.3978 16.9245 21.0003 16.7301L22.2303 16.3301C22.3791 16.28 22.5143 16.1962 22.6253 16.0851C22.7364 15.9741 22.8202 15.8389 22.8703 15.6901C22.9199 15.5397 22.9331 15.3797 22.9087 15.2232C22.8844 15.0668 22.8232 14.9183 22.7303 14.7901L21.9703 13.7401ZM16.1703 10.6871L11.1703 15.6871C10.9828 15.8746 10.7285 15.9799 10.4633 15.9799C10.1981 15.9799 9.94383 15.8746 9.7563 15.6871L6.7563 12.6871C6.66079 12.5948 6.58461 12.4845 6.5322 12.3625C6.47979 12.2405 6.4522 12.1093 6.45105 11.9765C6.44989 11.8437 6.4752 11.712 6.52548 11.5891C6.57576 11.4662 6.65001 11.3546 6.7439 11.2607C6.8378 11.1668 6.94945 11.0926 7.07234 11.0423C7.19524 10.992 7.32692 10.9667 7.4597 10.9678C7.59248 10.969 7.7237 10.9966 7.8457 11.049C7.96771 11.1014 8.07805 11.1776 8.1703 11.2731L10.4603 13.5661L14.7533 9.27309C14.9419 9.09094 15.1945 8.99014 15.4567 8.99242C15.7189 8.9947 15.9697 9.09987 16.1551 9.28527C16.3405 9.47068 16.4457 9.7215 16.448 9.98369C16.4503 10.2459 16.3495 10.4985 16.1673 10.6871H16.1703Z" fill="#2C96EA"/>
                                                                <path d="M16.1703 10.6871L11.1703 15.6871C10.9828 15.8746 10.7285 15.9799 10.4633 15.9799C10.1981 15.9799 9.94383 15.8746 9.7563 15.6871L6.7563 12.6871C6.66079 12.5948 6.58461 12.4845 6.5322 12.3625C6.47979 12.2405 6.4522 12.1093 6.45105 11.9765C6.44989 11.8437 6.4752 11.712 6.52548 11.5891C6.57576 11.4662 6.65001 11.3546 6.7439 11.2607C6.8378 11.1668 6.94945 11.0926 7.07234 11.0423C7.19524 10.992 7.32692 10.9667 7.4597 10.9678C7.59248 10.969 7.7237 10.9966 7.8457 11.049C7.96771 11.1014 8.07805 11.1776 8.1703 11.2731L10.4603 13.5661L14.7533 9.27309C14.9419 9.09094 15.1945 8.99014 15.4567 8.99242C15.7189 8.9947 15.9697 9.09987 16.1551 9.28527C16.3405 9.47068 16.4457 9.7215 16.448 9.98369C16.4503 10.2459 16.3495 10.4985 16.1673 10.6871H16.1703Z" fill="white"/>
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="d-flex align-items-center col-12 col-lg-6">
                                                    <p className="nft-text">Создатель:&nbsp;</p>
                                                    <Link to="#" className="d-flex align-items-center nft-text-value">
                                                        {openseaStore.openseaNFT.creatorAddress && openseaStore.openseaNFT.creatorAddress?.length <= 15 ? openseaStore.openseaNFT.creatorAddress : openseaStore.openseaNFT.creatorAddress && openseaStore.openseaNFT.creatorAddress.slice(0, 14) + '...'}
                                                        <div className="nft-icon-right">
                                                            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M21.9703 13.7401C21.5995 13.2282 21.3998 12.6122 21.3998 11.9801C21.3998 11.348 21.5995 10.732 21.9703 10.2201L22.7303 9.17009C22.8232 9.04188 22.8844 8.89343 22.9087 8.73696C22.9331 8.58049 22.9199 8.42048 22.8703 8.27009C22.8202 8.12128 22.7364 7.98608 22.6253 7.87505C22.5143 7.76403 22.3791 7.68019 22.2303 7.63009L21.0003 7.23009C20.3978 7.03573 19.8726 6.65494 19.5005 6.14269C19.1284 5.63043 18.9288 5.01321 18.9303 4.38009V3.08009C18.9302 2.92226 18.8927 2.76669 18.8209 2.62612C18.7492 2.48554 18.6451 2.36395 18.5174 2.27129C18.3896 2.17863 18.2417 2.11753 18.0858 2.09299C17.9299 2.06845 17.7704 2.08116 17.6203 2.13009L16.3803 2.53009C15.7783 2.72489 15.1301 2.72437 14.5285 2.5286C13.9268 2.33283 13.4024 1.95184 13.0303 1.44009L12.2703 0.390093C12.1733 0.268401 12.05 0.170138 11.9098 0.102604C11.7696 0.0350698 11.6159 0 11.4603 0C11.3047 0 11.151 0.0350698 11.0108 0.102604C10.8705 0.170138 10.7473 0.268401 10.6503 0.390093L9.8903 1.44009C9.5182 1.95184 8.99382 2.33283 8.39214 2.5286C7.79046 2.72437 7.14229 2.72489 6.5403 2.53009L5.3003 2.13009C5.15024 2.08116 4.99073 2.06845 4.83481 2.09299C4.6789 2.11753 4.531 2.17863 4.40323 2.27129C4.27546 2.36395 4.17143 2.48554 4.09966 2.62612C4.02789 2.76669 3.99042 2.92226 3.9903 3.08009V4.38009C3.99183 5.01321 3.79216 5.63043 3.4201 6.14269C3.04804 6.65494 2.52284 7.03573 1.9203 7.23009L0.690299 7.63009C0.54149 7.68019 0.406287 7.76403 0.29526 7.87505C0.184234 7.98608 0.100395 8.12128 0.0502989 8.27009C0.000710461 8.42048 -0.0124558 8.58049 0.0118837 8.73696C0.0362232 8.89343 0.0973726 9.04188 0.190299 9.17009L0.950299 10.2201C1.32114 10.732 1.52081 11.348 1.52081 11.9801C1.52081 12.6122 1.32114 13.2282 0.950299 13.7401L0.190299 14.7901C0.0973726 14.9183 0.0362232 15.0668 0.0118837 15.2232C-0.0124558 15.3797 0.000710461 15.5397 0.0502989 15.6901C0.100395 15.8389 0.184234 15.9741 0.29526 16.0851C0.406287 16.1962 0.54149 16.28 0.690299 16.3301L1.9203 16.7301C2.52284 16.9245 3.04804 17.3052 3.4201 17.8175C3.79216 18.3298 3.99183 18.947 3.9903 19.5801V20.8801C3.99042 21.0379 4.02789 21.1935 4.09966 21.3341C4.17143 21.4746 4.27546 21.5962 4.40323 21.6889C4.531 21.7816 4.6789 21.8427 4.83481 21.8672C4.99073 21.8917 5.15024 21.879 5.3003 21.8301L6.5303 21.4301C7.13357 21.232 7.7842 21.2309 8.38817 21.4268C8.99215 21.6227 9.51819 22.0056 9.8903 22.5201L10.6503 23.5701C10.7437 23.6972 10.8656 23.8006 11.0064 23.8718C11.1471 23.9431 11.3026 23.9802 11.4603 23.9802C11.618 23.9802 11.7735 23.9431 11.9142 23.8718C12.055 23.8006 12.1769 23.6972 12.2703 23.5701L13.0303 22.5201C13.403 22.0063 13.9291 21.624 14.5329 21.4281C15.1366 21.2323 15.787 21.233 16.3903 21.4301L17.6203 21.8301C17.7704 21.879 17.9299 21.8917 18.0858 21.8672C18.2417 21.8427 18.3896 21.7816 18.5174 21.6889C18.6451 21.5962 18.7492 21.4746 18.8209 21.3341C18.8927 21.1935 18.9302 21.0379 18.9303 20.8801V19.5801C18.9288 18.947 19.1284 18.3298 19.5005 17.8175C19.8726 17.3052 20.3978 16.9245 21.0003 16.7301L22.2303 16.3301C22.3791 16.28 22.5143 16.1962 22.6253 16.0851C22.7364 15.9741 22.8202 15.8389 22.8703 15.6901C22.9199 15.5397 22.9331 15.3797 22.9087 15.2232C22.8844 15.0668 22.8232 14.9183 22.7303 14.7901L21.9703 13.7401ZM16.1703 10.6871L11.1703 15.6871C10.9828 15.8746 10.7285 15.9799 10.4633 15.9799C10.1981 15.9799 9.94383 15.8746 9.7563 15.6871L6.7563 12.6871C6.66079 12.5948 6.58461 12.4845 6.5322 12.3625C6.47979 12.2405 6.4522 12.1093 6.45105 11.9765C6.44989 11.8437 6.4752 11.712 6.52548 11.5891C6.57576 11.4662 6.65001 11.3546 6.7439 11.2607C6.8378 11.1668 6.94945 11.0926 7.07234 11.0423C7.19524 10.992 7.32692 10.9667 7.4597 10.9678C7.59248 10.969 7.7237 10.9966 7.8457 11.049C7.96771 11.1014 8.07805 11.1776 8.1703 11.2731L10.4603 13.5661L14.7533 9.27309C14.9419 9.09094 15.1945 8.99014 15.4567 8.99242C15.7189 8.9947 15.9697 9.09987 16.1551 9.28527C16.3405 9.47068 16.4457 9.7215 16.448 9.98369C16.4503 10.2459 16.3495 10.4985 16.1673 10.6871H16.1703Z" fill="#2C96EA"/>
                                                                <path d="M16.1703 10.6871L11.1703 15.6871C10.9828 15.8746 10.7285 15.9799 10.4633 15.9799C10.1981 15.9799 9.94383 15.8746 9.7563 15.6871L6.7563 12.6871C6.66079 12.5948 6.58461 12.4845 6.5322 12.3625C6.47979 12.2405 6.4522 12.1093 6.45105 11.9765C6.44989 11.8437 6.4752 11.712 6.52548 11.5891C6.57576 11.4662 6.65001 11.3546 6.7439 11.2607C6.8378 11.1668 6.94945 11.0926 7.07234 11.0423C7.19524 10.992 7.32692 10.9667 7.4597 10.9678C7.59248 10.969 7.7237 10.9966 7.8457 11.049C7.96771 11.1014 8.07805 11.1776 8.1703 11.2731L10.4603 13.5661L14.7533 9.27309C14.9419 9.09094 15.1945 8.99014 15.4567 8.99242C15.7189 8.9947 15.9697 9.09987 16.1551 9.28527C16.3405 9.47068 16.4457 9.7215 16.448 9.98369C16.4503 10.2459 16.3495 10.4985 16.1673 10.6871H16.1703Z" fill="white"/>
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <h1 className="mb-4">{openseaStore.openseaNFT.name}</h1>
                                            <div className="row mb-5">
                                                <div className="d-flex col-6 col-md-4">
                                                    <div className="nft-icon-left">
                                                        <svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.6591 9.25044C17.6591 10.3656 17.2161 11.435 16.4276 12.2235C15.6391 13.012 14.5697 13.455 13.4545 13.455C12.3394 13.455 11.27 13.012 10.4815 12.2235C9.69298 11.435 9.25 10.3656 9.25 9.25044C9.25 8.13533 9.69298 7.06589 10.4815 6.27738C11.27 5.48888 12.3394 5.0459 13.4545 5.0459C14.5697 5.0459 15.6391 5.48888 16.4276 6.27738C17.2161 7.06589 17.6591 8.13533 17.6591 9.25044Z" fill="#7982F2"/>
                                                            <path d="M0 9.25C0 9.25 5.04545 0 13.4545 0C21.8636 0 26.9091 9.25 26.9091 9.25C26.9091 9.25 21.8636 18.5 13.4545 18.5C5.04545 18.5 0 9.25 0 9.25ZM13.4545 15.1364C15.0157 15.1364 16.5129 14.5162 17.6168 13.4123C18.7207 12.3084 19.3409 10.8112 19.3409 9.25C19.3409 7.68884 18.7207 6.19162 17.6168 5.08771C16.5129 3.98381 15.0157 3.36364 13.4545 3.36364C11.8934 3.36364 10.3962 3.98381 9.29226 5.08771C8.18835 6.19162 7.56818 7.68884 7.56818 9.25C7.56818 10.8112 8.18835 12.3084 9.29226 13.4123C10.3962 14.5162 11.8934 15.1364 13.4545 15.1364V15.1364Z" fill="#7982F2"/>
                                                        </svg>
                                                    </div>
                                                    <p className="nft-text">{openseaStore.openseaNFT.countViews} просмотров</p>
                                                </div>
                                                <div className="d-flex col-6">
                                                    <div className="nft-icon-left">
                                                        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 1.83967C19.4346 -4.54711 36.7725 6.62905 12.5 21C-11.7725 6.63045 5.56544 -4.54711 12.5 1.83967Z" fill="#7982F2"/>
                                                        </svg>
                                                    </div>
                                                    <p className="nft-text">1496 лайков</p>
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <div className="d-flex align-items-center">

                                                </div>
                                                <p className="nft-text">
                                                    Роялти создателя <b>10%</b>
                                                </p>
                                            </div>
                                            {/* && !!rmrkStore.rmrkWallet.wallet */}
                                            {!!rmrkStore.rmrkWallet.wallet && <div className="row">
                                                <div className="col-12 col-lg-7">
                                                    <button className="btn mb-4 w-100 red-btn" style={{fontSize: 13}}
                                                            onClick={(e) =>this.handleOpenBuy(e, openseaStore.openseaNFT.id.toString())}>Купить NFT</button>
                                                </div>
                                            </div>}
                                            {!rmrkStore.rmrkWallet.wallet && <div className="row">
                                                <div className="col-12 col-lg-7">
                                                    <button className="btn mb-4 w-100 red-btn none-active-btn" style={{fontSize: 13}}
                                                            onClick={(e) => alert('Пожалуйста, добавьте кошелек, для продожения операции') }>Купить NFT</button>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                    {/*{authStore.data.isLoggedIn && !!rmrkStore.rmrkWallet.wallet && <div>
                                    <button className="badge rounded-pill bg-soft-primary mx-2 my-2" style={{fontSize: 13}}
                                            onClick={(e) =>this.handleOpenBuy(e, rmrkStore.singleNFTResponse.id)}>Купить</button>
                                    <button className="badge rounded-pill bg-soft-primary mx-2 my-2" style={{fontSize: 13}}
                                            onClick={(e) =>this.handleOpenSend(e, rmrkStore.singleNFTResponse.id)}>Подарить</button>
                                    <button className="badge rounded-pill bg-soft-primary mx-2 my-2" style={{fontSize: 13}}
                                            onClick={(e) =>this.handleOpenList(e, rmrkStore.singleNFTResponse.id)}>Продать</button>
                                    <button className="badge rounded-pill bg-soft-primary mx-2 my-2" style={{fontSize: 13}}
                                            onClick={(e) =>this.handleOpenConsume(e, rmrkStore.singleNFTResponse.id)}>Сжечь</button>
                                </div>}*/}
                                </div>
                            </div>
                            <div className="container">
                                <div className="nft-details-block">
                                    <div className="row">
                                        <div className="col-12 col-md-5">
                                            <section className="section-block-nft-info mb-5">
                                                <div className="d-flex mb-3 nft-info-title">
                                                    <div className="nft-icon-left">
                                                        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.998892 12H12.9989C13.2538 12.0003 13.4989 12.0979 13.6843 12.2728C13.8696 12.4478 13.9811 12.687 13.9961 12.9414C14.011 13.1958 13.9282 13.4464 13.7646 13.6418C13.601 13.8373 13.369 13.9629 13.1159 13.993L12.9989 14H0.998892C0.744012 13.9997 0.49886 13.9021 0.313524 13.7272C0.128188 13.5522 0.0166572 13.313 0.00172004 13.0586C-0.0132171 12.8042 0.0695667 12.5536 0.233157 12.3582C0.396747 12.1627 0.628796 12.0371 0.881892 12.007L0.998892 12H12.9989H0.998892ZM0.998892 8H18.9989C19.2538 8.00028 19.4989 8.09788 19.6843 8.27285C19.8696 8.44782 19.9811 8.68695 19.9961 8.94139C20.011 9.19584 19.9282 9.44638 19.7646 9.64183C19.601 9.83729 19.369 9.9629 19.1159 9.993L18.9989 10H0.998892C0.744012 9.99972 0.49886 9.90212 0.313524 9.72715C0.128188 9.55218 0.0166572 9.31305 0.00172004 9.05861C-0.0132171 8.80416 0.0695667 8.55362 0.233157 8.35817C0.396747 8.16271 0.628796 8.0371 0.881892 8.007L0.998892 8H18.9989H0.998892ZM0.998892 4H18.9989C19.2538 4.00028 19.4989 4.09788 19.6843 4.27285C19.8696 4.44782 19.9811 4.68695 19.9961 4.94139C20.011 5.19584 19.9282 5.44638 19.7646 5.64183C19.601 5.83729 19.369 5.9629 19.1159 5.993L18.9989 6H0.998892C0.744012 5.99972 0.49886 5.90212 0.313524 5.72715C0.128188 5.55218 0.0166572 5.31305 0.00172004 5.05861C-0.0132171 4.80416 0.0695667 4.55362 0.233157 4.35817C0.396747 4.16271 0.628796 4.0371 0.881892 4.007L0.998892 4H18.9989H0.998892ZM0.998892 0H18.9989C19.2538 0.000282707 19.4989 0.0978789 19.6843 0.272848C19.8696 0.447817 19.9811 0.686953 19.9961 0.941395C20.011 1.19584 19.9282 1.44638 19.7646 1.64183C19.601 1.83729 19.369 1.9629 19.1159 1.993L18.9989 2H0.998892C0.744012 1.99972 0.49886 1.90212 0.313524 1.72715C0.128188 1.55218 0.0166572 1.31305 0.00172004 1.05861C-0.0132171 0.804163 0.0695667 0.553621 0.233157 0.358168C0.396747 0.162715 0.628796 0.0371036 0.881892 0.00699997L0.998892 0H18.9989H0.998892Z" fill="#E5E5E5"/>
                                                        </svg>
                                                    </div>
                                                    <p className="nft-text">Описание</p>
                                                </div>
                                                <div className="nft-info-value">
                                                    <p className="nft-text nft-info-description">
                                                        {openseaStore.openseaNFT.description}
                                                    </p>
                                                </div>
                                            </section>
                                            <section className="section-block-nft-info mb-5">
                                                <div className="d-flex mb-3 nft-info-title">
                                                    <div className="nft-icon-left">
                                                        <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.34375 0C1.72215 0 1.12601 0.250222 0.686469 0.695621C0.24693 1.14102 0 1.74511 0 2.375V5.54167C0 6.17156 0.24693 6.77565 0.686469 7.22105C1.12601 7.66644 1.72215 7.91667 2.34375 7.91667H5.46875C6.09035 7.91667 6.68649 7.66644 7.12603 7.22105C7.56557 6.77565 7.8125 6.17156 7.8125 5.54167V2.375C7.8125 1.74511 7.56557 1.14102 7.12603 0.695621C6.68649 0.250222 6.09035 0 5.46875 0H2.34375ZM11.7188 1.58333C11.5115 1.58333 11.3128 1.66674 11.1663 1.81521C11.0198 1.96367 10.9375 2.16504 10.9375 2.375C10.9375 2.58496 11.0198 2.78633 11.1663 2.93479C11.3128 3.08326 11.5115 3.16667 11.7188 3.16667H24.2188C24.426 3.16667 24.6247 3.08326 24.7712 2.93479C24.9177 2.78633 25 2.58496 25 2.375C25 2.16504 24.9177 1.96367 24.7712 1.81521C24.6247 1.66674 24.426 1.58333 24.2188 1.58333H11.7188ZM11.7188 4.75C11.5115 4.75 11.3128 4.83341 11.1663 4.98187C11.0198 5.13034 10.9375 5.3317 10.9375 5.54167C10.9375 5.75163 11.0198 5.95299 11.1663 6.10146C11.3128 6.24993 11.5115 6.33333 11.7188 6.33333H21.0938C21.301 6.33333 21.4997 6.24993 21.6462 6.10146C21.7927 5.95299 21.875 5.75163 21.875 5.54167C21.875 5.3317 21.7927 5.13034 21.6462 4.98187C21.4997 4.83341 21.301 4.75 21.0938 4.75H11.7188ZM2.34375 11.0833C1.72215 11.0833 1.12601 11.3336 0.686469 11.779C0.24693 12.2244 0 12.8284 0 13.4583V16.625C0 17.2549 0.24693 17.859 0.686469 18.3044C1.12601 18.7498 1.72215 19 2.34375 19H5.46875C6.09035 19 6.68649 18.7498 7.12603 18.3044C7.56557 17.859 7.8125 17.2549 7.8125 16.625V13.4583C7.8125 12.8284 7.56557 12.2244 7.12603 11.779C6.68649 11.3336 6.09035 11.0833 5.46875 11.0833H2.34375ZM11.7188 12.6667C11.5115 12.6667 11.3128 12.7501 11.1663 12.8985C11.0198 13.047 10.9375 13.2484 10.9375 13.4583C10.9375 13.6683 11.0198 13.8697 11.1663 14.0181C11.3128 14.1666 11.5115 14.25 11.7188 14.25H24.2188C24.426 14.25 24.6247 14.1666 24.7712 14.0181C24.9177 13.8697 25 13.6683 25 13.4583C25 13.2484 24.9177 13.047 24.7712 12.8985C24.6247 12.7501 24.426 12.6667 24.2188 12.6667H11.7188ZM11.7188 15.8333C11.5115 15.8333 11.3128 15.9167 11.1663 16.0652C11.0198 16.2137 10.9375 16.415 10.9375 16.625C10.9375 16.835 11.0198 17.0363 11.1663 17.1848C11.3128 17.3333 11.5115 17.4167 11.7188 17.4167H21.0938C21.301 17.4167 21.4997 17.3333 21.6462 17.1848C21.7927 17.0363 21.875 16.835 21.875 16.625C21.875 16.415 21.7927 16.2137 21.6462 16.0652C21.4997 15.9167 21.301 15.8333 21.0938 15.8333H11.7188Z" fill="#E5E5E5"/>
                                                        </svg>
                                                    </div>
                                                    <p className="nft-text">Атрибуты</p>
                                                </div>
                                                <div className="nft-info-value">
                                                    <div className="row">
                                                        {rmrkStore.testAttributes && rmrkStore.testAttributes.map((attribute) => {
                                                            return (
                                                                <div className="col-12 col-md-4 mb-4">
                                                                    <div className="info-elem-attributes">
                                                                        <div className="info-elem-attributes-title">{attribute.key}</div>
                                                                        <div className="info-elem-attributes-name">{attribute.counts[this.getRandomAttributes(attribute.counts.length)].value}</div>
                                                                        <div className="nft-price info-elem-attributes-chance">{this.getRandomAttributes(100)}.{this.getRandomAttributes(100)}%</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </section>
                                            <section className="section-block-nft-info mb-5">
                                                <div className="d-flex mb-3 nft-info-title">
                                                    <div className="nft-icon-left">
                                                        <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.34375 0C1.72215 0 1.12601 0.250222 0.686469 0.695621C0.24693 1.14102 0 1.74511 0 2.375V5.54167C0 6.17156 0.24693 6.77565 0.686469 7.22105C1.12601 7.66644 1.72215 7.91667 2.34375 7.91667H5.46875C6.09035 7.91667 6.68649 7.66644 7.12603 7.22105C7.56557 6.77565 7.8125 6.17156 7.8125 5.54167V2.375C7.8125 1.74511 7.56557 1.14102 7.12603 0.695621C6.68649 0.250222 6.09035 0 5.46875 0H2.34375ZM11.7188 1.58333C11.5115 1.58333 11.3128 1.66674 11.1663 1.81521C11.0198 1.96367 10.9375 2.16504 10.9375 2.375C10.9375 2.58496 11.0198 2.78633 11.1663 2.93479C11.3128 3.08326 11.5115 3.16667 11.7188 3.16667H24.2188C24.426 3.16667 24.6247 3.08326 24.7712 2.93479C24.9177 2.78633 25 2.58496 25 2.375C25 2.16504 24.9177 1.96367 24.7712 1.81521C24.6247 1.66674 24.426 1.58333 24.2188 1.58333H11.7188ZM11.7188 4.75C11.5115 4.75 11.3128 4.83341 11.1663 4.98187C11.0198 5.13034 10.9375 5.3317 10.9375 5.54167C10.9375 5.75163 11.0198 5.95299 11.1663 6.10146C11.3128 6.24993 11.5115 6.33333 11.7188 6.33333H21.0938C21.301 6.33333 21.4997 6.24993 21.6462 6.10146C21.7927 5.95299 21.875 5.75163 21.875 5.54167C21.875 5.3317 21.7927 5.13034 21.6462 4.98187C21.4997 4.83341 21.301 4.75 21.0938 4.75H11.7188ZM2.34375 11.0833C1.72215 11.0833 1.12601 11.3336 0.686469 11.779C0.24693 12.2244 0 12.8284 0 13.4583V16.625C0 17.2549 0.24693 17.859 0.686469 18.3044C1.12601 18.7498 1.72215 19 2.34375 19H5.46875C6.09035 19 6.68649 18.7498 7.12603 18.3044C7.56557 17.859 7.8125 17.2549 7.8125 16.625V13.4583C7.8125 12.8284 7.56557 12.2244 7.12603 11.779C6.68649 11.3336 6.09035 11.0833 5.46875 11.0833H2.34375ZM11.7188 12.6667C11.5115 12.6667 11.3128 12.7501 11.1663 12.8985C11.0198 13.047 10.9375 13.2484 10.9375 13.4583C10.9375 13.6683 11.0198 13.8697 11.1663 14.0181C11.3128 14.1666 11.5115 14.25 11.7188 14.25H24.2188C24.426 14.25 24.6247 14.1666 24.7712 14.0181C24.9177 13.8697 25 13.6683 25 13.4583C25 13.2484 24.9177 13.047 24.7712 12.8985C24.6247 12.7501 24.426 12.6667 24.2188 12.6667H11.7188ZM11.7188 15.8333C11.5115 15.8333 11.3128 15.9167 11.1663 16.0652C11.0198 16.2137 10.9375 16.415 10.9375 16.625C10.9375 16.835 11.0198 17.0363 11.1663 17.1848C11.3128 17.3333 11.5115 17.4167 11.7188 17.4167H21.0938C21.301 17.4167 21.4997 17.3333 21.6462 17.1848C21.7927 17.0363 21.875 16.835 21.875 16.625C21.875 16.415 21.7927 16.2137 21.6462 16.0652C21.4997 15.9167 21.301 15.8333 21.0938 15.8333H11.7188Z" fill="#E5E5E5"/>
                                                        </svg>
                                                    </div>
                                                    <p className="nft-text">Детали</p>
                                                </div>
                                                <div className="nft-info-value">
                                                    <ul className="nft-info-list-details">
                                                        <li className="d-flex justify-content-between">
                                                            <div>Contract Address</div>
                                                            <div><a href={'https://etherscan.io/address/' + openseaStore.openseaNFT.contractAddress} target={"_blank"} rel="norefferer">{openseaStore.openseaNFT.contractAddress.slice(0, 8) + '..'}</a></div>
                                                        </li>
                                                        <li className="d-flex justify-content-between">
                                                            <div>Token ID</div>
                                                            <div>{openseaStore.openseaNFT.token_id.slice(0, 8) + '..'}</div>
                                                        </li>
                                                        <li className="d-flex justify-content-between">
                                                            <div>Token Standard</div>
                                                            <div></div>
                                                        </li>
                                                        <li className="d-flex justify-content-between">
                                                            <div>Blockchain</div>
                                                            <div>Ethereum</div>
                                                        </li>
                                                        <li className="d-flex justify-content-between">
                                                            <div>Metadata</div>
                                                            <div>{openseaStore.openseaNFT.token_metadata}</div>
                                                        </li>
                                                        <li className="d-flex justify-content-between">
                                                            <div>Creator Fees</div>
                                                            <div>{openseaStore.openseaNFT.top_bid}</div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="col-12 col-md-7">
                                            <div className="row">
                                                <div className="col-12 mb-5">
                                                    <div className="mb-3">ИСТОРИЯ ЦЕНЫ</div>
                                                    <NFTGraphPrice />
                                                </div>
                                                <div className="col-12 mb-5">
                                                    <div className="mb-3">ИСТОРИЯ ТРАЗАКЦИЙ</div>
                                                    <div className="area-graph">
                                                        <div className="mb-4">
                                                            <input className="nft-search-filter" type="text" placeholder="Фильтр"/>
                                                            <div className="d-flex align-items-end">
                                                                <div className="nft-items-filter">
                                                                    <div className="nft-item-filter">Покупка</div>
                                                                    <div className="nft-item-filter">Продажа</div>
                                                                    <div className="nft-item-filter">Минт</div>
                                                                </div>
                                                                <div className="nft-items-filter-clear">Очистить все</div>
                                                            </div>
                                                        </div>
                                                        <div className="wrapper-nft-history-transaction">
                                                            <table className="nft-history-transaction">
                                                                <thead>
                                                                <tr>
                                                                    <td>Операция</td>
                                                                    <td>Цена</td>
                                                                    <td>От</td>
                                                                    <td>Кому</td>
                                                                    <td>Дата</td>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>Продажа</td>
                                                                    <td>0.75 KSM</td>
                                                                    <td>7bLibJeh2tw9...</td>
                                                                    <td>стh7bLibJeh2...</td>
                                                                    <td>14.05.2022</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Продажа</td>
                                                                    <td>0.75 KSM</td>
                                                                    <td>7bLibJeh2tw9...</td>
                                                                    <td>стh7bLibJeh2...</td>
                                                                    <td>14.05.2022</td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="temporary-plug"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }

                    <FormDialog text='123213' type='buy' title='Купить НФТ' buttonText="Купить" isDialogOpened={this.state.isOpenBuy} handleOpen={() => this.setState({isOpenBuy: false})} nftID={this.state.activeNFT}/>
                    <FormDialog text='123213' type='emote' title='Оценить НФТ' buttonText="Оценить" isDialogOpened={this.state.isOpenEmote} handleOpen={() => this.setState({isOpenEmote: false})}  nftID={this.state.activeNFT}/>
                    <FormDialog text='123213' type='send' title='Подарить НФТ' buttonText="Подарить" isDialogOpened={this.state.isOpenSend} handleOpen={() => this.setState({isOpenSend: false})} nftID={this.state.activeNFT}/>
                    <FormDialog text='123213' type='consume' title='Сжечь НФТ' buttonText="Сжечь" isDialogOpened={this.state.isOpenConsume} handleOpen={() => this.setState({isOpenConsume: false})} nftID={this.state.activeNFT}/>
                    <FormDialog text='123213' type='list' title='Выставить на продажу' buttonText="Выставить" isDialogOpened={this.state.isOpenList} handleOpen={() => this.setState({isOpenList: false})} nftID={this.state.activeNFT}/>
                </>

            )
        }
    }
)


export default OpenSeaNFT;
