import React, {useEffect, useState} from "react";
import {imagesClient} from "../App";
import {observer} from "mobx-react";
import {ICollectionOpenSea, INFTOpenSea} from "../interfaces/NFTInterface";
import {Link} from "react-router-dom";
import {addFavorite1} from "../requests/axiosRequests";
import openseaStore from "../stores/openseaStore";
import ReactPaginate from "react-paginate";

const OpenSea = () => {
    const [view, setView] = useState('nft');

    function setNFT(event: any) {
        event.preventDefault();
        setView('nft');
    }

    async function addFavoriteHandler(event: any, data: any) {
        await addFavorite1(data);
    }

    function setColl(event: any) {
        event.preventDefault();
        setView('coll');
    }

    function handleSelectColl(event: React.ChangeEvent<HTMLSelectElement>) {
        openseaStore.setMyCollsPageSize(+event.target.value)
        openseaStore.getAllCollections(openseaStore.openseaCollections.pagination.page, +event.target.value);
    }

    function handleSelectNFT(event: React.ChangeEvent<HTMLSelectElement>) {
        openseaStore.setALlNFTsPageSize(+event.target.value)
        openseaStore.getAllNFTs(openseaStore.openseaNFTs.pagination.page, +event.target.value);
    }

        function handlePageChangeColl(event: any) {
            openseaStore.getAllCollections(event.selected, openseaStore.openseaCollections.pagination.pageSize)
        }

        function handlePageChangeNFT(event: any) {
            console.log(event);
            openseaStore.getAllNFTs(event.selected, openseaStore.openseaNFTs.pagination.pageSize)
        }





    const AllNFTs = observer(() => {

        return (
            <>

                    <>
                        <h1>Все NFT</h1>
                        <p>Количество на странице: {openseaStore.openseaNFTs.pagination.pageSize}</p>
                        <select name="pages" id="pages" onChange={handleSelectNFT} value={openseaStore.openseaNFTs.pagination.pageSize}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                        <div className='btn-wrap'>
                            <ReactPaginate
                                pageCount={openseaStore.openseaNFTs.totalPages}
                                breakLabel="..."
                                marginPagesDisplayed={2}
                                containerClassName="pagination"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                activeClassName="active"
                                nextLinkClassName="page-link"
                                activeLinkClassName='active'
                                pageRangeDisplayed={4}
                                onPageChange={(e) => handlePageChangeNFT(e)}
                            />
                        </div>
                    </>

                <div className="container">
                    <div id="grid" className="row">
                        {openseaStore.openseaNFTs.nfts.length >= 1 && openseaStore.openseaNFTs.nfts.map((nft: INFTOpenSea) => {
                            return (
                                !!nft.image_url  ? <div className="col-lg-4 col-md-6 picture-item mt-4 py-1"
                                     data-groups='["recents"]' key={nft.id}>
                                    <div
                                        className="card nft-items nft-item-primary rounded-md border-0 shadow overflow-hidden">
                                        <div className="row g-0">
                                            <div className="col-md-6">
                                                <div className="nft-image position-relative overflow-hidden">
                                                    <Link to={'/opensea/nfts/' + nft.id}>
                                                        <img src={nft.image_preview_url} className="img-fluid"
                                                             alt=""/></Link>
                                                    <div className="pop-icon">
                                                        <Link to={'/opensea/nfts/' + nft.id}></Link>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="col-md-6">
                                                <div
                                                    className="card-body p-md-3 content d-flex h-100 flex-column">
                                                    <div>
                                                        <Link to={'/opensea/nfts/' + nft.id}
                                                              className="title h6 mb-1 text-dark d-block">{nft.name}</Link>
                                                        <small className="badge bg-soft-primary">{nft.sell_orders!.length > 0 && +nft.sell_orders![0].base_price / 1000000000000000000} ETH</small>
                                                    </div>
                                                    <div
                                                        className="d-flex author align-items-center mt-md-auto mb-0 mt-4 mt-sm-0">
                                                        <div className="position-relative">
                                                            <img src={imagesClient['01.jpg'].default}
                                                                 className="avatar avatar-sm-sm rounded-pill shadow"
                                                                 alt=""/>
                                                            <div
                                                                className="position-absolute top-0 start-0 translate-middle pt-2 ps-2">
                                                                <span onClick={(e) => {addFavoriteHandler(e, {nftId: nft.id})}}><i
                                                                    className="mdi mdi-heart align-middle"></i></span>
                                                            </div>
                                                        </div>
                                                        <a href="nft-creator-profile.html"
                                                           className="ps-2 text-dark name">{nft.ownerAddress}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> : <></>
                            )})}
                    </div>
                </div>

            </>
        )
    });

    const AllCollections = observer(() => {
        return (
            <>
                                        <h1>Все Коллекции</h1>
                        <p>Количество на странице: {openseaStore.openseaCollections.pagination.pageSize}</p>
                        <select name="pages" id="pages" onChange={handleSelectColl} value={openseaStore.openseaCollections.pagination.pageSize}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                <div className='btn-wrap'>
                    <ReactPaginate
                        pageCount={openseaStore.openseaCollections.totalPages}
                        breakLabel="..."
                        marginPagesDisplayed={2}
                        containerClassName="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        pageRangeDisplayed={4}
                        activeClassName="active"
                        onPageChange={(e) => handlePageChangeColl(e)}
                    />
                </div>

                <div className="container">
                    <div className="col-12 py-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    {openseaStore.openseaCollections.collections.length >= 1 && openseaStore.openseaCollections.collections.map((coll: ICollectionOpenSea) => {
                                        return (
                                            !!coll.image_url ? <div className="col-lg-4 col-md-6 picture-item mt-4 py-1"
                                                 data-groups='["recents"]' key={coll.id}>
                                                <div
                                                    className="card nft-items nft-item-primary rounded-md border-0 shadow overflow-hidden">
                                                    <div className="row g-0">
                                                        <div className="col-md-6">
                                                            <div className="nft-image position-relative overflow-hidden">
                                                                <img src={coll.image_url} className="img-fluid"
                                                                     alt="" />
                                                                <div className="pop-icon">
                                                                    <Link to={'/opensea/collections/'+ coll.id}
                                                                          className="btn bg-white btn-pills btn-icon shadow"><i
                                                                        className="uil uil-arrow-right text-dark"></i></Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div
                                                                className="card-body p-md-3 content d-flex h-100 flex-column">
                                                                <div>
                                                                    <Link to={'/opensea/collections/' + coll.id}
                                                                          className="title h6 mb-1 text-dark d-block">{coll.name}</Link>
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
                                                                       className="ps-2 text-dark name">{`${coll.payout_address}`}</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> : <></>
                                        )})}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    });


    useEffect(() => {
        openseaStore.getAllNFTs(1, 10).then(() => {
            openseaStore.getAllCollections(1, 10);
            openseaStore.setAllNFTsTotalPages();
            openseaStore.setAllCollsTotalPages();
        });

    })

    return (
        <>
            <section className="bg-half-100 pb-0" style={{paddingTop: 50}}>
                <div className="container position-relative" style={{zIndex: 1}}>

                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="section-title text-center">
                                <h4 className="title mb-3">Latest Works</h4>
                                <p className="text-muted mx-auto para-desc mb-0">Buy and sell 100+ cryptocurrencies with 20+
                                    fiat currencies using bank transfers or your credit/debit card.</p>
                                <div className="filters-group-wrap mt-5">
                                    <div className="filters-group">
                                        <ul className="container-filter mb-0 categories-filter list-unstyled filter-options">
                                            <li className="list-inline-item categories position-relative"
                                                data-group="top" onClick={setNFT}>NFT
                                            </li>
                                            <li className="list-inline-item categories position-relative"
                                                data-group="top" onClick={setColl}>Collections
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                    view === 'nft' ? <AllNFTs /> : <AllCollections/>
                    }

                </div>

            </section>
        </>
    )
}

export default OpenSea;
