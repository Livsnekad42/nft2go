import React, {KeyboardEvent, useEffect, useState} from "react";
import rmrkStore from "../stores/rmrkStore";
import {ICollectionOpenSea, INFTOpenSea, INFTRMRK, ISingleCollectionInAll} from "../interfaces/NFTInterface";
import {Link, useLocation } from 'react-router-dom';
import {observer} from "mobx-react";
import userStore from "../stores/userStore";
import {
    EmailIcon,
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton, MailruIcon,
    MailruShareButton, OKIcon,
    OKShareButton, PinterestIcon,
    PinterestShareButton, RedditIcon,
    RedditShareButton, TelegramIcon,
    TelegramShareButton, TumblrIcon,
    TumblrShareButton, TwitterIcon,
    TwitterShareButton, ViberIcon,
    ViberShareButton, VKIcon,
    VKShareButton, WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {runInAction} from "mobx";
import {images} from '../App';
import {
    addFavorite1,
    addFavorite2,
    addFavoriteOpensea,
    deleteFavorite1,
    deleteFavorite2, deleteFavoriteOpensea
} from "../requests/axiosRequests";
import openseaStore from "../stores/openseaStore";
import InfiniteScroll from '../assets/plugins/react-infinite-scroller';
import {isLogged} from "../settings/utils";
import nftStore from "../stores/nftStore";
import Loader from "./Loader";
import globalStore from "../stores/globalStore";
import {mnemonicGenerate} from "@polkadot/util-crypto";

const Feed = observer(() => {

        const LocalSlider = () => {
            return (
                <Slider range onChange={(e: any) => setPrice({min: e[0], max: e[1]})} min={1} max={999}
                        defaultValue={[0, 9999]}/>
            )
        }
        const [query, setQuery] = useState('');
        const [isOpenFilter, setIsOpenFilter] = useState(false);
        const [isOpenMarket, setIsOpenMarket] = useState(false);
        const [marketplace, setMarketplace] = useState('Singular');
        const [visible, setVisible] = useState(true);
        const [typeContent, setTypecontent] = useState('');
        const [view, setView] = useState('nft');
        const [has, setHas] = useState(true);
        const [load, setLoad] = useState(false);
        const [isViewed, setViewed] = useState(false);
        const [sort, setSort] = useState("");
        const [price, setPrice] = useState({
            min: 0,
            max: 0,
        });


        function setNFT(event: any) {
            setView('nft');
            setVisible(true)
            setHas(true)
            if (marketplace === 'Singular') {
                rmrkStore.getAllNFT(1, 10)
            } else {
                openseaStore.getAllNFTs(1, 10)
            }
        }

        async function addFavoriteHandler(event: any, nftId: any, collection: any) {
            if (marketplace === 'Singular') {
                if (nftStore.rmrkVersion === 2) {
                    await addFavorite2({nftId, collectionId: collection});
                    rmrkStore.rmrkNFTs.nfts.map((nft: any) => {
                        if (nft.id === nftId) {
                            runInAction(() => {
                                nft.isFavorite = true;
                            })

                        }
                    })
                } else {
                    await addFavorite1({nftId, collectionId: collection});
                    rmrkStore.rmrkNFTs.nfts.map((nft: any) => {
                        if (nft.id === nftId) {
                            runInAction(() => {
                                nft.isFavorite = true;
                            })

                        }
                    })
                }
            } else {
                await addFavoriteOpensea({nftId, collectionId: collection.id})
                openseaStore.openseaNFTs.nfts.map((nft: any) => {
                    if (nft.id === nftId) {
                        runInAction(() => {
                            nft.isFavorite = true;
                        })

                    }
                })
            }
        }

        async function deleteFavoriteHandler(event: any, nftId: any, collection: any) {
            if (marketplace === 'Singular') {
                if (nftStore.rmrkVersion === 2) {
                    await deleteFavorite2({nftId, collectionId: collection});
                    rmrkStore.rmrkNFTs.nfts.map((nft: any) => {
                        if (nft.id === nftId) {
                            runInAction(() => {
                                nft.isFavorite = false;
                            })

                        }
                    })
                } else {
                    await deleteFavorite1({nftId, collectionId: collection});
                    rmrkStore.rmrkNFTs.nfts.map((nft: any) => {
                        if (nft.id === nftId) {
                            runInAction(() => {
                                nft.isFavorite = false;
                            })

                        }
                    })
                }
            } else {
                await deleteFavoriteOpensea({nftId, collectionId: collection.id})
                openseaStore.openseaNFTs.nfts.map((nft: any) => {
                    if (nft.id === nftId) {
                        runInAction(() => {
                            nft.isFavorite = false;
                        })

                    }
                })
            }
        }

        async function setColl(event: any) {
            console.log('nftft')
            setView('coll');
            setVisible(false)
            setHas(true)
            if (marketplace === 'Singular') {
                await rmrkStore.getCollFromRMRK(1, 10);
            } else {
                await openseaStore.getAllCollections(1, 10)
            }
        }

        function handleChangeQuery(event: React.ChangeEvent<HTMLInputElement>) {
            event.preventDefault()
            setQuery(event.target.value);
            console.log(event.target.value)
        }

        function handleChangeFilter(event: any) {
            event.preventDefault()
            setIsOpenFilter(!isOpenFilter)
        }

    function handleChangeSort(event: any) {
            console.log(event.target.value)
        switch (event.target.value) {
            case "block_asc":
                setSort("block_asc");
                break
            case "block_desc":
                setSort("block_desc");
                break
            case "forsale_asc":
                setSort("forsale_asc");
                break
            case "forsale_desc":
                setSort("forsale_desc");
                break

        }
    }

        async function handleKey(event: KeyboardEvent<HTMLInputElement>) {
            if (event.key === "Enter") {
                await goSearch(event)
            }
        }

        function handleChangeVisible() {
            setVisible(!visible);
        }

        async function handleChangeViewed() {
            console.log(isViewed)
            await setViewed(!isViewed);
            console.log(isViewed)
        }

        function turnOffFilter() {
            setIsOpenFilter(false);
        }

        async function handleChangeMarket(event: any, name: string) {
            await setMarketplace(name);
            setIsOpenMarket(false)
            setIsOpenFilter(false)
            if (name === "Singular" && view !== "nft") {
                console.log('3')
                setHas(true)
                await rmrkStore.getCollFromRMRK()
            } else if (name === 'Singular') {
                console.log('1')
                setHas(true)
                await rmrkStore.getAllNFT();
            } else if (name === "OpenSea" && view !== "nft") {
                console.log('4')
                setHas(true)
                await openseaStore.getAllCollections()
            } else if (name === "OpenSea") {
                console.log('2')
                setHas(true)
                await openseaStore.getAllNFTs()
            }
        }

        function handleChangeType(event: React.ChangeEvent<HTMLInputElement>) {
            console.log(event.target)
            setTypecontent(event.target.value);
        }

        function handleChangePrice(event: React.ChangeEvent<HTMLInputElement>) {
            console.log(event.target);
            if (event.target.value === null) {
                event.target.value = "0"
            }
            event.target.name === 'min' ? setPrice((prevState) => ({
                min: parseInt(event.target.value),
                max: prevState.max
            })) : setPrice((prevState) => ({max: parseInt(event.target.value), min: prevState.max}))
        }

        async function handleLoadOpenseaColls(page: any) {
            // console.log(page)
            // globalStore.setLoader(true);
            // if (load) {
            //     console.log('bla')
            //     return
            // }
            // await setLoad(true);
            // let len = openseaStore.openseaCollections.collections.length;
            await openseaStore.getAllCollections(page, 10, query, false)
            // if (len === openseaStore.openseaCollections.collections.length) {
            //     await setHas(false)
            // } else {
            //     await setHas(true)
            // }
            // await setLoad(false)
            // globalStore.setLoader(false);
        }

        async function handleLoadOpenseaNFTs(page: any) {
            // console.log(page)
            // globalStore.setLoader(true);
            // if (load) {
            //     return
            // }
            // await setLoad(true)
            // let len = openseaStore.openseaNFTs.nfts.length;
            // console.log('before',toJS(openseaStore.openseaNFTs.nfts))
            await openseaStore.getAllNFTs(page, 10, query, typeContent, price.min, price.max, false)
            // console.log('after', toJS(openseaStore.openseaNFTs.nfts))
            // if (len === openseaStore.openseaNFTs.nfts.length) {
            //     await setHas(false)
            // } else {
            //     await setHas(true)
            // }
            // await setLoad(false)
            // globalStore.setLoader(false);
        }

        async function handleLoadRMRKColls(page: any) {
            // console.log(page)
            // globalStore.setLoader(true);
            // if (load) {
            //     return
            // }
            // await setLoad(true)
            // let len = rmrkStore.rmrkCollections.collections.length;
            await rmrkStore.getCollFromRMRK(page, 10, query, false)
            // if (len === rmrkStore.rmrkCollections.collections.length) {
            //     await setHas(false)
            // } else {
            //     await setHas(true)
            // }
            // await setLoad(false)
            // globalStore.setLoader(false);
        }

        async function handleLoadRMRKNFTs(page: any) {
            // console.log(page)
            // globalStore.setLoader(true);
            // if (load) {
            //     console.log('bla')
            //     return
            // }
            // await setLoad(true)
            // let len = rmrkStore.rmrkNFTs.nfts.length;
            await rmrkStore.getAllNFT(page, 10, query, typeContent, price.min, price.max, isViewed, sort, false);
            // if (len === rmrkStore.rmrkNFTs.nfts.length) {
            //     console.log('equelnft')
            //     await setHas(false)
            // } else {
            //     await setHas(true)
            // }
            // await setLoad(false)
            // globalStore.setLoader(false)
        }

        async function handleMnemoNew(event: React.MouseEvent<HTMLAnchorElement>) {
            const mnemonic = mnemonicGenerate();
            runInAction(() => {
                userStore.mnemoNew = mnemonic.split(" ")
            })
            userStore.shuffleMnemonic(mnemonic);
            userStore.setSection(2)
        }

        async function goSearch(event: any) {
            turnOffFilter();
            event.preventDefault();
            if (marketplace === "Singular" && view !== "nft") {
                console.log('3')
                await rmrkStore.getCollFromRMRK(1, 10, query)
            } else if (marketplace === 'Singular') {
                console.log('1')
                await rmrkStore.getAllNFT(1, 10, query, typeContent, price.min, price.max, isViewed, sort);
            } else if (marketplace === "OpenSea" && view !== "nft") {
                console.log('4')
                await openseaStore.getAllCollections(1, 10, query)
            } else if (marketplace === "OpenSea") {
                console.log('2')
                await openseaStore.getAllNFTs(1, 10, query, typeContent, price.min, price.max)
            }
        }

        function useQuery() {
            const { search } = useLocation();

            return React.useMemo(() => new URLSearchParams(search), [search]);
        }

        function GetQueryParams() {
            let query = useQuery();
            const queryGet = query.get('query');
            if (!!queryGet) {
                setQuery(queryGet);
            }
            const typeContentGet = query.get('typeContent');
            if (!!typeContentGet) {
                setQuery(typeContentGet);
            }
            const isViewedGet = query.get('isViewed');
            if (!!isViewedGet) {
                isViewedGet == '1' ? setViewed(true) : setViewed(false);
            }
            const sortGet = query.get('sort');
            if (!!sortGet) {
                setSort(sortGet);
            }
            const priceMinGet = query.get('priceMin');
            if (!!priceMinGet) {
                setPrice((prevState) => ({
                    min: parseInt(priceMinGet),
                    max: prevState.max
                }))
            }
            const priceMaxGet = query.get('priceMax');
            if (!!priceMaxGet) {
                setPrice((prevState) => ({
                    max: parseInt(priceMaxGet),
                    min: prevState.min
                }))
            }
            return (
                <></>
            )
        }


        useEffect(() => {
            userStore.getUSD()
        }, [rmrkStore.rmrkNFTs.nfts.length]);

        const thresh = 300;

        const sizeIcon = 32;

        const AllNFTs = observer(() => {
            return (
                <>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={handleLoadRMRKNFTs}
                        hasMore={has}
                        threshold={thresh}
                        element="div"
                        className="row justify-content-center align-items-center"
                        id={"wrapper-cart-list"}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    ><></>
                        {rmrkStore.rmrkNFTs.nfts && rmrkStore.rmrkNFTs.nfts.map((nft: INFTRMRK): any => {
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
                                                <button className="share-btn-cart share-panel-js">
                                                    <div className="wrapper-share-panel">
                                                        <EmailShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><EmailIcon size={sizeIcon} round/></EmailShareButton>
                                                        <TelegramShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><TelegramIcon size={sizeIcon} round/></TelegramShareButton>
                                                        <WhatsappShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><WhatsappIcon size={sizeIcon} round/></WhatsappShareButton>
                                                        <MailruShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><MailruIcon size={sizeIcon} round/></MailruShareButton>

                                                        <RedditShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><RedditIcon size={sizeIcon} round/></RedditShareButton>
                                                        <OKShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><OKIcon size={sizeIcon} round/></OKShareButton>
                                                        <TumblrShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><TumblrIcon size={sizeIcon} round/></TumblrShareButton>
                                                        <TwitterShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><TwitterIcon size={sizeIcon} round/></TwitterShareButton>
                                                        <ViberShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><ViberIcon size={sizeIcon} round/></ViberShareButton>
                                                        <VKShareButton url={"https://nft2go/nfts/" + nft.id} title={nft.name}><VKIcon size={sizeIcon} round/></VKShareButton>
                                                    </div>
                                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path

                                                            d="M18.7577 5.0969C18.7576 4.13303 19.1025 3.1998 19.7323 2.4605C20.362 1.7212 21.2364 1.2229 22.2024 1.05278C23.1685 0.882662 24.1647 1.05156 25.0167 1.52992C25.8688 2.00828 26.5224 2.76565 26.8633 3.66951C27.2042 4.57337 27.2106 5.56617 26.8815 6.47422C26.5523 7.38226 25.9085 8.14772 25.0627 8.63667C24.2169 9.12563 23.223 9.30694 22.2548 9.14888C21.2866 8.99083 20.4059 8.50348 19.7666 7.77209L8.52596 12.899C8.78437 13.7033 8.78437 14.5662 8.52596 15.3704L19.7666 20.4973C20.4423 19.7256 21.3857 19.2276 22.414 19.1C23.4422 18.9724 24.4821 19.2242 25.332 19.8067C26.182 20.3891 26.7815 21.2607 27.0144 22.2525C27.2474 23.2443 27.097 24.2858 26.5927 25.175C26.0883 26.0641 25.2657 26.7378 24.2844 27.0653C23.3032 27.3928 22.233 27.3509 21.2814 26.9477C20.3297 26.5445 19.5644 25.8087 19.1337 24.8829C18.703 23.9571 18.6375 22.9073 18.9501 21.9368L7.70943 16.8099C7.15298 17.4468 6.41127 17.901 5.58407 18.1115C4.75688 18.322 3.8839 18.2786 3.08255 17.9873C2.2812 17.6959 1.58993 17.1705 1.10174 16.4817C0.61355 15.793 0.351852 14.9739 0.351852 14.1347C0.351852 13.2955 0.61355 12.4765 1.10174 11.7877C1.58993 11.0989 2.2812 10.5735 3.08255 10.2822C3.8839 9.99081 4.75688 9.94745 5.58407 10.1579C6.41127 10.3684 7.15298 10.8227 7.70943 11.4595L18.9501 6.33261C18.8221 5.93276 18.7573 5.51603 18.7577 5.0969V5.0969Z"
                                                            fill="#FE1492"></path>
                                                    </svg>
                                                </button>

                                                {isLogged() ? !!nft.isFavorite ?
                                                    <button className="share-btn-cart"
                                                            onClick={(e) => deleteFavoriteHandler(e, nft.id, nft.collection)}>
                                                        <svg width="19" height="25" viewBox="0 0 19 25" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0 25V2.34375C0 1.04932 1.04932 0 2.34375 0H16.4062C17.7007 0 18.75 1.04932 18.75 2.34375V25L9.375 19.5312L0 25Z"
                                                                fill="#FE1492"/>
                                                        </svg>
                                                    </button> :
                                                    <button className="share-btn-cart"
                                                            onClick={(e) => addFavoriteHandler(e, nft.id, nft.collection)}>
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
                                                        className="itself-bet-price-collection">{nft.price.toString() !== "0" ? ((nft.price * 0.000000000001) * userStore.priceUSD).toFixed(2) + ' USD' : "Not listed"}</span>
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

        const AllCollections = observer(() => {
            return (
                <>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={handleLoadRMRKColls}
                        hasMore={has}
                        threshold={thresh}
                        element="div"
                        className="row"
                        id={"wrapper-cart-list"}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {rmrkStore.rmrkCollections.collections && rmrkStore.rmrkCollections.collections.length >= 1 && rmrkStore.rmrkCollections.collections.map((coll: ISingleCollectionInAll) => {
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
                                                    <div className="category-name-collection">{coll.meta.name ? coll.meta.name.slice(0, 7) + ".." : ""}</div>
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

        const AllOpenseaNFTs = observer(() => {
            return (
                <>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={handleLoadOpenseaNFTs}
                        hasMore={has}
                        threshold={thresh}
                        element="div"
                        className="row"
                        id={"wrapper-cart-list"}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {openseaStore.openseaNFTs.nfts && openseaStore.openseaNFTs.nfts.length >= 1 && openseaStore.openseaNFTs.nfts.map((nft: INFTOpenSea) => {
                            return (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 wrap-pic-feed">
                                    <div className="single-cart-cell">
                                        <div className="cart-cell-header d-flex justify-content-between align-items-center">

                                            <p className="cart-cell-info-text">No subs</p>
                                        </div>
                                        <div className="cart-cell-body position-relative">
                                            <div className="w-100 h-100">
                                                <Link to={"/opensea/nfts/" + nft.id}>
                                                    <img loading="lazy" src={nft.image_preview_url ? nft.image_preview_url : images["placeholder-image.png"].default} className="image-nft-cart"
                                                         style={{maxHeight: '100%', height: "100%", width: "100%"}}/></Link>
                                            </div>
                                        </div>
                                        <div className="cart-cell-footer">
                                            <div className="cart-cell-container-icon">
                                                {isLogged() ? !!nft.isFavorite ?
                                                    <button className="share-btn-cart"
                                                            onClick={(e) => deleteFavoriteHandler(e, nft.id, nft.collection)}>
                                                        <svg width="19" height="25" viewBox="0 0 19 25" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0 25V2.34375C0 1.04932 1.04932 0 2.34375 0H16.4062C17.7007 0 18.75 1.04932 18.75 2.34375V25L9.375 19.5312L0 25Z"
                                                                fill="#FE1492"/>
                                                        </svg>
                                                    </button> :
                                                    <button className="share-btn-cart"
                                                            onClick={(e) => addFavoriteHandler(e, nft.id, nft.collection)}>
                                                        <svg width="19" height="25" viewBox="0 0 19 25" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0 25V2.34375C0 1.04932 1.04932 0 2.34375 0H16.4062C17.7007 0 18.75 1.04932 18.75 2.34375V25L9.375 19.5312L0 25Z"
                                                                fill="#none" stroke="#FE1492"/>
                                                        </svg>
                                                    </button> : <></>}
                                            </div>
                                            <div className="d-flex justify-content-between container-info-cart-cell"
                                                 style={{gap: 15}}>
                                                <div className="d-flex flex-column justify-content-between">
                                                    <div className="category-name-collection">{nft.collection.name.slice(0, 7) + ".."}</div>
                                                    <div className="itself-name-collection">{nft.name.slice(0, 7) + ".."}</div>
                                                </div>
                                                <div className="d-flex flex-column justify-content-between">
                                                    <div className="bet-price-collection">
                                                    <span
                                                        className="itself-bet-price-collection">{nft.sell_orders!.length > 0 ? `${+nft.sell_orders![0].base_price / 1000000000000000000} ETH` : "Not listed"}</span>
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


        const AllOpenseaCollections = observer(() => {
            return (
                <>


                    <InfiniteScroll
                        pageStart={1}
                        loadMore={handleLoadOpenseaColls}
                        hasMore={has}
                        threshold={thresh}
                        element="div"
                        className="row"
                        id={"wrapper-cart-list"}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >
                        {openseaStore.openseaCollections && openseaStore.openseaCollections.collections && openseaStore.openseaCollections.collections.length >= 1 && openseaStore.openseaCollections.collections.map((coll: ICollectionOpenSea) => {
                            return (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 wrap-pic-feed">
                                    <div className="single-cart-cell">
                                        <div className="cart-cell-header d-flex justify-content-between align-items-center">

                                            <p className="cart-cell-info-text">{coll.nfts && coll.nfts.length} NFTS</p>
                                        </div>
                                        <div className="cart-cell-body position-relative">
                                            <div className="w-100 h-100">
                                                <Link to={"/opensea/collections/" + coll.id}>
                                                    <img loading="lazy"
                                                         src={!!coll.featured_image_url ? coll.featured_image_url : coll.image_url ? coll.image_url : images["placeholder-image.png"].default}
                                                         className="image-nft-cart"
                                                         style={{maxHeight: '100%', height: "100%", width: "100%"}}/></Link>
                                            </div>
                                        </div>
                                        <div className="cart-cell-footer">

                                            <div className="d-flex justify-content-between container-info-cart-cell"
                                                 style={{gap: 15}}>
                                                <div className="d-flex flex-column justify-content-between">
                                                    <div className="category-name-collection">{coll.name.slice(0, 7) + ".."}</div>
                                                    <div className="itself-name-collection">
                                                        <Link to={"/opensea/collections/" + coll.id}>
                                                            {coll.id.slice(0, 7) + ".."}
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

        return (
            <>
                <GetQueryParams/>
                <div id="wrapper-btn-menu">
                    <div className="container-btn-menu">
                        <div className="body-btn-menu d-flex flex-column justify-content-between">
                            <ul className="container-mobile-menu">
                                <li className="nav-item-mob">
                                    <Link to="/feed">NFTs</Link>
                                </li>
                                <li className="nav-item-mob">
                                    <Link to="#">About</Link>
                                </li>
                                {isLogged() && !rmrkStore.rmrkWallet.wallet && <li className="nav-item-mob">
                                    <Link to={"/lk/mnemo"} onClick={handleMnemoNew}>Создать мнемонику</Link>
                                </li>}
                                {isLogged() && !rmrkStore.rmrkWallet.wallet && <Link to={"/lk/mnemo"} onClick={() =>userStore.setSection(3)}>У меня уже есть</Link>}
                                <li className="nav-item-mob">
                                    <Link to="#">FAQ</Link>
                                </li>
                                <li className="nav-item-mob">
                                    <Link to="#">Support</Link>
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
                        <div className="row">
                            <div className="col-12 wrapper-top-panel-list">
                                <div className="top-panel-list">
                                    <div className="row">
                                        <div
                                            className="col-12 col-md-3 d-none d-md-flex justify-content-start align-items-center ">
                                            {view === 'nft' && <div className="d-flex align-items-center">
                                                <span>Скрыть фильтр</span>
                                                <label className="switch-btn">
                                                    <input id="enableFilter" type="checkbox" name="enable-filter"
                                                           onChange={handleChangeVisible}
                                                           defaultChecked={false}/>
                                                    <span className="switch-element"></span>
                                                </label>
                                            </div>}
                                        </div>
                                        <div
                                            className="col-12 col-md-6 d-flex align-items-center justify-content-center"
                                            style={{zIndex: 5}}>
                                            <div
                                                className="selected-menu-list flex-wrap d-flex align-items-center justify-content-between justify-content-md-center" id="mob-just">
                                                <label className="input-selected" style={{marginBottom:0}}>
                                                    <input type="radio" name="essence-filtration" value="nfts"
                                                           className="common_selector main-category-nft" onChange={setNFT}
                                                           defaultChecked={true}/>
                                                    <span>Nfts</span>
                                                </label>
                                                <label className="input-selected" style={{marginRight: 0, marginBottom:0}}>
                                                    <input type="radio" name="essence-filtration" value="collection"
                                                           className="common_selector main-category-nft"
                                                           onChange={setColl}/>
                                                    <span>Collections</span>
                                                </label>
                                                <div className="d-flex d-md-none justify-content-end container-filter-btn">
                                                    <button id="filter-btn" className="filter-btn main-filter-btn"
                                                            onClick={handleChangeFilter}>
                                                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                  d="M11.4679 8C11.4679 8.55228 11.0202 9 10.4679 9L3.46789 9C2.91561 9 2.46789 8.55228 2.46789 8C2.46789 7.44771 2.91561 7 3.46789 7L10.4679 7C11.0202 7 11.4679 7.44772 11.4679 8Z"
                                                                  fill="white"/>
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                  d="M22.4679 8C22.4679 8.55228 22.0202 9 21.4679 9L14.4679 9C13.9156 9 13.4679 8.55228 13.4679 8C13.4679 7.44771 13.9156 7 14.4679 7L21.4679 7C22.0202 7 22.4679 7.44772 22.4679 8Z"
                                                                  fill="white"/>
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                  d="M13.4679 16C13.4679 16.5523 13.0202 17 12.4679 17L3.4679 17C2.91561 17 2.4679 16.5523 2.4679 16C2.4679 15.4477 2.91561 15 3.4679 15L12.4679 15C13.0202 15 13.4679 15.4477 13.4679 16Z"
                                                                  fill="white"/>
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                  d="M22.4679 16C22.4679 16.5523 22.0202 17 21.4679 17L16.4679 17C15.9156 17 15.4679 16.5523 15.4679 16C15.4679 15.4477 15.9156 15 16.4679 15L21.4679 15C22.0202 15 22.4679 15.4477 22.4679 16Z"
                                                                  fill="white"/>
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                  d="M10.4679 4C11.0202 4 11.4679 4.44772 11.4679 5L11.4679 11C11.4679 11.5523 11.0202 12 10.4679 12C9.91561 12 9.4679 11.5523 9.4679 11L9.4679 5C9.4679 4.44772 9.91561 4 10.4679 4Z"
                                                                  fill="white"/>
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                  d="M16.4679 12C17.0202 12 17.4679 12.4477 17.4679 13L17.4679 19C17.4679 19.5523 17.0202 20 16.4679 20C15.9156 20 15.4679 19.5523 15.4679 19L15.4679 13C15.4679 12.4477 15.9156 12 16.4679 12Z"
                                                                  fill="white"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3 d-flex align-items-center justify-content-md-between justify-content-center">
                                            <button className="input-default wrapper-select-marketplace" id="desktop-market"
                                                    onMouseEnter={() => setIsOpenMarket(true)}
                                                    onMouseLeave={() => setIsOpenMarket(false)}
                                                    onClick={() => setIsOpenMarket(!isOpenMarket)}>
                                                <div className="title-select-marketplace">
                                                    <span>{marketplace}</span>
                                                    <span>
                                            <svg width="9" height="6" viewBox="0 0 9 6" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.64711 5.30342L8.84561 0.976196H0.448608L4.64711 5.30342Z"
                                                      fill="white"></path>
                                            </svg>
                                        </span>
                                                </div>
                                                <div className="filter-container-content" style={isOpenMarket ? {display:"block"} : {display:"none"}}>
                                                    <label className="input-selected">
                                                        <input type="radio" name="marketplace" value="OpenSea"
                                                               onClick={(e) => {
                                                                   handleChangeMarket(e, 'OpenSea')
                                                               }}/>
                                                        <span>OpenSea</span>
                                                    </label>

                                                    <label className="input-selected">
                                                        <input type="radio" name="marketplace" value="Singular"
                                                               defaultChecked={true} onClick={(e) => {
                                                            handleChangeMarket(e, 'Singular')
                                                        }}/>
                                                        <span>Singular</span>
                                                    </label>
                                                </div>
                                            </button>
                                            <div className="wrapper-searching" id="desktop-search">
                                                <input type="text" placeholder="Search..." onChange={handleChangeQuery}
                                                       onKeyDown={handleKey}/>
                                                <button type="submit" onClick={goSearch}>
                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                              d="M12.0693 5.77785C9.06245 5.77785 6.62489 8.21541 6.62489 11.2223C6.62489 14.2292 9.06245 16.6667 12.0693 16.6667C15.0762 16.6667 17.5138 14.2292 17.5138 11.2223C17.5138 8.21541 15.0762 5.77785 12.0693 5.77785ZM5.06934 11.2223C5.06934 7.3563 8.20334 4.22229 12.0693 4.22229C15.9353 4.22229 19.0693 7.3563 19.0693 11.2223C19.0693 15.0883 15.9353 18.2223 12.0693 18.2223C8.20334 18.2223 5.06934 15.0883 5.06934 11.2223Z"
                                                              fill="#A4A7B6"></path>
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                              d="M17.4306 16.5833C17.7343 16.2795 18.2268 16.2795 18.5305 16.5833L20.3972 18.4499C20.7009 18.7537 20.7009 19.2462 20.3972 19.5499C20.0934 19.8536 19.601 19.8536 19.2972 19.5499L17.4306 17.6832C17.1268 17.3795 17.1268 16.887 17.4306 16.5833Z"
                                                              fill="#A4A7B6"></path>
                                                    </svg>
                                                </button>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 wrapper-option-filter"
                                 style={visible ? {display: "block"} : {display: "none"}}>
                                <div className="option-filter">
                                    <form className="filter-main" method="get">

                                        <div className="filter-body-container">
                                            <div className="filter-container-title">
                                                SORTING
                                            </div>
                                            <div className="filter-container-content">
                                                <label className="input-selected">
                                                    <input type="radio" name="sort-price" value="forsale_asc" defaultChecked={true} onChange={handleChangeSort}/>
                                                    <span>Increase in price</span>
                                                </label>
                                                <label className="input-selected">
                                                    <input type="radio" name="sort-price" value="forsale_desc" onChange={handleChangeSort}/>
                                                    <span>Decrease in price</span>
                                                </label>
                                                <label className="input-selected">
                                                    <input type="radio" name="sort-price" value="block_asc" onChange={handleChangeSort}/>
                                                    <span>Increase in block</span>
                                                </label>
                                                <label className="input-selected">
                                                    <input type="radio" name="sort-price" value="block_desc" onChange={handleChangeSort}/>
                                                    <span>Decrease in block</span>
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
                                                           onChange={handleChangeType}/>
                                                    <span>All</span>
                                                </label>
                                                <label className="input-selected">
                                                    <input type="radio" name="type-file" value="raster-image"
                                                           onChange={handleChangeType}/>
                                                    <span>Images</span>
                                                </label>
                                                <label className="input-selected">
                                                    <input type="radio" name="type-file" value="video"
                                                           onChange={handleChangeType}/>
                                                    <span>Video</span>
                                                </label>
                                                <label className="input-selected">
                                                    <input type="radio" name="type-file" value="audio"
                                                           onChange={handleChangeType}/>
                                                    <span>Music</span>
                                                </label>
                                                <label className="input-selected">
                                                    <input type="radio" name="type-file" value="3d-image"
                                                           onChange={handleChangeType}/>
                                                    <span>3D</span>
                                                </label>
                                                <label className="input-selected">
                                                    <input type="radio" name="type-file" value="document"
                                                           onChange={handleChangeType}/>
                                                    <span>Docs</span>
                                                </label>
                                            </div>
                                        </div>


                                        <div className="filter-body-container">
                                            <div className="d-flex align-items-center">
                                                <div className="filter-container-title" style={{marginBottom: 0}}>
                                                    Не показывать просмотренные
                                                </div>
                                                <label className="switch-btn">
                                                    <input type="checkbox" name="enable-filter" onChange={handleChangeViewed}/>
                                                    <span className="switch-element"></span>
                                                </label>
                                            </div>
                                        </div>


                                        <button type="submit" onClick={goSearch} id="left-filter-btn">
                                            Применить
                                        </button>


                                    </form>
                                </div>
                            </div>
                            <div className="col">
                                <div className="product-list">
                                    <div className="row justify-content-center align-items-center" id="wrapper-cart-list" style={{position:"relative" }}>
                                        {marketplace === "Singular" ? view === 'nft' ? <AllNFTs/> : <AllCollections/> :
                                            view === 'nft' ? <AllOpenseaNFTs/> :
                                                <AllOpenseaCollections/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <div id="wrapper-filter-popup" className={isOpenFilter ? "btn-filter-active" : ""}>
                    <div id="background-filter-popup"></div>
                    <div className="container content-filter-popup">
                        <div className="header-filter-popup d-flex justify-content-between">
                            <span className="popup-title">Фильтр</span>
                            <div id="close-filter-popup" onClick={turnOffFilter}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 1.77405L14.226 1L8 7.22595L1.77405 1L1 1.77405L7.22595 8L1 14.226L1.77405 15L8 8.77405L14.226 15L15 14.226L8.77405 8L15 1.77405Z"
                                        fill="white" stroke="white" strokeWidth="0.4"/>
                                </svg>
                            </div>
                        </div>
                        <div className="body-filter-popup">
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

                                    <div className="filter-container-content">
                                        <div className="wrapper-searching" id="filter-search">
                                            <input type="text" placeholder="Поиск" onChange={handleChangeQuery}
                                                   onKeyDown={handleKey}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-body-container" id="filter-marketplace-pop">
                                    <div className="filter-container-title">
                                        Маркетплейс
                                    </div>
                                    <div className="filter-container-content">
                                        <label className="input-selected" style={{marginBottom:0}}>
                                            <input type="radio" name="essence-filtration" value="Singular"
                                                   className="common_selector main-category-nft" onClick={(e) => {
                                                handleChangeMarket(e, 'Singular')
                                            }}
                                                   defaultChecked={true}/>
                                            <span>Singular</span>
                                        </label>
                                        <label className="input-selected" style={{marginRight: 0, marginBottom:0}}>
                                            <input type="radio" name="essence-filtration" value="OpenSea"
                                                   className="common_selector main-category-nft"
                                                   onClick={(e) => {
                                                       handleChangeMarket(e, 'OpenSea')
                                                   }}/>
                                            <span>OpenSea</span>
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
                                                   onChange={handleChangeType}/>
                                            <span>All</span>
                                        </label>
                                        <label className="input-selected">
                                            <input type="radio" name="type-file" value="raster-image"
                                                   onChange={handleChangeType}/>
                                            <span>Images</span>
                                        </label>
                                        <label className="input-selected">
                                            <input type="radio" name="type-file" value="video"
                                                   onChange={handleChangeType}/>
                                            <span>Video</span>
                                        </label>
                                        <label className="input-selected">
                                            <input type="radio" name="type-file" value="audio"
                                                   onChange={handleChangeType}/>
                                            <span>Music</span>
                                        </label>
                                        <label className="input-selected">
                                            <input type="radio" name="type-file" value="3d-image"
                                                   onChange={handleChangeType}/>
                                            <span>3D</span>
                                        </label>
                                        <label className="input-selected">
                                            <input type="radio" name="type-file" value="document"
                                                   onChange={handleChangeType}/>
                                            <span>Docs</span>
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" onClick={goSearch} id="left-filter-btn">
                                    Искать
                                </button>

                                {false && <div className="filter-body-container">
                                    <div className="d-flex align-items-center">
                                        <div className="filter-container-title" style={{marginBottom: 0}}>
                                            ON SALE IN
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
                </div>
            </>
        )
    }
);

export default Feed;
