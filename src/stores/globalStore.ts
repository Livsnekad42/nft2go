import {runInAction, makeAutoObservable} from 'mobx';
import http from "../settings/mainSettings";
import authStore from "./authStore";
import nftStore from "./nftStore";
import {isLogged} from "../settings/utils";
class GlobalStore {

    constructor() {
        makeAutoObservable(this);
    }

    data = {
        token: '',
        refreshToken: '',
        theme: ''
    }

    isLoading = true


    returnUrl = ""

   setLoginStatus(val: boolean) {
        let value = val.toString();
        localStorage.setItem('isAuthorized', value);
    }

    getLoginStatus() {
        return localStorage.getItem('isAuthorized');
    }

    setToken(val: string) {
        runInAction(() => {
            this.data.token = val;
        })
    }

    setLoader(val: boolean) {
        runInAction(() => {
            this.isLoading = val;
        })
    }

    setLightTheme() {
        localStorage.setItem('TYPE_OF_THEME', 'LIGHT_MODE');
        runInAction(() => {
            this.data.theme = localStorage.getItem('TYPE_OF_THEME')!;
        });
    }

    setDarkTheme() {
        localStorage.setItem('TYPE_OF_THEME', 'DARK_MODE');
        runInAction(() => {
            this.data.theme = localStorage.getItem('TYPE_OF_THEME')!;
        })
    }

    setRefreshToken(val: string) {
        runInAction(() => {
            this.data.refreshToken = val;
        })

    }

    getRefreshToken() {
        return this.data.refreshToken;
    }


    checkAuth() : boolean  {
        return localStorage.getItem('isAuthorized') === 'true' && !!localStorage.getItem('expirationDate') && +localStorage.getItem('expirationDate')! > Math.floor(Date.now()/1000);
    }

    async check() {
        console.log('checked')
        if (this.checkAuth()) {
            nftStore.getWalletAfterRefresh();
            http.post('/api/auth/token').then(response => {
                http.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                authStore.logInWithoutCred(response)
            }, (e) => console.log(e));
        } else {
            authStore.logOut();
        }
    }
}

export interface IGlobalStoreProps extends GlobalStore {
};
export default new GlobalStore();
