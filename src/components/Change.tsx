import React, {useState} from "react";
import {changeLogin, changePassword} from "../requests/axiosRequests";
import {toast} from "react-toastify";

const Change = () => {

    const [email, setEmail] = useState({
        email: "",
        password: ""
    })

    const [passes, setPasses] = useState({
        password: "",
        newPassword: ""
    })

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        return setEmail({email: event.target.value, password: email.password});
    }

    const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({email: email.email, password: event.target.value});
    }

    const handleOldPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        return setPasses({password: event.target.value, newPassword: passes.newPassword});
    }

    const handleNewPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasses({password : passes.password, newPassword: event.target.value});
    }


    function submitEmail(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
            changeLogin(email).then((resp) => {
                console.log(resp.data);
                toast('Логин успешно изменён!')
            }, (e) => {
                toast(e)
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    function submitPass(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
            changePassword(passes).then((resp) => {
                console.log(resp.data);
                toast('Пароль успешно изменён!')
            }, (e) => {
                toast(e)
            })
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <div className='rmrk-coll'>
                <h1>Сменить Логин</h1>
                <form>
                    <label>Email
                        <input type="email" id='email' name='email' placeholder='Email' onChange={handleEmail}/>
                    </label>
                    <label>Пароль
                        <input type="password" id='pass' name='pass' placeholder='Пароль' onChange={handlePass}/>
                    </label>
                    <button type="submit" value='Отправить' onClick={submitEmail}>Отправить</button>

                </form>
            </div>
            <div className='rmrk-coll'>
                <h1>Сменить пароль</h1>
                <form>
                    <label>Старый пароль
                        <input type="password" id='oldPass' name='oldPass' placeholder='Старый пароль' onChange={handleOldPass}/>
                    </label>
                    <label>Новый пароль
                        <input type="password" id='pass' name='pass' placeholder='Новый пароль' onChange={handleNewPass}/>
                    </label>
                    <button type="submit" value='Отправить' onClick={submitPass}>Отправить</button>
                </form>
            </div>
        </>
    )
};

export default Change;