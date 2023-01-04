import {
    signUp,
    signIn,
    setHeaderAuthorization,
    removeHeaderAuthorization,
    googleAuth, facebookAuth, verifyMail, signOut, setSessionDuration
} from './../requests/axiosRequests';
import {runInAction, makeAutoObservable} from 'mobx';
import history from "../settings/history";
import {isLogged, setToastError} from "../settings/utils";
import rmrkStore from "./rmrkStore";
import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";
import {Keyring} from "@polkadot/api";
import globalStore from "./globalStore";

// @ts-ignore




declare let window: any;

class AuthStore {

    constructor() {
        this.logIn = this.logIn.bind(this);
        this.logUp = this.logUp.bind(this);
        this.getTimeLogOut = this.getTimeLogOut.bind(this);
        makeAutoObservable(this);
        this.data.isLoggedIn = isLogged();
        this.logOut = this.logOut.bind(this);
        this.setAddCodeStatus = this.setAddCodeStatus.bind(this);
        this.setIsCodeStatus = this.setIsCodeStatus.bind(this);
        this.setCode = this.setCode.bind(this);
        this.verifyMail = this.verifyMail.bind(this);
        this.setLoginStatus = this.setLoginStatus.bind(this);
        this.authorizeGoogle = this.authorizeGoogle.bind(this);


    }

    data = {
        isLoggedIn: false,
        seen: false,
        logOutTime : 9999999,
        isCode: false,
        verificationCode: '',
        addCode: '',
        creds : {
            "email": "",
            "password": ""
        }
    }


    googleUser = {
        name: '',
        email: '',
        img: ''
    }

    facebookUser = {
        name: '',
        email: '',
        img: ''
    }

    setLoginStatus(val: boolean) {
        runInAction(() => {
            this.data.isLoggedIn = val;
        })

    }

    setSeenStatus(val: boolean) {
        runInAction(() => {
            this.data.isLoggedIn = val;
        })
    }

    setIsCodeStatus(val: boolean) {
        runInAction(() => {
            this.data.isCode = val;
        })
    }

    setAddCodeStatus(val: string) {
        runInAction(() => {
            this.data.addCode = val;
        })
    }

    setCode(val: string) {
        runInAction(() => {
            this.data.verificationCode = val;
        })
    }

    async logUp(data: any) {
        runInAction(() => {
            this.data.creds.email = data.email;
            this.data.creds.password = data.password;
        })
        try {
            const resp = await signUp(data);
            if (!!resp.data) {
                this.setAddCodeStatus(resp.data.addCode);
                this.setIsCodeStatus(true);
            }
        }
        catch (error) {
            console.log('pixda',JSON.stringify(error));
            setToastError(error)
            if (error.status === 400) {
                alert(error.data.errors[0].msg);
            }
            if (error.status === 422) {
                console.log(error);
            };
        }
    }

    async verifyMail() {
        let data = {
            code: this.data.verificationCode,
            addCode: this.data.addCode
        };
        let resp = await verifyMail(data);
        if (resp.data.verification) {
            this.logIn(this.data.creds);
        }
    }

    getTimeLogOut(tokenData: any) {
        let data = JSON.parse(tokenData)
        console.log('par', data)
        let diff = data.exp - data.iat;
        runInAction(() => {
            this.data.logOutTime = diff
        })
    }


    async authorizePolkadot() {
        try {
            const extensions = await web3Enable('NFT2GO');
            if (extensions.length === 0) {
                return;
            }
            const allAccounts = await web3Accounts();
            console.log(allAccounts);
            if (allAccounts.length === 0) {
                setToastError('Can`t find wallets. Maybe you need to create one?');
                return;
            }

            const account = allAccounts[0];
            if (!!account) {
                const thisAddress = account.address;
                const keyring = new Keyring({type: 'sr25519', ss58Format: 2});
                let {address} = keyring.addFromAddress(thisAddress);
                this.logInPolkadot(address);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async authorizeMetaMask() {
        if (!!window.ethereum) {
            console.log('MetaMask is installed!');
        } else {
            console.error('hui tam')
        }
        const { ethereum } = window;
        let address = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log(address)
        this.logInPolkadot(address[0]);
    }


    async authorizeGoogle(response: any) {
        try {
            const profile = response.profileObj;
            let accessToken = response.accessToken;
            console.log('goog');
            console.log('respo', response);
            if (accessToken) {
                let respGoogle = await googleAuth({accessToken});
                const token = respGoogle.data.token;
                let data = window.atob(token.split('.')[1])
                this.getTimeLogOut(data);
                let {exp} = JSON.parse(data);
                console.log('token', token)
                setHeaderAuthorization(token);
                localStorage.setItem('expirationDate', exp);
                localStorage.setItem('isAuthorized', 'true');
                runInAction(() => {
                    this.setLoginStatus(true)
                    this.googleUser.name = profile.name;
                    this.googleUser.email = profile.email;
                    this.googleUser.img = profile.imageUrl;
                });
                history.push("/feed")
            }
        }
        catch (e) {
            console.log(e);
        }
    }

     authorizeFacebook = async (response: any) => {
        try {
            const profile = response.profile;
            let accessToken = response.tokenDetail.accessToken;
            try {
                let respFace = await facebookAuth({accessToken});
                const token = respFace.data.token;
                let data = window.atob(token.split('.')[1])
                this.getTimeLogOut(data);
                let {exp} = JSON.parse(data);
                setHeaderAuthorization(token);
                localStorage.setItem('expirationDate', exp);
                localStorage.setItem('isAuthorized', 'true');
                runInAction(() => {
                    this.setLoginStatus(true)
                    this.facebookUser.name = profile.name;
                    this.facebookUser.email = profile.email;
                    this.facebookUser.img = profile.picture.data.url;
                });
                history.push("/feed")
            }
            catch (e) {
                console.log(e);
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    async logIn(cred: any) {
        try {
            const resp = await signIn(cred);
            const token = resp.data.token;
            let data = window.atob(token.split('.')[1])
            this.getTimeLogOut(data);
            setHeaderAuthorization(token);
            const respo = await setSessionDuration({"refreshExpires": 604800});
            const newToken = respo.data.token;
            let newData = window.atob(token.split('.')[1])
            this.getTimeLogOut(newData);
            setHeaderAuthorization(newToken);
            let {exp} = JSON.parse(newData);
            localStorage.setItem('isAuthorized', 'true');
            localStorage.setItem('expirationDate', exp);
            runInAction(() => {
                this.setLoginStatus(true)
            })
            this.setIsCodeStatus(false);
            //window.location.href = "https://nft2go.io";
            if (globalStore.returnUrl === "generator.nft2go.io") {
                window.location.href = "https://generator.nft2go.io";
            } else {
                history.push("/feed")
            }
        } catch (error) {
            console.log('hui',error)
            setToastError(error)
        }
    }

    async logInWithoutCred(resp: any) {
        try {
            const token = resp.data.token;
            setHeaderAuthorization(token);
            let data = window.atob(token.split('.')[1])
            this.getTimeLogOut(data);
            let {exp} = JSON.parse(data);
            localStorage.setItem('isAuthorized', 'true');
            localStorage.setItem('expirationDate', exp);
           // runInAction(() => {
           //     this.setLoginStatus(true)
           // })
        } catch (e) {
            console.log(e);
        }
    }

    logInPolkadot(address: string) {
        runInAction(() => {
            rmrkStore.rmrkWallet.wallet = address;
            localStorage.setItem('isAuthorized', 'true');
            this.setLoginStatus(true);
            window.location.href = "https://nft2go.io";
        })
    }


    logInMetaMask(address: string) {
        runInAction(() => {
            rmrkStore.rmrkWallet.wallet = address;
            localStorage.setItem('isAuthorized', 'true');
            this.setLoginStatus(true);
            window.location.href = "https://nft2go.io";
        })
    }

    logOut() {
        localStorage.setItem('isAuthorized', 'false');
        runInAction(() => {
            this.setLoginStatus(false);
            rmrkStore.rmrkWallet.wallet = ''
            rmrkStore.rmrkWallet.balance = 0
            this.facebookUser = {
                name: '',
                email: '',
                img: ''
            };
            this.googleUser = {
                name: '',
                email: '',
                img: ''
            };
        })
        removeHeaderAuthorization();
        localStorage.removeItem('jsw');
        signOut();
        window.location.href = "/";

    }
}

export  interface IAuthStore extends AuthStore {
};
export default new AuthStore();
