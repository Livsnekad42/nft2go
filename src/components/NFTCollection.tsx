import React, {KeyboardEvent} from "react";
import * as H from "history";
import rmrkStore from "../stores/rmrkStore";
import {observer} from "mobx-react";
import userStore from "../stores/userStore";
import {Link} from "react-router-dom";
import globalStore from "../stores/globalStore";
import Loader from "./Loader";
import { Accordion, Card} from 'react-bootstrap';
import nftStore from "../stores/nftStore";
import { toJS } from 'mobx';
import {
    addFavorite1,
    addFavorite2,
    addFavoriteOpensea,
    deleteFavorite1,
    deleteFavorite2, deleteFavoriteOpensea
} from "../requests/axiosRequests";
import {runInAction} from "mobx";
import {isLogged} from "../settings/utils";
import InfiniteScroll from '../assets/plugins/react-infinite-scroller';


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
    query: string,
    typeContent: string,
    price: {
        min: any,
        max:any
    },
    view: string,
    visible: boolean,
    isOpenFilter: boolean,
    has: boolean,
    currency: string,
    sortPrice: string,
    load: boolean,
    styleView: string,
    appliedAttributes: string[],
    filterAttribute: string
}

const NFTCollection = observer(
    class NFTCollection extends React.Component<IRouteComponentProps<any>, IState> {

        constructor(props:any) {
            super(props);

            this.addFavoriteHandler = this.addFavoriteHandler.bind(this);
            this.setNFT = this.setNFT.bind(this);
            this.setActivity = this.setActivity.bind(this);
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
            this.toggleStyleView = this.toggleStyleView.bind(this);
            this.goSearch = this.goSearch.bind(this);
            this.state = {
                query: "",
                typeContent: "",
                price: {
                    min:0,
                    max:999
                },
                view: "nft",
                visible: true,
                isOpenFilter: false,
                has: true,
                currency: "KSM",
                sortPrice: "ASC",
                load: false,
                styleView: "grid",
                appliedAttributes: [""],
                filterAttribute: ""
            };
        }

        thresh = 800;

        currID = this.props.match.params.id;

        setNFT(event: any) {
            this.setState({
                view: "nft",
                visible: true
            })
        }

        setActivity(event: any) {
            this.setState({
                view: "activity",
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
                    rmrkStore.collectionNFTs.nfts.map((nft: any) => {
                        if (nft.id === nftId) {
                            runInAction(() => {
                                nft.isFavorite = true;
                            })

                        }
                    })
                } else {
                    await addFavorite1({nftId, collectionId: collection});
                    rmrkStore.collectionNFTs.nfts.map((nft: any) => {
                        if (nft.id === nftId) {
                            runInAction(() => {
                                nft.isFavorite = true;
                            })

                        }
                    })
                }
                rmrkStore.getCollNFTs(this.currID, 1, 10)
        }

        async deleteFavoriteHandler(event: any, nftId: any, collection: any) {
                if (nftStore.rmrkVersion === 2) {
                    await deleteFavorite2({nftId, collectionId: collection});
                    rmrkStore.collectionNFTs.nfts.map((nft: any) => {
                        if (nft.id === nftId) {
                            runInAction(() => {
                                nft.isFavorite = false;
                            })

                        }
                    })
                } else {
                    await deleteFavorite1({nftId, collectionId: collection});
                    rmrkStore.collectionNFTs.nfts.map((nft: any) => {
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

        turnOffFilter() {
            this.setState({
                isOpenFilter: false
            });
        }


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


        async handleLoadRMRKNFTs(page: any) {
            globalStore.setLoader(true);
            if (this.state.load) {
                return
            }
            await this.setState({load: true})
            let len = rmrkStore.collectionNFTs.nfts.length;
            await rmrkStore.getCollNFTs(this.currID, page, 10, this.state.query, this.state.typeContent, this.state.price.min, this.state.price.max, false)
            if (len === rmrkStore.collectionNFTs.nfts.length) {
               await this.setState({has: false})
            } else {
                await this.setState({has: true})
            }
            this.setState({load: false})
            globalStore.setLoader(false)
        }


        async goSearch(event: any) {
            event.preventDefault();
                await rmrkStore.getCollNFTs(this.currID, 1, 10, this.state.query);
        }

        componentDidMount() {
            rmrkStore.getSingleCollection(this.currID);
            rmrkStore.getCollNFTs(this.currID);

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
                        <div className="container-ext">
                            <div className="container">
                                <div id="nft-top-wrapper" className="d-flex flex-column justify-content-center align-items-center" style={{margin: "0 auto"}}>

                                    <img src={rmrkStore.singleCollection.collection.meta.thumb} className="img-fluid" style={{borderRadius:"50%", maxWidth:"120px"}}/>
                                    <h1>{rmrkStore.singleCollection.collection.meta.name}</h1>
                                    <p style={{width:"100%", wordWrap: "break-word", textAlign:"center"}}>Создано {rmrkStore.singleCollection.collection.issuer}</p>
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
                                    <ul id="coll-stats" className="d-flex flex-md-row flex-wrap" style={{listStyle: "none", gap:10}}>
                                        <li className="mnemo-word">
                                            <span>3.5k</span>артов
                                        </li>
                                        <li className="mnemo-word">
                                            <span>1.9k</span>владельцев
                                        </li>
                                        <li className="mnemo-word">
                                            <span>0.08 KSM</span>минимум
                                        </li>
                                        <li className="mnemo-word">
                                            <span>3.5k KSM</span>объём продаж
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
                                                style={{zIndex: 5, borderBottom: "1px solid rgb(50, 62, 92)"}}>
                                                <div
                                                    className="selected-menu-list flex-wrap d-flex align-items-center justify-content-center">
                                                    <label className="input-selected coll-top">
                                                        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.4247 23.765C12.5002 23.8395 12.5899 23.8986 12.6886 23.9389C12.7873 23.9792 12.8931 24 13 24C13.1069 24 13.2127 23.9792 13.3114 23.9389C13.4101 23.8986 13.4998 23.8395 13.5753 23.765L16.5864 20.7988H22.75C23.612 20.7988 24.4386 20.4616 25.0481 19.8616C25.6576 19.2615 26 18.4476 26 17.5989V3.19981C26 2.35117 25.6576 1.53728 25.0481 0.937202C24.4386 0.337122 23.612 0 22.75 0H3.25C2.38805 0 1.5614 0.337122 0.951903 0.937202C0.34241 1.53728 0 2.35117 0 3.19981L0 17.5989C0 18.4476 0.34241 19.2615 0.951903 19.8616C1.5614 20.4616 2.38805 20.7988 3.25 20.7988H9.41363L12.4247 23.765ZM1.625 12.7992V7.99952H24.375V12.7992H1.625ZM24.375 14.3991V17.5989C24.375 18.0233 24.2038 18.4302 23.899 18.7303C23.5943 19.0303 23.181 19.1989 22.75 19.1989H16.5864C16.1554 19.1989 15.7422 19.3676 15.4375 19.6676L13 22.0675L10.5625 19.6676C10.2578 19.3676 9.84457 19.1989 9.41363 19.1989H3.25C2.81902 19.1989 2.4057 19.0303 2.10095 18.7303C1.7962 18.4302 1.625 18.0233 1.625 17.5989V14.3991H24.375ZM24.375 6.39962H1.625V3.19981C1.625 2.77549 1.7962 2.36855 2.10095 2.06851C2.4057 1.76847 2.81902 1.5999 3.25 1.5999H22.75C23.181 1.5999 23.5943 1.76847 23.899 2.06851C24.2038 2.36855 24.375 2.77549 24.375 3.19981V6.39962ZM3.25 16.799C3.25 17.0112 3.3356 17.2146 3.48798 17.3647C3.64035 17.5147 3.84701 17.5989 4.0625 17.5989H17.0625C17.278 17.5989 17.4847 17.5147 17.637 17.3647C17.7894 17.2146 17.875 17.0112 17.875 16.799C17.875 16.5868 17.7894 16.3834 17.637 16.2333C17.4847 16.0833 17.278 15.999 17.0625 15.999H4.0625C3.84701 15.999 3.64035 16.0833 3.48798 16.2333C3.3356 16.3834 3.25 16.5868 3.25 16.799ZM3.25 10.3994C3.25 10.6115 3.3356 10.815 3.48798 10.965C3.64035 11.1151 3.84701 11.1993 4.0625 11.1993H21.9375C22.153 11.1993 22.3597 11.1151 22.512 10.965C22.6644 10.815 22.75 10.6115 22.75 10.3994C22.75 10.1872 22.6644 9.98375 22.512 9.83373C22.3597 9.68371 22.153 9.59943 21.9375 9.59943H4.0625C3.84701 9.59943 3.64035 9.68371 3.48798 9.83373C3.3356 9.98375 3.25 10.1872 3.25 10.3994ZM3.25 3.99976C3.25 4.21192 3.3356 4.41539 3.48798 4.56541C3.64035 4.71543 3.84701 4.79971 4.0625 4.79971H13.8125C14.028 4.79971 14.2347 4.71543 14.387 4.56541C14.5394 4.41539 14.625 4.21192 14.625 3.99976C14.625 3.7876 14.5394 3.58413 14.387 3.43411C14.2347 3.28409 14.028 3.19981 13.8125 3.19981H4.0625C3.84701 3.19981 3.64035 3.28409 3.48798 3.43411C3.3356 3.58413 3.25 3.7876 3.25 3.99976Z" fill="white"/>
                                                        </svg>
                                                        <input type="radio" name="essence-filtration" value="nfts"
                                                               className="common_selector main-category-nft" onChange={this.setNFT}
                                                               defaultChecked={true}/>
                                                        <span style={{background:"transparent !important"}}>NFTs</span>
                                                    </label>
                                                    <label className="input-selected coll-top" style={{marginRight: 0}}>
                                                        <input type="radio" name="essence-filtration" value="collection"
                                                               className="common_selector main-category-nft"
                                                               onChange={this.setActivity}/>
                                                        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 0C12.9684 8.74439e-05 13.1814 0.0634954 13.3601 0.181596C13.5388 0.299696 13.6745 0.466752 13.7487 0.660032L21.25 20.073L24.5012 11.6566C24.5762 11.464 24.7122 11.2978 24.8908 11.1805C25.0695 11.0632 25.2822 11.0003 25.5 11.0005H32.9375C33.2193 11.0005 33.4895 11.1059 33.6888 11.2934C33.8881 11.481 34 11.7354 34 12.0006C34 12.2658 33.8881 12.5202 33.6888 12.7077C33.4895 12.8953 33.2193 13.0006 32.9375 13.0006H26.2438L22.2488 23.3411C22.1743 23.5342 22.0385 23.701 21.8598 23.8189C21.6811 23.9368 21.4682 24 21.25 24C21.0318 24 20.8189 23.9368 20.6402 23.8189C20.4615 23.701 20.3257 23.5342 20.2512 23.3411L12.75 3.92819L9.49875 12.3426C9.42416 12.5355 9.2883 12.7021 9.10962 12.8199C8.93094 12.9376 8.7181 13.0007 8.5 13.0006H1.0625C0.780707 13.0006 0.510456 12.8953 0.311199 12.7077C0.111942 12.5202 0 12.2658 0 12.0006C0 11.7354 0.111942 11.481 0.311199 11.2934C0.510456 11.1059 0.780707 11.0005 1.0625 11.0005H7.75625L11.7513 0.660032C11.8255 0.466752 11.9612 0.299696 12.1399 0.181596C12.3186 0.0634954 12.5316 8.74439e-05 12.75 0Z" fill="white"/>
                                                        </svg>&nbsp;&nbsp;
                                                        <span style={{background:"transparent !important"}}>Activity</span>
                                                    </label>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 wrapper-option-filter"
                                     style={this.state.visible ? {display: "block", borderRight: "1px solid rgb(50, 62, 92)", maxWidth:330} : {display: "none", borderRight: "1px solid rgb(50, 62, 92)", maxWidth:330}}>
                                    <div className="option-filter">
                                        <div className="filter-main">

                                            <div className="filter-body-container">
                                                <div className="filter-container-title">
                                                    ЦЕНА
                                                </div>
                                                <button id="currency-button" className="input-default wrapper-select-marketplace" onSubmit={(e: any) => {e.preventDefault()}} style={{marginBottom:15}}>
                                                    <div className="title-select-marketplace">
                                                        <span>{this.state.currency}</span>&nbsp;
                                                        <span>
                                            <svg width="9" height="6" viewBox="0 0 9 6" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.64711 5.30342L8.84561 0.976196H0.448608L4.64711 5.30342Z"
                                                      fill="white"></path>
                                            </svg>
                                        </span>
                                                    </div>
                                                    <div className="filter-container-content">
                                                        <label className="input-selected">
                                                            <input type="radio" name="currency" value="USD"
                                                                   onClick={(e) => {
                                                                       this.handleChangeCurrency(e, 'USD')
                                                                   }}/>
                                                            <span>USD</span>
                                                        </label>

                                                        <label className="input-selected">
                                                            <input type="radio" name="currency" value="KSM"
                                                                   defaultChecked={true} onClick={(e) => {
                                                                this.handleChangeCurrency(e, 'KSM')
                                                            }}/>
                                                            <span>KSM</span>
                                                        </label>
                                                    </div>
                                                </button>
                                                <div className="filter-container-content">
                                                    <input className="input-default" type="number" placeholder="Минимум"/>
                                                    <input className="input-default" type="number" placeholder="Максимум"/>
                                                </div>
                                            </div>
                                            <div className="filter-body-container">
                                                <div className="d-flex align-items-center">
                                                    <div className="filter-container-title" style={{marginBottom: 0}}>
                                                        ПРОДАЁТСЯ
                                                    </div>
                                                    <label className="switch-btn">
                                                        <input type="checkbox" name="enable-filter"/>
                                                        <span className="switch-element"></span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="filter-body-container">
                                                <div>

                                                    <Accordion>
                                                        {rmrkStore.testAttributes && rmrkStore.testAttributes.map((attribute: any, index) => {
                                                            return (
                                                                <>
                                                                <Accordion.Toggle eventKey={index.toString()} className='accordion-button border-0 bg-white text-dark' onClick={this.clearFilterAttribute}>
                                                                    <div className="d-flex justify-content-around attribute-name-filter" style={{width:"100%", padding:9, maxWidth:280}}>
                                                                        <span>{attribute["key"]}</span>
                                                                        <span>({attribute["counts"].length})</span>
                                                                    </div>
                                                                </Accordion.Toggle>
                                                                <Accordion.Collapse eventKey={index.toString()}>
                                                                <div className="d-flex flex-column justify-content-center" style={{maxWidth:280}}>
                                                                    <input type="text" onChange={this.filterCollection} value={this.state.filterAttribute}  style={{marginBottom:20, marginTop:10}} className="search-attr-input" placeholder="Поиск"/>
                                                                    {attribute["counts"] && attribute["counts"].filter((value: any) => value["value"].includes(this.state.filterAttribute)).map((val: any) => {
                                                                        return (
                                                                            <>
                                                                                <div className="d-flex justify-content-between align-items-center" style={{width:"100%"}}>
                                                                                    <input type="checkbox" value={val["value"]} id={`attr-check-${val["value"]}`} onChange={this.handleChangeAppliedAttributes} checked={this.state.appliedAttributes.includes(val["value"]) ? true : false} style={{marginRight:17}}/>
                                                                                    <label htmlFor={`attr-check-${val["value"]}`} className="d-flex justify-content-between" style={{width:"100%"}}>
                                                                                        <span>{val["value"]}</span>
                                                                                        <span>{val["count"]}</span>
                                                                                    </label>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </Accordion.Collapse>
                                                                </>
                                                            )
                                                        })}
                                                    </Accordion>

                                                </div>
                                            </div>

                                            <button type="submit" onClick={this.goSearch} style={{borderRadius:"50px", backgroundColor:"#6837AF", border: "none", padding:10}}>
                                                <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8168 12.2717C21.8168 13.5252 21.5699 14.7664 21.0902 15.9244C20.6105 17.0825 19.9074 18.1347 19.0211 19.0211C18.1347 19.9074 17.0825 20.6105 15.9244 21.0902C14.7664 21.5699 13.5252 21.8168 12.2717 21.8168C11.0182 21.8168 9.77699 21.5699 8.61893 21.0902C7.46086 20.6105 6.40862 19.9074 5.52228 19.0211C4.63593 18.1347 3.93285 17.0825 3.45316 15.9244C2.97347 14.7664 2.72658 13.5252 2.72658 12.2717C2.72658 9.74016 3.73223 7.31233 5.52228 5.52228C7.31233 3.73223 9.74016 2.72658 12.2717 2.72658C14.8032 2.72658 17.231 3.73223 19.0211 5.52228C20.8111 7.31233 21.8168 9.74016 21.8168 12.2717ZM19.9323 21.8604C17.4817 23.8182 14.3745 24.7634 11.2488 24.5018C8.12312 24.2402 5.21623 22.7917 3.12513 20.4539C1.03404 18.116 -0.0825266 15.0662 0.00475732 11.9308C0.0920412 8.79536 1.37655 5.81239 3.59447 3.59447C5.81239 1.37655 8.79536 0.0920412 11.9308 0.00475732C15.0662 -0.0825266 18.116 1.03404 20.4539 3.12513C22.7917 5.21623 24.2402 8.12312 24.5018 11.2488C24.7634 14.3745 23.8182 17.4817 21.8604 19.9323L29.6001 27.6693C29.7269 27.7961 29.8275 27.9466 29.8961 28.1122C29.9647 28.2779 30 28.4554 30 28.6347C30 28.814 29.9647 28.9915 29.8961 29.1572C29.8275 29.3228 29.7269 29.4733 29.6001 29.6001C29.4733 29.7269 29.3228 29.8275 29.1572 29.8961C28.9915 29.9647 28.814 30 28.6347 30C28.4554 30 28.2779 29.9647 28.1122 29.8961C27.9466 29.8275 27.7961 29.7269 27.6693 29.6001L19.935 21.8604H19.9323Z" fill="white"/>
                                                </svg>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div id="filter-nft-top-container">
                                        <div className="d-flex" id="top-bar-filter">
                                            <div className="wrapper-searching" id="top-sect">
                                                <input type="text" placeholder="Поиск" onChange={this.handleChangeQuery}
                                                       onKeyDown={this.handleKey}/>
                                                <button type="submit" onClick={this.goSearch}>
                                                    <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8168 12.2717C21.8168 13.5252 21.5699 14.7664 21.0902 15.9244C20.6105 17.0825 19.9074 18.1347 19.0211 19.0211C18.1347 19.9074 17.0825 20.6105 15.9244 21.0902C14.7664 21.5699 13.5252 21.8168 12.2717 21.8168C11.0182 21.8168 9.77699 21.5699 8.61893 21.0902C7.46086 20.6105 6.40862 19.9074 5.52228 19.0211C4.63593 18.1347 3.93285 17.0825 3.45316 15.9244C2.97347 14.7664 2.72658 13.5252 2.72658 12.2717C2.72658 9.74016 3.73223 7.31233 5.52228 5.52228C7.31233 3.73223 9.74016 2.72658 12.2717 2.72658C14.8032 2.72658 17.231 3.73223 19.0211 5.52228C20.8111 7.31233 21.8168 9.74016 21.8168 12.2717ZM19.9323 21.8604C17.4817 23.8182 14.3745 24.7634 11.2488 24.5018C8.12312 24.2402 5.21623 22.7917 3.12513 20.4539C1.03404 18.116 -0.0825266 15.0662 0.00475732 11.9308C0.0920412 8.79536 1.37655 5.81239 3.59447 3.59447C5.81239 1.37655 8.79536 0.0920412 11.9308 0.00475732C15.0662 -0.0825266 18.116 1.03404 20.4539 3.12513C22.7917 5.21623 24.2402 8.12312 24.5018 11.2488C24.7634 14.3745 23.8182 17.4817 21.8604 19.9323L29.6001 27.6693C29.7269 27.7961 29.8275 27.9466 29.8961 28.1122C29.9647 28.2779 30 28.4554 30 28.6347C30 28.814 29.9647 28.9915 29.8961 29.1572C29.8275 29.3228 29.7269 29.4733 29.6001 29.6001C29.4733 29.7269 29.3228 29.8275 29.1572 29.8961C28.9915 29.9647 28.814 30 28.6347 30C28.4554 30 28.2779 29.9647 28.1122 29.8961C27.9466 29.8275 27.7961 29.7269 27.6693 29.6001L19.935 21.8604H19.9323Z" fill="white"/>
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="row" id="top-right-filter-section">
                                                <div className="col-9">
                                            <button className="input-default wrapper-select-marketplace" id="price-sorter-btn" onSubmit={(e: any) => {e.preventDefault()}}>
                                                <div className="title-select-marketplace">
                                                    <span>{this.state.sortPrice === "ASC" ? "Цена по возрастанию" : "Цена по убыванию"}</span>
                                                    <span>
                                            <svg width="9" height="6" viewBox="0 0 9 6" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.64711 5.30342L8.84561 0.976196H0.448608L4.64711 5.30342Z"
                                                      fill="white"></path>
                                            </svg>
                                        </span>
                                                </div>
                                                <div className="filter-container-content">
                                                    <label className="input-selected">
                                                        <input type="radio" name="sortPrice" value="DESC"
                                                               onClick={(e) => {
                                                                   this.handleChangePriceSort(e, 'DESC')
                                                               }}/>
                                                        <span>Цена по убыванию</span>
                                                    </label>

                                                    <label className="input-selected">
                                                        <input type="radio" name="sortPrice" value="ASC"
                                                               defaultChecked={true} onClick={(e) => {
                                                            this.handleChangePriceSort(e, 'ASC')
                                                        }}/>
                                                        <span>Цена по возрастанию</span>
                                                    </label>
                                                </div>
                                            </button>
                                                </div>
                                                <div className="col-3">
                                            <div className="change-style-view" onClick={this.toggleStyleView}>
                                                <svg width="31" height="29" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.625 0H30C31.4918 0 32.9226 0.553124 33.9775 1.53769C35.0324 2.52226 35.625 3.85761 35.625 5.25V28C35.625 29.3924 35.0324 30.7277 33.9775 31.7123C32.9226 32.6969 31.4918 33.25 30 33.25H5.625C4.13316 33.25 2.70242 32.6969 1.64752 31.7123C0.592632 30.7277 0 29.3924 0 28V5.25C0 3.85761 0.592632 2.52226 1.64752 1.53769C2.70242 0.553124 4.13316 0 5.625 0ZM5.625 1.75C4.63044 1.75 3.67661 2.11875 2.97335 2.77513C2.27009 3.4315 1.875 4.32174 1.875 5.25V10.5H11.25V1.75H5.625ZM1.875 28C1.875 28.9283 2.27009 29.8185 2.97335 30.4749C3.67661 31.1313 4.63044 31.5 5.625 31.5H11.25V22.75H1.875V28ZM11.25 12.25H1.875V21H11.25V12.25ZM30 31.5C30.9946 31.5 31.9484 31.1313 32.6516 30.4749C33.3549 29.8185 33.75 28.9283 33.75 28V22.75H24.375V31.5H30ZM33.75 12.25H24.375V21H33.75V12.25ZM33.75 5.25C33.75 4.32174 33.3549 3.4315 32.6516 2.77513C31.9484 2.11875 30.9946 1.75 30 1.75H24.375V10.5H33.75V5.25ZM13.125 1.75V10.5H22.5V1.75H13.125ZM13.125 31.5H22.5V22.75H13.125V31.5ZM22.5 12.25H13.125V21H22.5V12.25Z" fill="white"/>
                                                </svg>
                                            </div>
                                                </div>
                                            </div>

                                            <button className="input-default wrapper-select-marketplace" id="price-sorter-btn" onSubmit={(e: any) => {e.preventDefault()}}>
                                                        <div className="title-select-marketplace">
                                                            <span>{this.state.sortPrice === "ASC" ? "Цена по возрастанию" : "Цена по убыванию"}</span>
                                                            <span>
                                            <svg width="9" height="6" viewBox="0 0 9 6" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.64711 5.30342L8.84561 0.976196H0.448608L4.64711 5.30342Z"
                                                      fill="white"></path>
                                            </svg>
                                        </span>
                                                        </div>
                                                        <div className="filter-container-content">
                                                            <label className="input-selected">
                                                                <input type="radio" name="sortPrice" value="DESC"
                                                                       onClick={(e) => {
                                                                           this.handleChangePriceSort(e, 'DESC')
                                                                       }}/>
                                                                <span>Цена по убыванию</span>
                                                            </label>

                                                            <label className="input-selected">
                                                                <input type="radio" name="sortPrice" value="ASC"
                                                                       defaultChecked={true} onClick={(e) => {
                                                                    this.handleChangePriceSort(e, 'ASC')
                                                                }}/>
                                                                <span>Цена по возрастанию</span>
                                                            </label>
                                                        </div>
                                                    </button>
                                                    <div className="change-style-view" onClick={this.toggleStyleView}>
                                                        <svg width="31" height="29" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.625 0H30C31.4918 0 32.9226 0.553124 33.9775 1.53769C35.0324 2.52226 35.625 3.85761 35.625 5.25V28C35.625 29.3924 35.0324 30.7277 33.9775 31.7123C32.9226 32.6969 31.4918 33.25 30 33.25H5.625C4.13316 33.25 2.70242 32.6969 1.64752 31.7123C0.592632 30.7277 0 29.3924 0 28V5.25C0 3.85761 0.592632 2.52226 1.64752 1.53769C2.70242 0.553124 4.13316 0 5.625 0ZM5.625 1.75C4.63044 1.75 3.67661 2.11875 2.97335 2.77513C2.27009 3.4315 1.875 4.32174 1.875 5.25V10.5H11.25V1.75H5.625ZM1.875 28C1.875 28.9283 2.27009 29.8185 2.97335 30.4749C3.67661 31.1313 4.63044 31.5 5.625 31.5H11.25V22.75H1.875V28ZM11.25 12.25H1.875V21H11.25V12.25ZM30 31.5C30.9946 31.5 31.9484 31.1313 32.6516 30.4749C33.3549 29.8185 33.75 28.9283 33.75 28V22.75H24.375V31.5H30ZM33.75 12.25H24.375V21H33.75V12.25ZM33.75 5.25C33.75 4.32174 33.3549 3.4315 32.6516 2.77513C31.9484 2.11875 30.9946 1.75 30 1.75H24.375V10.5H33.75V5.25ZM13.125 1.75V10.5H22.5V1.75H13.125ZM13.125 31.5H22.5V22.75H13.125V31.5ZM22.5 12.25H13.125V21H22.5V12.25Z" fill="white"/>
                                                        </svg>
                                                    </div>
                                        </div>
                                        <div className="d-flex"></div>
                                    </div>
                                    <div className="d-flex" style={{marginBottom:20}}>
                                    {this.state.appliedAttributes.filter(attr => attr !== "") && this.state.appliedAttributes.filter(attr => attr !== "").map((attr: any) => {
                                        return (
                                                <div className="applied-filter" onClick={this.deleteAttributes}>
                                                    {attr}
                                                </div>
                                        )
                                    })}
                                    </div>
                                    <div className="product-list">
                                        <div className="row justify-content-center align-items-center" id="wrapper-cart-list" style={{position:"relative" }}>
                                            {this.state.view === 'nft' ? <InfiniteScroll
                                                pageStart={1}
                                                loadMore={this.handleLoadRMRKNFTs}
                                                hasMore={this.state.has}
                                                threshold={this.thresh}
                                                element="div"
                                                className="row justify-content-center align-items-center"
                                                id={"wrapper-cart-list"}
                                                loader={<div className="loader" key={0}>Loading ...</div>}
                                            >
                                                {this.state.styleView === "grid" ? <>
                                                {rmrkStore.collectionNFTs.nfts && rmrkStore.collectionNFTs.nfts.map((nft: any): any => {
                                                    return (
                                                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                                                            <div className="single-cart-cell">
                                                                <div className="cart-cell-header d-flex justify-content-between align-items-center">
                                                                    <p className="cart-cell-author">{nft.owner.slice(0, 7) + ".."}</p>
                                                                    <p className="cart-cell-info-text">No subs</p>
                                                                </div>
                                                                <div className="cart-cell-body position-relative">
                                                                    <div className="w-100 h-100">
                                                                        <img loading="lazy" src={nft.meta.thumb} className="image-nft-cart"
                                                                             style={{maxHeight: '100%', height: "100%", width: "100%"}}/>
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
                                                                        className="d-flex flex-column flex-lg-row justify-content-between container-info-cart-cell"
                                                                        style={{gap: 15}}>
                                                                        <div className="d-flex flex-column justify-content-between">
                                                                            <div className="category-name-collection">{nft.collection.slice(0, 7) + ".."}</div>
                                                                            <div className="itself-name-collection"><Link
                                                                                to={"/nfts/" + nft.id}>{nft.meta.name ? nft.meta.name.slice(0, 7) + ".." : ""}</Link></div>
                                                                        </div>
                                                                        <div className="d-flex flex-column justify-content-between">
                                                                            <div className="bet-price-collection">
                                                    <span
                                                        className="itself-bet-price-collection">{nft.price.toString() !== "0" ? ((nft.price * 0.000000000001) * userStore.priceUSD).toFixed(2) + ' USD' : "Not listed"}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                </> : <>
                                                    {rmrkStore.collectionNFTs.nfts && rmrkStore.collectionNFTs.nfts.map((nft: any): any => {
                                                        return (
                                                            <div className="col-12">
                                                                <div className="single-cart-cell-list d-flex justify-content-center align-items-center">
                                                                    <img className="img-fluid" src={nft.meta.thumb}/>
                                                                    <span>{nft.meta.name.slice(0, 7) + ".."}</span>
                                                                    <p>{nft.meta.description.slice(0, 7) + ".."}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </>}
                                            </InfiniteScroll> : <></>}
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
                                                <span>Любой</span>
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

                                    <button type="submit" onClick={this.goSearch}>
                                        <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8168 12.2717C21.8168 13.5252 21.5699 14.7664 21.0902 15.9244C20.6105 17.0825 19.9074 18.1347 19.0211 19.0211C18.1347 19.9074 17.0825 20.6105 15.9244 21.0902C14.7664 21.5699 13.5252 21.8168 12.2717 21.8168C11.0182 21.8168 9.77699 21.5699 8.61893 21.0902C7.46086 20.6105 6.40862 19.9074 5.52228 19.0211C4.63593 18.1347 3.93285 17.0825 3.45316 15.9244C2.97347 14.7664 2.72658 13.5252 2.72658 12.2717C2.72658 9.74016 3.73223 7.31233 5.52228 5.52228C7.31233 3.73223 9.74016 2.72658 12.2717 2.72658C14.8032 2.72658 17.231 3.73223 19.0211 5.52228C20.8111 7.31233 21.8168 9.74016 21.8168 12.2717ZM19.9323 21.8604C17.4817 23.8182 14.3745 24.7634 11.2488 24.5018C8.12312 24.2402 5.21623 22.7917 3.12513 20.4539C1.03404 18.116 -0.0825266 15.0662 0.00475732 11.9308C0.0920412 8.79536 1.37655 5.81239 3.59447 3.59447C5.81239 1.37655 8.79536 0.0920412 11.9308 0.00475732C15.0662 -0.0825266 18.116 1.03404 20.4539 3.12513C22.7917 5.21623 24.2402 8.12312 24.5018 11.2488C24.7634 14.3745 23.8182 17.4817 21.8604 19.9323L29.6001 27.6693C29.7269 27.7961 29.8275 27.9466 29.8961 28.1122C29.9647 28.2779 30 28.4554 30 28.6347C30 28.814 29.9647 28.9915 29.8961 29.1572C29.8275 29.3228 29.7269 29.4733 29.6001 29.6001C29.4733 29.7269 29.3228 29.8275 29.1572 29.8961C28.9915 29.9647 28.814 30 28.6347 30C28.4554 30 28.2779 29.9647 28.1122 29.8961C27.9466 29.8275 27.7961 29.7269 27.6693 29.6001L19.935 21.8604H19.9323Z" fill="white"/>
                                        </svg>
                                    </button>

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

                    <footer id="footer">
                        <div className="container-ext">
                            <hr className="hr-general"/>
                            <div className="row">
                                <div className="col-12 col-md-4 text-center text-md-left row-logo-info">
                                    <a href="#"><img src="../../img/logo-nft.png"
                                                     alt="logo"
                                                     id="logo-footer"/></a>
                                    <div className="logo-text-footer text-italic-main">
                                        We’re bringing digital creators, crypto natives,<br/>
                                        and collector together to move culture forward
                                    </div>
                                    <div className="container-social-link">
                                        <a href="#">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2Z"
                                                      fill="white" fill-opacity="0.7"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20ZM25.0882 20.8785H22.0845V31.7596H17.5825V20.8789H15.3333V17.1293H17.5825V14.878C17.5825 11.819 18.8525 10 22.4609 10H25.465V13.7501H23.5872C22.1826 13.7501 22.0897 14.2741 22.0897 15.2521L22.0845 17.1288H25.4862L25.0882 20.8785Z"
                                                      fill="#071736"/>
                                            </svg>
                                        </a>
                                        <a href="#">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2Z"
                                                      fill="white" fill-opacity="0.7"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20ZM13.4308 9.8935C14.1091 9.62972 14.8842 9.44994 16.0198 9.39794C17.1576 9.34616 17.5211 9.3335 20.418 9.3335H20.4147C23.3125 9.3335 23.6747 9.34616 24.8125 9.39794C25.9481 9.44994 26.7237 9.62972 27.4037 9.8935C28.1059 10.1657 28.6992 10.5302 29.2926 11.1235C29.8859 11.7164 30.2504 12.3115 30.5237 13.0131C30.7859 13.6913 30.9659 14.4664 31.0193 15.602C31.0704 16.7398 31.0837 17.1034 31.0837 20.0003C31.0837 22.8972 31.0704 23.2599 31.0193 24.3977C30.9659 25.5328 30.7859 26.3081 30.5237 26.9866C30.2504 27.6879 29.8859 28.283 29.2926 28.8759C28.6999 29.4693 28.1057 29.8346 27.4043 30.107C26.7257 30.3708 25.9496 30.5506 24.8141 30.6026C23.6763 30.6544 23.3138 30.667 20.4167 30.667C17.52 30.667 17.1567 30.6544 16.0189 30.6026C14.8835 30.5506 14.1082 30.3708 13.4295 30.107C12.7284 29.8346 12.1333 29.4693 11.5406 28.8759C10.9475 28.283 10.583 27.6879 10.3104 26.9863C10.0468 26.3081 9.86703 25.533 9.81481 24.3974C9.76326 23.2596 9.75037 22.8972 9.75037 20.0003C9.75037 17.1034 9.7637 16.7396 9.81459 15.6018C9.8657 14.4667 10.0457 13.6913 10.3102 13.0129C10.5835 12.3115 10.9479 11.7164 11.5413 11.1235C12.1342 10.5304 12.7293 10.1659 13.4308 9.8935Z"
                                                      fill="#071736"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M20.4181 11.2551C23.2661 11.2551 23.6037 11.2653 24.7284 11.3164C25.7684 11.364 26.3328 11.5378 26.7089 11.6838C27.2066 11.8771 27.5615 12.1082 27.9346 12.4816C28.308 12.8549 28.5391 13.2105 28.7329 13.7082C28.8789 14.0838 29.0529 14.6483 29.1002 15.6883C29.1513 16.8127 29.1624 17.1505 29.1624 19.9972C29.1624 22.8439 29.1513 23.1817 29.1002 24.3061C29.0527 25.3461 28.8789 25.9106 28.7329 26.2862C28.5395 26.7839 28.308 27.1384 27.9346 27.5115C27.5613 27.8848 27.2069 28.1159 26.7089 28.3093C26.3333 28.456 25.7684 28.6293 24.7284 28.6768C23.6039 28.728 23.2661 28.7391 20.4181 28.7391C17.5699 28.7391 17.2323 28.728 16.1079 28.6768C15.0678 28.6288 14.5034 28.4551 14.1272 28.3091C13.6294 28.1157 13.2738 27.8846 12.9005 27.5113C12.5271 27.1379 12.296 26.7833 12.1023 26.2853C11.9563 25.9097 11.7823 25.3453 11.7349 24.3052C11.6838 23.1808 11.6736 22.843 11.6736 19.9945C11.6736 17.1461 11.6838 16.8101 11.7349 15.6856C11.7825 14.6456 11.9563 14.0811 12.1023 13.7051C12.2956 13.2074 12.5271 12.8518 12.9005 12.4785C13.2738 12.1051 13.6294 11.874 14.1272 11.6802C14.5032 11.5336 15.0678 11.3602 16.1079 11.3124C17.0919 11.268 17.4732 11.2547 19.4612 11.2524V11.2551C19.647 11.2548 19.8469 11.2549 20.0626 11.255L20.4181 11.2551ZM24.8313 14.3055C24.8313 15.0122 25.4046 15.5855 26.1113 15.5855C26.818 15.5855 27.3913 15.0122 27.3913 14.3055C27.3913 13.5989 26.818 13.0255 26.1113 13.0255V13.026C25.4046 13.026 24.8313 13.5986 24.8313 14.3055ZM20.4178 25.4754C17.3926 25.4754 14.9399 23.0239 14.9399 19.9987C14.9399 16.9736 17.3925 14.521 20.4176 14.5209C23.4427 14.5209 25.8947 16.9736 25.8947 19.9987C25.8947 23.0239 23.4429 25.4754 20.4178 25.4754Z"
                                                      fill="#071736"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M23.9734 19.9997C23.9734 21.9633 22.3814 23.5553 20.4178 23.5553C18.454 23.5553 16.8622 21.9633 16.8622 19.9997C16.8622 18.0359 18.454 16.4441 20.4178 16.4441V16.4441C22.3814 16.4441 23.9734 18.0359 23.9734 19.9997Z"
                                                      fill="#071736"/>
                                            </svg>
                                        </a>
                                        <a href="#">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2Z"
                                                      fill="white" fill-opacity="0.7"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20ZM19.5772 16.8631L20.2767 16.9478L20.2347 16.2558C20.1088 14.4621 21.214 12.8238 22.9627 12.1882C23.6062 11.9623 24.6974 11.934 25.4109 12.1317C25.6907 12.2165 26.2223 12.4989 26.6 12.7532L27.2855 13.2192L28.0409 12.9791C28.4606 12.852 29.0202 12.6402 29.272 12.4989C29.5098 12.3718 29.7197 12.3012 29.7197 12.3436C29.7197 12.5837 29.2021 13.4028 28.7684 13.8548C28.1808 14.4903 28.3487 14.5468 29.5378 14.1231C30.2513 13.883 30.2653 13.883 30.1254 14.1514C30.0414 14.2926 29.6078 14.7869 29.1461 15.2389C28.3627 16.0157 28.3207 16.1004 28.3207 16.7501C28.3207 17.7528 27.8451 19.8431 27.3694 20.9871C26.4881 23.1338 24.5995 25.3512 22.7109 26.467C20.0529 28.0347 16.5135 28.4301 13.5337 27.5121C12.5405 27.2014 10.8337 26.4105 10.8337 26.2692C10.8337 26.2269 11.3514 26.1704 11.9809 26.1562C13.2959 26.128 14.6109 25.7608 15.7301 25.1111L16.4855 24.6592L15.6182 24.3626C14.3871 23.9389 13.2819 22.9644 13.0021 22.0463C12.9182 21.7498 12.9462 21.7356 13.7296 21.7356L14.541 21.7215L13.8555 21.3967C13.0441 20.9871 12.3026 20.295 11.9389 19.5889C11.6731 19.0804 11.3374 17.7952 11.4353 17.6963C11.4633 17.654 11.7571 17.7387 12.0928 17.8517C13.0581 18.2048 13.184 18.12 12.6244 17.5269C11.5752 16.4535 11.2534 14.8575 11.7571 13.3463L11.9949 12.6684L12.9182 13.5864C14.8068 15.4366 17.0311 16.5382 19.5772 16.8631Z"
                                                      fill="#071736"/>
                                            </svg>
                                        </a>
                                        <a href="#">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2Z"
                                                      fill="white" fill-opacity="0.7"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20ZM20.0002 12.6672C20.0002 12.6672 26.6713 12.6672 28.3348 13.125C29.2528 13.3769 29.9757 14.1191 30.221 15.0616C30.6668 16.7698 30.6668 20.3339 30.6668 20.3339C30.6668 20.3339 30.6668 23.8979 30.221 25.6062C29.9757 26.5487 29.2528 27.2909 28.3348 27.5429C26.6713 28.0006 20.0002 28.0006 20.0002 28.0006C20.0002 28.0006 13.329 28.0006 11.6654 27.5429C10.7474 27.2909 10.0245 26.5487 9.77919 25.6062C9.3335 23.8979 9.3335 20.3339 9.3335 20.3339C9.3335 20.3339 9.3335 16.7698 9.77919 15.0616C10.0245 14.1191 10.7474 13.3769 11.6654 13.125C13.329 12.6672 20.0002 12.6672 20.0002 12.6672Z"
                                                      fill="#071736"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M17.9999 17.3328L23.3332 20.6662L17.9999 23.9994V17.3328Z"
                                                      fill="#071736"/>
                                            </svg>
                                        </a>
                                    </div>

                                </div>
                                <div className="col-12 col-md-2 text-center text-md-left">
                                    <nav className="menu-footer">
                                        <ul>
                                            <li>
                                                <span>About Us</span>
                                                <ul>
                                                    <li>
                                                        <a href="#">Team</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Tokenomics</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Whitepaper</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Roadmap</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-12 col-md-2 text-center text-md-left">
                                    <nav className="menu-footer">
                                        <ul>
                                            <li>
                                                <span>Our Marketplace</span>
                                                <ul>
                                                    <li>
                                                        <a href="#">Top Artists</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Top Collectors</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Newly minted</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Top Collections</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-12 col-md-2 text-center text-md-left">
                                    <nav className="menu-footer">
                                        <ul>
                                            <li>
                                                <span>NFT Services</span>
                                                <ul>
                                                    <li>
                                                        <a href="#">NFT Creation</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">NFT Burning</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">NFT Listing</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">NFT Auction</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-12 col-md-2 text-center text-md-left">
                                    <nav className="menu-footer">
                                        <ul>
                                            <li>
                                                <span>Helpful Links</span>
                                                <ul>
                                                    <li>
                                                        <a href="#">FAQ</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Tutorials</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Report a bag</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"> GET Token</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <hr className="hr-general hr-bottom"/>
                            <p className="footer-bottom-text text-italic-main">Copyright 2021 NFT2GO All Right
                                Reserved <br/> Developed by&nbsp;<a
                                    href="https://web-intellect.com/?utm_source=footer_nft2go" target="_blank"
                                    className="developer-link">Web-intellect</a></p>
                        </div>
                    </footer>
                </>

            )
        }
    }
);

export default NFTCollection;
