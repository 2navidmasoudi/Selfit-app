import {Doctor, GET, headers, SAPI, Selfit} from './type';

export const getAllFED = async (token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Doctor}GetAll?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Doctor/GetAll');
  console.log(json);
  return json.Data.$values;
};
export const getSearchFED = async (search, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Doctor}GetSearchAll?search=${search}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Doctor/GetSearchAll');
  console.log(json);
  return json.Data.$values;
};
