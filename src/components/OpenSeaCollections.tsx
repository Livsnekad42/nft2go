import React, {useEffect} from 'react';
import {ICollectionOpenSea, INFTOpenSea} from "../interfaces/NFTInterface";
import {Link} from "react-router-dom";
import {images, imagesClient} from "../App";
import openseaStore from "../stores/openseaStore";
import {observer} from "mobx-react";
import ReactPaginate from "react-paginate";

const OpenSeaCollections = observer(() => {

    function handleSelectColl(event: React.ChangeEvent<HTMLSelectElement>) {
        openseaStore.setMyCollsPageSize(+event.target.value)
        openseaStore.getAllCollections(openseaStore.openseaCollections.pagination.page, +event.target.value);
    }


    function handlePageChangeColl(event: any) {
        openseaStore.getAllCollections(event.selected, openseaStore.openseaCollections.pagination.pageSize)
    }


    useEffect(() => {
        openseaStore.getAllCollections(1, 10);
    }, [])

    return (
        <>

            <section className="bg-half-100 bg-light d-table w-100" style={{paddingTop:50}}>
                <div className="container position-relative" style={{zIndex: 1}}>
                    <div className="row justify-content-center mt-5">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h4 className="title fw-medium mb-4">OpenSea Collections</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="position-absolute top-50 start-50 mt-4 translate-middle">
                    <img src={images['icon-gradient.png'].default} className="img-fluid opacity-2" style={{maxHeight: 300}}
                         alt=""/>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row">
                        <p>Количество на странице: {openseaStore.openseaCollections.pagination.pageSize}</p>
                        <select name="pages" id="pages" onChange={handleSelectColl} value={openseaStore.openseaCollections.pagination.pageSize}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                        <div className='btn-wrap' style={{marginTop:20}}>
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
                                onPageChange={(e) => handlePageChangeColl(e)}
                            />
                        </div>
                        {openseaStore.openseaCollections.collections && openseaStore.openseaCollections.collections.map((coll: ICollectionOpenSea) => {
                            return (
                                <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
                                    <div className="nft-collection nft-col-primary p-3 bg-white rounded-md shadow">
                                        <Link to={'/opensea/collections/' + coll.id}>
                                            <img src={coll.image_url} className="img-fluid rounded-md shadow mb-2" alt=""/>
                                        </Link>
                                        <div className="row g-2">
                                            {coll.nfts && coll.nfts.map((nft: INFTOpenSea) => {
                                                return (
                                                    <div className="col-4">
                                                        <Link to={'/opensea/nfts/' + nft.id}>
                                                            <img src={nft.image_preview_url} className="img-fluid rounded-md shadow"
                                                                 alt=""/>
                                                        </Link>
                                                    </div>
                                                )})}
                                        </div>

                                        <div className="content mt-3">

                                            <Link to={'/opensea/collections/' + coll.id} className="title text-dark h5">{coll.name}</Link>

                                            <ul className="pt-3 d-flex justify-content-between align-items-center list-unstyled mb-0">
                                                <li className="d-flex author align-items-center">
                                                    <img src={imagesClient['01.jpg'].default}
                                                         className="avatar avatar-sm-sm rounded-pill shadow" alt=""/>
                                                    <span className="text-muted ps-2">by</span>
                                                    <a href="nft-creator-profile.html"
                                                       className="ps-1 text-dark h6 mb-0 name">{coll.slug}</a>
                                                </li>
                                                <li>
                                                    <span className="badge bg-soft">{!!coll.nfts && coll.nfts.length} Items</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )})}

                    </div>
                </div>
            </section>

        </>
    )
});

export default OpenSeaCollections;
