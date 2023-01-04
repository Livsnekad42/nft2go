import React, {useEffect, useState} from "react";
import {getByOurIPFS} from "../requests/axiosRequests";

interface IProps {
    id: string,
    metadata: string,
    instance: string,
    name: string
}

const NFTCard = (props: IProps) => {
    const [meta, setMeta] = useState('');

    useEffect(() => {
        getByOurIPFS(props.metadata).then((resp) => {
            setMeta(resp)
        })
    })

    return (
        <div className='nft-card' key={props.id}>
            <h3>Название: {props.name}</h3>
            <p>Серия: {props.instance}</p>
            <img src={meta} className='rmrk-img' alt={props.name}></img>
        </div>
    )
};

export default NFTCard;