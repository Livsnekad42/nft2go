import React, {useState} from "react";
import {observer} from "mobx-react";
import Input from "./formElements/Input";
import rmrkStore from "../stores/rmrkStore";
import history from "../settings/history";
import nftStore from "../stores/nftStore";

const RMRKAddCollection = observer(() => {


    const [allTags, setTags] = useState([""])

    function handleInputPassChange(event: React.ChangeEvent<HTMLInputElement>) {
        rmrkStore.mintedCollection.password = event.target.value;
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        switch (event.target.name) {
            case 'symbol':
                rmrkStore.mintedCollection.collection.symbol = event.target.value;
                break;
            case 'password':
                rmrkStore.mintedCollection.password = event.target.value;
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

    async function createCollection(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        rmrkStore.mintedCollection.hashTags = allTags;
        try {
            let resp = await nftStore.createCollection(rmrkStore.mintedCollection.collection.name,  0, rmrkStore.mintedCollection.password)
            console.log('ret coll', resp);
            history.push('/mynfts/');
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h2>Создание Коллекции</h2>
            <form>
                <Input type='text' placeholder='Пароль' name="password" change={handleInputPassChange}/>
                <Input type='text' placeholder='Символ' name="symbol"  change={handleInputChange}/>
                <p>
                {allTags.map((tag) => <span>{tag}, </span>)}
                </p>
                <textarea onChange={handleHashTags} placeholder='Введите тэги'></textarea>
                <button type='submit' onClick={createCollection}>Создать коллекцию</button>
            </form>
        </div>
    )
});

export default RMRKAddCollection;
