import {headers, LOG, POST, SAPI, Selfit} from './type';

export const logError =
  async (messagelogerrorui, typelogerrorui, urllogerrorui, iplogerrorui, tokenapi = 'selfit.public') => {
    const response = await fetch(`${SAPI}${LOG}Post`, {
      method: POST,
      headers,
      body: JSON.stringify({
        messagelogerrorui: `${messagelogerrorui}`,
        typelogerrorui,
        urllogerrorui,
        iplogerrorui,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('LOG/Post');
    console.log(json);
    return json.ResponseCode;
  };
