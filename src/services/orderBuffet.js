import { BasketBuffet, DELETE, GET, headers, Orders, POST, SAPI, Selfit } from './type';
// Basket Buffet
export const getAllOrder = async (active, token, tokenapi, max, min, sort = null) => {
  try {
    const response = await fetch(`${SAPI}${BasketBuffet}GetAll?active=${active}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    if (response.status === 204) return { Basket: [], PriceAll: 0 };
    const json = await response.json();
    console.log('BasketBuffet/GetAll');
    console.log(json);
    return { Basket: json.Data.$values, PriceAll: json.Price };
  } catch (e) {
    console.log(e);
  }
  return { Basket: [], PriceAll: 0 };
};
export const postOrderBuffet = async (buffetid, menufoodid, numbermenufood, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${BasketBuffet}Post`, {
      method: POST,
      headers,
      body: JSON.stringify({
        buffetid,
        menufoodid,
        numbermenufood,
        token,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('BasketBuffet/Post');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
  return 0;
};
export const deleteOrderBuffet = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${BasketBuffet}Delete/${id}?t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    console.log('BasketBuffet/Delete');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
  return 0;
};
// Orders
export const getOrderBuffetAll =
  async (id, methodpayed, statepayed, buffetid, token, tokenapi, max, min, sort) => {
    try {
      const url = `${SAPI}${Orders}GetFactorBuffet/${id}?methodpayed=${methodpayed}&statepayed=${statepayed}&buffetid=${buffetid}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`;
      console.log('Orders/GetFactorBuffet');
      console.log(url);
      const response = await fetch(url, {
        method: GET,
        headers
      });
      const json = await response.json();
      console.log('Orders/GetFactorBuffet');
      console.log(json);
      return json.Data.$values;
    } catch (e) {
      console.log(e);
    }
    return [];
  };
export const getFactorBuffet =
  async (methodpayed, statepayed, token, tokenapi, max, min, sort) => {
    try {
      const url = await `${SAPI}${Orders}GetFactorMember?methodpayed=${methodpayed}&statepayed=${statepayed}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`;
      console.log(url);
      const response = await fetch(url, {
        method: GET,
        headers
      });
      const json = await response.json();
      console.log('Orders/GetFactorMember');
      console.log(json);
      return json.Data.$values;
    } catch (e) {
      console.log(e);
    }
    return [];
  };
export const checkOrderBuffet = async (buffetid, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Orders}CheckOrder?buffetid=${buffetid}&t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Orders/CheckOrder');
    console.log(json);
    return json.Data;
  } catch (e) {
    console.log(e);
  }
  return 0;
};
export const postFactor =
  async (buffetid, descfactor, methodpayed, delivery, token, tokenapi, code = null) => {
    try {
      const response = await fetch(`${SAPI}${Orders}PostFactor`, {
        method: POST,
        headers,
        body: JSON.stringify({
          buffetid,
          descfactor,
          methodpayed,
          delivery,
          token,
          tokenapi,
          code
        })
      });
      const json = await response.json();
      console.log('Orders/PostFactor');
      console.log(json);
      if (json.ResponseCode === -15) {
        return -15;
      }
      return json.Data;
    } catch (e) {
      console.log(e);
    }
    return 0;
  };
export const postAddressOrderBuffet = async (idfactor, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Orders}PostAddress`, {
      method: POST,
      headers,
      body: JSON.stringify({
        idfactor,
        token,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('Orders/PostAddress');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
  return 0;
};
export const deleteOrderAll = async (token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Orders}Delete?t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    console.log('Orders/Delete');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
  return 0;
};
