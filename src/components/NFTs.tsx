import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import rmrkStore from "../stores/rmrkStore";
import {INFTRMRK, ISingleCollection} from "../interfaces/NFTInterface";
import { Link } from "react-router-dom";
import FormDialog from "./Popups";
import {useTranslation} from "react-i18next";
import history from '../settings/history';
import {imagesBg, imagesClient, imagesIllust} from "../App";

const NFTs = observer(() => {

    const [view, setView] = useState('nft');
    const [activeNFT, setActiveNFT] = useState('');


    const [isOpenBuy, setOpenBuy] = useState(false);
    const [isOpenEmote, setOpenEmote] = useState(false);
/*
    const handleOpenBuy = (event: React.MouseEvent<HTMLButtonElement>, nftID: string) => {
        event.preventDefault();
        setOpenBuy(!isOpenBuy);
        setActiveNFT(nftID);
    };

    const handleOpenEmote = (event: React.MouseEvent<HTMLButtonElement>, nftID: string) => {
        event.preventDefault();
        setOpenEmote(!isOpenEmote);
        setActiveNFT(nftID);
    };
*/
    useEffect(() => {
        rmrkStore.getCollFromRMRK().then(() => {
            rmrkStore.getAllNFT().then(() => {
                rmrkStore.setAllNFTsTotalPages().then(() => {
                    rmrkStore.setAllCollsTotalPages();
                })
            })
        })



    }, [])


    function setNFT(event: any) {
        event.preventDefault();
        setView('nft');
    }

    function setColl(event: any) {
        event.preventDefault();
        setView('coll');
        console.log(setActiveNFT);
    }

    function handleSelectColl(event: React.ChangeEvent<HTMLSelectElement>) {
        rmrkStore.setMyCollsPageSize(+event.target.value)
        rmrkStore.getCollFromRMRK(rmrkStore.rmrkCollections.pagination.page, +event.target.value);
    }

    function handleSelectNFT(event: React.ChangeEvent<HTMLSelectElement>) {
        rmrkStore.setALlNFTsPageSize(+event.target.value)
        rmrkStore.getAllNFT(rmrkStore.rmrkNFTs.pagination.page, +event.target.value);
    }
/*
    function handlePageChangeColl(event: any) {
        rmrkStore.getCollFromRMRK(event.selected, rmrkStore.rmrkCollections.pagination.pageSize)
    }

    function handlePageChangeNFT(event: any) {
        console.log(event);
        rmrkStore.getAllNFT(event.selected, rmrkStore.rmrkNFTs.pagination.pageSize)
    }

*/
    const AllNFTs = observer(() => {
        return (
        <>

            <div className="container">

                {history.location.pathname !== '/' && false &&
                <>
                <h1>Все NFT</h1>
                    <p>Количество на странице: {rmrkStore.rmrkNFTs.pagination.pageSize}</p>
                    <select name="pages" id="pages" onChange={handleSelectNFT} value={rmrkStore.rmrkNFTs.pagination.pageSize}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    </select>
                    </>
                }

                <div id="grid" className="row">

                                {rmrkStore.rmrkNFTs.nfts.length >= 1 && rmrkStore.rmrkNFTs.nfts.map((nft: INFTRMRK, index: number) => {
                                    return (
                                        <div className="col-lg-4 col-md-6 picture-item mt-4 py-1"
                                             data-groups='["recents"]'>
                                            <div
                                                className="card nft-items nft-item-primary rounded-md border-0 shadow overflow-hidden">
                                                <div className="row g-0">
                                                    <div className="col-md-6">
                                                        <div className="nft-image position-relative overflow-hidden">
                                                            <img src={nft.metadata} className="img-fluid"
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
        </>
        )
    });

    const AllCollections = observer(() => {
        return (
            <>
                <div className="container">
                {history.location.pathname !== '/' && false &&
                    <>
                <p>Количество на странице: {rmrkStore.rmrkCollections.pagination.pageSize}</p>
                <select name="pages" id="pages" onChange={handleSelectColl} value={rmrkStore.rmrkCollections.pagination.pageSize}>
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
                                    {rmrkStore.rmrkCollections.collections.length >= 1 && rmrkStore.rmrkCollections.collections.map((coll: ISingleCollection, index: number) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 picture-item mt-4 py-1"
                                                 data-groups='["recents"]' key={coll.collection.id}>
                                                <div
                                                    className="card nft-items nft-item-primary rounded-md border-0 shadow overflow-hidden">
                                                    <div className="row g-0">
                                                        <div className="col-md-6 nft-card">
                                                            <div className="nft-image position-relative overflow-hidden">
                                                                <img src={coll.collection.metadata} className="img-fluid"
                                                                     alt="" />
                                                                <div className="pop-icon">
                                                                    <Link to={'nfts/collections/'+ coll.collection.id}
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
                                                                    <Link to={'/nfts/collections/' + coll.collection.id}
                                                                       className="title h6 mb-1 text-dark d-block">{coll.collection.name}</Link>
                                                                    <small className="badge bg-soft-primary">{coll.collection.block} DOT</small>
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

    const { t } = useTranslation();

    return (
        <>

            <section className="bg-half-100 w-100 pb-0">
                <div className="container position-relative" style={{zIndex: 1}}>
                    <div className="rounded-lg px-4 py-5 bg-light shadow position-relative overflow-hidden"
                         style={{background: `url('${imagesBg['home-shape.png'].default}') top`}}>
                        <div className="row justify-content-center my-5">
                            <div className="col-12">
                                <div className="title-heading text-center">
                                    <h4 className="display-6 fw-medium mb-3">{t('Greeting')}</h4>
                                    <p className="text-muted mb-0">Discover limited-edition digital arts. Create, Sell
                                        and Buy now.</p>
                                </div>

                                <div className="subcribe-form mt-5">
                                    <form>
                                        <div className="mb-0">
                                            <input type="text" id="search" name="name"
                                                   className="border bg-light rounded-pill" required={false}
                                                   placeholder="Искать..."/>
                                                <button type="submit" className="btn btn-pills btn-primary">Поиск
                                                </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="section-title text-center">
                                <h4 className="title mb-3">Latest Works</h4>
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

                {view === 'nft' ? <AllNFTs /> : <AllCollections/>}


                <div className="container mt-100 mt-60">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="me-lg-4">
                                <img src={imagesIllust['profit.svg'].default} className="img-fluid" alt=""/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="section-title mb-4 pb-2">
                                <h4 className="title mb-4">Frequently Asked Questions</h4>
                                <p className="text-muted para-desc mb-0">Explore and learn more about everything from
                                    machine learning and global payments to scaling your team.</p>
                            </div>

                            <div className="accordion mt-4 pt-2" id="buyingquestion">
                                <div className="accordion-item rounded border-0 shadow">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button border-0 bg-white" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                aria-expanded="true" aria-controls="collapseOne">
                                            What is NFT?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse border-0 collapse show"
                                         aria-labelledby="headingOne"
                                         data-bs-parent="#buyingquestion">
                                        <div className="accordion-body text-muted bg-white">
                                            There are many variations of passages of Lorem Ipsum available, but the
                                            majority have suffered alteration in some form.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item rounded border-0 shadow mt-3">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button border-0 bg-white collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                aria-expanded="false" aria-controls="collapseTwo">
                                            How does NFT work?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse border-0 collapse"
                                         aria-labelledby="headingTwo"
                                         data-bs-parent="#buyingquestion">
                                        <div className="accordion-body text-muted bg-white">
                                            There are many variations of passages of Lorem Ipsum available, but the
                                            majority have suffered alteration in some form.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item rounded border-0 shadow mt-3">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button border-0 bg-white collapsed" type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree" aria-expanded="false"
                                                aria-controls="collapseThree">
                                            Why should I trust you?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse border-0 collapse"
                                         aria-labelledby="headingThree"
                                         data-bs-parent="#buyingquestion">
                                        <div className="accordion-body text-muted bg-white">
                                            There are many variations of passages of Lorem Ipsum available, but the
                                            majority have suffered alteration in some form.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item rounded border-0 shadow mt-3">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button border-0 bg-white collapsed" type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour" aria-expanded="false"
                                                aria-controls="collapseFour">
                                            What is exchange rate?
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse border-0 collapse"
                                         aria-labelledby="headingFour"
                                         data-bs-parent="#buyingquestion">
                                        <div className="accordion-body text-muted bg-white">
                                            There are many variations of passages of Lorem Ipsum available, but the
                                            majority have suffered alteration in some form.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>





            <FormDialog text='123213' type='buy' title='Купить НФТ' buttonText="Купить" isDialogOpened={isOpenBuy} handleOpen={() => setOpenBuy(false)} nftID={activeNFT}/>
            <FormDialog text='123213' type='emote' title='Оценить НФТ' buttonText="Оценить" isDialogOpened={isOpenEmote} handleOpen={() => setOpenEmote(false)}  nftID={activeNFT}/>
        </>
    )
});

export default NFTs;
