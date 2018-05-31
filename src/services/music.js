import { headers, Music, Selfit, GET } from './type';

export const getAllMusic = async (token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${Music}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    if (response.status == 204) return [];
    const json = await response.json();
    console.log(json);
    return json.MusicList.$values;
  } catch (e) {
    console.log(e);
  }
};
