import React, {KeyboardEvent} from 'react';
import {observer} from "mobx-react";
import userStore from "../stores/userStore";
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
    addFavorite1,
    addFavorite2,
    deleteFavorite1,
    deleteFavorite2,
    uploadMyAvatar,
    uploadMyBG
} from "../requests/axiosRequests";
import rmrkStore from "../stores/rmrkStore";
import globalStore from "../stores/globalStore";
import Loader from "./Loader";
import {isLogged, setToastSuccess} from "../settings/utils";
import {Link} from "react-router-dom";
import nftStore from "../stores/nftStore";
import {runInAction} from "mobx";
import { images } from '../App';
import {INFTRMRK, ISingleCollectionInAll} from "../interfaces/NFTInterface";
import {mnemonicGenerate} from "@polkadot/util-crypto";
import authStore from "../stores/authStore";


const InfiniteScroll = React.lazy(() => import('../assets/plugins/react-infinite-scroller'));


interface IProps {

}

interface IState {
    files: File[],
    query: string,
    avatar: string,
    banner: string,
    typeContent: string,
    price: {
        min: any,
        max:any
    },
    view: string,
    visible: boolean,
    isOpenFilter: boolean,
    hasNFT: boolean,
    hasColl: boolean,
    currency: string,
    sortPrice: string,
    load: boolean,
    styleView: string,
    appliedAttributes: string[],
    filterAttribute: string
    initialNFT: boolean,
    initialColl: boolean
}

const MyProfile = observer(
    class MyProfile extends React.Component<IProps, IState> {
        private avatarRef: React.RefObject<HTMLInputElement>;
        private bannerRef: React.RefObject<HTMLInputElement>;

        constructor(props: IProps) {
            super(props);
            this.onChange = this.onChange.bind(this);
            this.uploadAva = this.uploadAva.bind(this);
            this.uploadBackgr = this.uploadBackgr.bind(this);
            this.fileUpload = this.fileUpload.bind(this)
            this.addFavoriteHandler = this.addFavoriteHandler.bind(this);
            this.setNFT = this.setNFT.bind(this);
            this.setActivity = this.setActivity.bind(this);
            this.setColl = this.setColl.bind(this);
            this.setFavorites = this.setFavorites.bind(this);
            this.handleChangeQuery = this.handleChangeQuery.bind(this);
            this.deleteFavoriteHandler = this.deleteFavoriteHandler.bind(this);
            this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
            this.handleChangeFilter = this.handleChangeFilter.bind(this);
            this.deleteAttributes = this.deleteAttributes.bind(this);
            this.handleKey = this.handleKey.bind(this);
            this.handleChangeVisible = this.handleChangeVisible.bind(this);
            this.handleChangePriceSort = this.handleChangePriceSort.bind(this);
            this.handleChangeAppliedAttributes = this.handleChangeAppliedAttributes.bind(this);
            this.turnOffFilter = this.turnOffFilter.bind(this);
            this.filterCollection = this.filterCollection.bind(this);
            this.handleChangeType = this.handleChangeType.bind(this);
            this.clearFilterAttribute = this.clearFilterAttribute.bind(this);
            this.handleChangePrice = this.handleChangePrice.bind(this);
            this.handleLoadRMRKNFTs = this.handleLoadRMRKNFTs.bind(this);
            this.handleLoadRMRKColls = this.handleLoadRMRKColls.bind(this);
            this.toggleStyleView = this.toggleStyleView.bind(this);
            this.handleMnemoNew = this.handleMnemoNew.bind(this);
            this.goSearch = this.goSearch.bind(this);
            this.avatarRef = React.createRef();
            this.bannerRef = React.createRef();
            this.state = {
                files: [],
                avatar: '',
                banner: '',
                query: "",
                typeContent: "",
                price: {
                    min:0,
                    max:999
                },
                view: "nft",
                visible: true,
                isOpenFilter: false,
                hasNFT: true,
                hasColl: true,
                currency: "KSM",
                sortPrice: "ASC",
                load: false,
                styleView: "grid",
                appliedAttributes: [""],
                filterAttribute: "",
                initialColl: false,
                initialNFT: false
            };
        }

        thresh = 250;

        async handleMnemoNew(event: React.MouseEvent<HTMLAnchorElement>) {
            const mnemonic = mnemonicGenerate();
            runInAction(() => {
                userStore.mnemoNew = mnemonic.split(" ")
            })
            userStore.shuffleMnemonic(mnemonic);
            userStore.setSection(2)
        }

        setFiles(files: FileList) {
            const filesArr: File[] = Array.from(files);
            this.setState({ files: filesArr });
        }

        onChange = async (files: FileList, type: "bg" | "ava") => {
            await this.setFiles(files)
            if (type === "ava") {
                await this.setState({ avatar: URL.createObjectURL(files[0]) });
                await this.uploadAva();
            } else {
                await this.setState({ banner: URL.createObjectURL(files[0]) });
                await this.uploadBackgr();
            }

        }

        uploadAva = async () => {
            await this.fileUpload(this.state.files, 'ava');
            userStore.getMyInfo();
        }

        uploadBackgr = async () => {
            await this.fileUpload(this.state.files, 'bg');
            userStore.getMyInfo();
        }

        fileUpload(files: File[], type: 'bg' | 'ava') {
            const formData = new FormData();
            files.forEach(file => {
                console.log('upl', file.size)
                formData.append('files', file)
            });
            if (type === 'bg') {
                console.log('ret')
                return uploadMyBG(formData);
            } else {
                console.log('reta')
                return uploadMyAvatar(formData);

            }
        }

        async setNFT(event: any) {
            await this.setState({
                view: "nft",
                visible: true,
                hasNFT: true
            });
            rmrkStore.getMyNFT();
        }

        setActivity(event: any) {
            this.setState({
                view: "activity",
                visible: false
            })
        }

       async setColl(event: any) {
            await this.setState({
                view: "coll",
                visible: false,
                hasColl: true
            });
            rmrkStore.getMyCollections()
        }

        setFavorites(event: any) {
            this.setState({
                view: "favorites",
                visible: false
            })
        }

        clearFilterAttribute(event: any) {
            this.setState({
                filterAttribute: ""
            })
        }

        filterCollection(event: React.ChangeEvent<HTMLInputElement>) {
            this.setState({filterAttribute: event.target.value})
        }

        async deleteAttributes(event: React.MouseEvent<HTMLDivElement>) {
            let word = event.currentTarget.innerHTML;
            let arr = this.state.appliedAttributes.filter(attr => !!attr);
            let index = arr.indexOf(word)
            arr.splice(index, 1);
            await this.setState({
                appliedAttributes: arr
            });
        }

        async handleChangeAppliedAttributes(event: React.ChangeEvent<HTMLInputElement>) {
            let arr = this.state.appliedAttributes.filter(attr => !!attr);
            let word = event.target.value
            if (arr.includes(word)) {
                let index = arr.indexOf(word)
                arr.splice(index, 1);
            } else {
                arr.push(word);
            }

            await this.setState({
                appliedAttributes: arr
            });
            console.log(this.state.appliedAttributes)
        }

        toggleStyleView(event: any) {
            if (this.state.styleView === "grid") {
                this.setState({
                    styleView: "list",
                })
            } else {
                this.setState({
                    styleView: "grid",
                })
            }
        }


        async addFavoriteHandler(event: any, nftId: any, collection: any) {
            if (nftStore.rmrkVersion === 2) {
                await addFavorite2({nftId, collectionId: collection});
                rmrkStore.myNFTs.nfts.map((nft: any) => {
                    if (nft.id === nftId) {
                        runInAction(() => {
                            nft.isFavorite = true;
                        })

                    }
                })
            } else {
                await addFavorite1({nftId, collectionId: collection});
                rmrkStore.myNFTs.nfts.map((nft: any) => {
                    if (nft.id === nftId) {
                        runInAction(() => {
                            nft.isFavorite = true;
                        })

                    }
                })
            }
        }

        async deleteFavoriteHandler(event: any, nftId: any, collection: any) {
            if (nftStore.rmrkVersion === 2) {
                await deleteFavorite2({nftId, collectionId: collection});
                rmrkStore.myNFTs.nfts.map((nft: any) => {
                    if (nft.id === nftId) {
                        runInAction(() => {
                            nft.isFavorite = false;
                        })

                    }
                })
            } else {
                await deleteFavorite1({nftId, collectionId: collection});
                rmrkStore.myNFTs.nfts.map((nft: any) => {
                    if (nft.id === nftId) {
                        runInAction(() => {
                            nft.isFavorite = false;
                        })

                    }
                })
            }
        }

        handleChangeQuery(event: React.ChangeEvent<HTMLInputElement>) {
            event.preventDefault()
            this.setState({query: event.target.value});
        }

        handleChangeCurrency(event: React.MouseEvent<HTMLInputElement>, name: string) {
            event.preventDefault()
            this.setState({currency: name});
        }

        handleChangePriceSort(event: React.MouseEvent<HTMLInputElement>, name: string) {
            event.preventDefault()
            this.setState({sortPrice: name});
        }

        handleChangeFilter(event: any) {
            event.preventDefault()
            this.setState((prevState: any) => {
                prevState.isOpenFilter = !prevState.isOpenFilter
            })
        }

        async handleKey(event: KeyboardEvent<HTMLInputElement>) {
            if (event.key === "Enter") {
                this.goSearch(event)
            }
        }

        handleChangeVisible() {
            this.setState((prevState: any) => {
                prevState.visible = !prevState.visible
            })
        }

        async handleLoadRMRKColls(page: any) {
            // console.log(page)
            // globalStore.setLoader(true);
            // if (load) {
            //     return
            // }
            // await setLoad(true)
            // let len = rmrkStore.rmrkCollections.collections.length;
            await rmrkStore.getMyCollections(page, 10, this.state.query, this.state.typeContent, this.state.price.min, this.state.price.max, false);
            // if (len === rmrkStore.rmrkCollections.collections.length) {
            //     await setHas(false)
            // } else {
            //     await setHas(true)
            // }
            // await setLoad(false)
            // globalStore.setLoader(false);
        }

        async handleLoadRMRKNFTs(page: any) {
            // console.log(page)
            // globalStore.setLoader(true);
            // if (load) {
            //     console.log('bla')
            //     return
            // }
            // await setLoad(true)
            // let len = rmrkStore.rmrkNFTs.nfts.length;
            await rmrkStore.getMyNFT(page, 10, this.state.query, this.state.typeContent, this.state.price.min, this.state.price.max, false);
            // if (len === rmrkStore.rmrkNFTs.nfts.length) {
            //     console.log('equelnft')
            //     await setHas(false)
            // } else {
            //     await setHas(true)
            // }
            // await setLoad(false)
            // globalStore.setLoader(false)
        }

        turnOffFilter() {
            this.setState({
                isOpenFilter: false
            });
        }


        AllNFTs = observer(() => {
            return (
                <>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.handleLoadRMRKNFTs}
                        hasMore={this.state.hasNFT}
                        threshold={this.thresh}
                        element="div"
                        className="row justify-content-center align-items-center"
                        id={"wrapper-cart-list"}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    ><></>
                        {rmrkStore.myNFTs.nfts && rmrkStore.myNFTs.nfts.map((nft: INFTRMRK): any => {
                            return (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 wrap-pic-feed">
                                    <div className="single-cart-cell">
                                        <div className="cart-cell-header d-flex justify-content-between align-items-center">
                                            <p className="cart-cell-author">{nft.owner.slice(0, 15) + ".."}</p>
                                            <p className="cart-cell-info-text">No subs</p>
                                        </div>
                                        <div className="cart-cell-body position-relative">
                                            <div className="w-100 h-100">
                                                <Link
                                                    to={"/nfts/" + nft.id}>
                                                    <img loading="lazy" src={nft.meta.thumb ? nft.meta.thumb : images["placeholder-image.png"].default} className="image-nft-cart"
                                                         style={{maxHeight: '100%', height: "100%", width: "100%"}}/></Link>
                                            </div>
                                        </div>
                                        <div className="cart-cell-footer">
                                            <div className="cart-cell-container-icon">

                                                {isLogged() ? !!nft.isFavorite ?
                                                    <button className="share-btn-cart"
                                                            onClick={(e) => this.deleteFavoriteHandler(e, nft.id, nft.collection)}>
                                                        <svg width="19" height="25" viewBox="0 0 19 25" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0 25V2.34375C0 1.04932 1.04932 0 2.34375 0H16.4062C17.7007 0 18.75 1.04932 18.75 2.34375V25L9.375 19.5312L0 25Z"
                                                                fill="#FE1492"/>
                                                        </svg>
                                                    </button> :
                                                    <button className="share-btn-cart"
                                                            onClick={(e) => this.addFavoriteHandler(e, nft.id, nft.collection)}>
                                                        <svg width="19" height="25" viewBox="0 0 19 25" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0 25V2.34375C0 1.04932 1.04932 0 2.34375 0H16.4062C17.7007 0 18.75 1.04932 18.75 2.34375V25L9.375 19.5312L0 25Z"
                                                                fill="#none" stroke="#FE1492"/>
                                                        </svg>
                                                    </button> : <></>}
                                            </div>
                                            <div
                                                className="d-flex flex-row justify-content-between container-info-cart-cell"
                                                style={{gap: 15}}>
                                                <div className="d-flex flex-column justify-content-between">
                                                    <div className="category-name-collection">{nft.collectionData.meta && nft.collectionData.meta.name ? nft.collectionData.meta.name.slice(0, 12) + ".." : ""}</div>
                                                    <div className="itself-name-collection"><Link
                                                        to={"/nfts/" + nft.id}>{nft.meta && nft.meta.name ? nft.meta.name.slice(0, 12) + ".." : ""}</Link></div>
                                                </div>
                                                <div className="d-flex flex-column justify-content-between">
                                                    <div className="bet-price-collection">
                                                    <span
                                                        className="itself-bet-price-collection">{nft.price && nft.price.toString() !== "0" ? ((nft.price * 0.000000000001) * userStore.priceUSD).toFixed(2) + ' USD' : "Not listed"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </InfiniteScroll>
                </>
            )
        });

        AllCollections = observer(() => {
            return (
                <>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.handleLoadRMRKColls}
                        hasMore={this.state.hasColl}
                        threshold={this.thresh}
                        element="div"
                        className="row"
                        id={"wrapper-cart-list"}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {rmrkStore.myCollections.collections && rmrkStore.myCollections.collections.length >= 1 && rmrkStore.myCollections.collections.map((coll: ISingleCollectionInAll) => {
                            return (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 wrap-pic-feed">
                                    <div className="single-cart-cell">
                                        <div className="cart-cell-header d-flex justify-content-between align-items-center">
                                            <p className="cart-cell-author">{coll.issuer.slice(0, 15) + ".."}</p>
                                            <p className="cart-cell-info-text">{coll.nfts.length} NFTS</p>
                                        </div>
                                        <div className="cart-cell-body position-relative">
                                            <div className="w-100 h-100">
                                                <Link to={"/collections/" + coll.id}>
                                                    <img loading="lazy" src={coll.meta.thumb ? coll.meta.thumb : images["placeholder-image.png"].default} className="image-nft-cart"
                                                         style={{maxHeight: '100%', height: "100%", width: "100%"}}/></Link>
                                            </div>
                                        </div>
                                        <div className="cart-cell-footer">

                                            <div className="d-flex justify-content-between container-info-cart-cell"
                                                 style={{gap: 15}}>
                                                <div className="d-flex flex-column justify-content-between">
                                                    <div className="category-name-collection">{coll.meta.name.slice(0, 7) + ".."}</div>
                                                    <div className="itself-name-collection">
                                                        <Link to={"/collections/" + coll.id}>
                                                            {coll.symbol.slice(0, 7) + ".."}
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column justify-content-between">
                                                    <div className="bet-price-collection">
                                                        <span className="itself-bet-price-collection"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </InfiniteScroll>
                </>
            )
        });


        handleChangeType(event: React.ChangeEvent<HTMLInputElement>) {
            console.log(event.target)
            this.setState({
                typeContent: event.target.value
            })
        }

        handleChangePrice(event: React.ChangeEvent<HTMLInputElement>) {
            if (event.target.value === null) {
                event.target.value = "0"
            }
            event.target.name === 'min' ? this.setState((prevState:any) => {
                prevState.min = parseInt(event.target.value);
            }) : this.setState((prevState: any) => {
                prevState.max = parseInt(event.target.value);
            })
        }

        async goSearch(event: any) {
            event.preventDefault();
            //await rmrkStore.getCollNFTs(this.currID, 1, 10, this.state.query);
        }


        componentDidMount() {
            console.log('prof')
            userStore.getMyInfo();
        }

        render() {
            // @ts-ignore
            // @ts-ignore
            return (
                <>
                    <div id="wrapper-btn-menu">
                        <div className="container-btn-menu">
                            <div className="body-btn-menu d-flex flex-column justify-content-between">
                                <ul className="container-mobile-menu">
                                    <li className="nav-item-mob">
                                        <a href="/feed">NFTs</a>
                                    </li>
                                    <li className="nav-item-mob">
                                        <a href="#">About</a>
                                    </li>
                                    <li className="nav-item-mob">
                                        <a href="#">FAQ</a>
                                    </li>
                                    <li className="nav-item-mob">
                                        <a href="#">Support</a>
                                    </li>
                                </ul>

                                <ul className="container-mobile-menu-button d-flex flex-wrap justify-content-center">
                                    <li className="nav-item-mob">
                                        <a href="/lk/connect-wallet">
                                            Connect&nbsp;
                                            <svg width="21" height="18" viewBox="0 0 21 18" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M18.5304 3.85714H3.21429C2.85911 3.85714 2.57143 3.56946 2.57143 3.21429C2.57143 2.85911 2.85911 2.57143 3.21429 2.57143H18.6429C18.998 2.57143 19.2857 2.28375 19.2857 1.92857C19.2857 0.863438 18.4223 0 17.3571 0H2.57143C1.15112 0 0 1.15112 0 2.57143V15.4286C0 16.8489 1.15112 18 2.57143 18H18.5304C19.6562 18 20.5714 17.135 20.5714 16.0714V5.78571C20.5714 4.72219 19.6562 3.85714 18.5304 3.85714ZM16.7143 12.2143C16.0043 12.2143 15.4286 11.6385 15.4286 10.9286C15.4286 10.2186 16.0043 9.64286 16.7143 9.64286C17.4242 9.64286 18 10.2186 18 10.9286C18 11.6385 17.4242 12.2143 16.7143 12.2143Z"
                                                    fill="white"/>
                                            </svg>
                                            &nbsp;/
                                        </a>
                                    </li>
                                    <li className="nav-item-mob">
                                        <a href="/lk/auth">
                                            Log in&nbsp;/
                                        </a>
                                    </li>
                                    <li className="nav-item-mob change-language-btn">
                                        <a>
                                            EN&nbsp;
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13.5685 6.12903C12.9839 2.52823 11.6048 0 10 0C8.39516 0 7.01613 2.52823 6.43145 6.12903H13.5685ZM6.12903 10C6.12903 10.8952 6.17742 11.754 6.2621 12.5806H13.7339C13.8185 11.754 13.8669 10.8952 13.8669 10C13.8669 9.10484 13.8185 8.24597 13.7339 7.41935H6.2621C6.17742 8.24597 6.12903 9.10484 6.12903 10ZM19.2218 6.12903C18.0685 3.39113 15.7339 1.27419 12.8508 0.419355C13.8347 1.78226 14.5121 3.83468 14.8669 6.12903H19.2218ZM7.14516 0.419355C4.26613 1.27419 1.92742 3.39113 0.778226 6.12903H5.13306C5.48387 3.83468 6.16129 1.78226 7.14516 0.419355ZM19.6532 7.41935H15.0282C15.1129 8.26613 15.1613 9.13306 15.1613 10C15.1613 10.8669 15.1129 11.7339 15.0282 12.5806H19.6492C19.871 11.754 19.996 10.8952 19.996 10C19.996 9.10484 19.871 8.24597 19.6532 7.41935ZM4.83871 10C4.83871 9.13306 4.8871 8.26613 4.97177 7.41935H0.346774C0.129032 8.24597 0 9.10484 0 10C0 10.8952 0.129032 11.754 0.346774 12.5806H4.96774C4.8871 11.7339 4.83871 10.8669 4.83871 10ZM6.43145 13.871C7.01613 17.4718 8.39516 20 10 20C11.6048 20 12.9839 17.4718 13.5685 13.871H6.43145ZM12.8548 19.5806C15.7339 18.7258 18.0726 16.6089 19.2258 13.871H14.871C14.5161 16.1653 13.8387 18.2177 12.8548 19.5806ZM0.778226 13.871C1.93145 16.6089 4.26613 18.7258 7.14919 19.5806C6.16532 18.2177 5.4879 16.1653 5.13306 13.871H0.778226Z"
                                                    fill="white"/>
                                            </svg>
                                            <div className="wrapper-change-language">
                                                <div className="container-change-language">
                                                    <a href="http://nft2goru.notadet.xyz"
                                                       className="link-change-lang">RU</a>
                                                    <a href="#" className="link-change-lang">CN</a>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <main>
                        <div className="drop_zone"
                            // @ts-ignore
                             onClick = { () => this.bannerRef.current?.click()}
                             style={{position:"absolute", backgroundColor:"transparent", maxWidth:"200px", border:"none", zIndex:10}}>
                            <img src={userStore.user.background ? userStore.user.background : images["curved0.jpg"].default} style={{ width:"100vw", maxHeight:"190px", height:"100%", position:"absolute"}} alt=""/>
                            <input
                                type="file"
                                ref={this.bannerRef} hidden
                                accept="image/*"
                                onChange={(e: any) => this.onChange(e.target.files, "bg")}
                            />
                        </div>

                        <div className="container-ext " style={{position: "relative"}}>
                            <div className="container">
                                <div id="nft-top-wrapper" className="d-flex flex-column justify-content-center align-items-center" style={{margin: "0 auto"}}>
                                    <div className="drop_zone"
                                        // @ts-ignore
                                         onClick = { () => this.avatarRef.current?.click()}
                                         style={{position:"relative", backgroundColor:"transparent", maxWidth:"200px", border:"none", zIndex:20}}>
                                        <div style={{position:"absolute", top:"35%", left:"42%"}}>
                                        </div>
                                        <img src={userStore.user.avatar ? userStore.user.avatar : authStore.googleUser.img ? authStore.googleUser.img : images["logo.png"].default} style={{maxWidth:"100%", width:"100%"}} id="profile-avatar" className="img-fluid"/>
                                        <input
                                            type="file"
                                            ref={this.avatarRef} hidden
                                            accept="image/*"
                                            onChange={(e: any) => {
                                                console.log('qwe',e.target)
                                                this.onChange(e.target.files, "ava")
                                            }}
                                        />
                                    </div>
                                    <h1>{authStore.googleUser.name ? authStore.googleUser.name : "Unnamed"}</h1>
                                    {rmrkStore.rmrkWallet.wallet &&
                                        <>
                                        <p>Ваш кошелёк:</p>
                                        <p style={{width:"100%", wordWrap: "break-word", textAlign:"center"}}>{rmrkStore.rmrkWallet.wallet}&nbsp;&nbsp;
                                        <CopyToClipboard text={rmrkStore.rmrkWallet.wallet} onCopy={() =>setToastSuccess("Кошелек скопирован!")}>
                                            <svg className="copy-sign" width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}}>
                                                <path d="M7.2001 0C6.32488 0 5.48552 0.294999 4.86664 0.820101C4.24778 1.3452 3.9001 2.05739 3.9001 2.8V16.8C3.9001 17.5426 4.24778 18.2548 4.86664 18.7799C5.48552 19.305 6.32488 19.6 7.2001 19.6H17.1001C17.9753 19.6 18.8147 19.305 19.4335 18.7799C20.0524 18.2548 20.4001 17.5426 20.4001 16.8V2.8C20.4001 2.05739 20.0524 1.3452 19.4335 0.820101C18.8147 0.294999 17.9753 0 17.1001 0H7.2001ZM5.5501 2.8C5.5501 2.4287 5.72394 2.0726 6.03337 1.81005C6.34281 1.5475 6.76249 1.4 7.2001 1.4H17.1001C17.5377 1.4 17.9574 1.5475 18.2668 1.81005C18.5763 2.0726 18.7501 2.4287 18.7501 2.8V16.8C18.7501 17.1713 18.5763 17.5274 18.2668 17.7899C17.9574 18.0525 17.5377 18.2 17.1001 18.2H7.2001C6.76249 18.2 6.34281 18.0525 6.03337 17.7899C5.72394 17.5274 5.5501 17.1713 5.5501 16.8V2.8ZM0.600098 5.6C0.600112 5.10851 0.7526 4.62568 1.04223 4.20004C1.33187 3.7744 1.74845 3.42095 2.2501 3.1752V17.5C2.2501 18.4283 2.68469 19.3185 3.45828 19.9749C4.23187 20.6313 5.28108 21 6.3751 21H16.6579C16.3683 21.4256 15.9517 21.7791 15.4501 22.0249C14.9484 22.2706 14.3794 22.4 13.8001 22.4H6.3751C4.84347 22.4 3.37458 21.8838 2.29156 20.9648C1.20853 20.0459 0.600098 18.7996 0.600098 17.5V5.6Z" fill="#E5E5E5"/>
                                            </svg>
                                        </CopyToClipboard>
                                    </p></>}
                                    {!rmrkStore.rmrkWallet.wallet && <div className="d-flex">
                                        <Link to={"/lk/mnemo"} onClick={this.handleMnemoNew} className="prof-mnemo">Создать мнемонику</Link>
                                        <Link to={"/lk/mnemo"} onClick={() => userStore.setSection(3)} className="prof-mnemo">У
                                            меня уже есть</Link>
                                    </div>}
                                    <ul id="social-coll" className="d-flex">
                                        <li>
                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13 0C9.55219 0 6.24558 1.36964 3.80761 3.80761C1.36964 6.24558 0 9.55219 0 13C0 16.4478 1.36964 19.7544 3.80761 22.1924C6.24558 24.6304 9.55219 26 13 26C16.4478 26 19.7544 24.6304 22.1924 22.1924C24.6304 19.7544 26 16.4478 26 13C26 9.55219 24.6304 6.24558 22.1924 3.80761C19.7544 1.36964 16.4478 0 13 0V0ZM1.60333 13.9822H5.22889C5.28667 15.2967 5.47011 16.6024 5.77778 17.8822H2.65778C2.07596 16.6557 1.71883 15.3348 1.60333 13.9822ZM13.9822 6.18222V1.71889C15.3742 2.24788 16.518 3.27834 17.1889 4.60778C17.485 5.109 17.7464 5.63044 17.9689 6.16778L13.9822 6.18222ZM18.6333 8.13222C18.9684 9.40767 19.1678 10.7149 19.2256 12.0322H13.9822V8.13222H18.6333ZM12.0178 1.71889V6.18222H8.03111C8.25393 5.64445 8.51459 5.12314 8.81111 4.62222C9.47912 3.28734 10.6233 2.2514 12.0178 1.71889ZM12.0178 8.13222V12.0322H6.78889C6.84667 10.7149 7.046 9.40767 7.38111 8.13222H12.0178ZM5.22889 12.0178H1.60333C1.71883 10.6652 2.07596 9.34428 2.65778 8.11778H5.77778C5.46952 9.39704 5.2857 10.7031 5.22889 12.0178ZM6.78889 13.9822H12.0178V17.8822H7.38111C7.04605 16.6069 6.84753 15.2995 6.78889 13.9822ZM12.0322 19.76V24.2233C10.6402 23.6943 9.49642 22.6639 8.82556 21.3344C8.52903 20.8335 8.26838 20.3122 8.04556 19.7744L12.0322 19.76ZM13.9822 24.2233V19.8322H17.9689C17.7461 20.37 17.4854 20.8913 17.1889 21.3922C16.518 22.7217 15.3742 23.7521 13.9822 24.2811V24.2233ZM13.9822 17.81V13.91H19.2111C19.1525 15.2273 18.9539 16.5347 18.6189 17.81H13.9822ZM20.7856 13.91H24.4111C24.2956 15.2626 23.9385 16.5835 23.3567 17.81H20.2222C20.5256 16.5533 20.709 15.2721 20.7711 13.9822L20.7856 13.91ZM20.7856 11.96C20.7194 10.6691 20.5308 9.38743 20.2222 8.13222H23.3422C23.9243 9.36 24.2811 10.6802 24.3967 12.0322L20.7856 11.96ZM22.23 6.18222H19.6444C19.1766 4.86821 18.4985 3.63888 17.6367 2.54222C19.4341 3.34906 20.9954 4.60207 22.1722 6.18222H22.23ZM8.36333 2.54222C7.50146 3.63888 6.82338 4.86821 6.35556 6.18222H3.82778C5.0046 4.60207 6.56589 3.34906 8.36333 2.54222ZM3.81333 19.8756H6.35556C6.82338 21.1896 7.50146 22.4189 8.36333 23.5156C6.56092 22.6966 4.99915 21.4283 3.82778 19.8322L3.81333 19.8756ZM17.6222 23.5156C18.4841 22.4189 19.1622 21.1896 19.63 19.8756H22.1722C20.9882 21.4345 19.4275 22.6672 17.6367 23.4578L17.6222 23.5156Z"
                                                    fill="white"/>
                                            </svg>
                                        </li>
                                        <li>
                                            <svg width="29" height="23" viewBox="0 0 29 23" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M28.3333 2.75931C27.3174 3.20448 26.2261 3.50527 25.0788 3.64122C26.2626 2.94074 27.1483 1.83826 27.5705 0.539507C26.4583 1.1928 25.2411 1.65265 23.9717 1.89906C23.1181 0.997743 21.9874 0.400334 20.7553 0.199586C19.5231 -0.00116178 18.2585 0.205984 17.1576 0.788862C16.0567 1.37174 15.1812 2.29774 14.667 3.42309C14.1528 4.54845 14.0287 5.8102 14.314 7.01244C12.0604 6.90054 9.85578 6.32129 7.84321 5.31228C5.83065 4.30327 4.05511 2.88704 2.63183 1.15552C2.14518 1.98569 1.86535 2.94821 1.86535 3.97329C1.86481 4.8961 2.09461 5.80477 2.53436 6.61869C2.9741 7.43261 3.61021 8.1266 4.38623 8.6391C3.48625 8.61078 2.60613 8.37029 1.81912 7.93766V8.00985C1.81903 9.30412 2.27175 10.5586 3.10046 11.5603C3.92918 12.5621 5.08284 13.2495 6.3657 13.5058C5.53082 13.7293 4.65552 13.7622 3.80589 13.6021C4.16784 14.7157 4.87288 15.6896 5.82231 16.3873C6.77174 17.085 7.91803 17.4716 9.1007 17.4931C7.09305 19.0516 4.6136 19.8971 2.06123 19.8933C1.6091 19.8935 1.15736 19.8673 0.708328 19.8151C3.29913 21.4625 6.31501 22.3367 9.39513 22.3333C19.8217 22.3333 25.5217 13.7934 25.5217 6.3868C25.5217 6.14617 25.5156 5.90314 25.5046 5.66251C26.6134 4.8696 27.5704 3.88774 28.3309 2.76292L28.3333 2.75931Z"
                                                    fill="white"/>
                                            </svg>
                                        </li>
                                        <li>
                                            <svg width="31" height="22" viewBox="0 0 31 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M26.2427 1.8246C24.2665 0.981319 22.1482 0.358027 19.933 0.00360552C19.9133 2.20986e-05 19.8929 0.00233139 19.8746 0.0102141C19.8563 0.0180967 19.8411 0.0311628 19.831 0.0476026C19.5598 0.498573 19.2575 1.08642 19.0457 1.55084C16.6963 1.2187 14.3079 1.2187 11.9585 1.55084C11.7226 1.03615 11.4565 0.534289 11.1616 0.0476026C11.1516 0.0309604 11.1365 0.0175988 11.1182 0.00930086C11.1 0.00100297 11.0795 -0.00183665 11.0596 0.00116112C8.8457 0.355582 6.72743 0.978875 4.74994 1.82338C4.73293 1.83013 4.71851 1.84164 4.70861 1.85637C0.689059 7.44767 -0.412701 12.9009 0.128492 18.2856C0.129998 18.2988 0.134324 18.3116 0.141208 18.3231C0.148092 18.3347 0.157388 18.3448 0.168533 18.3528C2.51464 19.969 5.13141 21.2002 7.90927 21.9948C7.92863 22.0005 7.94934 22.0005 7.9687 21.9948C7.98805 21.9891 8.00515 21.9781 8.01776 21.9631C8.61552 21.2066 9.14522 20.4041 9.6013 19.564C9.60763 19.5525 9.61128 19.5399 9.612 19.5269C9.61272 19.514 9.61049 19.5011 9.60547 19.489C9.60045 19.477 9.59275 19.4661 9.58289 19.4571C9.57304 19.4481 9.56126 19.4412 9.54834 19.4369C8.71396 19.1396 7.9055 18.7808 7.13041 18.3638C7.11649 18.3563 7.10475 18.3456 7.09626 18.3328C7.08777 18.3199 7.08279 18.3052 7.08176 18.2901C7.08074 18.275 7.0837 18.2598 7.09039 18.246C7.09708 18.2322 7.10728 18.2202 7.12008 18.2111C7.28283 18.0974 7.44557 17.9789 7.60057 17.8603C7.61452 17.8497 7.63132 17.8429 7.64911 17.8407C7.6669 17.8386 7.68497 17.8411 7.70131 17.8481C12.7735 20.004 18.2668 20.004 23.2797 17.8481C23.296 17.8407 23.3143 17.8378 23.3323 17.8398C23.3504 17.8417 23.3675 17.8484 23.3817 17.8591C23.5367 17.9789 23.6981 18.0974 23.8622 18.2111C23.8751 18.22 23.8855 18.2319 23.8924 18.2455C23.8993 18.2592 23.9025 18.2743 23.9017 18.2894C23.901 18.3046 23.8962 18.3193 23.888 18.3323C23.8797 18.3453 23.8682 18.3561 23.8544 18.3638C23.082 18.7843 22.2786 19.1399 21.4352 19.4357C21.4223 19.4401 21.4105 19.4471 21.4006 19.4562C21.3907 19.4653 21.383 19.4763 21.378 19.4885C21.373 19.5006 21.3708 19.5136 21.3715 19.5267C21.3723 19.5397 21.3759 19.5524 21.3823 19.564C21.8472 20.4036 22.3794 21.2029 22.9645 21.9618C22.9767 21.9774 22.9936 21.989 23.013 21.9952C23.0324 22.0013 23.0534 22.0016 23.073 21.996C25.8556 21.2037 28.4767 19.9719 30.8254 18.3528C30.8368 18.3453 30.8464 18.3355 30.8536 18.3241C30.8607 18.3127 30.8652 18.3 30.8667 18.2868C31.5125 12.0613 29.7843 6.65206 26.2827 1.85882C26.2741 1.84324 26.2599 1.8311 26.2427 1.8246ZM10.3595 15.0066C8.83278 15.0066 7.57344 13.7002 7.57344 12.0979C7.57344 10.4945 8.80824 9.18922 10.3595 9.18922C11.9224 9.18922 13.1701 10.5055 13.1455 12.0979C13.1455 13.7014 11.9107 15.0066 10.3595 15.0066ZM20.6602 15.0066C19.1322 15.0066 17.8742 13.7002 17.8742 12.0979C17.8742 10.4945 19.1077 9.18922 20.6602 9.18922C22.2231 9.18922 23.4708 10.5055 23.4463 12.0979C23.4463 13.7014 22.2244 15.0066 20.6602 15.0066Z" fill="white"/>
                                            </svg>

                                        </li>
                                    </ul>
                                    <ul id="coll-stats" className="d-flex flex-row flex-wrap justify-content-center" style={{listStyle: "none", gap:10}}>
                                        <li className="mnemo-word">
                                            <span>0</span>артов
                                        </li>
                                        <li className="mnemo-word">
                                            <span>1.9k</span>подписчиков
                                        </li>
                                        <li className="mnemo-word">
                                            <span>200</span>подписок
                                        </li>
                                        <li className="mnemo-word">
                                            <span>3.5k KSM</span>объём торгов
                                        </li>
                                    </ul>
                                    <p id="coll-description">
                                        {rmrkStore.singleCollection.collection.meta.description}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 wrapper-top-panel-list">
                                    <div className="top-panel-list">
                                        <div className="row">
                                            <div
                                                className="col-12 d-flex justify-content-center align-items-center"
                                                style={{zIndex: 5, borderBottom: "1px solid #fff"}}>
                                                <div
                                                    className="selected-menu-list d-flex align-items-center justify-content-center">
                                                    <label className={this.state.view === "nft" ? "input-selected coll-top displayed" : "input-selected coll-top"}>
                                                        <svg className="profile-signs" width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.4247 23.765C12.5002 23.8395 12.5899 23.8986 12.6886 23.9389C12.7873 23.9792 12.8931 24 13 24C13.1069 24 13.2127 23.9792 13.3114 23.9389C13.4101 23.8986 13.4998 23.8395 13.5753 23.765L16.5864 20.7988H22.75C23.612 20.7988 24.4386 20.4616 25.0481 19.8616C25.6576 19.2615 26 18.4476 26 17.5989V3.19981C26 2.35117 25.6576 1.53728 25.0481 0.937202C24.4386 0.337122 23.612 0 22.75 0H3.25C2.38805 0 1.5614 0.337122 0.951903 0.937202C0.34241 1.53728 0 2.35117 0 3.19981L0 17.5989C0 18.4476 0.34241 19.2615 0.951903 19.8616C1.5614 20.4616 2.38805 20.7988 3.25 20.7988H9.41363L12.4247 23.765ZM1.625 12.7992V7.99952H24.375V12.7992H1.625ZM24.375 14.3991V17.5989C24.375 18.0233 24.2038 18.4302 23.899 18.7303C23.5943 19.0303 23.181 19.1989 22.75 19.1989H16.5864C16.1554 19.1989 15.7422 19.3676 15.4375 19.6676L13 22.0675L10.5625 19.6676C10.2578 19.3676 9.84457 19.1989 9.41363 19.1989H3.25C2.81902 19.1989 2.4057 19.0303 2.10095 18.7303C1.7962 18.4302 1.625 18.0233 1.625 17.5989V14.3991H24.375ZM24.375 6.39962H1.625V3.19981C1.625 2.77549 1.7962 2.36855 2.10095 2.06851C2.4057 1.76847 2.81902 1.5999 3.25 1.5999H22.75C23.181 1.5999 23.5943 1.76847 23.899 2.06851C24.2038 2.36855 24.375 2.77549 24.375 3.19981V6.39962ZM3.25 16.799C3.25 17.0112 3.3356 17.2146 3.48798 17.3647C3.64035 17.5147 3.84701 17.5989 4.0625 17.5989H17.0625C17.278 17.5989 17.4847 17.5147 17.637 17.3647C17.7894 17.2146 17.875 17.0112 17.875 16.799C17.875 16.5868 17.7894 16.3834 17.637 16.2333C17.4847 16.0833 17.278 15.999 17.0625 15.999H4.0625C3.84701 15.999 3.64035 16.0833 3.48798 16.2333C3.3356 16.3834 3.25 16.5868 3.25 16.799ZM3.25 10.3994C3.25 10.6115 3.3356 10.815 3.48798 10.965C3.64035 11.1151 3.84701 11.1993 4.0625 11.1993H21.9375C22.153 11.1993 22.3597 11.1151 22.512 10.965C22.6644 10.815 22.75 10.6115 22.75 10.3994C22.75 10.1872 22.6644 9.98375 22.512 9.83373C22.3597 9.68371 22.153 9.59943 21.9375 9.59943H4.0625C3.84701 9.59943 3.64035 9.68371 3.48798 9.83373C3.3356 9.98375 3.25 10.1872 3.25 10.3994ZM3.25 3.99976C3.25 4.21192 3.3356 4.41539 3.48798 4.56541C3.64035 4.71543 3.84701 4.79971 4.0625 4.79971H13.8125C14.028 4.79971 14.2347 4.71543 14.387 4.56541C14.5394 4.41539 14.625 4.21192 14.625 3.99976C14.625 3.7876 14.5394 3.58413 14.387 3.43411C14.2347 3.28409 14.028 3.19981 13.8125 3.19981H4.0625C3.84701 3.19981 3.64035 3.28409 3.48798 3.43411C3.3356 3.58413 3.25 3.7876 3.25 3.99976Z" fill="white"/>
                                                        </svg>
                                                        <input type="radio" name="essence-filtration" value="nfts"
                                                               className="common_selector main-category-nft" onChange={this.setNFT}
                                                               defaultChecked={true}/>
                                                        <span style={{background:"transparent !important"}}>NFTs</span>
                                                    </label>
                                                    <label className={this.state.view === "coll" ? "input-selected coll-top displayed" : "input-selected coll-top"}>
                                                        <svg className="profile-signs" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M22.1667 2.83366V17.3337H7.66675V2.83366H22.1667ZM22.1667 0.416992H7.66675C6.33758 0.416992 5.25008 1.50449 5.25008 2.83366V17.3337C5.25008 18.6628 6.33758 19.7503 7.66675 19.7503H22.1667C23.4959 19.7503 24.5834 18.6628 24.5834 17.3337V2.83366C24.5834 1.50449 23.4959 0.416992 22.1667 0.416992ZM11.8959 12.1016L13.938 14.8324L16.9347 11.0866L20.9584 16.1253H8.87508L11.8959 12.1016ZM0.416748 5.25033V22.167C0.416748 23.4962 1.50425 24.5837 2.83341 24.5837H19.7501V22.167H2.83341V5.25033H0.416748Z" fill="#E5E5E5"/>
                                                        </svg>
                                                        <input type="radio" name="essence-filtration" value="nfts"
                                                               className="common_selector main-category-nft" onChange={this.setColl}/>
                                                        <span style={{background:"transparent !important"}}>Коллекции</span>
                                                    </label>

                                                    <label className={this.state.view === "activity" ? "input-selected coll-top displayed" : "input-selected coll-top"} style={{marginRight: 0}}>
                                                        <svg className="profile-signs" width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 0C12.9684 8.74439e-05 13.1814 0.0634954 13.3601 0.181596C13.5388 0.299696 13.6745 0.466752 13.7487 0.660032L21.25 20.073L24.5012 11.6566C24.5762 11.464 24.7122 11.2978 24.8908 11.1805C25.0695 11.0632 25.2822 11.0003 25.5 11.0005H32.9375C33.2193 11.0005 33.4895 11.1059 33.6888 11.2934C33.8881 11.481 34 11.7354 34 12.0006C34 12.2658 33.8881 12.5202 33.6888 12.7077C33.4895 12.8953 33.2193 13.0006 32.9375 13.0006H26.2438L22.2488 23.3411C22.1743 23.5342 22.0385 23.701 21.8598 23.8189C21.6811 23.9368 21.4682 24 21.25 24C21.0318 24 20.8189 23.9368 20.6402 23.8189C20.4615 23.701 20.3257 23.5342 20.2512 23.3411L12.75 3.92819L9.49875 12.3426C9.42416 12.5355 9.2883 12.7021 9.10962 12.8199C8.93094 12.9376 8.7181 13.0007 8.5 13.0006H1.0625C0.780707 13.0006 0.510456 12.8953 0.311199 12.7077C0.111942 12.5202 0 12.2658 0 12.0006C0 11.7354 0.111942 11.481 0.311199 11.2934C0.510456 11.1059 0.780707 11.0005 1.0625 11.0005H7.75625L11.7513 0.660032C11.8255 0.466752 11.9612 0.299696 12.1399 0.181596C12.3186 0.0634954 12.5316 8.74439e-05 12.75 0Z" fill="white"/>
                                                        </svg>
                                                        <input type="radio" name="essence-filtration" value="collection"
                                                               className="common_selector main-category-nft"
                                                               onChange={this.setActivity}/>
                                                        <span style={{background:"transparent !important"}}>Активность</span>
                                                    </label>
                                                    <label className={this.state.view === "favorites" ? "input-selected coll-top displayed" : "input-selected coll-top"} style={{marginRight: 0}}>
                                                        <svg className="profile-signs" width="31" height="27" viewBox="0 0 31 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.625 1.125C4.82863 1.125 1.75 4.172 1.75 7.93125C1.75 10.9659 2.95312 18.1681 14.796 25.4487C15.0081 25.5778 15.2517 25.6461 15.5 25.6461C15.7483 25.6461 15.9919 25.5778 16.204 25.4487C28.0469 18.1681 29.25 10.9659 29.25 7.93125C29.25 4.172 26.1714 1.125 22.375 1.125C18.5786 1.125 15.5 5.25 15.5 5.25C15.5 5.25 12.4214 1.125 8.625 1.125Z" stroke="#E5E5E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                        <input type="radio" name="essence-filtration" value="collection"
                                                               className="common_selector main-category-nft"
                                                               onChange={this.setFavorites}/>
                                                        <span style={{background:"transparent !important"}}>Избранное</span>
                                                    </label>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 wrapper-option-filter"
                                     style={this.state.visible ? {display: "block"} : {display: "none"}}>
                                    <div className="option-filter">
                                        <form className="filter-main" method="get">

                                            {false && <div className="filter-body-container">
                                                <div className="filter-container-title">
                                                    SORTING
                                                </div>
                                                <div className="filter-container-content">
                                                    <label className="input-selected">
                                                        <input type="radio" name="sort-price" value="asc" checked/>
                                                        <span>Increase in price</span>
                                                    </label>
                                                    <label className="input-selected">
                                                        <input type="radio" name="sort-price" value="desc"/>
                                                        <span>Decrease in price</span>
                                                    </label>
                                                </div>
                                            </div>}
                                            <div className="filter-body-container">
                                                <div className="filter-container-title">
                                                    ЦЕНА
                                                </div>
                                                <div className="filter-container-content">
                                                    <input className="input-default" type="number" placeholder="Минимум"/>
                                                    <input className="input-default" type="number" placeholder="Максимум"/>
                                                </div>
                                            </div>
                                            <div className="filter-body-container">
                                                <div className="filter-container-title">
                                                    ТИП ФАЙЛА
                                                </div>
                                                <div className="filter-container-content">
                                                    <label className="input-selected">
                                                        <input type="radio" name="type-file" value=""
                                                               onChange={this.handleChangeType}/>
                                                        <span>All</span>
                                                    </label>
                                                    <label className="input-selected">
                                                        <input type="radio" name="type-file" value="raster-image"
                                                               onChange={this.handleChangeType}/>
                                                        <span>Images</span>
                                                    </label>
                                                    <label className="input-selected">
                                                        <input type="radio" name="type-file" value="video"
                                                               onChange={this.handleChangeType}/>
                                                        <span>Video</span>
                                                    </label>
                                                    <label className="input-selected">
                                                        <input type="radio" name="type-file" value="audio"
                                                               onChange={this.handleChangeType}/>
                                                        <span>Music</span>
                                                    </label>
                                                    <label className="input-selected">
                                                        <input type="radio" name="type-file" value="3d-image"
                                                               onChange={this.handleChangeType}/>
                                                        <span>3D</span>
                                                    </label>
                                                    <label className="input-selected">
                                                        <input type="radio" name="type-file" value="document"
                                                               onChange={this.handleChangeType}/>
                                                        <span>Docs</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <button type="submit" onClick={this.goSearch} id="left-filter-btn">
                                                Применить
                                            </button>

                                            {false && <div className="filter-body-container">
                                                <div className="d-flex align-items-center">
                                                    <div className="filter-container-title" style={{marginBottom: 0}}>
                                                        В ПРОДАЖЕ
                                                    </div>
                                                    <label className="switch-btn">
                                                        <input type="checkbox" name="enable-filter"/>
                                                        <span className="switch-element"></span>
                                                    </label>
                                                </div>
                                            </div>}
                                        </form>
                                    </div>
                                </div>
                                <div className="col">
                                    <div id="pagination-container"></div>
                                    <div className="product-list">
                                        <div className="row justify-content-center align-items-center" id="wrapper-cart-list" style={{position:"relative" }}>
                                            {this.state.view === 'nft' ? <this.AllNFTs/> : <this.AllCollections/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <div id="wrapper-filter-popup" className={this.state.isOpenFilter ? "btn-filter-active" : ""}>
                        <div id="background-filter-popup"></div>
                        <div className="container content-filter-popup">
                            <div className="header-filter-popup d-flex justify-content-between">
                                <span className="popup-title">Filter</span>
                                <div id="close-filter-popup" onClick={this.turnOffFilter}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15 1.77405L14.226 1L8 7.22595L1.77405 1L1 1.77405L7.22595 8L1 14.226L1.77405 15L8 8.77405L14.226 15L15 14.226L8.77405 8L15 1.77405Z"
                                            fill="white" stroke="white" stroke-width="0.4"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="body-filter-popup">
                                <form className="filter-main" method="get">

                                    <div className="filter-body-container">
                                        <div className="filter-container-title">
                                            SORTING
                                        </div>
                                        <div className="filter-container-content">
                                            <label className="input-selected">
                                                <input type="radio" name="sort-price" value="asc" checked/>
                                                <span>Increase in price</span>
                                            </label>
                                            <label className="input-selected">
                                                <input type="radio" name="sort-price" value="desc"/>
                                                <span>Decrease in price</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="filter-body-container">
                                        <div className="filter-container-title">
                                            PRICE
                                        </div>
                                        <div className="filter-container-content">
                                            <input className="input-default" type="number" placeholder="Min"/>
                                            <input className="input-default" type="number" placeholder="Max"/>
                                        </div>
                                    </div>
                                    <div className="filter-body-container">
                                        <div className="filter-container-title">
                                            FILE TYPE
                                        </div>
                                        <div className="filter-container-content">
                                            <label className="input-selected">
                                                <input type="radio" name="type-file" value=""
                                                       onChange={this.handleChangeType}/>
                                                <span>All</span>
                                            </label>
                                            <label className="input-selected">
                                                <input type="radio" name="type-file" value="raster-image"
                                                       onChange={this.handleChangeType}/>
                                                <span>Images</span>
                                            </label>
                                            <label className="input-selected">
                                                <input type="radio" name="type-file" value="video"
                                                       onChange={this.handleChangeType}/>
                                                <span>Video</span>
                                            </label>
                                            <label className="input-selected">
                                                <input type="radio" name="type-file" value="audio"
                                                       onChange={this.handleChangeType}/>
                                                <span>Music</span>
                                            </label>
                                            <label className="input-selected">
                                                <input type="radio" name="type-file" value="3d-image"
                                                       onChange={this.handleChangeType}/>
                                                <span>3D</span>
                                            </label>
                                            <label className="input-selected">
                                                <input type="radio" name="type-file" value="document"
                                                       onChange={this.handleChangeType}/>
                                                <span>Docs</span>
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" id="searchsubmit" value=""
                                            className='btn btn-outline-primary' onClick={this.goSearch}>&#128269;</button>

                                    <div className="filter-body-container">
                                        <div className="d-flex align-items-center">
                                            <div className="filter-container-title" style={{marginBottom: 0}}>
                                                ON SALE IN
                                            </div>
                                            <label className="switch-btn">
                                                <input type="checkbox" name="enable-filter"/>
                                                <span className="switch-element"></span>
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </>

            )
        }
    }
);
export default MyProfile;