import React from 'react';
import {observer} from "mobx-react";
import {images} from "../App";
import authStore from "../stores/authStore";

const ConnectWallet = observer(() => {


    function authPolka(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        authStore.authorizePolkadot();
    }

    function authMeta(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        authStore.authorizeMetaMask();
    }


    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-5 me-auto mt-lg-0 mb-30">
                    <div className="card">
                        <div className="card-body p-3">
                            <img src="assets/img/art/item-details.png" className="w-100 border-radius-lg" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="row">
                        <div className="col-lg-6 mb-30">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="card card-background shadow-none card-background-mask-primary">
                                        <div className="full-background"></div>
                                        <div className="card-body text-center p-3 w-100">
                                            <div
                                                className="icon icon-shape icon-sm bg-white shadow mx-auto mb-3 d-flex align-items-center justify-content-center border-radius-md">
                                                <img src={images['metamasklogo.png'].default} className="img-fluid"
                                                   aria-hidden="true" alt=""></img>
                                            </div>
                                            <h5 className="text-black up mb-10p">Meta Mask</h5>
                                            <p className="text-sm">From colors, cards, typography to complex, you will
                                                find the.</p>
                                            <button className="btn btn-outline-primary btn-white mb-0 w-100" onClick={authMeta}>Connect Wallet</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="card card-background shadow-none card-background-mask-primary">
                                        <div className="full-background"
                                             style={{backgroundImage: `url(${images['polkadot.png'].default})`}}/>
                                        <div className="card-body text-center p-3 w-100">
                                            <div
                                                className="icon icon-shape icon-sm bg-white shadow mx-auto mb-3 d-flex align-items-center justify-content-center border-radius-md">
                                                <img src={images['polkadot.png'].default} className="img-fluid"
                                                     aria-hidden="true" alt=""></img>
                                            </div>
                                            <h5 className="text-black up mb-10p">Polkadot</h5>
                                            <p className="text-sm">From colors, cards, typography to complex, you will
                                                find the.</p>
                                            <button className="btn btn-outline-primary btn-white mb-0 w-100" onClick={authPolka}>Connect Wallet</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
});

export default ConnectWallet;
