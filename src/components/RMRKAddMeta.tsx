import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import Input from "./formElements/Input";
import rmrkStore from "../stores/rmrkStore";
import history from "../settings/history";
import { publicIP} from "../settings/utils";

const RMRKAddMeta = observer(() => {


    let selectChoice = '';
   const [isAnyColl, setAnyColl ] = useState(false);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (selectChoice === 'nft') {
        switch (event.target.name) {
            case 'name':
                rmrkStore.mintedNFT.nft.metadata.name = event.target.value;
                break;
            case 'symbol':
                rmrkStore.mintedNFT.nft.metadata.description = event.target.value;
                break;
        }
         } else {
            switch (event.target.name) {
                case 'name':
                    rmrkStore.mintedCollection.collection.name = event.target.value;
                    break;
                case 'symbol':
                    rmrkStore.mintedCollection.collection.symbol = event.target.value;
                    break;
            }
        }
    }

    async function createMeta(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
            if (selectChoice === 'coll') {
                let resp = await rmrkStore.createMetaCollection({
                    'image': rmrkStore.tempCIDURL,
                });
                rmrkStore.mintedCollection.collection.metadata = `https://${publicIP}/ipfs/${resp?.data.cid}`;
                //rmrkStore.mintedCollection.collection.metadata = resp?.data.cid;
                history.push('/profile/rmrk/addCollection');
            } else {
                let resp = await rmrkStore.createMetaNFT(rmrkStore.mintedNFT.nft.metadata);
                rmrkStore.mintedNFT.currentCid = resp?.data.cid;
                rmrkStore.mintedNFT.currentCidURL = `https://${publicIP}/ipfs/${rmrkStore.mintedNFT.currentCid}`;
                rmrkStore.tempNFT.nft.metadata = rmrkStore.mintedNFT.currentCidURL;
                history.push('/profile/rmrk/addNFT');
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    function getSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        selectChoice = event.target.value;
        console.log(selectChoice);
    }

    useEffect(() => {
        rmrkStore.getCollFromRMRK().then(() => {
            if (rmrkStore.rmrkCollections.collections.length >= 1) {
                setAnyColl(true);
            }
        });

    }, [])

    return (
            <div>
                <h2>Создание Метаданных</h2>
                <form>
                    <select onChange={getSelect}>
                        <option value='coll'>Создать коллекцию</option>
                        { isAnyColl ?  <option value='nft'>Создать НФТ</option> : undefined }
                        <option value='coll'>Заглушка</option>
                    </select>
                    { isAnyColl ? <Input type='text' placeholder='Символ' name='symbol' change={handleInputChange}/> : <Input type='text' placeholder='Описание' name='symbol' change={handleInputChange}/>}
                    <Input type='text' placeholder='Имя' name="name" change={handleInputChange}/>
                    <button type='submit' onClick={createMeta}>Создать мета</button>
                </form>
            </div>
    )
});

export default RMRKAddMeta;
