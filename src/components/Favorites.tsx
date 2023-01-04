import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import rmrkStore from "../stores/rmrkStore";
import {INFTRMRK, ISingleCollection} from "../interfaces/NFTInterface";
import { Link } from "react-router-dom";
import FormDialog from "./Popups";


const Favorites = observer(() => {

    const [view, setView] = useState('nft');
    const [activeNFT, setActiveNFT] = useState('');

    const [isOpenList, setOpenList] = useState(false);
    const [isOpenSend, setOpenSend] = useState(false);
    const [isOpenConsume, setOpenConsume] = useState(false);

    const handleOpenConsume = (nftID: string) => {
        setOpenConsume(!isOpenConsume);
        setActiveNFT(nftID);
    };

    const handleOpenList = (nftID: string) => {
        setOpenList(!isOpenList);
        setActiveNFT(nftID);
    };

    const handleOpenSend = (nftID: string) => {
        setOpenSend(!isOpenSend);
        setActiveNFT(nftID);
    };

    useEffect(() => {
        rmrkStore.getFav();

    }, [])


    function setNFT(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setView('nft');
    }

    function setColl(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setView('coll');
    }

    const FavNFTs = observer(() => {
        return (
            <>
                <h1>Мои NFT</h1>
                {rmrkStore.favNFTs.nfts.length >= 1 && rmrkStore.favNFTs.nfts.map((nft: INFTRMRK, index: number) => {
                    return (
                        <>
                            <Link key={index} to={'/mynfts/'+nft.id.toString()}>
                                <div className='rmrk-coll' key={nft.id}>
                                    <h2>{nft.name}</h2>
                                    <p>ID: {nft.id}</p>
                                    <p>Price: {nft.forsale}</p>
                                    <p>Instance: {nft.instance}</p>
                                    <img src={nft.metadata} className='rmrk-img' alt={nft.name}></img>
                                </div>
                            </Link>
                            <button onClick={() => handleOpenSend(nft.id.toString())}>Подарить</button>
                            <button onClick={() => handleOpenList(nft.id.toString())}>Выставить на продажу</button>
                            <button onClick={() => handleOpenConsume(nft.id.toString())}>Сжечь в печах</button>

                        </>
                    )
                })}
            </>
        )
    });

    const FavCollections = observer(() => {
        return (
            <>
                <h1>Мои Коллекции</h1>
                {rmrkStore.favCollections.collections.length >= 1 && rmrkStore.favCollections.collections.map((coll: ISingleCollection, index: number) => {
                    return (
                        <Link key={index} to={'/mynfts/collections/'+coll.collection.id.toString()}>
                            <div className="rmrk-coll" key={coll.collection.id}>
                                <p>ID: {coll.collection.id}</p>
                                <p>Block: {coll.collection.block}</p>
                                <p>Name: {coll.collection.name}</p>
                                <p>Instance: {coll.collection.userID}</p>
                                <img src={coll.collection.metadata} className='rmrk-img' alt={coll.collection.name}></img>
                                <Link to={'/mynfts/collections/change/'+coll.collection.id}>
                                    <p>Передать Коллекцию</p>
                                </Link>
                            </div>
                        </Link>
                    )
                })}
            </>
        )
    });

    return (
        <>
            <button onClick={setNFT}>NFT</button>
            <button onClick={setColl}>Коллекции</button>
            <p>Мой кошелёк</p>
            <p>Кошелёк: {!!rmrkStore.rmrkWallet && rmrkStore.rmrkWallet.wallet}</p>
            <p>Баланс: {!!rmrkStore.rmrkWallet && rmrkStore.rmrkWallet.balance}</p>
            {view === 'nft' ? <FavNFTs /> : <FavCollections/>}
            <FormDialog text='123213' type='send' title='Подарить НФТ' buttonText="Подарить" isDialogOpened={isOpenSend} handleOpen={() => setOpenSend(false)} nftID={activeNFT}/>
            <FormDialog text='123213' type='consume' title='Сжечь НФТ' buttonText="Сжечь" isDialogOpened={isOpenConsume} handleOpen={() => setOpenConsume(false)} nftID={activeNFT}/>
            <FormDialog text='123213' type='list' title='Выставить на продажу' buttonText="Выставить" isDialogOpened={isOpenList} handleOpen={() => setOpenList(false)} nftID={activeNFT}/>
        </>
    )
});

export default Favorites;
