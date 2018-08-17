import {DELETE, GET, headers, Menufood, POST, PUT, SAPI, Selfit} from './type';

export const getAllMenuFood = async (catid, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Menufood}GetAll?catid=${catid}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Menufood/GetAll');
  console.log(json);
  return json.Data.$values;
};
export const getSearchMenuFood = async (search, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Menufood}GetSearchAll?search=${search}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Menufood/GetSearchAll');
  console.log(json);
  return json.Data.$values;
};
export const getFoodCategory = async (token, tokenapi) => {
  const response = await fetch(`${SAPI}${Menufood}GetCategoryAll?t.token=${token}&t.tokenapi=${tokenapi}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Menufood/GetCategoryAll');
  console.log(json);
  return json.Data.$values;
};
export const getSingleMenuFood = async (id, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Menufood}GetSingle/${id}?t.token=${token}&t.tokenapi=${tokenapi}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.Data;
};
export const postMenuFood = async (idbuffet, menufoodidval, numbermenufoodval, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Menufood}Post`, {
    method: POST,
    headers,
    body: JSON.stringify({
      idbuffet,
      menufoodidval,
      numbermenufoodval,
      token,
      tokenapi
    })
  });
  const json = await response.json();
  return json.ResponseCode;
};
export const putMenuFood = async (idbuffet, menufoodidval, numbermenufoodval, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Menufood}Put`, {
    method: PUT,
    headers,
    body: JSON.stringify({
      idbuffet,
      menufoodidval,
      numbermenufoodval,
      token,
      tokenapi
    })
  });
  const json = await response.json();
  return json.ResponseCode;
};
export const deleteMenuFood = async (id, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Menufood}Delete/${id}?t.token=${token}&t.tokenapi=${tokenapi}`, {
    method: DELETE,
    headers
  });
  const json = await response.json();
  return json.ResponseCode;
};
