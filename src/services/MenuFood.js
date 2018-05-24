import { DELETE, GET, headers, Menufood, POST, PUT, Selfit } from './type';

export const getAllMenuFood = async (catid, token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Menufood}GetAll?catid=${catid}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.MenufoodAll.$values;
};
export const getSearchMenuFood = async (search, token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Menufood}GetSearchAll?search=${search}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.SearchMenufoodAll.$values;
};
export const getFoodCategory = async (token, tokenapi) => {
  const response = await fetch(`${Selfit}${Menufood}GetCategoryAll?token=${token}&tokenapi=${tokenapi}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.$values;
};
export const getSingleMenuFood = async (id, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Menufood}GetSingle/${id}?token=${token}&tokenapi=${tokenapi}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json;
};
export const postMenuFood = async (idbuffet, menufoodidval, numbermenufoodval, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Menufood}Post`, {
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
  return json;
};
export const putMenuFood = async (idbuffet, menufoodidval, numbermenufoodval, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Menufood}Put`, {
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
  return json;
};
export const deleteMenuFood = async (id, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Menufood}Delete/${id}?token=${token}&tokenapi=${tokenapi}`, {
    method: DELETE,
    headers
  });
  const json = await response.json();
  return json;
};
