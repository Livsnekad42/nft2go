import { ChangeEvent, MouseEvent } from 'react';
export interface IFormInterface {
    class?: string,
    type: string,
    buttonValue: string,
    handlerFunction: Function
}

export interface IInputFormInterface {
    type: string,
    placeholder? : string,
    name?: string,
    change?: (event: ChangeEvent<HTMLInputElement>) => void,
    class?: string,
    id?: string
}

export interface IButtonInterface {
    value: string,
    click: (event: MouseEvent) => void,
    class?: string,
    disabled?: boolean
}
