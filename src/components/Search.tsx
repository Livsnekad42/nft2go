import React from 'react';
import * as H from "history";
import rmrkStore from "../stores/rmrkStore";
import {INFTRMRK} from "../interfaces/NFTInterface";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {images, imagesClient} from "../App";

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

const Search = observer(
    class Search extends React.Component<IRouteComponentProps<any>> {


        query = this.props.match.params.query;

        componentDidMount() {
            rmrkStore.getAllNFT(1, 10, this.query);
        }


        render() {
            return (
                <>
                    <section className="bg-half-100 bg-light d-table w-100" style={{paddingTop:50}}>
                        <div className="container position-relative" style={{zIndex: 1}}>
                            <div className="row justify-content-center mt-5">
                                <div className="col-12">
                                    <div className="section-title text-center">
                                        <h4 className="title fw-medium mb-4">This is what we could find: </h4>
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
                                                        <small
                                                            className="badge bg-soft-primary">{nft.forsale} DOT</small>
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
                            )
                        })}
                    </div>
                        </div>
                    </section>
                </>
            )
        }
    }
);

export default Search;
