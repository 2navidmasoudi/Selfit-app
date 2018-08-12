import {headers, Music, Selfit, GET, SAPI} from './type';

export const getAllMusic = async (token, tokenapi, max, min, sort) => {
  try {
    const response = await fetch(`${SAPI}${Music}GetAll?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    if (response.status === 204) return [];
    const json = await response.json();
    console.log('Music/GetAll');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};
