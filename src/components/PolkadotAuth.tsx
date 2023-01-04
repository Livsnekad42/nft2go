import React from 'react';
import {observer} from "mobx-react";
import authStore from "../stores/authStore";

const PolkadotAuth = observer(() => {
    return (
        <>
            <button className="btn btn-outline-primary q" onClick={authStore.authorizePolkadot}>Enter with Polkadot</button>
        </>
    )
});

export default PolkadotAuth;
