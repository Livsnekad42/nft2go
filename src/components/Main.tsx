import React, {useEffect, useState} from "react";
import {images, imagesClient} from "../App";
import {observer} from "mobx-react";
import rmrkStore from "../stores/rmrkStore";
import {INFTRMRK, ISingleCollectionInAll} from "../interfaces/NFTInterface";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Accordion, Card} from 'react-bootstrap';
import {addFavorite1} from "../requests/axiosRequests";
import userStore from "../stores/userStore";
import {Carousel} from "@trendyol-js/react-carousel";

const Main = () => {
    const [view, setView] = useState('nft');

    function setNFT(event: any) {
        event.preventDefault();
        setView('nft');
        rmrkStore.getAllNFT(1, 10)
    }

    async function addFavoriteHandler(event: any, data: any) {
        await addFavorite1(data);
    }

    function setColl(event: any) {
        event.preventDefault();
        setView('coll');
        rmrkStore.getCollFromRMRK(1, 10);
    }

    const AllNFTs = observer(() => {

        return (
            <>

                <div className="container">
                    <div id="grid" className="row">
                        {rmrkStore.rmrkNFTs.nfts.length >= 1 && rmrkStore.rmrkNFTs.nfts.map((nft: INFTRMRK) => {
                            return (
                                <div className="col-lg-4 col-md-6 picture-item mt-4 py-1"
                                     data-groups='["recents"]' key={nft.id}>
                                    <div
                                        className="card nft-items nft-item-primary rounded-md border-0 shadow overflow-hidden">
                                        <div className="row g-0">
                                            <div className="col-md-6">
                                                <div className="nft-image position-relative overflow-hidden">
                                                    <Link to={'/nfts/' + nft.id}>
                                                    <img src={nft.meta.thumb} className="img-fluid"
                                                         alt=""/></Link>
                                                    <div className="pop-icon">
                                                        <Link to={'/nfts/' + nft.id}></Link>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="col-md-6">
                                                <div
                                                    className="card-body p-md-3 content d-flex h-100 flex-column">
                                                    <div>
                                                        <Link to={'/nfts/' + nft.id}
                                                              className="title h6 mb-1 text-dark d-block">{nft.meta.name}</Link>
                                                        <small className="badge bg-soft-primary">{nft.price} KSM</small>
                                                        <small className="badge bg-soft-primary">{ parseFloat((nft.price  * userStore.priceUSD).toFixed(2)) + ' USD'}</small>
                                                    </div>
                                                    {}
                                                    <div
                                                        className="d-flex author align-items-center mt-md-auto mb-0 mt-4 mt-sm-0">
                                                        <div className="position-relative">
                                                            <img src={imagesClient['01.jpg'].default}
                                                                 className="avatar avatar-sm-sm rounded-pill shadow"
                                                                 alt=""/>
                                                            <div
                                                                className="position-absolute top-0 start-0 translate-middle pt-2 ps-2">
                                                                <span onClick={(e) => {addFavoriteHandler(e, {nftId: nft.id})}}><i
                                                                    className="mdi mdi-heart align-middle"></i></span>
                                                            </div>
                                                        </div>
                                                        <a href="nft-creator-profile.html"
                                                           className="ps-2 text-dark name">{nft.owner.slice(0,7) + '..'}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>
            </>
        )
    });

    const AllCollections = observer(() => {
        return (
            <>
                <div className="container">
                    <div className="col-12 py-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    {rmrkStore.rmrkCollections.collections.length >= 1 && rmrkStore.rmrkCollections.collections.map((coll: ISingleCollectionInAll ) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 picture-item mt-4 py-1"
                                                 data-groups='["recents"]' key={coll.id}>
                                                <div
                                                    className="card nft-items nft-item-primary rounded-md border-0 shadow overflow-hidden">
                                                    <div className="row g-0">
                                                        <div className="col-md-6">
                                                            <div className="nft-image position-relative overflow-hidden">
                                                                <img src={coll.meta.thumb} className="img-fluid"
                                                                     alt="" />
                                                                <div className="pop-icon">
                                                                    <Link to={'/collections/'+ coll.id}
                                                                          className="btn bg-white btn-pills btn-icon shadow"><i
                                                                        className="uil uil-arrow-right text-dark"></i></Link>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div
                                                                className="card-body p-md-3 content d-flex h-100 flex-column">
                                                                <div>
                                                                    <Link to={'/collections/' + coll.id}
                                                                          className="title h6 mb-1 text-dark d-block">{coll.symbol}</Link>
                                                                </div>


                                                                <div
                                                                    className="d-flex author align-items-center mt-md-auto mb-0 mt-4 mt-sm-0">
                                                                    <div className="position-relative">
                                                                        <img src={imagesClient['01.jpg'].default}
                                                                             className="avatar avatar-sm-sm rounded-pill shadow"
                                                                             alt=""/>
                                                                        <div
                                                                            className="position-absolute top-0 start-0 translate-middle pt-2 ps-2">
                                                                            <i className="mdi mdi-check-circle mdi-18px text-success"></i>
                                                                        </div>
                                                                    </div>
                                                                    <a href="nft-creator-profile.html"
                                                                       className="ps-2 text-dark name">{`${coll.issuer.slice(0,7)}..`}</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )})}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    });

    const { t } = useTranslation();

    const slides = [images['first-main-slide.png'].default, images['second-main-slide.png'].default, images['third-main-slide.png'].default]

    useEffect(() => {
        rmrkStore.getAllNFT(1, 10);
        userStore.getUSD();
    }, [])

    return (
        <>
        <section className="bg-half-100 pb-0" style={{paddingTop: 50}}>
            <div className="container position-relative" style={{zIndex: 1}}>
                <Carousel show={3} slide={1}>
                    {slides.map((slide, index) => (
                        <div className="rounded-lg px-4 py-5 position-relative overflow-hidden border border-primary" key={index}>
                            <div>
                                <div className='d-flex justify-content-around align-items-center flex-column flex-md-row row'>
                                    <div className="col-sm-6">
                                        <p className="title">{t(`Slide-Title-${index}`)}</p>
                                        <p>{t(`Slide-Subtitle-${index}`)}</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <img className="slider-img" src={slide} alt="" style={{maxWidth: 500}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>

            </div>
        </section>

    <section className="section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <div className="section-title text-center">
                        <h4 className="title mb-3">Latest Works</h4>
                        <p className="text-muted mx-auto para-desc mb-0">Buy and sell 100+ cryptocurrencies with 20+
                            fiat currencies using bank transfers or your credit/debit card.</p>
                        <div className="filters-group-wrap mt-5">
                            <div className="filters-group">
                                <ul className="container-filter mb-0 categories-filter list-unstyled filter-options">
                                    <li className="list-inline-item categories position-relative"
                                        data-group="top" onClick={setNFT}>NFT
                                    </li>
                                    <li className="list-inline-item categories position-relative"
                                        data-group="top" onClick={setColl}>Collections
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {view === 'nft' ? <AllNFTs /> : <AllCollections/>}

        </div>

        <div className="container mt-100 mt-60">
            <div className="section-title mb-4 pb-2">
                <h4 className="title mb-4">Frequently Asked Questions</h4>
                <p className="text-muted para-desc mb-0">Explore and learn more about everything from machine
                    learning and global payments to scaling your team.</p>
            </div>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <Accordion defaultActiveKey='0'>
                        <div className="accordion mt-4 pt-2" id="buyingquestion">
                            <div className="accordion-item rounded border-0 shadow">

                                <h2 className="accordion-header" id="headingTwo">
                                    <Accordion.Toggle eventKey="0" className='accordion-button border-0 bg-white text-dark'>
                                        Безопасность и доступная цена
                                    </Accordion.Toggle>
                                </h2>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>Использование NFT2GO абсолютно безопасно, так как на сервере не сохраняются мнемоническая фраза и пароль от электронного кошелька. Эти данные остаются только у Вас. Создание NFT осуществляется по доступной цене - ~$5.</Card.Body>
                                </Accordion.Collapse>
                            </div>
                            <div className="accordion-item rounded border-0 shadow mt-3">
                                <h2 className="accordion-header">
                                    <Accordion.Toggle eventKey="1" className='accordion-button border-0 bg-white text-dark'>
                                        Высокая скорость сделок с NFT
                                    </Accordion.Toggle>
                                </h2>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>NFT2GO позволяет совершать сделки с NFT буквально за 5-7 секунд!</Card.Body>
                                </Accordion.Collapse>
                            </div>
                            <div className="accordion-item rounded border-0 shadow mt-3">
                                <h2 className="accordion-header">
                                    <Accordion.Toggle eventKey="2" className='accordion-button border-0 bg-white text-dark'>
                                        Подтверждение социальной страницы пользователя
                                    </Accordion.Toggle>
                                </h2>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>Функция подтверждения социальной страницы пользователя позволяет доверять автору контента и быть уверенным в оригинальности его товаров.</Card.Body>
                                </Accordion.Collapse>
                            </div>
                            <div className="accordion-item rounded border-0 shadow mt-3">
                                <h2 className="accordion-header">
                                    <Accordion.Toggle eventKey="3" className='accordion-button border-0 bg-white text-dark'>
                                        Фильтрация контента
                                    </Accordion.Toggle>
                                </h2>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>Фильтрация контента по хештегам и типам файлов – это удобный способ искать NFT по интересующей Вас тематике, а также по определенному виду NFT.</Card.Body>
                                </Accordion.Collapse>
                            </div>
                            <div className="accordion-item rounded border-0 shadow mt-3 et">
                                <h2 className="accordion-header">
                                    <Accordion.Toggle eventKey="4" className='accordion-button border-0 bg-white text-dark'>
                                        Подписка на автора
                                    </Accordion.Toggle>
                                </h2>
                                <Accordion.Collapse eventKey="4">
                                    <Card.Body>Подписываясь на понравившихся авторов, Вы будете получать уведомления о появлении новых NFT.</Card.Body>
                                </Accordion.Collapse>
                            </div>
                        </div>
                    </Accordion>
                </div>

                <div className="col-md-6">
                    <Accordion defaultActiveKey='5'>
                    <div className="accordion mt-4 pt-2" id="buyingquestion">
                        <div className="accordion-item rounded border-0 shadow">
                            <h2 className="accordion-header">
                                <Accordion.Toggle eventKey="5" className='accordion-button border-0 bg-white text-dark'>
                                    Мобильное приложение
                                </Accordion.Toggle>
                            </h2>
                            <Accordion.Collapse eventKey="5">
                                <Card.Body>Мобильное приложение и сайт имеют идентичный функционал, но при запуске приложения требуется время на синхронизацию с блокчейном. На данный момент мобильное приложение доступно только на Android</Card.Body>
                            </Accordion.Collapse>
                        </div>
                        <div className="accordion-item rounded border-0 shadow mt-3">
                            <h2 className="accordion-header">
                                <Accordion.Toggle eventKey="6" className='accordion-button border-0 bg-white text-dark'>
                                    Регистрация, создание и пополнение кошелька
                                </Accordion.Toggle>
                            </h2>
                            <Accordion.Collapse eventKey="6">
                                <Card.Body>1.Регистрация через электронную почту или социальные сети.
                                    2.Создание электронного кошелька с помощью мнемонической фразы, которая представляет собой набор кодовых слов, генерирующих адрес данного кошелька.<br/>
                                    3.Пополнение созданного кошелька криптовалютой. Перевести деньги в криптовалюту можно на любой криптовалютной бирже</Card.Body>
                            </Accordion.Collapse>
                        </div>
                        <div className="accordion-item rounded border-0 shadow mt-3">
                            <h2 className="accordion-header">
                                <Accordion.Toggle eventKey="7" className='accordion-button border-0 bg-white text-dark'>
                                    Создание NFT в разных сетях
                                </Accordion.Toggle>
                            </h2>
                            <Accordion.Collapse eventKey="7">
                                <Card.Body>NFT2GO объединяет две сети – Polkadot и Ethereum, благодаря этому Ваши NFT будут видны в обеих сетях.</Card.Body>
                            </Accordion.Collapse>
                        </div>
                        <div className="accordion-item rounded border-0 shadow mt-3">
                            <h2 className="accordion-header">
                                <Accordion.Toggle eventKey="8" className='accordion-button border-0 bg-white text-dark'>
                                    Мультиязычность
                                </Accordion.Toggle>
                            </h2>
                            <Accordion.Collapse eventKey="8">
                                <Card.Body>Проект NFT2GO доступен на трех языках – русском, английском и китайском.</Card.Body>
                            </Accordion.Collapse>
                        </div>
                        <div className="accordion-item rounded border-0 shadow mt-3">
                            <h2 className="accordion-header">
                                <Accordion.Toggle eventKey="9" className='accordion-button border-0 bg-white text-dark'>
                                    Виды NFT
                                </Accordion.Toggle>
                            </h2>
                            <Accordion.Collapse eventKey="9">
                                <Card.Body>NFT2GO дает возможность создать NFT из следующих цифровых объектов:
                                    - картинки
                                    - видео
                                    - аудио
                                    - 3D-модели</Card.Body>
                            </Accordion.Collapse>
                        </div>
                    </div>
                    </Accordion>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default Main;
