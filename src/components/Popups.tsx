import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import nftStore from "../stores/nftStore";
import {changeLogin, changePassword} from "../requests/axiosRequests";

interface IProps {
    handleOpen: Function,
    title: string,
    text?: string,
    buttonText: string,
    isDialogOpened: boolean,
    type: string,
    nftID?: string
}

const FormDialog = (props: IProps) => {



    const [password, SetPassword] = useState("");

    const [price, SetPrice] = useState(0);

    const [address, SetAddress] = useState("");

    const [newPass, setNewPass] = useState("");

    const [login, setLogin] = useState("");

    const handleClose = () => {
        console.log('closed')
        props.handleOpen(false);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetPassword(event.target.value);
        console.log(password);
    }

    const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPass(event.target.value);
        console.log(password);
    }

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
        console.log(password);
    }
    const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetPrice(+event.target.value);
        console.log(price);
    }
    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetAddress(event.target.value);
        console.log(address);
    }




    const handleSubmit = async (event: React.MouseEvent, prop: string) => {
       switch (prop) {
           case 'buy':
               let buy = await nftStore.buyNFT(props.nftID!, password);
               console.log(buy);
               break;
           case 'list':
               let list = await nftStore.listNFT(props.nftID!,price, password);
               console.log(list);
               break;
           case 'emote':
               //let emote = await nftStore.emoteNFT(props.nftID!, emojiUnicode(emojicon), password);
               let emote = await nftStore.emoteNFT(props.nftID!, 'U+1F600', password);
               console.log(emote);
               break;
           case 'consume':
               let consume = await nftStore.consumeNFT(props.nftID!, password);
               console.log(consume);
               break;
           case 'send':
               nftStore.sendNFT(props.nftID!, address, password).then(resp => console.log(resp));
               break;
           case 'change-email':
               await changeLogin({"email": login, "password": password});
               handleClose();
               break;
           case 'change-pass':
               await changePassword({"newPassword": newPass, "password": password});
               handleClose();
               break;
           default:
               return;
       }
    };

    return (
        <div>
            <Dialog open={props.isDialogOpened} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>

                    { props.type === 'change-pass' && <>
                        <input className="form-control" id="modal-input" onChange={handlePassword} placeholder={"Старый пароль"} />
                        <input className="form-control" id="modal-input" onChange={handleNewPassword} placeholder={"Новый пароль"}/>
                        </>}
                    { props.type === 'change-email' && <>
                        <input className="form-control" id="modal-input" onChange={handleLogin} placeholder={"Ваш e-mail"}/>
                        <input className="form-control" id="modal-input" onChange={handlePassword} placeholder={"Ваш пароль"} />
                        </> }
                    { props.type === 'list' && <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Цена"
                        type="number"
                        fullWidth
                        onChange={handlePrice}/> }
                    { props.type === 'send' && <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Получатель"
                        type="text"
                        fullWidth
                        onChange={handleAddress}/> }
                </DialogContent>
                <DialogActions>
                    { props.type === 'list' && <Button onClick={(e) => handleSubmit(e, 'list')} color="primary">
                        {props.buttonText}
                    </Button> }
                    { props.type === 'send' && <Button onClick={(e) => handleSubmit(e, 'send')} color="primary">
                        {props.buttonText}
                    </Button> }
                    { props.type === 'consume' && <Button onClick={(e) => handleSubmit(e, 'consume')} color="primary">
                        {props.buttonText}
                    </Button> }
                    { props.type === 'buy' && <Button onClick={(e) => handleSubmit(e, 'buy')} color="primary">
                        {props.buttonText}
                    </Button> }
                    { props.type === 'change-email' && <button onClick={(e) => handleSubmit(e, 'change-email')} className="red-btn">
                        {props.buttonText}
                    </button> }
                    { props.type === 'change-pass' && <button onClick={(e) => handleSubmit(e, 'change-pass')}  className="red-btn" autoCapitalize={"words"}>
                        {props.buttonText}
                    </button> }
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default FormDialog;
