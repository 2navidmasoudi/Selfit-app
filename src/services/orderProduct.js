import {DELETE, GET, headers, OrderProduct, POST, PUT, SAPI, Selfit} from './type';

export const getBasketProduct = async (active, token, tokenapi, max, min, sort = null) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}GetAll?active=${active}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('OrderProduct/GetAll');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};
export const getFactorProduct = async (active, token, tokenapi, max, min, sort = null) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}GetFactor?active=${active}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('OrderProduct/GetFactor');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};
export const getFactorDetailProduct = async (id, token, tokenapi, max, min, sort = null) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}GetFactorDetail/${id}?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    if (response.status === 204) return [];
    const json = await response.json();
    console.log('OrderProduct/GetFactorDetail');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};
export const getTimeTommorowStore = async (token, tokenapi, max, min, sort = null) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}GetTimeAccessTomorrowStore?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('OrderProduct/GetTimeAccessStore');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};
export const postOrderProduct = async (numberproduct, productid, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}Post`, {
      method: POST,
      headers,
      body: JSON.stringify({
        numberproduct,
        productid,
        token,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('OrderProduct/Post');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
export const postFactorProduct = async (timefactor, descfactor, methodpayed, token, tokenapi, code = null) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}PostFactor`, {
      method: POST,
      headers,
      body: JSON.stringify({
        timefactor,
        descfactor,
        methodpayed,
        token,
        tokenapi,
        code
      })
    });
    const json = await response.json();
    console.log('OrderProduct/PostFactor');
    console.log(json);
    return json.Data;
  } catch (e) {
    console.log(e);
  }
};
export const postAddressProduct = async (factorid, Addressmemberid, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}PostAddress`, {
      method: POST,
      headers,
      body: JSON.stringify({
        factorid,
        Addressmemberid,
        token,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('OrderProduct/PostAddress');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
export const putTimeFactor = async (factorid, timefactor, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}PutTimeFactor`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        factorid,
        timefactor,
        token,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('OrderProduct/PutTimeFactor');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
export const FactorWalletProduct = async (token, tokenapi, code = null) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}PutFactorWallet`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        token,
        tokenapi,
        code
      })
    });
    const json = await response.json();
    console.log('OrderProduct/PutFactorWallet');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
export const deleteBasketProduct = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${OrderProduct}Delete/${id}?t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    console.log('OrderProduct/Delete');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
