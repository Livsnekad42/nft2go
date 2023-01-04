import React, {useState} from "react";
import {Link} from "react-router-dom";
import { ISingleFile } from "../interfaces/FIleInterface";

interface IProps {
    folder: ISingleFile,
    onRenameFolder: Function,
    onDeleteFolder: Function,
    refresh: Function
}


const FolderCard = (props: IProps) => {

    const [input, setInput] = useState('');

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value)
    }

    return (
        <div className='folder'>
            <Link to={'/files/'+props.folder.id.toString()} onClick={() => props.refresh(props.folder.id)}>Папка</Link>
            <p >{props.folder.name}</p>
            <div className='fileControlButtons'>
                <input type="text" onChange={handleInput}/>
                <button onClick={(e) => props.onRenameFolder( e, input, props.folder.id)} >Переименовать</button>
                <button onClick={ () => props.onDeleteFolder(props.folder)} >Удалить</button>
            </div>
        </div>
    )
};

export default FolderCard;