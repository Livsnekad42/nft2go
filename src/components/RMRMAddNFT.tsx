import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import Input from "./formElements/Input";
import rmrkStore from "../stores/rmrkStore";
import {toJS} from "mobx";
import {ISingleCollection} from "../interfaces/NFTInterface";
import history from "../settings/history";
import nftStore from "../stores/nftStore";

const RMRKAddNFT = observer(() => {


    const [allTags, setTags] = useState([""])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        switch (event.target.name) {
            case 'password':
                rmrkStore.tempNFT.password = event.target.value;
                break;
            case 'name':
                rmrkStore.tempNFT.nft.name = event.target.value;
                break;
            case 'instance':
                rmrkStore.tempNFT.nft.instance = event.target.value;
                break;
        }
    }

    function handleHashTags(event: React.ChangeEvent<HTMLTextAreaElement>) {
        console.log('etv', event.target.value);
        let tags = event.target.value.split(" ").map(tag => "#" + tag);
        if (event.target.value[event.target.value.length - 1] === " " && event.target.value[event.target.value.length - 2] !== " ") {
            let newTags = tags.filter(tag => tag !== '#');
            setTags(newTags);
        }
        console.log('tags', tags)
        console.log('st', allTags)
    }

    function setColl(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();
        rmrkStore.setCollID(event.target.value);
    }

    async function createNFT(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log(toJS(rmrkStore.tempNFT))
        console.log(toJS(rmrkStore.mintedNFT));

        try {
            nftStore.createNFT(rmrkStore.tempNFT.nft.name, allTags, '', rmrkStore.tempNFT.password);
            history.push('/mynfts/');
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        rmrkStore.getCollFromRMRK();
        rmrkStore.getMyCollections();
    }, [])

    return (
        <div>
            <h2>Чеканка NFT</h2>
            <form>
                Выберите коллекцию
                <select onChange={setColl}>
                    {rmrkStore.myCollections.collections && rmrkStore.myCollections.collections.map((collection: ISingleCollection) => {
                        return (
                            <option value={collection.collection.id}>{collection.collection.name}</option>
                        )
                    })}
                    <option value='q'>Заглушка</option>
                </select>
                <Input type='text' placeholder='Пароль' name='password' change={handleInputChange}/>
                <Input type='text' placeholder='Имя' name='name' change={handleInputChange}/>
                <Input type='text' placeholder='Серия' name='instance' change={handleInputChange}/>
                <p>
                    {allTags.map((tag) => <span>{tag}, </span>)}
                </p>
                <textarea onChange={handleHashTags} placeholder='Введите тэги'></textarea>
                <button type='submit' onClick={createNFT}>Создать NFT</button>
            </form>
        </div>
    )
});

export default RMRKAddNFT;