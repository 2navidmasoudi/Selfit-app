import {CodeOff, GET, headers, SAPI} from './type';

export default async (token, tokenapi = "selfit.member") => {
  try {
    const response = await fetch(`${SAPI}${CodeOff}Get?t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('CodeOff/Get');
    console.log(json);
    return json.Data.codeoff;
  } catch (e) {
    console.log(e);
    return 'خطا در دریافت اطلاعات (۵۰۰)';
  }
};
