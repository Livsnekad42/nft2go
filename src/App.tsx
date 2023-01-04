import React, {useEffect} from 'react';
import {Router} from 'react-router-dom';
import './assets/style/style.scss';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import authStore from './stores/authStore';
import MainContainer from './components/MainContainer';
import history from "./settings/history";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TYPE_OF_THEME } from './settings/enum.theme';
import { ThemeProvider } from 'styled-components';
import globalStore from "./stores/globalStore";
import {GlobalDarkThemes} from "./darkTheme";
import {observer} from "mobx-react";
import {runInAction, toJS} from "mobx";
import nftStore from "./stores/nftStore";
import Preloader from "./components/Preloader";

export function importAll(r: any) {
    let images = {};
    r.keys().forEach((item: any, index: number) => { // @ts-ignore
        images[item.replace('./', '')] = r(item); });
    return images
}
export const images: any = importAll(require.context('./assets/img', false, /\.(png|jpe?g|svg)$/));
export const imagesApp: any = importAll(require.context('./assets/img/app', false, /\.(png|jpe?g|svg)$/));
export const imagesArt: any = importAll(require.context('./assets/img/art', false, /\.(png|jpe?g|svg)$/));
export const imagesAuthors: any = importAll(require.context('./assets/img/authors', false, /\.(png|jpe?g|svg)$/));
export const imagesBg: any = importAll(require.context('./assets/img/bg', false, /\.(png|jpe?g|svg)$/));
export const imagesBlog: any = importAll(require.context('./assets/img/blog', false, /\.(png|jpe?g|svg)$/));
export const imagesClient: any = importAll(require.context('./assets/img/client', false, /\.(png|jpe?g|svg)$/));
export const imagesCoin: any = importAll(require.context('./assets/img/coin', false, /\.(png|jpe?g|svg)$/));
export const imagesCurved: any = importAll(require.context('./assets/img/curved-images', false, /\.(png|jpe?g|svg)$/));
export const imagesHero: any = importAll(require.context('./assets/img/hero', false, /\.(png|jpe?g|svg)$/));
export const imagesIcons: any = importAll(require.context('./assets/img/icons', false, /\.(png|jpe?g|svg)$/));
export const imagesIllust: any = importAll(require.context('./assets/img/illustration', false, /\.(png|jpe?g|svg)$/));
export const imagesNft500: any = importAll(require.context('./assets/img/nft/500', false, /\.(png|jpe?g|svg)$/));
export const imagesNft625: any = importAll(require.context('./assets/img/nft/625', false, /\.(png|jpe?g|svg)$/));
export const imagesNft800: any = importAll(require.context('./assets/img/nft/800', false, /\.(png|jpe?g|svg)$/));
export const imagesNftbg: any = importAll(require.context('./assets/img/nft/bg', false, /\.(png|jpe?g|svg)$/));
export const imagesNftCreateBg: any = importAll(require.context('./assets/img/nft/creator-bg', false, /\.(png|jpe?g|svg)$/));
export const imagesShapes: any = importAll(require.context('./assets/img/shapes', false, /\.(png|jpe?g|svg)$/));
export const imagesSmall: any = importAll(require.context('./assets/img/small-logos', false, /\.(png|jpe?g|svg)$/));
export const imagesSvg: any = importAll(require.context('./assets/img/svg-coin', false, /\.(png|jpe?g|svg)$/));


const App = observer(() => {

const Styles = () => {
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap');
            </style>
        </>
    )
}





        useEffect(() => {

            // if (isLogged() && !rmrkStore.rmrkWallet.wallet) {
            //     nftStore.getWalletAfterRefresh();
            // }
            let expDate = localStorage.getItem('expirationDate');
            // if (isLogged() && expDate && parseInt(expDate) < Date.now()) {
            //     authStore.logOut()
            // }

            runInAction(() => {
                globalStore.data.theme = localStorage.getItem('TYPE_OF_THEME') || TYPE_OF_THEME.DEFAULT;
                if (!!localStorage.getItem('rmrk-ver')) {
                    nftStore.setRMRKVersion(localStorage.getItem('rmrk-ver')!);
                } else {
                    localStorage.setItem('rmrk-ver', '2')
                }
            });
        }, [])

        return (
            <ThemeProvider theme={
                {
                    body: '',
                    text: '',
                    toggleBorder: '',
                    gradient: 'linear-gradient(#39598A, #79D7ED)',
                }
            }>
                <Styles/>
                {globalStore.data.theme === 'DARK_MODE' ? <GlobalDarkThemes/> : null}

                {globalStore.isLoading ? <Preloader/> : <div className="g-sidenav-show  bg-gray-100">

                        <Header authStore={authStore}/>
                        <MainContainer />
                        <Footer/>
                        <ToastContainer/>
                </div>}
            </ThemeProvider>
        )
});



export default App;
