import {POST,LOG,Selfit,headers} from './type';
export const logError = async (messagelogerrorui,typelogerrorui,urllogerrorui,iplogerrorui,tokenapi = 'selfit.public') => {
    let response = await fetch (`${Selfit}${LOG}Post` , {
        method : POST,
        headers,
        body : JSON.stringify({
            messagelogerrorui:`${messagelogerrorui}`,
            typelogerrorui,
            urllogerrorui,
            iplogerrorui,
            tokenapi:"selfit.public"
        })
    });
    let json = await response.json();
    console.log('log Saved in Server?=',json);
    return json;
}