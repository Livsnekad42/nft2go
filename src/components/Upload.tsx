import React, {ChangeEventHandler, MouseEventHandler, useRef} from 'react';
import {uploadFile} from "../requests/axiosRequests";
import history from "../settings/history";
import {
    publicIP,
    setToastError
} from "../settings/utils";
import rmrkStore from "../stores/rmrkStore";
import {ISingleCollectionInAll} from "../interfaces/NFTInterface";
import {runInAction, toJS} from "mobx";
import nftStore from "../stores/nftStore";

interface IProps {

}

interface ICreateProps {
    handleColl?: any,
    attrs?: string[][]
    disabled?: boolean,
    onChangeCollLogo?: any,
    onChangeCollBanner?: any,
    onChangeNFTImg?: any,
    collLogo?: any
    collBanner?: any
    nftImg?: any
    handleSubmit?: MouseEventHandler,
    handleInputChange?: ChangeEventHandler,
    handleTagsChange?: ChangeEventHandler
    handleType?: ChangeEventHandler
    handleAttributes?: ChangeEventHandler
    onFileUpload?: any
    handleAddAttributes?: any
    getUploadParams?: any
    onChangeStatus?: any,
    pickedCollImg?: any,
    setColl?: any

}

interface IState  {
    files: File[],
    progress: number,
    coldID: boolean,
    collLogo: any,
    collBanner: any,
    nftImg: any,
    view: string,
    tags: string[],
    attributes: string[][],
    pickedCollImg: string
}

const CreateNFT = (props: ICreateProps) => {

    const fileInputNFTImg = useRef(null);

    const handleOndragOver = (event: any) => {
        console.log(event.dataTransfer)
        event.preventDefault();
    }

    const handleOndropNFTImg = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let imageFile = event.dataTransfer.files;
        props.onChangeNFTImg(imageFile)
    }

    return (
        <>
            <div className="col-12">
                <div className="ms-md-4">
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <label className="form-label"> Выберите коллекцию </label>
                                <div style={{display:"flex"}}>
                                        <div className="drop_zone" id="sel-col" style={{position:"relative", backgroundColor:"transparent", marginBottom:0}} onClick={() => props.setColl}>
                                            {false && <div id="plus-coll-logo"><svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M28.5 53.4375C21.8862 53.4375 15.5432 50.8102 10.8665 46.1335C6.18984 41.4568 3.5625 35.1138 3.5625 28.5C3.5625 21.8862 6.18984 15.5432 10.8665 10.8665C15.5432 6.18984 21.8862 3.5625 28.5 3.5625C35.1138 3.5625 41.4568 6.18984 46.1335 10.8665C50.8102 15.5432 53.4375 21.8862 53.4375 28.5C53.4375 35.1138 50.8102 41.4568 46.1335 46.1335C41.4568 50.8102 35.1138 53.4375 28.5 53.4375ZM28.5 57C36.0587 57 43.3078 53.9973 48.6525 48.6525C53.9973 43.3078 57 36.0587 57 28.5C57 20.9413 53.9973 13.6922 48.6525 8.34746C43.3078 3.00267 36.0587 0 28.5 0C20.9413 0 13.6922 3.00267 8.34746 8.34746C3.00267 13.6922 0 20.9413 0 28.5C0 36.0587 3.00267 43.3078 8.34746 48.6525C13.6922 53.9973 20.9413 57 28.5 57Z" fill="white"/>
                                                <path d="M28.5 14.25C28.9724 14.25 29.4255 14.4377 29.7595 14.7717C30.0936 15.1058 30.2812 15.5588 30.2812 16.0312V26.7188H40.9688C41.4412 26.7188 41.8942 26.9064 42.2283 27.2405C42.5623 27.5745 42.75 28.0276 42.75 28.5C42.75 28.9724 42.5623 29.4255 42.2283 29.7595C41.8942 30.0936 41.4412 30.2812 40.9688 30.2812H30.2812V40.9688C30.2812 41.4412 30.0936 41.8942 29.7595 42.2283C29.4255 42.5623 28.9724 42.75 28.5 42.75C28.0276 42.75 27.5745 42.5623 27.2405 42.2283C26.9064 41.8942 26.7188 41.4412 26.7188 40.9688V30.2812H16.0312C15.5588 30.2812 15.1058 30.0936 14.7717 29.7595C14.4377 29.4255 14.25 28.9724 14.25 28.5C14.25 28.0276 14.4377 27.5745 14.7717 27.2405C15.1058 26.9064 15.5588 26.7188 16.0312 26.7188H26.7188V16.0312C26.7188 15.5588 26.9064 15.1058 27.2405 14.7717C27.5745 14.4377 28.0276 14.25 28.5 14.25Z" fill="white"/>
                                            </svg>
                                            </div>}
                                            <img src={props.pickedCollImg} style={{position:"absolute", maxWidth:"100%", width:"100%", height:"100%", objectFit: "cover"}} />
                                        </div>
                                    {rmrkStore.myCollections.collections && rmrkStore.myCollections.collections.map((collection: ISingleCollectionInAll) => {
                                        return (
                                            <img src={collection.meta.thumb} className="img-thumbnail mobile-coll" style={{maxWidth:"200px"}}  onClick={(e: any) => { // @ts-ignore
                                                props.handleColl(e, collection.id)}}/>
                                        )
                                    })}
                                </div>
                                    </div>



                            <div className="col-12" style={{marginTop:30}}>
                                <div className="mb-3">
                                    <label className="form-label">Загрузите медиаконтент<span
                                        className="text-danger">*</span>
                                        <p className="form-label-description">Формат  файлов: AAC, AVI, BMP, FLAC, GIF, GLB, HEIC, ICO, JPG, JSON, M4V, MOV, MP3, MP4, MPEG, OGG, PDF, PNG, SVG, TIFF, WAV, WEBM, WEBP.
                                            Максимальный размер:  30Мб.</p>
                                    </label>
                                    <div className="drop_zone"
                                         onDragOver = {handleOndragOver}
                                         onDrop = {handleOndropNFTImg}
                                        // @ts-ignore
                                         onClick = { () => fileInputNFTImg.current.click()}
                                         style={{position:"relative", backgroundColor:"transparent"}}>
                                        <div style={{position:"absolute", top:"35%", left:"45%"}}><svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.5 53.4375C21.8862 53.4375 15.5432 50.8102 10.8665 46.1335C6.18984 41.4568 3.5625 35.1138 3.5625 28.5C3.5625 21.8862 6.18984 15.5432 10.8665 10.8665C15.5432 6.18984 21.8862 3.5625 28.5 3.5625C35.1138 3.5625 41.4568 6.18984 46.1335 10.8665C50.8102 15.5432 53.4375 21.8862 53.4375 28.5C53.4375 35.1138 50.8102 41.4568 46.1335 46.1335C41.4568 50.8102 35.1138 53.4375 28.5 53.4375ZM28.5 57C36.0587 57 43.3078 53.9973 48.6525 48.6525C53.9973 43.3078 57 36.0587 57 28.5C57 20.9413 53.9973 13.6922 48.6525 8.34746C43.3078 3.00267 36.0587 0 28.5 0C20.9413 0 13.6922 3.00267 8.34746 8.34746C3.00267 13.6922 0 20.9413 0 28.5C0 36.0587 3.00267 43.3078 8.34746 48.6525C13.6922 53.9973 20.9413 57 28.5 57Z" fill="white"/>
                                            <path d="M28.5 14.25C28.9724 14.25 29.4255 14.4377 29.7595 14.7717C30.0936 15.1058 30.2812 15.5588 30.2812 16.0312V26.7188H40.9688C41.4412 26.7188 41.8942 26.9064 42.2283 27.2405C42.5623 27.5745 42.75 28.0276 42.75 28.5C42.75 28.9724 42.5623 29.4255 42.2283 29.7595C41.8942 30.0936 41.4412 30.2812 40.9688 30.2812H30.2812V40.9688C30.2812 41.4412 30.0936 41.8942 29.7595 42.2283C29.4255 42.5623 28.9724 42.75 28.5 42.75C28.0276 42.75 27.5745 42.5623 27.2405 42.2283C26.9064 41.8942 26.7188 41.4412 26.7188 40.9688V30.2812H16.0312C15.5588 30.2812 15.1058 30.0936 14.7717 29.7595C14.4377 29.4255 14.25 28.9724 14.25 28.5C14.25 28.0276 14.4377 27.5745 14.7717 27.2405C15.1058 26.9064 15.5588 26.7188 16.0312 26.7188H26.7188V16.0312C26.7188 15.5588 26.9064 15.1058 27.2405 14.7717C27.5745 14.4377 28.0276 14.25 28.5 14.25Z" fill="white"/>
                                        </svg>
                                        </div>
                                        <img src={props.nftImg} style={{position:"absolute", maxWidth:"100%", width:"100%", height:"100%", objectFit: "cover"}}/>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputNFTImg} hidden
                                        accept="image/*,audio/*,video/*"
                                        onChange={(e: any) => props.onChangeNFTImg(e.target.files)}
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Название NFT <span
                                        className="text-danger">*</span></label>
                                    <input name="name" id="name" type="text" className="form-control"
                                           onChange={props.handleInputChange}/>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Описание <span
                                        className="text-danger">*</span></label>
                                    <textarea name="description" id="description" rows={4}
                                              className="form-control"
                                              onChange={props.handleInputChange}></textarea>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Ваши тэги (через пробел)</label>
                                    <input name="tags" type="text" className="form-control" id="tags"
                                           onChange={props.handleTagsChange}/>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Роялти</label>
                                    <input name="tags" type="number" className="form-control" id="tags"
                                           onChange={props.handleTagsChange} />
                                </div>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Атрибуты</label>

                                <span onClick={props.handleAddAttributes} style={{padding:5, backgroundColor:"transparent !important", color:"#000"}}>+</span>
                                {props.attrs!.map((attr: any) => {
                                    return (
                                    <div className="row">
                                        <div className="col-6">
                                            <input name="attr-name" type="text" className="form-control" id="attr-name"
                                                   onChange={props.handleTagsChange} placeholder="Свойство" value={attr[0]}/>
                                        </div>
                                        <div className="col-6">
                                            <input name="attr-value" type="text" className="form-control" id="attr-value"
                                                   onChange={props.handleTagsChange}  placeholder="Значение" value={attr[1]}/>
                                        </div>
                                    </div>
                                    )
                                })}

                            </div>


                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label"> Пароль </label>
                                    <input name="password" type="password" className="form-control"
                                           id="pass" onChange={props.handleInputChange} autoComplete="new-password"/>
                                </div>
                            </div>



                            <div className="col-lg-12 text-end">
                                <button type="submit" disabled={props.disabled} className="btn btn-primary" onClick={props.handleSubmit}>Загрузить</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

const CreateCollection = (props: ICreateProps) => {

    const fileInputCollLogo = useRef(null);
    const fileInputCollBanner = useRef(null);

    const handleOndragOver = (event: any) => {
        console.log(event.dataTransfer)
        event.preventDefault();
    }

    const handleOndropCollLogo = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let imageFile = event.dataTransfer.files;
        props.onChangeCollLogo(imageFile)
    }

    const handleOndropCollBanner = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let imageFile = event.dataTransfer.files;
        props.onChangeCollBanner(imageFile)
    }



    // @ts-ignore
    return (
        <>
            <div className="col-12">
                <div className="ms-md-4">
                    <form>
                        <div className="row">
                            <div className="col-12 col-md-5">
                                <div className="mb-3">
                                    <label className="form-label">Логотип коллекции<span
                                        className="text-danger">*</span>
                                        <p className="form-label-description">Формат файлов: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF.
                                            Максимальный размер: 50 MB</p>
                                    </label>
                                    <div className="drop_zone"
                                         onDragOver = {handleOndragOver}
                                         onDrop = {handleOndropCollLogo}
                                        // @ts-ignore
                                         onClick = { () => fileInputCollLogo.current.click()}
                                         style={{position:"relative", backgroundColor:"transparent"}}>
                                        <div style={{position:"absolute", top:"35%", left:"42%"}}><svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.5 53.4375C21.8862 53.4375 15.5432 50.8102 10.8665 46.1335C6.18984 41.4568 3.5625 35.1138 3.5625 28.5C3.5625 21.8862 6.18984 15.5432 10.8665 10.8665C15.5432 6.18984 21.8862 3.5625 28.5 3.5625C35.1138 3.5625 41.4568 6.18984 46.1335 10.8665C50.8102 15.5432 53.4375 21.8862 53.4375 28.5C53.4375 35.1138 50.8102 41.4568 46.1335 46.1335C41.4568 50.8102 35.1138 53.4375 28.5 53.4375ZM28.5 57C36.0587 57 43.3078 53.9973 48.6525 48.6525C53.9973 43.3078 57 36.0587 57 28.5C57 20.9413 53.9973 13.6922 48.6525 8.34746C43.3078 3.00267 36.0587 0 28.5 0C20.9413 0 13.6922 3.00267 8.34746 8.34746C3.00267 13.6922 0 20.9413 0 28.5C0 36.0587 3.00267 43.3078 8.34746 48.6525C13.6922 53.9973 20.9413 57 28.5 57Z" fill="white"/>
                                            <path d="M28.5 14.25C28.9724 14.25 29.4255 14.4377 29.7595 14.7717C30.0936 15.1058 30.2812 15.5588 30.2812 16.0312V26.7188H40.9688C41.4412 26.7188 41.8942 26.9064 42.2283 27.2405C42.5623 27.5745 42.75 28.0276 42.75 28.5C42.75 28.9724 42.5623 29.4255 42.2283 29.7595C41.8942 30.0936 41.4412 30.2812 40.9688 30.2812H30.2812V40.9688C30.2812 41.4412 30.0936 41.8942 29.7595 42.2283C29.4255 42.5623 28.9724 42.75 28.5 42.75C28.0276 42.75 27.5745 42.5623 27.2405 42.2283C26.9064 41.8942 26.7188 41.4412 26.7188 40.9688V30.2812H16.0312C15.5588 30.2812 15.1058 30.0936 14.7717 29.7595C14.4377 29.4255 14.25 28.9724 14.25 28.5C14.25 28.0276 14.4377 27.5745 14.7717 27.2405C15.1058 26.9064 15.5588 26.7188 16.0312 26.7188H26.7188V16.0312C26.7188 15.5588 26.9064 15.1058 27.2405 14.7717C27.5745 14.4377 28.0276 14.25 28.5 14.25Z" fill="white"/>
                                        </svg>
                                        </div>
                                        <img src={props.collLogo} style={{position:"absolute", maxWidth:"100%", width:"100%", height:"100%", objectFit: "cover"}}/>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputCollLogo} hidden
                                        accept="image/*,audio/*,video/*"
                                        onChange={(e: any) => props.onChangeCollLogo(e.target.files)}
                                    />
                                </div>
                            </div>
                            {false &&<div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Баннер  коллекции<span
                                        className="text-danger">*</span>
                                        <p className="form-label-description">Формат файлов: JPG, PNG, GIF, SVG. Рекомендуемый размер 1400х400px</p>
                                    </label>
                                    <div className="drop_zone"
                                         onDragOver = {handleOndragOver}
                                         onDrop = {handleOndropCollBanner}
                                        // @ts-ignore
                                         onClick = { () => fileInputCollBanner.current.click()}
                                         style={{position:"relative", backgroundColor:"transparent"}}
                                    >
                                        <div style={{position:"absolute", top:"35%", left:"42%"}}><svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.5 53.4375C21.8862 53.4375 15.5432 50.8102 10.8665 46.1335C6.18984 41.4568 3.5625 35.1138 3.5625 28.5C3.5625 21.8862 6.18984 15.5432 10.8665 10.8665C15.5432 6.18984 21.8862 3.5625 28.5 3.5625C35.1138 3.5625 41.4568 6.18984 46.1335 10.8665C50.8102 15.5432 53.4375 21.8862 53.4375 28.5C53.4375 35.1138 50.8102 41.4568 46.1335 46.1335C41.4568 50.8102 35.1138 53.4375 28.5 53.4375ZM28.5 57C36.0587 57 43.3078 53.9973 48.6525 48.6525C53.9973 43.3078 57 36.0587 57 28.5C57 20.9413 53.9973 13.6922 48.6525 8.34746C43.3078 3.00267 36.0587 0 28.5 0C20.9413 0 13.6922 3.00267 8.34746 8.34746C3.00267 13.6922 0 20.9413 0 28.5C0 36.0587 3.00267 43.3078 8.34746 48.6525C13.6922 53.9973 20.9413 57 28.5 57Z" fill="white"/>
                                            <path d="M28.5 14.25C28.9724 14.25 29.4255 14.4377 29.7595 14.7717C30.0936 15.1058 30.2812 15.5588 30.2812 16.0312V26.7188H40.9688C41.4412 26.7188 41.8942 26.9064 42.2283 27.2405C42.5623 27.5745 42.75 28.0276 42.75 28.5C42.75 28.9724 42.5623 29.4255 42.2283 29.7595C41.8942 30.0936 41.4412 30.2812 40.9688 30.2812H30.2812V40.9688C30.2812 41.4412 30.0936 41.8942 29.7595 42.2283C29.4255 42.5623 28.9724 42.75 28.5 42.75C28.0276 42.75 27.5745 42.5623 27.2405 42.2283C26.9064 41.8942 26.7188 41.4412 26.7188 40.9688V30.2812H16.0312C15.5588 30.2812 15.1058 30.0936 14.7717 29.7595C14.4377 29.4255 14.25 28.9724 14.25 28.5C14.25 28.0276 14.4377 27.5745 14.7717 27.2405C15.1058 26.9064 15.5588 26.7188 16.0312 26.7188H26.7188V16.0312C26.7188 15.5588 26.9064 15.1058 27.2405 14.7717C27.5745 14.4377 28.0276 14.25 28.5 14.25Z" fill="white"/>
                                        </svg>
                                        </div>
                                        <img src={props.collBanner} style={{position:"absolute", maxWidth:"100%", width:"100%", height:"100%", objectFit: "cover"}}/>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputCollBanner} hidden
                                        accept="image/*,audio/*,video/*"
                                        onChange={(e: any) => props.onChangeCollBanner(e.target.files)}
                                    />
                                </div>
                            </div>}
                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Название <span
                                        className="text-danger">*</span></label>
                                    <input name="name" id="name" type="text" className="form-control"
                                           onChange={props.handleInputChange}/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Дополнительная ссылка <span
                                        className="text-danger">*</span></label>
                                    <input name="name" id="name" type="text" className="form-control"
                                           onChange={props.handleInputChange}/>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Описание коллекции<span
                                        className="text-danger">*</span></label>
                                    <textarea name="description" id="comments" rows={4}
                                              className="form-control" onChange={props.handleInputChange}></textarea>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Количество NFT в коллекции</label>
                                    <input name="max" type="number" className="form-control" id="max"
                                           onChange={props.handleInputChange} />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Блокчейн</label>
                                    <select name="blockchain" id="blockchain" disabled={true} className="form-control">
                                        <option value="Polkadot">Polkadot</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Маркетплейс</label>
                                    <select name="marketplace" id="marketplace" className="form-control">
                                        <option value="Singular">Singular</option>
                                        <option value="NFT2GO">NFT2GO</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label">Роялти</label>
                                    <input name="max" type="number" className="form-control" id="max"
                                           onChange={props.handleInputChange} />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label className="form-label"> Пароль </label>
                                    <input name="password" type="password" className="form-control"
                                           id="pass" onChange={props.handleInputChange} autoComplete="new-password"/>
                                </div>
                            </div>



                            <div className="col-12 text-end">
                                <button type="submit" disabled={props.disabled} className="btn btn-primary" onClick={props.handleSubmit}>Upload Now</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

class FileUpload extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChangeCollLogo = this.onChangeCollLogo.bind(this)
        this.onChangeCollBanner = this.onChangeCollBanner.bind(this)
        this.onChangeNFTImg = this.onChangeNFTImg.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.setColl = this.setColl.bind(this);
        this.setCollView = this.setCollView.bind(this);
        this.setNFTView = this.setNFTView.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleHashTags = this.handleHashTags.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
    }


    state = {
        files: [],
        progress: 0,
        coldID: false,
        collLogo: '',
        collBanner: '',
        nftImg: '',
        view: '',
        tags: [],
        attributes: [["", ""]],
        pickedCollImg: ""
    }

    componentDidMount() {
        rmrkStore.getCollFromRMRK();
        rmrkStore.getMyCollections();
        console.log(toJS(rmrkStore.myCollections.collections));

    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (this.state.view === 'nft') {
            switch (event.target.name) {
                case 'name':
                    rmrkStore.mintedNFT.nft.metadata.name = event.target.value.trim();
                    break;
                case 'description':
                    rmrkStore.mintedNFT.nft.metadata.description = event.target.value.trim();
                    break;
                case 'password':
                    rmrkStore.tempNFT.password = event.target.value;
                    break;
            }
        } else {
            switch (event.target.name) {
                case 'name':
                    rmrkStore.mintedCollection.collection.name = event.target.value.trim();
                    break;
                case 'symbol':
                    rmrkStore.mintedCollection.collection.symbol = event.target.value.trim();
                    break;
                case 'max':
                    rmrkStore.mintedCollection.collection.max = +event.target.value;
                    break;
                case 'description':
                    rmrkStore.mintedCollection.collection.description = event.target.value.trim();
                    break;
                case 'password':
                    rmrkStore.tempNFT.password = event.target.value;
                    break;
            }
        }

    }

    addAttribute(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        let attrs = this.state.attributes;
        attrs.push(["", ""])
        this.setState({attributes: attrs})
        console.log(this.state.attributes)
    }

    async createMeta(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
            if (nftStore.rmrkVersion === 2) {
                if (this.state.view === 'coll') {
                    let resp = await rmrkStore.createMetaCollection({
                        'image': rmrkStore.tempCIDURL,
                        'description': rmrkStore.mintedCollection.collection.description,
                        'name': rmrkStore.mintedCollection.collection.name,
                        'service': 'nft2go'
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
            } else {

            }
        }
        catch (e) {
            console.log(e);
        }
    }

    setNFTView(event: any) {
        event.preventDefault();
        this.setState({view: 'nft'});
    }

    setCollView(event: any) {
        event.preventDefault();
        this.setState({view: 'coll'});
    }

    setColl(event: any, id: string) {
        event.preventDefault();
        rmrkStore.myCollections.collections.forEach((coll: any) => {
            if (coll.id === id) {
                this.setState({pickedCollImg: coll.meta.thumb})
            }
        })

        rmrkStore.setCollID(id);
    }

    setFiles(files: FileList) {
        const filesArr: File[] = Array.from(files);
        this.setState({ files: filesArr });
    }

    setFilesDND(files: any[]) {
        const filesArr: File[] = Array.from(files);
        this.setState({ files: filesArr });
    }

     onChangeCollLogo = (files: FileList) => {
        this.setFiles(files)
        this.setState({ collLogo: URL.createObjectURL(files[0]) });
    }

    onChangeCollBanner = (files: FileList) => {
        this.setFiles(files)
        this.setState({ collBanner: URL.createObjectURL(files[0]) });
    }

    onChangeNFTImg = (files: FileList) => {
        this.setFiles(files)
        this.setState({ nftImg: URL.createObjectURL(files[0]) });
    }

    handleHashTags(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let tags = event.target.value.split(" ");
        if (event.target.value[event.target.value.length - 1] === " " && event.target.value[event.target.value.length - 2] !== " ") {
            let newTags = tags.filter(tag => tag !== '#');
            this.setState({tags: newTags});
        }
    }

    handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let type = event.target.value;
        runInAction(() => {
            rmrkStore.mintedNFT.typeContent = type;
        })
    }

    async onFormSubmit(event: any) {
        try {
        event.preventDefault();// Stop form submit
         let response = await this.fileUpload(this.state.files);
         if (!response.data.successUploadFiles.length) {
             setToastError('Произошла ошибка загрузки файла. Повторите попытку через несколько секунд');
             return;
         }
            let cid = response.data.successUploadFiles[0].nftStorage.cid;
            if (nftStore.rmrkVersion === 2) {
                if (this.state.view === 'nft') {
                    try {
                        runInAction(async () => {
                            console.log('test', toJS(rmrkStore.mintedNFT.nft.metadata))
                            rmrkStore.mintedNFT.nft.metadata.image = `ipfs://ipfs/${cid}`;
                            let resp = await rmrkStore.createMetaNFT(rmrkStore.mintedNFT.nft.metadata);
                            rmrkStore.mintedNFT.currentCid = resp?.data.nftStorage.cid;
                            rmrkStore.mintedNFT.currentCidURL = `ipfs://ipfs/${rmrkStore.mintedNFT.currentCid}`;
                            rmrkStore.tempNFT.nft.metadata = rmrkStore.mintedNFT.currentCidURL;
                            await nftStore.createNFT(rmrkStore.mintedNFT.nft.metadata.name, this.state.tags, rmrkStore.mintedNFT.typeContent, rmrkStore.tempNFT.password);
                            history.push('/lk/mynfts');
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    try {
                        runInAction(async () => {
                            let resp = await rmrkStore.createMetaCollection({
                                'image': `ipfs://ipfs/${cid}`,
                                'description': rmrkStore.mintedCollection.collection.description,
                                'name': rmrkStore.mintedCollection.collection.name
                            });
                            console.log('metacollection', resp);

                            rmrkStore.mintedCollection.collection.metadata = `ipfs://ipfs/${resp?.data.nftStorage.cid}`;
                            rmrkStore.tempNFT.nft.metadata = rmrkStore.mintedNFT.currentCidURL;
                            await nftStore.createCollection(rmrkStore.mintedCollection.collection.name, rmrkStore.mintedCollection.collection.max, rmrkStore.tempNFT.password);
                            history.push('/lk/mynfts');
                        });

                    } catch (e) {
                        console.log(e);
                    }
                }
            } else {
                if (this.state.view === 'nft') {
                    try {
                        runInAction(async () => {
                            console.log('test', toJS(rmrkStore.mintedNFT.nft.metadata))
                            rmrkStore.mintedNFT.nft.metadata.image = `ipfs://ipfs/${cid}`;
                            let resp = await rmrkStore.createMeta(rmrkStore.mintedNFT.nft.metadata);
                            rmrkStore.mintedNFT.currentCid = resp?.data.nftStorage.cid;
                            rmrkStore.mintedNFT.currentCidURL = `ipfs://ipfs/${rmrkStore.mintedNFT.currentCid}`;
                            rmrkStore.tempNFT.nft.metadata = rmrkStore.mintedNFT.currentCidURL;
                            await nftStore.createNFT(rmrkStore.mintedNFT.nft.metadata.name, this.state.tags, rmrkStore.mintedNFT.typeContent, rmrkStore.tempNFT.password);
                            history.push('/lk/mynfts');
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    try {
                        runInAction(async () => {
                            let resp = await rmrkStore.createMeta({
                                'image': `ipfs://ipfs/${cid}`,
                                'description': rmrkStore.mintedCollection.collection.description,
                                'name': rmrkStore.mintedCollection.collection.name
                            });
                            console.log('metacollection', resp);

                            rmrkStore.mintedCollection.collection.metadata = `ipfs://ipfs/${resp?.data.nftStorage.cid}`;
                            rmrkStore.tempNFT.nft.metadata = rmrkStore.mintedNFT.currentCidURL;
                            await nftStore.createCollection(rmrkStore.mintedCollection.collection.name, rmrkStore.mintedCollection.collection.max, rmrkStore.tempNFT.password);
                            history.push('/lk/mynfts');
                        });

                    } catch (e) {
                        console.log(e);
                    }
                }
            }

            this.setState({ files: [] });


        }
        catch (e) {
            console.log(e);
        }
    }

    fileUpload(files: File[]) {
        const formData = new FormData();
        files.forEach(file => {
            console.log('upl', file.size)
            formData.append('files', file)
        });
        return uploadFile(formData, {});
    }

    handleCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({coldID: event.target.checked})
    }

    render() {
        return (
            <>

                <div className="container" id="create-wrapper" style={{paddingTop: 20}}>
                    <div className="d-flex justify-content-center" style={{width:"100%", margin: "0 auto"}}>
                            <button onClick={this.setNFTView} className='btn btn-outline-primary mx-3'>Создать NFT</button>
                            <button onClick={this.setCollView} className='btn btn-outline-primary mx-3'>Создать Коллекцию</button>
                    </div>
                    <div className="row my-4">

                        {false && <div className="col-md-4">
                            <div className="d-grid">
                                <p className="text-muted">Upload your Product image here, Please click "Upload Image"
                                    Button.</p>
                                <div
                                    className="preview-box d-block justify-content-center rounded shadow overflow-hidden bg-light p-1">
                                    <img src={this.state.nftImg} className="img-fluid" alt=''/>
                                </div>

                                <input type="file" id="input-file" name="input-file" accept="image/*"
                                       onChange={ (e ) => e.target.files ? this.onChangeNFTImg(e.target.files) : null } hidden/>
                                <label className="btn-upload btn btn-primary mt-4" htmlFor="input-file">Upload
                                    File</label>
                            </div>
                        </div>}
                        {this.state.view === 'nft' ?
                    <CreateNFT
                        handleColl={this.setColl}
                        disabled={!this.state.files.length}
                        handleSubmit={this.onFormSubmit}
                        handleType={this.handleTypeChange}
                        handleInputChange={this.handleInputChange}
                        handleTagsChange={this.handleHashTags}
                        handleAddAttributes={this.addAttribute}
                        attrs={this.state.attributes}
                        nftImg={this.state.nftImg}
                        onChangeNFTImg={this.onChangeNFTImg}
                        pickedCollImg={this.state.pickedCollImg}
                        setColl={this.setCollView}
                    /> :
                    <CreateCollection
                        handleColl={this.setColl}
                        disabled={!this.state.files.length}
                        handleSubmit={this.onFormSubmit}
                        handleInputChange={this.handleInputChange}
                        onFileUpload={this.fileUpload}
                        onChangeCollLogo={this.onChangeCollLogo}
                        onChangeCollBanner={this.onChangeCollBanner}
                        collLogo={this.state.collLogo}
                        collBanner={this.state.collBanner}
                    />}
                    </div>
                </div>
            </>
        )
    }
}

export default FileUpload;