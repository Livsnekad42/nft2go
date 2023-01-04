import React, {useEffect} from 'react';
import rmrkStore from "../stores/rmrkStore";
import {INFTRMRK, ISingleCollectionInAll} from "../interfaces/NFTInterface";
import {Link} from "react-router-dom";
import {images, imagesClient} from "../App";
import {observer} from "mobx-react";

const Collections = observer(() => {

    useEffect(() => {
        rmrkStore.getCollFromRMRK(1, 10)
    }, [])

    return (
        <>
            <section className="bg-half-100 bg-light d-table w-100" style={{paddingTop:50}}>
                <div className="container position-relative" style={{zIndex: 1}}>
                    <div className="row justify-content-center mt-5">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h4 className="title fw-medium mb-4">All Collections</h4>
                                <p className="text-muted para-desc mx-auto mb-0">Cryptor NFT Marketplace, you can be
                                    sure your trading skills are matched with excellent service.</p>
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

                        {rmrkStore.rmrkCollections && rmrkStore.rmrkCollections.collections && rmrkStore.rmrkCollections.collections.map((coll: ISingleCollectionInAll) => {
                            return (
                                <div className="col-lg-4 col-md-6 col-12 mb-4 pb-2">
                                <div className="nft-collection nft-col-primary p-3 bg-white rounded-md shadow">
                                <Link to={'/collections/' + coll.id}>
                                    <img src={coll.meta.thumb ? coll.meta.thumb : coll.meta.content} className="img-fluid rounded-md shadow mb-2" alt=""/>
                                </Link>
                                    {false && <div className="row g-2">
                                        {coll.nfts && coll.nfts.map((nft: INFTRMRK) => {
                                            return (
                                            <div className="col-4">
                                                <Link to={'/nfts/' + nft.id}>
                                                <img src={nft.meta.thumb} className="img-fluid rounded-md shadow"
                                                     alt=""/>
                                                </Link>
                                            </div>
                                            )})}
                                    </div> }

                                    <div className="content mt-3">

                                        <Link to={'/collections/' + coll.id} className="title text-dark h5">{coll.meta.name}</Link>

                                        <ul className="pt-3 d-flex justify-content-between align-items-center list-unstyled mb-0">
                                            <li className="d-flex author align-items-center">
                                                <img src={imagesClient['01.jpg'].default}
                                                     className="avatar avatar-sm-sm rounded-pill shadow" alt=""/>
                                                <span className="text-muted ps-2">by</span>
                                                <a href="nft-creator-profile.html"
                                                   className="ps-1 text-dark h6 mb-0 name">{coll.issuer.slice(0,8) + '...'}</a>
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

export default Collections;
