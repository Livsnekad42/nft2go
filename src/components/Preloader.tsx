import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {getToken} from "../requests/axiosRequests";
import authStore from "../stores/authStore";
import {runInAction} from "mobx";
import globalStore from "../stores/globalStore";
import history from "../settings/history";
import {useLocation} from "react-router-dom";

const Preloader = observer(() => {


    function useQuery() {
        const { search } = useLocation();
        console.log('sea', search)
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    function GetQueryParams() {
        let query = useQuery();
        console.log('querygetPreloader!!!', query);
        const queryGet = query.get('returnUrl');
        console.log('querygetPreloader', queryGet);
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
        console.log('eee')
        getToken().then((response) => {
            console.log('app1')
            authStore.logInWithoutCred(response);
            globalStore.setLoader(false)
        }).catch((e) => {
            console.log('app2')
            globalStore.setLoader(false)
            history.push('/auth')
        })
    }, [])

    return (
        <>
            <GetQueryParams/>
            Идёт инициализация пользователя
        </>
    )
});

export default Preloader;