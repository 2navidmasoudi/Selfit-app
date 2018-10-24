import { CodeOff, SAPI } from './type';

export default async (token, tokenapi) => {
  try {
    const result = await fetch(`${SAPI}${CodeOff}Get?t.token=${token}&t.tokenapi=${tokenapi}`);
    const json = await result.json();
    console.log('CodeOff/Get');
    console.log(json);
    return json.Data.codeoff;
  } catch (e) {
    console.log(e);
    return 'خطا در دریافت اطلاعات (۵۰۰)';
  }
};
