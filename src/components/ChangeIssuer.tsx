import React from 'react';
import * as H from "history";
import {observer} from "mobx-react";
import {changeIssuerCollection} from "../requests/axiosRequests";
import {toast} from "react-toastify";


export interface IRouteComponentProps<P> {
    match: IMatch<P>;
    location: H.Location;
    history: H.History;
    staticContext?: any;
}

export interface IMatch<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

interface IState {
    password: string,
    collectionId: number,
    address: string
}

const ChangeIssuer = observer(
class ChangeIssuer extends React.Component<IRouteComponentProps<any>, IState> {

    constructor(props: IRouteComponentProps<any>) {
        super(props);
        this.handleWallet = this.handleWallet.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.changeIssuer = this.changeIssuer.bind(this);
        this.state = {
            password: '',
            collectionId: +this.currID,
            address: ''
        }
    }

    currID = this.props.match.params.id;


    handleWallet(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            address: event.target.value
        })
        console.log('this', this.state)
    }

    handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: event.target.value
        });
        console.log('this2', this.state)
    }

    changeIssuer(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
            changeIssuerCollection(this.state).then(resp => {
                toast('Владелец коллекции изменён!')
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <label> Введите кошелек получателя</label>
                <input type="text" placeholder="Получатель" onChange={this.handleWallet}/>
                <label> Введите пароль</label>
                <input type="password" placeholder="Пароль" onChange={this.handlePassword}/>
                <button onClick={this.changeIssuer}>Сменить</button>
            </div>
        );
    }
}
);

export default ChangeIssuer;