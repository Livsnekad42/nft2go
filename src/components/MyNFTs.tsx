import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import rmrkStore from "../stores/rmrkStore";
import {INFTRMRK} from "../interfaces/NFTInterface";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import history from "../settings/history";
import {imagesClient} from "../App";


const MyNFTs = observer(() => {

    const [view, setView] = useState('nft');
    /*
    const [activeNFT, setActiveNFT] = useState('');

    const [isOpenList, setOpenList] = useState(false);
    const [isOpenSend, setOpenSend] = useState(false);
    const [isOpenConsume, setOpenConsume] = useState(false);

    const handleOpenConsume = (nftID: string) => {
        setOpenConsume(!isOpenConsume);
        setActiveNFT(nftID);
    };

    const handleOpenList = (nftID: string) => {
        setOpenList(!isOpenList);
        setActiveNFT(nftID);
    };

    const handleOpenSend = (nftID: string) => {
        setOpenSend(!isOpenSend);
        setActiveNFT(nftID);
    };
*/
    useEffect(() => {
        rmrkStore.getMyNFT().then(() => {
            rmrkStore.getMyCollections();
            }).catch(e => console.log(e));
    }, []);


    function setNFT(event: any) {
        event.preventDefault();
        setView('nft');
    }
/*
    function addToFavColl(event: React.MouseEvent<HTMLButtonElement>, collectionId: string) {
        event.preventDefault();
        addFavorite({collectionId}).then(resp => setToastSuccess('Успешно добавлено в избранное')).catch(e => console.log(e));
    }

    function addToFavNFT(event: React.MouseEvent<HTMLButtonElement>, nftId: string) {
        event.preventDefault();
        addFavorite({nftId}).then(resp => setToastSuccess('Успешно добавлено в избранное')).catch(e => console.log(e));
    }
*/
    function setColl(event: any) {
        event.preventDefault();
        setView('coll');
    }




    function handleSelectColl(event: React.ChangeEvent<HTMLSelectElement>) {
        rmrkStore.setMyCollsPageSize(+event.target.value)
        rmrkStore.getMyCollections(rmrkStore.myCollections.pagination.page, +event.target.value);
    }

    function handleSelectNFT(event: React.ChangeEvent<HTMLSelectElement>) {
        rmrkStore.setMyNFTsPageSize(+event.target.value)
        rmrkStore.getMyNFT(rmrkStore.myNFTs.pagination.page, +event.target.value);
    }
/*
    function handlePageChangeColl(event: any) {
        rmrkStore.getCollFromRMRK(event.selected, rmrkStore.myCollections.pagination.pageSize)
    }
*/
    function handlePageChangeNFT(event: any) {
        console.log(event);
        rmrkStore.getAllNFT(event.selected, rmrkStore.myNFTs.pagination.pageSize)
    }

    const MyNFTs = observer(() => {
        return (
            <>

                <div className="container">

                    {history.location.pathname !== '/' && false &&
                    <>
                        <h1>Все NFT</h1>
                        <p>Количество на странице: {rmrkStore.myNFTs.pagination.pageSize}</p>
                        <select name="pages" id="pages" onChange={handleSelectNFT} value={rmrkStore.myNFTs.pagination.pageSize}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </>
                    }

                    <div id="grid" className="row">

                        {rmrkStore.myNFTs.nfts.length >= 1 && rmrkStore.myNFTs.nfts.map((nft: INFTRMRK, index: number) => {
                            return (
                                <div className="col-lg-4 col-md-6 picture-item mt-4 py-1"
                                     data-groups='["recents"]'>
                                    <div
                                        className="card nft-items nft-item-primary rounded-md border-0 shadow overflow-hidden">
                                        <div className="row g-0">
                                            <div className="col-md-6 nft-card">
                                                <div className="nft-image position-relative overflow-hidden">
                                                    <img src={nft.meta.image} className="img-fluid"
                                                         alt=""/>
                                                    <div className="pop-icon">
                                                        <Link to={'/nfts/' + nft.id}
                                                              className="btn bg-white btn-pills btn-icon shadow"><i
                                                            className="uil uil-arrow-right text-dark"></i></Link>
                                                    </div>
                                                    <div
                                                        className="position-absolute top-0 end-0 mt-2 me-2">
                                                        <a href="javascrpit:void(0)" className="like"><i
                                                            className="mdi mdi-heart align-middle"></i></a>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="col-md-6">
                                                <div
                                                    className="card-body p-md-3 content d-flex h-100 flex-column">
                                                    <div>
                                                        <Link to={'/nfts/' + nft.id}
                                                              className="title h6 mb-1 text-dark d-block">{nft.name}</Link>
                                                        <small className="badge bg-soft-primary">{nft.forsale} DOT</small>
                                                    </div>

                                                    <div
                                                        className="d-flex author align-items-center mt-md-auto mb-0 mt-4 mt-sm-0">
                                                        <div className="position-relative">
                                                            <img src={imagesClient['01.jpg'].default}
                                                                 className="avatar avatar-sm-sm rounded-pill shadow"
                                                                 alt=""/>
                                                            <div
                                                                className="position-absolute top-0 start-0 translate-middle pt-2 ps-2">
                                                                <i className="mdi mdi-check-circle mdi-18px text-success"></i>
                                                            </div>
                                                        </div>
                                                        <a href="nft-creator-profile.html"
                                                           className="ps-2 text-dark name">Jordan</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>

                {history.location.pathname !== '/' && false &&
                <>
                    <div className='btn-wrap'>
                        <ReactPaginate
                            pageCount={rmrkStore.myNFTs.totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={rmrkStore.myNFTs.pagination.totalPages / 2}
                            onPageChange={(e) => handlePageChangeNFT(e)}
                        />
                    </div>
                </>
                }
            </>
        )
    });

    const MyCollections = observer(() => {
        return (
            <>
                <div className="container">
                    {false && <>
                    <p>Количество на странице: {rmrkStore.myCollections.pagination.pageSize}</p>
                    <select name="pages" id="pages" onChange={handleSelectColl} value={rmrkStore.myCollections.pagination.pageSize}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                        </>
                        }
                    <div className="col-12 py-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    {rmrkStore.myCollections.collections.length >= 1 && rmrkStore.myCollections.collections.map((coll: any, index: number) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 picture-item mt-4 py-1"
                                                 data-groups='["recents"]'>
                                                <div
                                                    className="card nft-items nft-item-primary rounded-md border-0 shadow overflow-hidden">
                                                    <div className="row g-0">
                                                        <div className="col-md-6">
                                                            <div className="nft-image position-relative overflow-hidden">
                                                                <img src={coll.meta.image} className="img-fluid"
                                                                     alt="" />
                                                                <div className="pop-icon">
                                                                    <Link to={'/collections/'+ coll.id}
                                                                          className="btn bg-white btn-pills btn-icon shadow"><i
                                                                        className="uil uil-arrow-right text-dark"></i></Link>
                                                                </div>
                                                                <div
                                                                    className="position-absolute top-0 end-0 mt-2 me-2">
                                                                    <a href="javascrpit:void(0)" className="like"><i
                                                                        className="mdi mdi-heart align-middle"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div
                                                                className="card-body p-md-3 content d-flex h-100 flex-column">
                                                                <div>
                                                                    <Link to={'/collections/' + coll.id}
                                                                          className="title h6 mb-1 text-dark d-block">{coll.name}</Link>
                                                                    <small className="badge bg-soft-primary">{coll.block} DOT</small>
                                                                </div>


                                                                <div
                                                                    className="d-flex author align-items-center mt-md-auto mb-0 mt-4 mt-sm-0">
                                                                    <div className="position-relative">
                                                                        <img src={imagesClient['01.jpg'].default}
                                                                             className="avatar avatar-sm-sm rounded-pill shadow"
                                                                             alt=""/>
                                                                        <div
                                                                            className="position-absolute top-0 start-0 translate-middle pt-2 ps-2">
                                                                            <i className="mdi mdi-check-circle mdi-18px text-success"></i>
                                                                        </div>
                                                                    </div>
                                                                    <a href="nft-creator-profile.html"
                                                                       className="ps-2 text-dark name">Jordan</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )})}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    });

    console.log('render');
    return (
        <>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="section-title text-center">
                                <h4 className="title mb-3">My Works</h4>
                                <p className="text-muted mx-auto para-desc mb-0">Buy and sell 100+ cryptocurrencies with
                                    20+ fiat currencies using bank transfers or your credit/debit card.</p>
                                <div className="filters-group-wrap mt-5">
                                    <div className="filters-group">
                                        <ul className="container-filter mb-0 categories-filter list-unstyled filter-options">
                                            <li className="list-inline-item categories position-relative"
                                                data-group="top" onClick={setNFT}>NFT
                                            </li>
                                            <li className="list-inline-item categories position-relative"
                                                data-group="top" onClick={setColl}>Коллекции
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {view === 'nft' ? <MyNFTs /> : <MyCollections/>}

            </section>
        </>
    )
});

export default MyNFTs;
