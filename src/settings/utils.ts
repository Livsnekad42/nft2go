import {toast} from "react-toastify";

export function isLogged() : boolean  {
    return localStorage.getItem('isAuthorized') === 'true';
}

export async function safeRequest(func : Function) {
    let result = await func;
    console.log('safe', result);
}

export function setToastError(toaster : string) {
    try {
        console.log('suc', toaster)
        const error = () => toast.error(toaster, {
            hideProgressBar: true
        });
        error();
    } catch (e) {
        console.log('cess')
        console.log(e)
    }
}

export function setToastInfo(toaster : string) {
    const info = () => toast.info(toaster,{
        hideProgressBar: true
    });
    info();
}

export function setToastWarn(toaster : string) {
    const warn = () => toast.warn(toaster,{
        hideProgressBar: true
    });
    warn();
}

export function setToastSuccess(toaster : string) {
    const success = () => toast.success(toaster,{
        hideProgressBar: true
    });
    success();
}


export function encodeDisposable(str: string, key: string): string {
    let encodeStr = "";

    for ( let i = 0; i < str.length; i++ ) {
        const indexKey = i % key.length;

        const encodeChr = String.fromCharCode(str.charCodeAt(i) + key.charCodeAt(indexKey));
        encodeStr += encodeChr;
    }

    return encodeStr;
}

export function decodeDisposable(str: string, key: string): string {
    let decodeStr = "";

    for ( let i = 0; i < str.length; i++ ) {
        const indexKey = i % key.length;

        const encodeChr = String.fromCharCode(~~(str.charCodeAt(i) - key.charCodeAt(indexKey)));
        decodeStr += encodeChr;
    }

    return decodeStr;
}


export const publicIP = 'cloudflare-ipfs.com';
//export const devIP = '192.168.0.148';
//export const devIP = '176.197.96.134';
//export const publicIP = '176.197.96.134';
