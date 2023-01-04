import React from 'react';
import nftStore from "../stores/nftStore";
import {setToastError} from "../settings/utils";
import {mnemonicGenerate} from '@polkadot/util-crypto';
import {observer} from "mobx-react";
import userStore from "../stores/userStore";
import { runInAction, toJS} from "mobx";

interface IProps {

}

interface IState {
    viewMnemo: boolean,
    viewConfirm: boolean,
    mnemoOld: string,
    mnemoNew: string[],
    shuffledMnemo: string[],
    checkedMnemo: string[],
    password: string,
    section1: boolean,
    section2: boolean,
    section3: boolean,
    section4: boolean
}
const Mnemo = observer(
class Mnemo extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.handleMnemoOld = this.handleMnemoOld.bind(this);
        this.handleMnemoNew = this.handleMnemoNew.bind(this);
        this.sendMnemo = this.sendMnemo.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.handleArea = this.handleArea.bind(this);
        this.addWordToMnemo = this.addWordToMnemo.bind(this);
        this.setSection = this.setSection.bind(this);
        this.removeFromMemo = this.removeFromMemo.bind(this);
        this.shuffleMnemonic = this.shuffleMnemonic.bind(this);
        this.confirmMnemo = this.confirmMnemo.bind(this);
        this.checkMnemo = this.checkMnemo.bind(this);
        this.state = {
            viewMnemo: false,
            viewConfirm: false,
            mnemoOld: '',
            mnemoNew: [],
            shuffledMnemo: [],
            checkedMnemo: [],
            password: '',
            section1: true,
            section2: false,
            section3: false,
            section4: false,
        };
    }

    handleMnemoOld(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            mnemoOld: event.target.value
        });
        console.log(this.state)
    }

    setSection(number: number) {
        let id = "section" + number;
        this.setState({
            section1: false,
            section2: false,
            section3: false,
            section4: false,
        });
        this.setState((prevState: any) => {
            prevState[id] = true
        })
    }

    confirmMnemo(event: React.MouseEvent<HTMLButtonElement>) {
        console.log(toJS(userStore.checkedMnemo))
        if (userStore.checkedMnemo[0] === "") {
            userStore.checkedMnemo.shift()
        }
        let checkedArr = userStore.checkedMnemo.join(" ");
        console.log(checkedArr)

        let newArr = userStore.mnemoNew.join(" ");
        console.log(newArr)
        console.log('new',this.state.mnemoNew)
        if (this.state.password && checkedArr === newArr) {
            try {
                let mnemo = nftStore.generateMnemonic(userStore.mnemoNew.join(" "));
                nftStore.validateMnemonic(mnemo, this.state.password);
            } catch (e) {
                console.log(e)
            }
        } else {
            setToastError('Вы ошиблись')
        }
    }


    async addWordToMnemo(event: React.MouseEvent<HTMLDivElement>) {
        let word = event.currentTarget.children[1].innerHTML;
        let oldChecked = userStore.checkedMnemo;
        oldChecked.push(word)
        runInAction(() => {
            userStore.checkedMnemo = oldChecked
        })
        let index = userStore.shuffledMnemo.indexOf(word);
        let newArray = userStore.shuffledMnemo;
        newArray.splice(index, 1);
        runInAction(() => {
            userStore.shuffledMnemo = newArray
        })
    }

    shuffleMnemonic = (mnemo : string) => {
        let mnemonicArray = mnemo.split(' ')
        let currentIndex = mnemonicArray.length, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [mnemonicArray[currentIndex], mnemonicArray[randomIndex]] = [
                mnemonicArray[randomIndex], mnemonicArray[currentIndex]];
        }
        console.log(mnemonicArray);
        runInAction(() => {
            userStore.shuffledMnemo = mnemonicArray;
        })
    }

    async sendMnemo(event: React.MouseEvent<HTMLButtonElement>) {
        if (this.state.password) {
            try {
                let mnemo = nftStore.generateMnemonic(this.state.mnemoOld);
                nftStore.validateMnemonic(mnemo, this.state.password);
            } catch (e) {
                console.log(e)
            }
        } else {
            setToastError('Введите пароль')
        }
    }

    setPassword(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: event.target.value
        });
    }

    checkMnemo(event: React.MouseEvent<HTMLButtonElement>) {
        userStore.setSection(4)
    }

    async removeFromMemo(event: React.MouseEvent<HTMLDivElement>) {
        let word = event.currentTarget.children[1].innerHTML;
        let index = userStore.checkedMnemo.indexOf(word);
        let newArray = userStore.checkedMnemo;
        newArray.splice(index, 1);
        let newArrShuffle = userStore.shuffledMnemo;
        newArrShuffle.push(word)
        runInAction(() => {
            userStore.checkedMnemo = newArray;
            userStore.shuffledMnemo = newArrShuffle;
        })
    }

    checkBothMnemos(event: React.MouseEvent<HTMLButtonElement>) {
        if (userStore.checkedMnemo === userStore.mnemoNew) {
            alert("Ura")
        } else {
            alert("PNH")
        }
    }

    async handleMnemoNew(event: React.MouseEvent<HTMLButtonElement>) {
        const mnemonic = mnemonicGenerate();
        runInAction(() => {
            userStore.mnemoNew = mnemonic.split(" ")
        })
        this.shuffleMnemonic(mnemonic);
        userStore.setSection(2)
    }

    handleArea(event: React.MouseEvent<HTMLButtonElement>) {
        userStore.setSection(3)
    }

    render() {
        return (
            <div className='container-mnem' style={{
                display: 'flex',
                flexDirection: 'column',
                margin: "0 auto",
                maxWidth:1060,
                paddingTop: "5%"
            }}>

                {false && this.state.section1 && <div id="section-1" className="d-flex justify-content-center flex-column">
                    <button onClick={this.handleMnemoNew} className="red-btn" style={{marginBottom: 40}}>Создать мнемонику
                    </button>
                    <button onClick={this.handleArea} className="red-btn">Восстановить мнемонику</button>
                </div>}
                {userStore.section2 && <div id="section-2" className="d-flex flex-column justify-content-start align-items-center">
                    <h2 id="mnemo-header">Запишите секретную фразу восстановления</h2>
                    <p id="mnemo-descr">Это ваша секретная фраза восстановления. Запишите ее на листе бумаги и храните в надежном месте. Вам будет предложено ввести эту фразу повторно (в нужном порядке) в следующем шаге.</p>
                    <div className="d-flex flex-wrap" id="mnemo-wrapper" style={{padding:15}}>
                        {userStore.mnemoNew && userStore.mnemoNew.map((word, index) => {
                          return (
                              <div className="d-flex gap-3 mnemo-word">
                                <span>{index + 1}</span>
                                <span>{word}</span>
                              </div>
                          )
                        })}
                    </div>
                    <button className="red-btn" onClick={this.checkMnemo} style={{marginTop:50}}>Далее</button>
                </div>}
                {userStore.section3 && <div id="section-3">
                    <h2 id="mnemo-header">Введите вашу мнемоническую фразу</h2>
                    <textarea className="form-control" name="mnemo" id="mnemo" cols={30} rows={10}
                              value={this.state.mnemoOld} onChange={this.handleMnemoOld}
                              style={{display: 'block'}}></textarea>
                    <div className="mnemo-pass">
                        <label id="top-lab">Задайте пароль
                            <input className="form-control" type="password" placeholder='Введите ваш пароль' onChange={this.setPassword}
                                   required/>
                        </label>
                        <label>Повторите пароль
                            <input className="form-control" type="password" placeholder='Повторите ваш пароль' onChange={this.setPassword}
                                   required/>
                        </label>
                        <button className="red-btn" onClick={this.sendMnemo}>Создать</button>
                    </div>
                </div>}
                {userStore.section4 && <div id="section-4" className="d-flex flex-column justify-content-start align-items-center">
                    <h2 id="mnemo-header">Повторите сгенерированную секретную фразу восстановления</h2>
                    <p id="mnemo-descr">В целях вашей безопасности пройдите проверку на соотвествие записанной вами мнемонической фразы. Выберете каждое слово в том порядке, в котором оно было показано вам.</p>
                    <div style={{width:"100%", backgroundColor:"#323345", minHeight:"30%", marginBottom:30, borderRadius:10, padding:20, gap:15}} className="d-flex flex-wrap justify-content-center">
                        {userStore.checkedMnemo && userStore.checkedMnemo.map((word, index) => {
                            if (!!word) {
                            return (
                                <div className="d-flex gap-3 mnemo-word" onClick={this.removeFromMemo}>
                                    <span>{index}</span>
                                    <span>{word}</span>
                                </div>
                            )}
                        })}
                    </div>
                    <div className="d-flex flex-wrap" id="mnemo-wrapper">
                        {userStore.shuffledMnemo && userStore.shuffledMnemo.map((word, index) => {
                            return (
                                <div className="d-flex gap-3 mnemo-word" onClick={this.addWordToMnemo}>
                                    <span>{index + 1}</span>
                                    <span>{word}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mnemo-pass">
                        <label style={{textAlign:"center", marginTop:30}}>Задайте пароль
                            <input style={{marginTop:10}} className="form-control" type="password" placeholder='Введите ваш пароль' onChange={this.setPassword}
                                   required/>
                        </label>
                        <label style={{textAlign:"center", marginTop:20}}>Повторите пароль
                            <input style={{marginTop:10}} className="form-control" type="password" placeholder='Повторите ваш пароль' onChange={this.setPassword}
                                   required/>
                        </label>
                        <button className="red-btn" onClick={this.confirmMnemo} style={{marginTop:20}}>Создать</button>
                    </div>
                </div>}


            </div>
        )
    }
}
);
export default Mnemo;
