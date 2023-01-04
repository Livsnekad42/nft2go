import React from 'react';
import { Link } from 'react-router-dom';
import userStore from "../stores/userStore";
import globalStore from "../stores/globalStore";
import {getFilesInfoList, setNewWallet} from "../requests/axiosRequests";
import {observer} from "mobx-react";
interface IProps {
}

interface IState {
        newWallet: {
            name: string,
            type: string,
            makeDefault: boolean
        },
    isLoaded: boolean,
    priceUSD: number
}



@observer class Wallets extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.addNewWallet = this.addNewWallet.bind(this);
        this.handlerDefault = this.handlerDefault.bind(this);
        this.handlerName = this.handlerName.bind(this);
        this.getFileInfoList = this.getFileInfoList.bind(this);
    }

    state = {
        newWallet: {
            name: '',
            type: 'bls',
            makeDefault: false
        },
        isLoaded: false,
        priceUSD: 0
    }

     wallets  = userStore.wallets;

    async addNewWallet(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        let newWallet = await setNewWallet(this.state.newWallet);
        userStore.addWallet(newWallet.data);
        this.setState({newWallet: {
            name: '',
            type: this.state.newWallet.type,
            makeDefault: this.state.newWallet.makeDefault
            }});
        userStore.getWalletList();
    }

    handlerName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ newWallet : {
                name: event.target.value,
                type: this.state.newWallet.type,
                makeDefault: this.state.newWallet.makeDefault
            }});
    }

    handlerDefault(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ newWallet : {
                name: this.state.newWallet.name,
                type: this.state.newWallet.type,
                makeDefault: event.target.checked
            }});


        console.log(event);
    }

    getFileInfoList() {
        getFilesInfoList().then(resp => {
          console.log(resp);
        })
    }



    componentDidMount() {
        userStore.getWalletList().then((resp) => {}, (err) => {
            console.log(err);
        });
        userStore.getUSD();
   }


    render() {

        return (
            <div>
                <Link to="/">На главную</Link>
                {globalStore.getLoginStatus() ? 'true' : 'false'}
                Wallet exists!
                This is you, {userStore.wallets.id} !
                <table>
                    <thead>
                    <tr>
                    <td>Кошелёк</td>
                    <td>Баланс</td>
                    <td>Фиатный Баланс</td>
                    <td>Название</td>
                    <td>Тип кошелька</td>
                    </tr>
                    </thead>
                    <tbody>
                    {userStore.wallets.addressesList.map(address =>
                        <tr key={address.address}>
                            <td>{address.address}</td>
                            <td>{parseFloat((address.balance / 1000000000000000000).toFixed(6)) + ' FIL'}</td>
                            <td>{ parseFloat(((address.balance / 1000000000000000000) * userStore.priceUSD).toFixed(3)) + ' USD'}</td>
                            <td>{address.name}</td>
                            <td>{address.type}</td>
                        </tr>

                    )
                        }
                    </tbody>
                </table>
                <form>
                    <label><p>Название нового кошелька</p>
                        <input type='text' onChange={this.handlerName}/>
                    </label>
                    <label>Сделать кошельком по умолчанию
                        <input type='checkbox' onChange={this.handlerDefault} value={this.state.newWallet.name}/>
                    </label>
                    <button onClick={this.addNewWallet}>Добавить кошелёк</button>
                    <p onClick={this.getFileInfoList}>Jobs</p>
                </form>
            </div>
        )
    }
};

export default Wallets;
