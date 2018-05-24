import { Buffet, DELETE, GET, headers, POST, PUT, Selfit } from './type';

export const getAllBuffets = async (token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Buffet}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.BuffetList.$values;
};
export const getAllBuffet = async (latval, longval, token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Buffet}GetAllMap?latval=${latval}&longval=${longval}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.BuffetMapList.$values;
};
export const getSearchBuffet = async (search, token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Buffet}GetSearch?search=${search}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json;
};
export const getMenuFood = async (id, catid, token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Buffet}GetMenufoodAll/${id}?catid=${catid}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.MenufoodBuffet.$values;
};
export const putAcceptBuffet = async (memberid, factorid, active, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Buffet}PutAccept`, {
    method: PUT,
    headers,
    body: JSON.stringify({
      memberid,
      factorid,
      active,
      token,
      tokenapi
    })
  });
  const json = await response.json();
  return json;
};
export const putActiveBuffet = async (idbuffet, active, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Buffet}PutActiveBuffet`, {
    method: PUT,
    headers,
    body: JSON.stringify({
      idbuffet,
      active,
      token,
      tokenapi
    })
  });
  const json = await response.json();
  return json;
};
export const postMenuFoodBuffet = async (idbuffet, menufoodidval, active, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Buffet}PostMenufoodBuffet`, {
    method: POST,
    headers,
    body: JSON.stringify({
      idbuffet,
      menufoodidval,
      active,
      token,
      tokenapi
    })
  });
  const json = await response.json();
  return json;
};
export const putActiveMenuFood = async (idbuffet, idmenufood_buffet, active, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Buffet}PutActiveMenufood`, {
    method: PUT,
    headers,
    body: JSON.stringify({
      idbuffet,
      idmenufood_buffet,
      active,
      token,
      tokenapi
    })
  });
  const json = await response.json();
  return json;
};
export const deleteMenuFood = async (id, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Buffet}DeleteMenufoodBuffet/${id}?token=${token}&tokenapi=${tokenapi}`, {
    method: DELETE,
    headers
  });
  const json = await response.json();
  return json;
};
export const getSingleBuffet = async (id, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Buffet}GetSingle/${id}?token=${token}&tokenapi=${tokenapi}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json;
};
export const getSingleIDMember = async (token, tokenapi) => {
  const response = await fetch(`${Selfit}${Buffet}GetSingleIDMember?token=${token}&tokenapi=${tokenapi}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json;
};
