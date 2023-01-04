import React from 'react';
import {Link} from "react-router-dom"
import authStore, {IAuthStore} from "../../stores/authStore";
import {observer} from "mobx-react";
import {images, imagesClient} from '../../App';
import i18n from '../../settings/i18n';
import globalStore from "../../stores/globalStore";
import nftStore from "../../stores/nftStore";
import {isLogged} from '../../settings/utils';
import FormDialog from "../Popups";
import rmrkStore from '../../stores/rmrkStore';
import userStore from "../../stores/userStore";
import {mnemonicGenerate} from "@polkadot/util-crypto";
import {runInAction} from "mobx";

interface IProps {
    authStore: IAuthStore
}

interface IState {
    isOpenNav: true | false,
    lang: string,
    darkMode: true | false,
    visibleEmail: true | false,
    visiblePass: true | false,
    openInfo: true | false,
    openMnemo: true | false

}

const Header = observer(
    class Header extends React.Component<IProps, IState> {

        constructor(props: IProps) {
            super(props);
            this.state = {
                isOpenNav: false,
                lang: "RU",
                darkMode: false,
                visibleEmail: false,
                visiblePass: false,
                openInfo: false,
                openMnemo: false
            }
            this.toggleMenu = this.toggleMenu.bind(this);
            this.turnOffMenu = this.turnOffMenu.bind(this);
            this.changeLanguage = this.changeLanguage.bind(this);
            this.logout = this.logout.bind(this);
            this.toggleDark = this.toggleDark.bind(this);
            this.toggleLight = this.toggleLight.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleOpenEmail = this.handleOpenEmail.bind(this);
            this.handleMnemoNew = this.handleMnemoNew.bind(this);
            this.handleOpenPass = this.handleOpenPass.bind(this);
            this.changePass = this.changePass.bind(this);
            this.changeEmail = this.changeEmail.bind(this);
        }

        async handleMnemoNew(event: React.MouseEvent<HTMLAnchorElement>) {
            const mnemonic = mnemonicGenerate();
            runInAction(() => {
                userStore.mnemoNew = mnemonic.split(" ")
            })
            userStore.shuffleMnemonic(mnemonic);
            userStore.setSection(2)
        }

        changeLanguage = (lng: any) => {
            i18n.changeLanguage(lng);
            this.setState({lang: lng})
        }

        logout = () => {
            authStore.logOut();
        }

        turnOffMenu = () => {
            this.setState((prevState) => ({
                isOpenNav: false
            }));
        }

        handleOpenPass() {
            this.setState({visiblePass: true})
        };

        handleOpenEmail() {
            this.setState({visibleEmail: true})
        };

        changeEmail() {
            this.turnOffMenu();
            this.handleOpenEmail();
        }

        changePass() {
            this.turnOffMenu();
            this.handleOpenPass();
        }


        handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
                localStorage.setItem('rmrk-ver', '2');
                nftStore.setRMRKVersion('2');
            } else {
                localStorage.setItem('rmrk-ver', '1');
                nftStore.setRMRKVersion('1');
            }
        }


        toggleMenu(event: any) {
            event.preventDefault();
            this.setState((prevState) => ({
                isOpenNav: !prevState.isOpenNav
            }));
        };

        toggleLight() {
            this.setState((prevState) => ({
                darkMode: false
            }));
            globalStore.setLightTheme();
        }

        toggleDark() {
            this.setState((prevState) => ({
                darkMode: true
            }));
            globalStore.setDarkTheme();
        }

        render() {
            // @ts-ignore
            // @ts-ignore
            // @ts-ignore
            // @ts-ignore
            return (
                <>

                    {false && <header id="topnav" className="defaultscroll sticky bg-light">
                        <div className="container-fluid d-flex justify-content-around align-items-center">
                            <Link className="logo" to="https://nft2go.io">
                                <img src={images['logo-nft.png'].default} height="35" className="logo-light-mode"
                                     alt=""/>
                                <img src={images['logo-nft.png'].default} height="35" className="logo-dark-mode"
                                     alt=""/>
                            </Link>
                            <div className="d-flex align-items-center">
                                <span>RMRK Version&nbsp;</span>
                                1
                                <label className="switch-btn">
                                    <input id="enableFilter" type="checkbox" name="enable-filter"
                                           onChange={event => this.handleChange(event)}
                                           checked={nftStore.rmrkVersion === 2 ? true : false}/>
                                    <span className="switch-element"></span>
                                </label>
                                &nbsp;2
                            </div>
                            <div style={{display: "inline-flex"}} className="justify-content-around align-items-center">
                                <div style={{display: "inline-block"}} id="themeToggler-left">
                                    {this.state.darkMode ?
                                        <svg onClick={this.toggleLight} width="30" height="30" viewBox="0 0 100 100"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M50 65C53.9782 65 57.7936 63.4196 60.6066 60.6066C63.4196 57.7936 65 53.9782 65 50C65 46.0218 63.4196 42.2064 60.6066 39.3934C57.7936 36.5804 53.9782 35 50 35C46.0218 35 42.2064 36.5804 39.3934 39.3934C36.5804 42.2064 35 46.0218 35 50C35 53.9782 36.5804 57.7936 39.3934 60.6066C42.2064 63.4196 46.0218 65 50 65V65ZM50 75C43.3696 75 37.0107 72.3661 32.3223 67.6777C27.6339 62.9893 25 56.6304 25 50C25 43.3696 27.6339 37.0107 32.3223 32.3223C37.0107 27.6339 43.3696 25 50 25C56.6304 25 62.9893 27.6339 67.6777 32.3223C72.3661 37.0107 75 43.3696 75 50C75 56.6304 72.3661 62.9893 67.6777 67.6777C62.9893 72.3661 56.6304 75 50 75V75ZM50 0C51.3261 0 52.5979 0.526784 53.5355 1.46447C54.4732 2.40215 55 3.67392 55 5V15C55 16.3261 54.4732 17.5979 53.5355 18.5355C52.5979 19.4732 51.3261 20 50 20C48.6739 20 47.4021 19.4732 46.4645 18.5355C45.5268 17.5979 45 16.3261 45 15V5C45 3.67392 45.5268 2.40215 46.4645 1.46447C47.4021 0.526784 48.6739 0 50 0V0ZM50 80C51.3261 80 52.5979 80.5268 53.5355 81.4645C54.4732 82.4021 55 83.6739 55 85V95C55 96.3261 54.4732 97.5979 53.5355 98.5355C52.5979 99.4732 51.3261 100 50 100C48.6739 100 47.4021 99.4732 46.4645 98.5355C45.5268 97.5979 45 96.3261 45 95V85C45 83.6739 45.5268 82.4021 46.4645 81.4645C47.4021 80.5268 48.6739 80 50 80V80ZM5 45H15C16.3261 45 17.5979 45.5268 18.5355 46.4645C19.4732 47.4021 20 48.6739 20 50C20 51.3261 19.4732 52.5979 18.5355 53.5355C17.5979 54.4732 16.3261 55 15 55H5C3.67392 55 2.40215 54.4732 1.46447 53.5355C0.526784 52.5979 0 51.3261 0 50C0 48.6739 0.526784 47.4021 1.46447 46.4645C2.40215 45.5268 3.67392 45 5 45V45ZM85 45H95C96.3261 45 97.5979 45.5268 98.5355 46.4645C99.4732 47.4021 100 48.6739 100 50C100 51.3261 99.4732 52.5979 98.5355 53.5355C97.5979 54.4732 96.3261 55 95 55H85C83.6739 55 82.4021 54.4732 81.4645 53.5355C80.5268 52.5979 80 51.3261 80 50C80 48.6739 80.5268 47.4021 81.4645 46.4645C82.4021 45.5268 83.6739 45 85 45ZM85.355 14.645C86.2924 15.5826 86.8189 16.8542 86.8189 18.18C86.8189 19.5058 86.2924 20.7774 85.355 21.715L78.285 28.785C77.8238 29.2626 77.272 29.6435 76.662 29.9055C76.052 30.1676 75.3959 30.3055 74.732 30.3113C74.0681 30.317 73.4097 30.1905 72.7952 29.9391C72.1807 29.6877 71.6225 29.3164 71.153 28.847C70.6836 28.3775 70.3123 27.8193 70.0609 27.2048C69.8095 26.5903 69.683 25.9319 69.6887 25.268C69.6945 24.6041 69.8324 23.948 70.0945 23.338C70.3565 22.728 70.7374 22.1762 71.215 21.715L78.285 14.645C79.2226 13.7076 80.4942 13.1811 81.82 13.1811C83.1458 13.1811 84.4174 13.7076 85.355 14.645V14.645ZM28.785 71.215C29.7224 72.1526 30.2489 73.4242 30.2489 74.75C30.2489 76.0758 29.7224 77.3474 28.785 78.285L21.715 85.35C21.2538 85.8275 20.702 86.2085 20.092 86.4705C19.482 86.7326 18.8259 86.8705 18.162 86.8762C17.4981 86.882 16.8397 86.7555 16.2252 86.5041C15.6107 86.2527 15.0525 85.8814 14.583 85.412C14.1136 84.9425 13.7423 84.3843 13.4909 83.7698C13.2395 83.1553 13.113 82.4969 13.1187 81.833C13.1245 81.1691 13.2624 80.513 13.5245 79.903C13.7865 79.293 14.1674 78.7412 14.645 78.28L21.715 71.21C22.6526 70.2726 23.9242 69.7461 25.25 69.7461C26.5758 69.7461 27.8474 70.2726 28.785 71.21V71.215ZM21.715 14.645L28.785 21.715C29.6958 22.658 30.1998 23.921 30.1884 25.232C30.177 26.543 29.6511 27.7971 28.7241 28.7241C27.7971 29.6511 26.543 30.177 25.232 30.1884C23.921 30.1998 22.658 29.6958 21.715 28.785L14.65 21.715C13.7762 20.7657 13.3033 19.5153 13.33 18.2254C13.3567 16.9354 13.8811 15.7057 14.7934 14.7934C15.7057 13.8811 16.9354 13.3567 18.2254 13.33C19.5153 13.3033 20.7657 13.7762 21.715 14.65V14.645ZM78.285 71.215L85.355 78.285C86.2658 79.228 86.7698 80.491 86.7584 81.802C86.747 83.113 86.2211 84.3671 85.2941 85.2941C84.3671 86.2211 83.113 86.747 81.802 86.7584C80.491 86.7698 79.228 86.2658 78.285 85.355L71.215 78.285C70.7374 77.8238 70.3565 77.272 70.0945 76.662C69.8324 76.052 69.6945 75.3959 69.6887 74.732C69.683 74.0681 69.8095 73.4097 70.0609 72.7952C70.3123 72.1807 70.6836 71.6225 71.153 71.153C71.6225 70.6836 72.1807 70.3123 72.7952 70.0609C73.4097 69.8095 74.0681 69.683 74.732 69.6887C75.3959 69.6945 76.052 69.8324 76.662 70.0945C77.272 70.3565 77.8238 70.7374 78.285 71.215Z"
                                                fill="white"/>
                                        </svg>
                                        : <svg onClick={this.toggleDark} width="30" height="30" viewBox="0 0 47 50"
                                               fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18.7508 0.866667C19.0558 1.23735 19.2427 1.69099 19.2873 2.16898C19.3319 2.64697 19.2321 3.12734 19.0008 3.54803C17.194 6.86528 16.2505 10.5836 16.2569 14.361C16.2569 26.9271 26.5011 37.1026 39.1266 37.1026C40.7736 37.1026 42.3768 36.9307 43.9175 36.6025C44.3897 36.5003 44.8817 36.5394 45.3319 36.715C45.7821 36.8906 46.1706 37.195 46.4488 37.5901C46.7425 38.0009 46.8923 38.4972 46.8748 39.0019C46.8573 39.5066 46.6734 39.9914 46.3519 40.3808C43.9008 43.3917 40.8087 45.8176 37.301 47.4817C33.7933 49.1458 29.9585 50.0061 26.0761 50C11.6692 50 0 38.3932 0 24.0926C0 13.3297 6.60653 4.09805 16.0132 0.185389C16.4817 -0.0126449 17.0019 -0.0532905 17.4956 0.0695579C17.9892 0.192406 18.4297 0.472115 18.7508 0.866667V0.866667ZM15.1819 4.09493C11.5649 6.0351 8.54109 8.91901 6.43193 12.4402C4.32276 15.9613 3.20701 19.9881 3.20326 24.0926C3.20326 36.6557 13.4506 46.8311 26.0761 46.8311C29.0995 46.8363 32.0939 46.2419 34.886 45.0821C37.6781 43.9223 40.2125 42.2203 42.3424 40.0746C41.2892 40.2058 40.2173 40.2714 39.1266 40.2714C24.7198 40.2714 13.0537 28.6647 13.0537 14.3641C13.0537 10.7171 13.81 7.24506 15.1819 4.09493V4.09493Z"
                                                fill="black"/>
                                        </svg>}
                                </div>
                            </div>
                            <div className="menu-extras">
                                <div className="menu-item">
                                <span className={this.state.isOpenNav ? 'navbar-toggle open' : 'navbar-toggle'}
                                      id="isToggle" onClick={(e) => this.toggleMenu(e)}>
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </span>
                                </div>
                            </div>

                            <ul className="buy-button list-inline mb-0">
                                <li className="list-inline-item search-icon mb-0">
                                <span data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
                                      aria-controls="offcanvasTop">
                                    <i className="uil uil-search fs-5 align-middle text-dark mb-0"></i>
                                </span>
                                </li>
                            </ul>

                            <div id="navigation" style={this.state.isOpenNav ? {display: 'block', zIndex: 2} : {
                                display: 'none',
                                zIndex: 2
                            }}>
                                <ul className="navigation-menu nav-right d-flex justify-content-center align-items-center flex-column flex-md-row">

                                    {authStore.data.isLoggedIn && <li className="has-submenu parent-parent-menu-item">
                                        <Link to={"/lk/profile/myprofile"}>{i18n.t('Profile')}</Link><span
                                        className="menu-arrow"></span>
                                    </li>}

                                    <li className="parent-parent-menu-item" onClick={this.toggleMenu}>
                                        <Link to={'/feed'}>{i18n.t('Feed')}</Link>
                                    </li>

                                    <li className="parent-parent-menu-item" onClick={this.toggleMenu}>
                                        <Link to={'/collections'}>{i18n.t('Collections')}</Link>
                                    </li>
                                    <li className="parent-parent-menu-item" onClick={this.toggleMenu}>
                                        <Link to={'/opensea'}>{i18n.t('OpenSea')}</Link>
                                    </li>
                                    <li className="parent-parent-menu-item" onClick={this.toggleMenu}>
                                        <Link to={'/opensea/collections'}>{i18n.t('OpenSea Collections')}</Link>
                                    </li>
                                    {authStore.data.isLoggedIn && <li>
                                        <Link to={'/lk/mynfts'} className="sub-menu-item">{i18n.t('My NFTs')}</Link>
                                    </li>}

                                    {authStore.data.isLoggedIn &&
                                        <li><Link to={'/lk/upload'} className="sub-menu-item"> {i18n.t('Create')}</Link>
                                        </li>}
                                    <li>
                                        {authStore.data.isLoggedIn ?
                                            <Link to="/" style={{cursor: 'pointer'}} onClick={authStore.logOut}
                                                  className="sub-menu-item">{i18n.t('Sign Out')}</Link> :
                                            <Link to={'/auth'} className="sub-menu-item">{i18n.t('Sign In')}</Link>}
                                    </li>
                                    {authStore.data.isLoggedIn && <li className="list-inline-item ms-2">
                                        <li>
                                            <img
                                                src={!!authStore.googleUser.img ? authStore.googleUser.img : !!authStore.facebookUser.img ? authStore.facebookUser.img : imagesClient['01.jpg'].default}
                                                className="rounded-pill avatar avatar-sm-sm" alt=""/>
                                            <ul className="submenu">
                                                <li onClick={this.toggleMenu}><Link to={"/lk/profile"}
                                                                                    className="sub-menu-item"> {i18n.t('Profile')}</Link>
                                                </li>
                                                <li onClick={this.toggleMenu}><Link to={'/lk/profile/settings'}
                                                                                    className="sub-menu-item"> {i18n.t('Settings')}</Link>
                                                </li>
                                            </ul>
                                        </li>

                                    </li>}

                                    <li id="themeToggler123">{this.state.darkMode ?
                                        <svg onClick={this.toggleLight} width="30" height="30" viewBox="0 0 100 100"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M50 65C53.9782 65 57.7936 63.4196 60.6066 60.6066C63.4196 57.7936 65 53.9782 65 50C65 46.0218 63.4196 42.2064 60.6066 39.3934C57.7936 36.5804 53.9782 35 50 35C46.0218 35 42.2064 36.5804 39.3934 39.3934C36.5804 42.2064 35 46.0218 35 50C35 53.9782 36.5804 57.7936 39.3934 60.6066C42.2064 63.4196 46.0218 65 50 65ZM50 75C43.3696 75 37.0107 72.3661 32.3223 67.6777C27.6339 62.9893 25 56.6304 25 50C25 43.3696 27.6339 37.0107 32.3223 32.3223C37.0107 27.6339 43.3696 25 50 25C56.6304 25 62.9893 27.6339 67.6777 32.3223C72.3661 37.0107 75 43.3696 75 50C75 56.6304 72.3661 62.9893 67.6777 67.6777C62.9893 72.3661 56.6304 75 50 75ZM50 0C51.3261 0 52.5979 0.526784 53.5355 1.46447C54.4732 2.40215 55 3.67392 55 5V15C55 16.3261 54.4732 17.5979 53.5355 18.5355C52.5979 19.4732 51.3261 20 50 20C48.6739 20 47.4021 19.4732 46.4645 18.5355C45.5268 17.5979 45 16.3261 45 15V5C45 3.67392 45.5268 2.40215 46.4645 1.46447C47.4021 0.526784 48.6739 0 50 0ZM50 80C51.3261 80 52.5979 80.5268 53.5355 81.4645C54.4732 82.4021 55 83.6739 55 85V95C55 96.3261 54.4732 97.5979 53.5355 98.5355C52.5979 99.4732 51.3261 100 50 100C48.6739 100 47.4021 99.4732 46.4645 98.5355C45.5268 97.5979 45 96.3261 45 95V85C45 83.6739 45.5268 82.4021 46.4645 81.4645C47.4021 80.5268 48.6739 80 50 80ZM5 45H15C16.3261 45 17.5979 45.5268 18.5355 46.4645C19.4732 47.4021 20 48.6739 20 50C20 51.3261 19.4732 52.5979 18.5355 53.5355C17.5979 54.4732 16.3261 55 15 55H5C3.67392 55 2.40215 54.4732 1.46447 53.5355C0.526784 52.5979 0 51.3261 0 50C0 48.6739 0.526784 47.4021 1.46447 46.4645C2.40215 45.5268 3.67392 45 5 45ZM85 45H95C96.3261 45 97.5979 45.5268 98.5355 46.4645C99.4732 47.4021 100 48.6739 100 50C100 51.3261 99.4732 52.5979 98.5355 53.5355C97.5979 54.4732 96.3261 55 95 55H85C83.6739 55 82.4021 54.4732 81.4645 53.5355C80.5268 52.5979 80 51.3261 80 50C80 48.6739 80.5268 47.4021 81.4645 46.4645C82.4021 45.5268 83.6739 45 85 45ZM85.355 14.645C86.2924 15.5826 86.8189 16.8542 86.8189 18.18C86.8189 19.5058 86.2924 20.7774 85.355 21.715L78.285 28.785C77.8238 29.2626 77.272 29.6435 76.662 29.9055C76.052 30.1676 75.3959 30.3055 74.732 30.3113C74.0681 30.317 73.4097 30.1905 72.7952 29.9391C72.1807 29.6877 71.6225 29.3164 71.153 28.847C70.6836 28.3775 70.3123 27.8193 70.0609 27.2048C69.8095 26.5903 69.683 25.9319 69.6887 25.268C69.6945 24.6041 69.8324 23.948 70.0945 23.338C70.3565 22.728 70.7374 22.1762 71.215 21.715L78.285 14.645C79.2226 13.7076 80.4942 13.1811 81.82 13.1811C83.1458 13.1811 84.4174 13.7076 85.355 14.645ZM28.785 71.215C29.7224 72.1526 30.2489 73.4242 30.2489 74.75C30.2489 76.0758 29.7224 77.3474 28.785 78.285L21.715 85.35C21.2538 85.8275 20.702 86.2085 20.092 86.4705C19.482 86.7326 18.8259 86.8705 18.162 86.8762C17.4981 86.882 16.8397 86.7555 16.2252 86.5041C15.6107 86.2527 15.0525 85.8814 14.583 85.412C14.1136 84.9425 13.7423 84.3843 13.4909 83.7698C13.2395 83.1553 13.113 82.4969 13.1187 81.833C13.1245 81.1691 13.2624 80.513 13.5245 79.903C13.7865 79.293 14.1674 78.7412 14.645 78.28L21.715 71.21C22.6526 70.2726 23.9242 69.7461 25.25 69.7461C26.5758 69.7461 27.8474 70.2726 28.785 71.21V71.215ZM21.715 14.645L28.785 21.715C29.6958 22.658 30.1998 23.921 30.1884 25.232C30.177 26.543 29.6511 27.7971 28.7241 28.7241C27.7971 29.6511 26.543 30.177 25.232 30.1884C23.921 30.1998 22.658 29.6958 21.715 28.785L14.65 21.715C13.7762 20.7657 13.3033 19.5153 13.33 18.2254C13.3567 16.9354 13.8811 15.7057 14.7934 14.7934C15.7057 13.8811 16.9354 13.3567 18.2254 13.33C19.5153 13.3033 20.7657 13.7762 21.715 14.65V14.645ZM78.285 71.215L85.355 78.285C86.2658 79.228 86.7698 80.491 86.7584 81.802C86.747 83.113 86.2211 84.3671 85.2941 85.2941C84.3671 86.2211 83.113 86.747 81.802 86.7584C80.491 86.7698 79.228 86.2658 78.285 85.355L71.215 78.285C70.7374 77.8238 70.3565 77.272 70.0945 76.662C69.8324 76.052 69.6945 75.3959 69.6887 74.732C69.683 74.0681 69.8095 73.4097 70.0609 72.7952C70.3123 72.1807 70.6836 71.6225 71.153 71.153C71.6225 70.6836 72.1807 70.3123 72.7952 70.0609C73.4097 69.8095 74.0681 69.683 74.732 69.6887C75.3959 69.6945 76.052 69.8324 76.662 70.0945C77.272 70.3565 77.8238 70.7374 78.285 71.215Z"
                                                fill="white"/>
                                        </svg>
                                        :
                                        <svg onClick={this.toggleDark} width="30" height="30" viewBox="0 0 94 100"
                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M37.5016 1.73333C38.1117 2.47469 38.4854 3.38198 38.5746 4.33796C38.6637 5.29394 38.4641 6.25469 38.0016 7.09606C34.3881 13.7306 32.5009 21.1672 32.5139 28.722C32.5139 53.8543 53.0022 74.2051 78.2533 74.2051C81.5472 74.2051 84.7535 73.8613 87.8349 73.2051C88.7795 73.0005 89.7634 73.0788 90.6638 73.43C91.5642 73.7813 92.3411 74.39 92.8976 75.1802C93.4851 76.0017 93.7846 76.9944 93.7495 78.0038C93.7145 79.0132 93.3469 79.9828 92.7039 80.7616C87.8017 86.7834 81.6175 91.6352 74.6021 94.9634C67.5867 98.2916 59.917 100.012 52.1522 99.9999C23.3385 99.9999 0 76.7865 0 48.1853C0 26.6594 13.2131 8.1961 32.0263 0.370778C32.9635 -0.0252899 34.0039 -0.106581 34.9911 0.139116C35.9784 0.384812 36.8594 0.94423 37.5016 1.73333V1.73333ZM30.3638 8.18985C23.1297 12.0702 17.0822 17.838 12.8639 24.8803C8.64552 31.9226 6.41402 39.9762 6.40652 48.1853C6.40652 73.3113 26.9011 93.6622 52.1522 93.6622C58.199 93.6726 64.1878 92.4837 69.772 90.1642C75.3562 87.8447 80.4249 84.4406 84.6848 80.1491C82.5784 80.4116 80.4346 80.5429 78.2533 80.5429C49.4396 80.5429 26.1073 57.3294 26.1073 28.7282C26.1073 21.4342 27.6199 14.4901 30.3638 8.18985V8.18985Z"
                                                fill="black"/>
                                        </svg>

                                    }
                                    </li>
                                    <ul className="list-unstyled d-none" id="langToggler">
                                        {i18n.language === 'ru' ?
                                            <li className="lang-change curr"
                                                onClick={() => this.changeLanguage('ru')}>RU / </li> :
                                            <li className="lang-change" onClick={() => this.changeLanguage('ru')}>RU
                                                / </li>
                                        }
                                        {i18n.language === 'en' ?
                                            <li className="lang-change curr"
                                                onClick={() => this.changeLanguage('en')}>EN / </li> :
                                            <li className="lang-change" onClick={() => this.changeLanguage('en')}>EN
                                                / </li>
                                        }
                                        {i18n.language === 'zh' ?
                                            <li className="lang-change curr"
                                                onClick={() => this.changeLanguage('zh')}>ZH
                                            </li> :
                                            <li className="lang-change"
                                                onClick={() => this.changeLanguage('zh')}>ZH</li>
                                        }

                                    </ul>
                                </ul>
                            </div>
                        </div>

                    </header>}

                    <header id="header">
                        <div className="container-ext">
                            <div className="row py-4">
                                <div className="col-6 col-md-3 d-flex justify-content-start">
                                    <a href="/">
                                        <img src={images['logo-nft.png'].default} id="logo" alt="logo" height='35'/>
                                    </a>
                                </div>
                                <div className="col-6 align-items-center justify-content-center d-none d-md-flex">
                                    <nav>
                                        <ul id="navlist" className="d-flex justify-content-center">
                                            <li className="nav-item">
                                                <Link to={'/feed'}>{i18n.t('Feed')}</Link>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <span> Info </span>
                                                <ul className="dropdown-menu" id="info-list"
                                                    aria-labelledby="navbarDropdownMenuLink">
                                                    <li className="nav-item">
                                                        <a href='/team'>{i18n.t('About us')}</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href='https://nft2go.io#faq'>{i18n.t('FAQ')}</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a href='/help'>{i18n.t('Help')}</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a href='https://nft2go.io/whitepaper'>{i18n.t('Whitepaper')}</a>
                                            </li>
                                            {authStore.data.isLoggedIn && <li className="nav-item"><Link
                                                to={'/lk/upload'}> {i18n.t('Create')}</Link></li>}
                                            {authStore.data.isLoggedIn && <li className="nav-item"><a
                                                href="https://generator.nft2go.io"> Генератор</a></li>}
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-3 align-items-center justify-content-end d-none d-md-flex">
                                    <ul id="top-right-menu"
                                        className="d-flex justify-content-center align-items-center">
                                        {isLogged() && false && !rmrkStore.rmrkWallet.wallet &&
                                            <li className="top-right-element dropdown">
                                                Создать &nbsp;
                                                <svg width="21" height="18" viewBox="0 0 21 18" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M18.5304 3.85714H3.21429C2.85911 3.85714 2.57143 3.56946 2.57143 3.21429C2.57143 2.85911 2.85911 2.57143 3.21429 2.57143H18.6429C18.998 2.57143 19.2857 2.28375 19.2857 1.92857C19.2857 0.863438 18.4223 0 17.3571 0H2.57143C1.15112 0 0 1.15112 0 2.57143V15.4286C0 16.8489 1.15112 18 2.57143 18H18.5304C19.6562 18 20.5714 17.135 20.5714 16.0714V5.78571C20.5714 4.72219 19.6562 3.85714 18.5304 3.85714ZM16.7143 12.2143C16.0043 12.2143 15.4286 11.6385 15.4286 10.9286C15.4286 10.2186 16.0043 9.64286 16.7143 9.64286C17.4242 9.64286 18 10.2186 18 10.9286C18 11.6385 17.4242 12.2143 16.7143 12.2143Z"
                                                        fill="white"></path>
                                                </svg>
                                                <ul className="dropdown-menu" id="drop-mnemo">
                                                    <li className="nav-item">
                                                        <Link to={"/lk/mnemo"} onClick={this.handleMnemoNew}>Создать
                                                            кошелек</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to={"/lk/mnemo"} onClick={() => userStore.setSection(3)}>У
                                                            меня уже есть</Link>
                                                    </li>
                                                </ul>
                                            </li>}
                                        <li className="top-right-element nav-item">
                                            {!isLogged() && <Link to="/auth">
                                                Log
                                                in&nbsp;/
                                            </Link>}
                                        </li>
                                        <li className="top-right-element change-language-btn nav-item">
                                            {this.state.lang.toUpperCase()} &nbsp;
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M13.5685 6.12903C12.9839 2.52823 11.6048 0 10 0C8.39516 0 7.01613 2.52823 6.43145 6.12903H13.5685ZM6.12903 10C6.12903 10.8952 6.17742 11.754 6.2621 12.5806H13.7339C13.8185 11.754 13.8669 10.8952 13.8669 10C13.8669 9.10484 13.8185 8.24597 13.7339 7.41935H6.2621C6.17742 8.24597 6.12903 9.10484 6.12903 10ZM19.2218 6.12903C18.0685 3.39113 15.7339 1.27419 12.8508 0.419355C13.8347 1.78226 14.5121 3.83468 14.8669 6.12903H19.2218ZM7.14516 0.419355C4.26613 1.27419 1.92742 3.39113 0.778226 6.12903H5.13306C5.48387 3.83468 6.16129 1.78226 7.14516 0.419355ZM19.6532 7.41935H15.0282C15.1129 8.26613 15.1613 9.13306 15.1613 10C15.1613 10.8669 15.1129 11.7339 15.0282 12.5806H19.6492C19.871 11.754 19.996 10.8952 19.996 10C19.996 9.10484 19.871 8.24597 19.6532 7.41935ZM4.83871 10C4.83871 9.13306 4.8871 8.26613 4.97177 7.41935H0.346774C0.129032 8.24597 0 9.10484 0 10C0 10.8952 0.129032 11.754 0.346774 12.5806H4.96774C4.8871 11.7339 4.83871 10.8669 4.83871 10ZM6.43145 13.871C7.01613 17.4718 8.39516 20 10 20C11.6048 20 12.9839 17.4718 13.5685 13.871H6.43145ZM12.8548 19.5806C15.7339 18.7258 18.0726 16.6089 19.2258 13.871H14.871C14.5161 16.1653 13.8387 18.2177 12.8548 19.5806ZM0.778226 13.871C1.93145 16.6089 4.26613 18.7258 7.14919 19.5806C6.16532 18.2177 5.4879 16.1653 5.13306 13.871H0.778226Z"
                                                    fill="white"/>
                                            </svg>
                                            <ul className="list-unstyled d-none" id="langToggler">
                                                {i18n.language === 'ru' ?
                                                    <li className="lang-change curr"
                                                        onClick={() => this.changeLanguage('ru')}>RU / </li> :
                                                    <li className="lang-change"
                                                        onClick={() => this.changeLanguage('ru')}>RU / </li>
                                                }
                                                {i18n.language === 'en' ?
                                                    <li className="lang-change curr"
                                                        onClick={() => this.changeLanguage('en')}>EN / </li> :
                                                    <li className="lang-change"
                                                        onClick={() => this.changeLanguage('en')}>EN / </li>
                                                }
                                                {i18n.language === 'zh' ?
                                                    <li className="lang-change curr"
                                                        onClick={() => this.changeLanguage('zh')}>ZH
                                                    </li> :
                                                    <li className="lang-change"
                                                        onClick={() => this.changeLanguage('zh')}>ZH</li>
                                                }

                                            </ul>
                                            <div
                                                className="wrapper-change-language">
                                                <ul
                                                    className="container-change-language">
                                                    {i18n.language === 'ru' ?
                                                        <li className="lang-change curr link-change-lang"
                                                            onClick={() => this.changeLanguage('ru')}>RU</li> :
                                                        <li className="lang-change link-change-lang"
                                                            onClick={() => this.changeLanguage('ru')}>RU</li>
                                                    }
                                                    {i18n.language === 'en' ?
                                                        <li className="lang-change curr link-change-lang"
                                                            onClick={() => this.changeLanguage('en')}>EN</li> :
                                                        <li className="lang-change link-change-lang"
                                                            onClick={() => this.changeLanguage('en')}>EN</li>
                                                    }
                                                    {i18n.language === 'zh' ?
                                                        <li className="lang-change curr link-change-lang"
                                                            onClick={() => this.changeLanguage('zh')}>ZH
                                                        </li> :
                                                        <li className="lang-change link-change-lang"
                                                            onClick={() => this.changeLanguage('zh')}>ZH</li>
                                                    }
                                                </ul>
                                            </div>
                                        </li>
                                        {authStore.data.isLoggedIn &&
                                            <ul className="dropdown" id="profile-stuff">
                                                <img
                                                    src={!!authStore.googleUser.img ? authStore.googleUser.img : !!authStore.facebookUser.img ? authStore.facebookUser.img : imagesClient['01.jpg'].default}
                                                    className="rounded-pill avatar avatar-sm-sm" alt=""/>
                                                <ul className="dropdown-menu" style={{minWidth: 200}}
                                                    id="profile-stuff-list">
                                                    <li className="nav-item">
                                                        <Link to={"/lk/profile/myprofile"}> {i18n.t('Profile')}</Link>
                                                    </li>
                                                    <li className="nav-item" onClick={this.handleOpenPass}>
                                                        {i18n.t('Change Pass')}
                                                    </li>
                                                    <li className="nav-item" onClick={this.handleOpenEmail}>
                                                        {i18n.t('Change Email')}
                                                    </li>
                                                    {isLogged() &&
                                                        <li className="nav-item">
                                                            <a href="/"
                                                               onClick={this.logout}>{i18n.t('Sign Out')}</a>
                                                        </li>}
                                                </ul>
                                            </ul>}
                                    </ul>
                                </div>

                                <div
                                    className="col-6 justify-content-end align-items-center d-flex d-md-none">
                                    {isLogged() ? <Link to="/lk/profile/myprofile" style={{marginRight:"15px"}}>
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                             viewBox="0 0 16 16" height="28px" width="28px"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </Link> : <Link to="/auth" style={{marginLeft:"45px"}}>
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                                             viewBox="0 0 16 16" height="28px" width="28px"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </Link>}
                                    <button
                                        id="btn-menu" onClick={(e) => this.toggleMenu(e)}
                                        className={this.state.isOpenNav ? "transform-btn-menu" : ""}>
                                        <div
                                            className="btn-menu-line"></div>
                                        <div
                                            className="btn-menu-line"></div>
                                        <div
                                            className="btn-menu-line"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div id="wrapper-btn-menu" className={this.state.isOpenNav ? "btn-menu-active" : ""}>
                        <div className="container-btn-menu">

                            <div className="body-btn-menu d-flex flex-column justify-content-between">
                                <ul className="container-mobile-menu">
                                    <li className="nav-item-mob">
                                        <Link to="/feed" onClick={this.turnOffMenu}> {i18n.t('NFTs')}&nbsp;</Link>
                                    </li>
                                    <li className="nav-item-mob dropdown-toggle" onClick={() => {this.setState({openInfo: !this.state.openInfo})}}>{i18n.t('Info')}</li>
                                            <ul className={this.state.openInfo ? "info-dropdown open" : "info-dropdown" }>
                                                <li className="nav-item-mob">
                                                    <a href="/team"
                                                       onClick={this.turnOffMenu}> {i18n.t('About us')}</a>
                                                </li>
                                                <li className="nav-item-mob">
                                                    <a href="https://nft2go.io#faq"
                                                       onClick={this.turnOffMenu}> {i18n.t('FAQ')}</a>
                                                </li>
                                                <li className="nav-item-mob">
                                                    <a href="/support"
                                                       onClick={this.turnOffMenu}> {i18n.t('Support')}</a>
                                                </li>
                                            </ul>

                                    {!isLogged() && <li className="nav-item-mob">
                                        <Link to="/auth" onClick={this.turnOffMenu}> {i18n.t('Sign In')}&nbsp;</Link>
                                    </li>}

                                    {isLogged() && false && <li className="nav-item-mob">
                                        <Link to="/lk/profile/myprofile"
                                              onClick={this.turnOffMenu}> {i18n.t('Profile')}&nbsp;</Link>
                                    </li>}
                                    {isLogged() && false && !rmrkStore.rmrkWallet.wallet &&
                                        <>
                                        <li className="nav-item-mob dropdown-toggle" onClick={() => this.setState({openMnemo: !this.state.openMnemo})}>Создать</li>
                                            false &&  <ul className="info-dropdown" style={this.state.openMnemo ? {display:"block"} : {display:"none"} }>
                                                <li className="nav-item-mob" onClick={this.turnOffMenu}>
                                                    <Link to={"/lk/mnemo"} onClick={this.handleMnemoNew}>Создать мнемонику</Link>
                                                </li>
                                                <li className="nav-item-mob" onClick={this.turnOffMenu}>
                                                    <Link to={"/lk/mnemo"} onClick={() => userStore.setSection(3)}>У
                                                        меня уже есть</Link>
                                                </li>
                                            </ul>
                                        </>
                                    }
                                    {isLogged() && <li className="nav-item-mob"
                                                       onClick={this.changePass}> Сменить пароль &nbsp;
                                    </li>}
                                    {isLogged() && <li className="nav-item-mob"
                                                       onClick={this.changeEmail}> Сменить логин&nbsp;
                                    </li>}
                                    {isLogged() && <li className="nav-item-mob">
                                        <a href="/" onClick={() => {
                                            authStore.logOut();
                                            this.turnOffMenu();
                                        }}> {i18n.t('Sign Out')}&nbsp;</a>
                                    </li>}
                                </ul>

                                {false &&
                                    <ul className="container-mobile-menu-button d-flex flex-wrap justify-content-center">
                                        <li className="nav-item-mob">
                                            <a href="javascript:void(0)">
                                                {i18n.t('Connect')}
                                                <svg width="21" height="18" viewBox="0 0 21 18" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M18.5304 3.85714H3.21429C2.85911 3.85714 2.57143 3.56946 2.57143 3.21429C2.57143 2.85911 2.85911 2.57143 3.21429 2.57143H18.6429C18.998 2.57143 19.2857 2.28375 19.2857 1.92857C19.2857 0.863438 18.4223 0 17.3571 0H2.57143C1.15112 0 0 1.15112 0 2.57143V15.4286C0 16.8489 1.15112 18 2.57143 18H18.5304C19.6562 18 20.5714 17.135 20.5714 16.0714V5.78571C20.5714 4.72219 19.6562 3.85714 18.5304 3.85714ZM16.7143 12.2143C16.0043 12.2143 15.4286 11.6385 15.4286 10.9286C15.4286 10.2186 16.0043 9.64286 16.7143 9.64286C17.4242 9.64286 18 10.2186 18 10.9286C18 11.6385 17.4242 12.2143 16.7143 12.2143Z"
                                                        fill="white"/>
                                                </svg>
                                                &nbsp;/
                                            </a>
                                        </li>
                                        <li className="nav-item-mob">
                                            <a>
                                                {i18n.t('Log in')}&nbsp;/
                                            </a>
                                        </li>
                                        <li className="nav-item-mob change-language-btn">
                                            <a>

                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M13.5685 6.12903C12.9839 2.52823 11.6048 0 10 0C8.39516 0 7.01613 2.52823 6.43145 6.12903H13.5685ZM6.12903 10C6.12903 10.8952 6.17742 11.754 6.2621 12.5806H13.7339C13.8185 11.754 13.8669 10.8952 13.8669 10C13.8669 9.10484 13.8185 8.24597 13.7339 7.41935H6.2621C6.17742 8.24597 6.12903 9.10484 6.12903 10ZM19.2218 6.12903C18.0685 3.39113 15.7339 1.27419 12.8508 0.419355C13.8347 1.78226 14.5121 3.83468 14.8669 6.12903H19.2218ZM7.14516 0.419355C4.26613 1.27419 1.92742 3.39113 0.778226 6.12903H5.13306C5.48387 3.83468 6.16129 1.78226 7.14516 0.419355ZM19.6532 7.41935H15.0282C15.1129 8.26613 15.1613 9.13306 15.1613 10C15.1613 10.8669 15.1129 11.7339 15.0282 12.5806H19.6492C19.871 11.754 19.996 10.8952 19.996 10C19.996 9.10484 19.871 8.24597 19.6532 7.41935ZM4.83871 10C4.83871 9.13306 4.8871 8.26613 4.97177 7.41935H0.346774C0.129032 8.24597 0 9.10484 0 10C0 10.8952 0.129032 11.754 0.346774 12.5806H4.96774C4.8871 11.7339 4.83871 10.8669 4.83871 10ZM6.43145 13.871C7.01613 17.4718 8.39516 20 10 20C11.6048 20 12.9839 17.4718 13.5685 13.871H6.43145ZM12.8548 19.5806C15.7339 18.7258 18.0726 16.6089 19.2258 13.871H14.871C14.5161 16.1653 13.8387 18.2177 12.8548 19.5806ZM0.778226 13.871C1.93145 16.6089 4.26613 18.7258 7.14919 19.5806C6.16532 18.2177 5.4879 16.1653 5.13306 13.871H0.778226Z"
                                                        fill="white"/>
                                                </svg>
                                                <div className="wrapper-change-language">
                                                    <div className="container-change-language">
                                                        <a href="/i18n/ru" className="link-change-lang">RU</a>
                                                        <a href="/i18n/en" className="link-change-lang">EN</a>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>}
                            </div>
                        </div>
                    </div>
                    <FormDialog handleOpen={() => this.setState({visiblePass: false})} title={"Изменить пароль"}
                                buttonText={"Применить"} isDialogOpened={this.state.visiblePass} type={"change-pass"}/>
                    <FormDialog handleOpen={() => this.setState({visibleEmail: false})} title={"Изменить e-mail"}
                                buttonText={"Применить"} isDialogOpened={this.state.visibleEmail}
                                type={"change-email"}/>
                </>
            )
        }
    });


//export const Header = React.memo(TopHeader);
export default Header;
