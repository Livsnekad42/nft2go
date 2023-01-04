import React, {useState} from "react";
import {IDealInfoListElement, ISingleFile} from "../interfaces/FIleInterface";
import { AxiosResponse } from "axios";

interface IProps {
    file: ISingleFile,
    onDownloadFile: Function,
    onRenameFile: Function,
    makeNFT: Function,
    onDeleteFile: Function,
    onReplaceStorage: Function,
    getInfo: Function,
    refresh: Function
}



const FileCard = (props: IProps) => {

    const [input, setInput] = useState('');

    const [storageConfig, setStorageConfig] = useState({
        "cid": '',
        "storageConfig": {
            "hot": {
                "enabled": false
            },
            "cold": {
                "enabled": false,
                "filecoin": {
                    "maxPrice" : 100
                }
            }
        }
    });

    const [job, setJob] = useState([]);

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        let name = event.target.value.split('.')
        console.log(name);
        setInput(event.target.value)
    }

    function handleHot(event: React.ChangeEvent<HTMLInputElement>) {
        setStorageConfig({
            "cid": props.file.cid,
            "storageConfig": {
                "hot": {
                    "enabled": event.target.checked
                },
                "cold": {
                    "enabled": storageConfig.storageConfig.cold.enabled,
                    "filecoin" : {
                        "maxPrice": 100
                    }
                }
            }
        })
    }

    function handleCold(event: React.ChangeEvent<HTMLInputElement>) {
        setStorageConfig({
            "cid": props.file.cid,
            "storageConfig": {
                "hot": {
                    "enabled": storageConfig.storageConfig.hot.enabled
                },
                "cold": {
                    "enabled": event.target.checked,
                    "filecoin" : {
                        "maxPrice": 100
                    }
                }
        }})
    }

    function getBla(event: React.MouseEvent<HTMLButtonElement>, cid: string) {
        event.preventDefault();
        props.getInfo(cid).then((resp: AxiosResponse) => {
            console.log(resp);
        })
    }

    function getAllInfo(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        props.getInfo(props.file.cid).then((resp: AxiosResponse) => {
            if (!!resp.data?.cidInfo?.executingStorageJob) {
                setJob(resp.data.cidInfo.executingStorageJob.dealInfoList)
            }
        })
    }

    return (
        <div className='file'>
            <h4>Файл</h4>
            <p>{props.file.name}</p>
            <button onClick={getAllInfo}>Get All Info</button>
            <button onClick={(e) => getBla(e,props.file.cid)}>Get All Info</button>

            {job.map((obj: IDealInfoListElement) => {
                return (
                    <ul className="info-list">
                        <li>{obj.stateName}</li>
                        <li>{obj.miner}</li>
                        <li>{obj.dealId}</li>
                    </ul>
                )
            })}
                {props.file.cidInfo.latestPushedStorageConfig.cold && props.file.cidInfo.latestPushedStorageConfig.cold.enabled ?  <div className='blue-storage'></div> : null}
                {props.file.cidInfo.latestPushedStorageConfig.hot && props.file.cidInfo.latestPushedStorageConfig.hot.enabled ? <div className='red-storage'></div> : null}
            <div className='fileControlButtons'>
                <button onClick={() => props.onDownloadFile(props.file)} >Скачать</button>
                <input type="text" onChange={handleInput}/>
                <label htmlFor="hotID">
                    Горячее
                </label>
                <input type="checkbox" onChange={handleHot} id='hotID' defaultChecked={props.file.cidInfo.latestPushedStorageConfig.hot && props.file.cidInfo.latestPushedStorageConfig.hot.enabled}/>
                <label htmlFor="coldID">
                    Холодное
                </label>
                <input type="checkbox" onChange={handleCold} id='coldID' defaultChecked={props.file.cidInfo.latestPushedStorageConfig.cold && props.file.cidInfo.latestPushedStorageConfig.cold.enabled}/>
                <button onClick={ () => props.getInfo(props.file.cid)} >Info</button>
                <button onClick={ () => props.onReplaceStorage(storageConfig)}>Переместить</button>
                <button onClick={ () => props.makeNFT(props.file.name, props.file.cid)}>Зачеканить</button>
                <button onClick={(e) => props.onRenameFile( e, input, props.file.name, props.file.id)} >Переименовать</button>
                <button onClick={ () => props.onDeleteFile(props.file)} >Удалить</button>
            </div>
        </div>
    )
};

export default FileCard;
