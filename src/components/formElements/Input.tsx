import React, { FunctionComponent } from 'react';
import { IInputFormInterface } from '../../interfaces/FormInterface';




const Input : FunctionComponent<IInputFormInterface>= (props: IInputFormInterface) => {
    return (
        <input type={props.type} name={props.name} placeholder={props.placeholder} onChange={props.change} className={props.class} id={props.id} style={{padding:"5px 10px", textAlign:"center"}}/>
    )
};

export default Input;
