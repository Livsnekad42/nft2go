import React from "react";
import {setSessionDuration} from "../requests/axiosRequests";
import {AxiosError} from "axios";


interface IProps {
    toggle: Function
}

interface IState {
    lifeTime: number
    errors: string[],
    view: boolean
}

export default class PopUp extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            lifeTime : 0,
            errors: [],
            view: true
        }
    }


    handleInoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({lifeTime: parseInt(event.target.value), errors: this.state.errors})
    }

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.toggle();
    };

    formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSessionDuration({'refreshExpires': this.state.lifeTime}).then((resp) => {
            setTimeout(() => this.props.toggle(), 900);
            console.log(resp)
        }, (error: AxiosError) => {
            if (error.response?.statusText) {
                let errorsArr = [];
                errorsArr.push(error.response.statusText);
                this.setState( { lifeTime: this.state.lifeTime, errors: errorsArr})
            }
        })
    }

    render() {
        return (
            <div className="123">
                <div className="modal_content">
                    {this.state.errors && this.state.errors.map(error => <p>{error}</p>)}
                    <span className="close" onClick={this.handleClick}>&times;    </span>
                    <p>Вы здесь первый раз? Как долго вы хотите оставаться здесь?</p>
                    <form onSubmit={this.formSubmit}>
                        <label>
                            5 минут
                        <input type="radio" value='300' id='5min' name='tokenLife' onChange={this.handleInoutChange}/>
                        </label>
                        <label>
                            10 минут
                        <input type="radio" value='600' id='10min' name='tokenLife' onChange={this.handleInoutChange}/>
                        </label>
                        <label>
                            15 минут
                        <input type="radio" value='900' id='15min' name='tokenLife' onChange={this.handleInoutChange}/>
                        </label>
                        <label>
                            Очень много
                            <input type="radio" value='999999' id='infinite' name='tokenLife' onChange={this.handleInoutChange}/>
                        </label>
                        <p>value: {this.state.lifeTime}</p>
                        <button type='submit'>Послать</button>
                    </form>
                </div>
            </div>
        );
    }
}
