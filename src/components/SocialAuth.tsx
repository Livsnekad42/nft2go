import React from 'react';
import { GoogleLogin } from 'react-google-login';
import authStore from "../stores/authStore";
import {observer} from "mobx-react";
import { Link } from 'react-router-dom';
import i18n from "../settings/i18n";
const SocialAuth = observer(() => {

    return (
        <div className="row px-xl-5 px-sm-4 px-3 mt-30">

            <GoogleLogin
                clientId="405410625546-f444477fdskidrpkpngaic6otcnq8un0.apps.googleusercontent.com"
                buttonText={i18n.t('Google Login')}
                onSuccess={authStore.authorizeGoogle}
                onFailure={authStore.authorizeGoogle}
                cookiePolicy={'single_host_origin'}
            />
            {false && <Link to="/connect-wallet" style={{paddingLeft:0, paddingRight:0, marginTop:10}}><button className="btn btn-outline-primary btn-outline-dark mb-0 w-100">Login with wallet</button></Link>}
        </div>

    )
});

export default SocialAuth;
