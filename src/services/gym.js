import { GET, Gym, headers, PicGym, POST, PUT, SAPI, Selfit } from './type';

export const getAllGyms = async (token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Gym}GetAll?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Gym/GetAll');
  console.log(json);
  return json.Data.$values;
};
export const getAllGym = async (latval, longval, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Gym}GetAllMap?latval=${latval}&longval=${longval}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Gym/GetAllMap');
  console.log(json);
  return json.Data.$values;
};
export const getSearchGym = async (search, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Gym}GetSearch?search=${search}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Gym/GetSearch');
  console.log(json);
  return json.Data.$values;
};
export const putVisit = async (idgym, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Gym}PutVisit`, {
    method: PUT,
    headers,
    body: JSON.stringify({
      idgym,
      token,
      tokenapi
    })
  });
  const json = await response.json();
  console.log('Gym/PutVisit');
  console.log(json);
  return json.ResponseCode;
};
export const getAllPicGym = async (idgym, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${PicGym}GetAll/${idgym}?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('PicGym/GetAll');
  console.log(json);
  return json.Data.$values;
};
export const getSingleGym = async (idgym, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Gym}GetSingle/${idgym}?t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Gym/GetSingle');
    console.log(json);
    return json.Data;
  } catch (e) {
    console.log(e);
  }
};
export const putGym =
  async (idgym, namegym, descgym, picgym, tuitiongym, numbertuitiongym, latgym, longgym, active, tel, addressgym, token, tokenapi) => {
    try {
      const response = await fetch(`${SAPI}${Gym}Put`, {
        method: PUT,
        headers,
        body: JSON.stringify({
          idgym,
          namegym,
          descgym,
          picgym,
          tuitiongym,
          numbertuitiongym,
          latgym,
          longgym,
          active,
          tel,
          addressgym,
          token,
          tokenapi,
        })
      });
      const json = await response.json();
      console.log('Gym/Put');
      console.log(json);
      return json.ResponseCode;
    } catch (e) {
      console.log(e);
    }
  };
export const postRateGym = async (gymid, rate, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Gym}PostRate`, {
      method: POST,
      headers,
      body: JSON.stringify({
        rate,
        gymid,
        token,
        tokenapi,
      })
    });
    const json = await response.json();
    console.log('Gym/PostRate');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
export const getSingleIDMemberGym = async (token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Gym}GetSingleIDMember?token=${token}&tokenapi=${tokenapi}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Gym/GetSingleIDMember');
    console.log(json);
    return json.Data;
  } catch (e) {
    console.log(e);
  }
};
