import React, {useEffect, useState} from 'react';
import UserForm from './UserForm';
import globalStore, { IGlobalStoreProps } from "../stores/globalStore";
import {imagesBg} from "../App";
import i18n from '../settings/i18n';
import {useLocation} from "react-router-dom";
import {runInAction, toJS} from "mobx";
import {observer} from "mobx-react";

interface IProps {
    globalStore: IGlobalStoreProps
}


const Auth = observer(() => {


    const [view, setView] = useState(true);

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    function GetQueryParams() {
        let query = useQuery();
        const queryGet = query.get('returnUrl');
        console.log('queryget', queryGet);
        if (!!queryGet) {
            runInAction(() => {
                globalStore.returnUrl = queryGet;
            })
        }
        return (
            <></>
        )
    }

    useEffect(() => {
    })

        return (
            <>
                <GetQueryParams/>

                <section className="d-flex align-items-center position-relative"
                         style={{background: `url('${imagesBg['bg-auth.png'].default}') center`, backgroundSize: "cover"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-signin p-4">
                                    {view ?
                                        <UserForm class="authForm" type="signIn" buttonValue={i18n.t('Sign In')} handlerFunction={() => setView( false)}/> :
                                        <UserForm class="authForm" type="signUp" buttonValue={i18n.t('Sign Up')} handlerFunction={() => setView(true)}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
});

export default Auth;
