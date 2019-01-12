import { Buffet, DELETE, GET, headers, POST, PUT, SAPI } from './type';

export const getAllBuffets = async (token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Buffet}GetAll?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('buffet/GetAll');
  console.log(json);
  return json.Data.$values;
};
export const getAllBuffet = async (latval, longval, token, tokenapi, max, min, sort) => {
  try {
    const response = await fetch(`${SAPI}${Buffet}GetAllMap?latval=${latval}&longval=${longval}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('buffet/GetAllMap');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
  return [];
};
export const getSearchBuffet = async (search, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Buffet}GetSearch?search=${search}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('buffet/GetSearch');
  console.log(json);
  return json.Data.$values;
};
export const getMenuFood = async (id, catid, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Buffet}GetMenufoodAll/${id}?catid=${catid}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('buffet/GetMenufoodAll');
  console.log(json);
  return json.Data.$values;
};

export const putActiveBuffet = async (idbuffet, active, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Buffet}PutActiveBuffet`, {
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
  console.log('buffet/PutActiveBuffet');
  console.log(json);
  return json.ResponseCode;
};
export const postMenuFoodBuffet = async (idbuffet, menufoodidval, active, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Buffet}PostMenufoodBuffet`, {
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
  console.log('buffet/PostMenufoodBuffet');
  console.log(json);
  return json.ResponseCode;
};
export const postRateBuffet = async (idbuffet, rate, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Buffet}PostRate`, {
      method: POST,
      headers,
      body: JSON.stringify({
        idbuffet,
        rate,
        token,
        tokenapi,
      })
    });
    const json = await response.json();
    console.log('Buffet/PostRate');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
export const putActiveMenuFood = async (idbuffet, idmenufood_buffet, active, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Buffet}PutActiveMenufood`, {
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
  console.log('buffet/PutActiveMenufood');
  console.log(json);
  return json.ResponseCode;
};
export const deleteMenuFood = async (id, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Buffet}DeleteMenufoodBuffet/${id}?t.token=${token}&t.tokenapi=${tokenapi}`, {
    method: DELETE,
    headers
  });
  const json = await response.json();
  console.log('buffet/DeleteMenufoodBuffet');
  console.log(json);
  return json.ResponseCode;
};
export const getSingleBuffet = async (id, token, tokenapi) => {
  const url = `${SAPI}${Buffet}GetSingle/${id}?t.token=${token}&t.tokenapi=${tokenapi}`;
  console.log(url);
  const response = await fetch(url, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('buffet/GetSingle');
  console.log(json);
  return json.Data.Data;
};
export const getSingleIDMemberBuffet = async (token, tokenapi) => {
  const response = await fetch(`${SAPI}${Buffet}GetSingleIDMember?t.token=${token}&t.tokenapi=${tokenapi}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('buffet/GetSingleIDMember');
  console.log(json);
  return json.Data;
};
