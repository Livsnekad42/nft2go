import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {images} from "../../App";
import { Link } from 'react-router-dom';

const Footer = () => {

    const [lang, setLang] = useState('');

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng);
        setLang(lng);
        console.log(lang);
    }

    return (
        <>
            {false && <footer className="bg-footer">
            <div className="footer-py-30 footer-bar bg-footer">
                <div className="container-fluid text-center">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-3 col-md-2 col-sm-3">
                            <div className="text-sm-start">
                                <Link to="#" className="logo-footer">
                                    <img src={images['logo.png'].default} height="28" alt=""/>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <ul className="list-unstyled footer-list terms-service mb-0">
                                <li className="list-inline-item mb-0">
                                    <Link to="/" className="text-foot me-2">{t('Explore')}</Link>
                                </li>
                                <li className="list-inline-item mb-0">
                                    <Link to="/" className="text-foot me-2">{t('FAQ')}</Link>
                                </li>
                                <li className="list-inline-item mb-0">
                                    <Link to="/consent" className="text-foot me-2">{t('Terms')}</Link>
                                </li>
                                <li className="list-inline-item mb-0">
                                    <Link to="/consent" className="text-foot">{t('Privacy')}</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-3 mt-4 mt-sm-0 pt-2 pt-sm-0" id="footerWithTheme">

                                <p className="mb-0 text-foot"><span className="mb-0 text-foot">Web-Intellect
                                </span> © {new Date().getFullYear()}.
                                </p>
                        </div>
                    </div>
                    <div className="container">
                    <div className="d-flex align-items-center justify-content-center">
                        <ul className="list-unstyled d-flex" id="langToggler" style={{display: "inline-block", marginBottom: 0!, marginLeft: 10}}>
                            {i18n.language === 'ru' ?
                                <li className="lang-change curr" onClick={() => changeLanguage('ru')}>RU / </li> :
                                <li className="lang-change" onClick={() => changeLanguage('ru')}>RU / </li>
                            }
                            {i18n.language === 'en' ?
                                <li className="lang-change curr" onClick={() => changeLanguage('en')}>EN / </li> :
                                <li className="lang-change" onClick={() => changeLanguage('en')}>EN / </li>
                            }
                        </ul>
                        <ul className="d-none justify-content-center align-items-center">
                            <li className="instaFooter">
                                <Link to="https://www.instagram.com/nft2go.io/" target="_blank"></Link>
                            </li>
                            <li className="teleaFooter">
                                <Link to="" target="_blank">
                                    <img
                                    src=""
                                    alt=""/>
                                </Link>
                            </li>
                            <li className="faceFooter">
                                <Link to="" target="_blank">
                                    <img
                                    src=""
                                    alt=""/>
                                </Link>
                            </li>
                            <li className="twitterFooter">
                                <Link to="" target="_blank">
                                    <img
                                    src=""
                                    alt=""/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>

            </div>
        </footer> }

            <footer id="footer">
                <div className="container-ext">
                    <hr className="hr-general"/>
                    <div className="row">
                        <div className="col-12 col-md-4 text-center text-md-left row-logo-info">
                            <a href="https://nft2go.io/"><img id="logo-footer"
                                             src={images['logo-nft.png'].default}
                                             alt="logo"/></a>
                            <div className="logo-text-footer text-italic-main">
                                {i18n.t('Footer slogan')}
                            </div>
                            <div className="container-social-link">
                                <a href="https://www.facebook.com/nft2go" target="_blank" rel="noreferrer">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2Z"
                                              fill="white" fillOpacity="0.7"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20ZM25.0882 20.8785H22.0845V31.7596H17.5825V20.8789H15.3333V17.1293H17.5825V14.878C17.5825 11.819 18.8525 10 22.4609 10H25.465V13.7501H23.5872C22.1826 13.7501 22.0897 14.2741 22.0897 15.2521L22.0845 17.1288H25.4862L25.0882 20.8785Z"
                                              fill="#071736"/>
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/nft2go.io_ru/" target="_blank">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2Z"
                                              fill="white" fillOpacity="0.7"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20ZM13.4308 9.8935C14.1091 9.62972 14.8842 9.44994 16.0198 9.39794C17.1576 9.34616 17.5211 9.3335 20.418 9.3335H20.4147C23.3125 9.3335 23.6747 9.34616 24.8125 9.39794C25.9481 9.44994 26.7237 9.62972 27.4037 9.8935C28.1059 10.1657 28.6992 10.5302 29.2926 11.1235C29.8859 11.7164 30.2504 12.3115 30.5237 13.0131C30.7859 13.6913 30.9659 14.4664 31.0193 15.602C31.0704 16.7398 31.0837 17.1034 31.0837 20.0003C31.0837 22.8972 31.0704 23.2599 31.0193 24.3977C30.9659 25.5328 30.7859 26.3081 30.5237 26.9866C30.2504 27.6879 29.8859 28.283 29.2926 28.8759C28.6999 29.4693 28.1057 29.8346 27.4043 30.107C26.7257 30.3708 25.9496 30.5506 24.8141 30.6026C23.6763 30.6544 23.3138 30.667 20.4167 30.667C17.52 30.667 17.1567 30.6544 16.0189 30.6026C14.8835 30.5506 14.1082 30.3708 13.4295 30.107C12.7284 29.8346 12.1333 29.4693 11.5406 28.8759C10.9475 28.283 10.583 27.6879 10.3104 26.9863C10.0468 26.3081 9.86703 25.533 9.81481 24.3974C9.76326 23.2596 9.75037 22.8972 9.75037 20.0003C9.75037 17.1034 9.7637 16.7396 9.81459 15.6018C9.8657 14.4667 10.0457 13.6913 10.3102 13.0129C10.5835 12.3115 10.9479 11.7164 11.5413 11.1235C12.1342 10.5304 12.7293 10.1659 13.4308 9.8935Z"
                                              fill="#071736"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M20.4181 11.2551C23.2661 11.2551 23.6037 11.2653 24.7284 11.3164C25.7684 11.364 26.3328 11.5378 26.7089 11.6838C27.2066 11.8771 27.5615 12.1082 27.9346 12.4816C28.308 12.8549 28.5391 13.2105 28.7329 13.7082C28.8789 14.0838 29.0529 14.6483 29.1002 15.6883C29.1513 16.8127 29.1624 17.1505 29.1624 19.9972C29.1624 22.8439 29.1513 23.1817 29.1002 24.3061C29.0527 25.3461 28.8789 25.9106 28.7329 26.2862C28.5395 26.7839 28.308 27.1384 27.9346 27.5115C27.5613 27.8848 27.2069 28.1159 26.7089 28.3093C26.3333 28.456 25.7684 28.6293 24.7284 28.6768C23.6039 28.728 23.2661 28.7391 20.4181 28.7391C17.5699 28.7391 17.2323 28.728 16.1079 28.6768C15.0678 28.6288 14.5034 28.4551 14.1272 28.3091C13.6294 28.1157 13.2738 27.8846 12.9005 27.5113C12.5271 27.1379 12.296 26.7833 12.1023 26.2853C11.9563 25.9097 11.7823 25.3453 11.7349 24.3052C11.6838 23.1808 11.6736 22.843 11.6736 19.9945C11.6736 17.1461 11.6838 16.8101 11.7349 15.6856C11.7825 14.6456 11.9563 14.0811 12.1023 13.7051C12.2956 13.2074 12.5271 12.8518 12.9005 12.4785C13.2738 12.1051 13.6294 11.874 14.1272 11.6802C14.5032 11.5336 15.0678 11.3602 16.1079 11.3124C17.0919 11.268 17.4732 11.2547 19.4612 11.2524V11.2551C19.647 11.2548 19.8469 11.2549 20.0626 11.255L20.4181 11.2551ZM24.8313 14.3055C24.8313 15.0122 25.4046 15.5855 26.1113 15.5855C26.818 15.5855 27.3913 15.0122 27.3913 14.3055C27.3913 13.5989 26.818 13.0255 26.1113 13.0255V13.026C25.4046 13.026 24.8313 13.5986 24.8313 14.3055ZM20.4178 25.4754C17.3926 25.4754 14.9399 23.0239 14.9399 19.9987C14.9399 16.9736 17.3925 14.521 20.4176 14.5209C23.4427 14.5209 25.8947 16.9736 25.8947 19.9987C25.8947 23.0239 23.4429 25.4754 20.4178 25.4754Z"
                                              fill="#071736"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M23.9734 19.9997C23.9734 21.9633 22.3814 23.5553 20.4178 23.5553C18.454 23.5553 16.8622 21.9633 16.8622 19.9997C16.8622 18.0359 18.454 16.4441 20.4178 16.4441V16.4441C22.3814 16.4441 23.9734 18.0359 23.9734 19.9997Z"
                                              fill="#071736"/>
                                    </svg>
                                </a>
                                <a href="https://twitter.com/nft2go_io" target="_blank" rel="noreferrer">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2Z"
                                              fill="white" fillOpacity="0.7"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20ZM19.5772 16.8631L20.2767 16.9478L20.2347 16.2558C20.1088 14.4621 21.214 12.8238 22.9627 12.1882C23.6062 11.9623 24.6974 11.934 25.4109 12.1317C25.6907 12.2165 26.2223 12.4989 26.6 12.7532L27.2855 13.2192L28.0409 12.9791C28.4606 12.852 29.0202 12.6402 29.272 12.4989C29.5098 12.3718 29.7197 12.3012 29.7197 12.3436C29.7197 12.5837 29.2021 13.4028 28.7684 13.8548C28.1808 14.4903 28.3487 14.5468 29.5378 14.1231C30.2513 13.883 30.2653 13.883 30.1254 14.1514C30.0414 14.2926 29.6078 14.7869 29.1461 15.2389C28.3627 16.0157 28.3207 16.1004 28.3207 16.7501C28.3207 17.7528 27.8451 19.8431 27.3694 20.9871C26.4881 23.1338 24.5995 25.3512 22.7109 26.467C20.0529 28.0347 16.5135 28.4301 13.5337 27.5121C12.5405 27.2014 10.8337 26.4105 10.8337 26.2692C10.8337 26.2269 11.3514 26.1704 11.9809 26.1562C13.2959 26.128 14.6109 25.7608 15.7301 25.1111L16.4855 24.6592L15.6182 24.3626C14.3871 23.9389 13.2819 22.9644 13.0021 22.0463C12.9182 21.7498 12.9462 21.7356 13.7296 21.7356L14.541 21.7215L13.8555 21.3967C13.0441 20.9871 12.3026 20.295 11.9389 19.5889C11.6731 19.0804 11.3374 17.7952 11.4353 17.6963C11.4633 17.654 11.7571 17.7387 12.0928 17.8517C13.0581 18.2048 13.184 18.12 12.6244 17.5269C11.5752 16.4535 11.2534 14.8575 11.7571 13.3463L11.9949 12.6684L12.9182 13.5864C14.8068 15.4366 17.0311 16.5382 19.5772 16.8631Z"
                                              fill="#071736"/>
                                    </svg>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="null" id="svg_1"
                                              d="m31.265082,12.792196l-3.457219,16.304165c-0.26103,1.150497 -0.941018,1.436894 -1.907403,0.895195l-5.268066,-3.881905l-2.541568,2.445011c-0.281487,0.281487 -0.516333,0.516333 -1.05885,0.516333l0.378862,-5.364622l9.76286,-8.821842c0.424686,-0.378044 -0.092465,-0.588341 -0.659531,-0.209479l-12.069582,7.600155l-5.196057,-1.626734c-1.13004,-0.352677 -1.150497,-1.13004 0.235664,-1.672558l20.32354,-7.83009c0.941018,-0.352677 1.764205,0.209479 1.457351,1.647191l0,-0.000818z"
                                              fill="white" fillOpacity=".7"></path>
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/channel/UCtQMTzXR7XwM4h9s8E_gq2Q" target="_blank" rel="noreferrer">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M20 2C29.9411 2 38 10.0589 38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2Z"
                                              fill="white" fillOpacity="0.7"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20ZM20.0002 12.6672C20.0002 12.6672 26.6713 12.6672 28.3348 13.125C29.2528 13.3769 29.9757 14.1191 30.221 15.0616C30.6668 16.7698 30.6668 20.3339 30.6668 20.3339C30.6668 20.3339 30.6668 23.8979 30.221 25.6062C29.9757 26.5487 29.2528 27.2909 28.3348 27.5429C26.6713 28.0006 20.0002 28.0006 20.0002 28.0006C20.0002 28.0006 13.329 28.0006 11.6654 27.5429C10.7474 27.2909 10.0245 26.5487 9.77919 25.6062C9.3335 23.8979 9.3335 20.3339 9.3335 20.3339C9.3335 20.3339 9.3335 16.7698 9.77919 15.0616C10.0245 14.1191 10.7474 13.3769 11.6654 13.125C13.329 12.6672 20.0002 12.6672 20.0002 12.6672Z"
                                              fill="#071736"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M17.9999 17.3328L23.3332 20.6662L17.9999 23.9994V17.3328Z"
                                              fill="#071736"/>
                                    </svg>
                                </a>
                                <a href="https://www.reddit.com/user/NFT2GO" target="_blank" rel="noreferrer">
                                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m33.059179,20.300725c0,-1.518798 -1.240858,-2.753395 -2.765891,-2.753395c-0.744303,0 -1.418855,0.297718 -1.915411,0.776565c-1.884171,-1.23981 -4.433542,-2.028871 -7.256687,-2.129849l1.543777,-4.860347l4.180581,0.979567l-0.006235,0.060385c0,1.24188 1.014946,2.251639 2.263088,2.251639c1.247093,0 2.261018,-1.00976 2.261018,-2.251639s-1.01496,-2.252687 -2.261018,-2.252687c-0.957706,0 -1.773828,0.59752 -2.103822,1.435517l-4.50641,-1.0566c-0.196754,-0.047889 -0.396613,0.065585 -0.458033,0.259209l-1.721787,5.420392c-2.954302,0.035392 -5.630677,0.830701 -7.599164,2.107987c-0.493425,-0.45595 -1.148212,-0.741185 -1.872736,-0.741185c-1.525033,0 -2.764843,1.235645 -2.764843,2.754443c0,1.009746 0.554844,1.885219 1.370967,2.364065c-0.054123,0.293566 -0.089516,0.590237 -0.089516,0.892121c0,4.071287 5.005035,7.383692 11.158281,7.383692s11.159329,-3.312405 11.159329,-7.383692c0,-0.285222 -0.030192,-0.566293 -0.078068,-0.843184c0.866094,-0.465329 1.462579,-1.36578 1.462579,-2.413001zm-17.929874,1.890419c0,-0.903569 0.739089,-1.639541 1.646824,-1.639541c0.907748,0 1.645802,0.735972 1.645802,1.639541s-0.738055,1.638506 -1.645802,1.638506s-1.646824,-0.734937 -1.646824,-1.638506zm9.432328,4.860347c-0.829653,0.825501 -2.131931,1.227314 -3.98071,1.227314l-0.013531,-0.003117l-0.013531,0.003117c-1.849826,0 -3.152091,-0.401813 -3.980723,-1.227314c-0.150935,-0.149901 -0.150935,-0.39453 0,-0.544431c0.150949,-0.150949 0.396626,-0.150949 0.547562,0c0.676635,0.673505 1.799855,1.000381 3.433161,1.000381l0.013531,0.003117l0.013531,-0.003117c1.633306,0 2.756526,-0.327911 3.433161,-1.001429c0.150935,-0.150935 0.396613,-0.149901 0.547548,0c0.150949,0.150949 0.150949,0.39453 0,0.545479zm-0.196741,-3.221841c-0.907734,0 -1.645789,-0.734937 -1.645789,-1.638506c0,-0.903569 0.738055,-1.639541 1.645789,-1.639541s1.645789,0.735972 1.645789,1.639541s-0.738055,1.638506 -1.645789,1.638506z"
                                            fillOpacity="0.7" fill="white"/>
                                    </svg>
                                </a>
                                <a href="mailto:i@nft2go.io" target="_blank" rel="noreferrer">
                                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="white" fillOpacity=".7" stroke="null"
                                              d="m20.757877,20.380938l-10.013762,-8.11545l20.027524,0l-10.013762,8.11545zm0,2.15064l-10.026295,-8.125476l0,12.898828l20.05259,0l0,-12.898828l-10.026295,8.125476z"/>
                                    </svg>
                                </a>
                            </div>

                        </div>
                        <div className="col-12 col-md-2 text-center text-md-left">
                            <nav className="menu-footer">
                                <ul>
                                    <li>
                                        <span>{i18n.t('About us')}</span>
                                        <ul>
                                            <li>
                                                <a href="https://nft2go.io/team">{i18n.t('Team')}</a>
                                            </li>
                                            <li>
                                                <a href="https://nft2go.io/tokenomics">{i18n.t('Tokenomics')}</a>
                                            </li>
                                            <li>
                                                <a href="https://nft2go.io/whitepaper">{i18n.t('Whitepaper')}</a>
                                            </li>
                                            <li>
                                                <a href="https://nft2go.io/roadmap">{i18n.t('Roadmap')}</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-12 col-md-2 text-center text-md-left">
                            <nav className="menu-footer">
                                <ul>
                                    <li>
                                        <span>{i18n.t('Marketplaces')}</span>
                                        <ul>
                                            <li>
                                                <Link to="#">OPENSEA</Link>
                                            </li>
                                            <li>
                                                <Link to="#">SINGULAR</Link>
                                            </li>
                                            <li>
                                                <Link to="#">NFT2GO</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-12 col-md-2 text-center text-md-left">
                            <nav className="menu-footer">
                                <ul>
                                    <li>
                                        <span>{i18n.t('Help')}</span>
                                        <ul>
                                            <li>
                                                <a href="https://nft2go.io/support">{i18n.t('Support')}</a>
                                            </li>
                                            <li>
                                                <a href="https://nft2go.io/tutorials">{i18n.t('Tutorials')}</a>
                                            </li>
                                            <li>
                                                <a href="https://nft2go.io/gas">{i18n.t('Gas')}</a>
                                            </li>
                                            <li>
                                                <a href="https://nft2go.io/taxes">{i18n.t('Taxes')}</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-12 col-md-2 text-center text-md-left">
                            <nav className="menu-footer">
                                <ul>
                                    <li>
                                        <span>{i18n.t('My Account')}</span>
                                        <ul>
                                            <li>
                                                <Link to="/lk/profile/myprofile">{i18n.t('Profile')}</Link>
                                            </li>
                                            <li>
                                                <Link to="#">{i18n.t('Favorites')}</Link>
                                            </li>
                                            <li>
                                                <Link to="#">{i18n.t('My Collections')}</Link>
                                            </li>
                                            <li>
                                                <Link to="#">{i18n.t('Settings')}</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <hr className="hr-general hr-bottom"/>
                    <p className="footer-bottom-text text-italic-main"><a href="https://nft2go.io/terms"> {i18n.t('Terms of Use')} </a>
                        <br/> {i18n.t('Copyright')} <br/> {i18n.t('Developed by')} <a
                            href="https://web-intellect.com/?utm_source=footer_nft2go" target="_blank"
                            className="developer-link" rel="noreferrer">Web-intellect</a></p>
                </div>
            </footer>
        </>
    )
};

export default Footer;
