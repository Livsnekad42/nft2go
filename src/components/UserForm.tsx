import React, {FunctionComponent, useState} from 'react';
import Input from './formElements/Input';
import Button from './formElements/Button';
import { IFormInterface } from '../interfaces/FormInterface';
import authStore from '../stores/authStore';
import SocialAuth from "./SocialAuth";
import { useTranslation } from 'react-i18next';
import {images} from '../App';
import { Link } from 'react-router-dom';
import {observer} from "mobx-react";
import {runInAction} from "mobx";

const UserForm: FunctionComponent<IFormInterface> = observer((props) => {
    const [data, setData] = useState({
        'email': '',
        'password': '',
    });


    const [check, setCheck] = useState(false);


    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        runInAction(()=> {
            authStore.data.creds.email = event.target.value;
        })
        return setData({'email': event.target.value, 'password': data.password});
    }

    const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        runInAction(()=> {
            authStore.data.creds.password = event.target.value;
        })
        setData({'email': data.email, 'password': event.target.value});
    }

    const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        authStore.setCode(event.target.value);
    }

    const { t } = useTranslation();


    return (
        <>
            <div id="auth-form">

                <Link to="https://nft2go.io/">
                    <img src={images['logo-auth.png'].default}
                                          className="avatar mb-4 d-block"
                                          alt="" style={{maxWidth:"100%"}}/>
                </Link>

                <div className="mb-2">
                    <Input type="email" placeholder="Введите ваш e-mail" change={handleEmail} class="form-control" id="floatingEmail" />

                </div>

                <div className="mb-3">
                    <Input type="password" placeholder="Введите ваш пароль" change={handlePass} class="form-control" id="floatingPassword"/>
                </div>

                {props.type === 'signUp' && <div className="form-check mb-3">
                    <input className="form-check-input " type="checkbox" value=""
                           id="flexCheckDefault" checked={check} onClick={() => setCheck(!check)}/>
                    <label className=" text-muted"
                           htmlFor="flexCheckDefault">I Accept <Link to="/consent" className="text-primary">Terms And Condition</Link></label>
                </div>}

                {authStore.data.isCode &&  <div className="form-floating mb-3">
                    <Input type="text" placeholder="Введите ваш код" change={handleCode} class="form-control" id="floatingPassword"/>
                    <label htmlFor="floatingPassword">Code</label>
                </div>}

                {!authStore.data.isCode && <Button
                    click={props.type === 'signIn' ? authStore.logIn.bind(this, data) : authStore.logUp.bind(this, data)}
                    value={props.buttonValue} class="btn btn-primary w-100 mb-4 red-btn red-btn-auth" disabled={!check && props.type === 'signUp'}/>}

                {authStore.data.isCode && <Button
                    click={authStore.verifyMail}
                    value={'Отправить код'} class="btn btn-primary w-100 mb-4 red-btn" disabled={!check}>Регистрация</Button>}

                <SocialAuth/>


                <div className="col-12 text-center mt-3">
                    <p>
                        <p className="text-muted me-2" style={{fontSize:20}}>{props.type === 'signIn' ? 'Хотите создать новый аккаунт?' : 'Уже зарегистрированы?'} </p>
                        <p style={{cursor: 'pointer', fontSize:20}} className="text-dark fw-medium" onClick={(e) => props.handlerFunction()}>{props.buttonValue === "Войти" ? t('Sign Up') : t('Sign In')}</p>
                    </p>

                </div>

                <p className="mb-0 text-muted mt-3 text-center d-none">©NFT2GO {new Date().getFullYear()}
                </p>
            </div>
        </>
    )
});

export default UserForm;
