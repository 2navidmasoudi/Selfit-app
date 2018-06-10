import { BasketBuffet, DELETE, GET, headers, Orders, POST, Selfit } from './type';
// Basket Buffet
export const getAllOrder = async (active, token, tokenapi, max, min) => {
  try {
    const response = await fetch(`${Selfit}${BasketBuffet}GetAll?active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}`, {
      method: GET,
      headers
    });
    if (response.status == 204) return { Basket: [], PriceAll: 0 };
    const json = await response.json();
    return { Basket: json.BasketBuffet.$values, PriceAll: json.PriceAll };
  } catch (e) {
    console.log(e);
  }
};
export const postOrderBuffet = async (buffetid, menufoodid, numbermenufood, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${BasketBuffet}Post`, {
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
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const deleteOrderBuffet = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${BasketBuffet}Delete/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
// Orders
export const getOrderBuffetAll = async (id, methodpayed, statepayed, buffetid, token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${Orders}GetFactorBuffet/${id}?methodpayed=${methodpayed}&statepayed=${statepayed}&buffetid=${buffetid}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    // if (response.status == 204) return [];
    const json = await response.json();
    console.log(json, 'getBasketOrderBuffet');
    return json.OrderBuffetList.$values;
  } catch (e) {
    console.log(e);
  }
};
export const getFactorBuffet = async (methodpayed, statepayed, token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${Orders}GetFactorMember?methodpayed=${methodpayed}&statepayed=${statepayed}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json.FactorBuffetList.$values;
  } catch (e) {
    console.log(e);
  }
};
export const checkOrderBuffet = async (buffetid, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${Orders}CheckOrder?buffetid=${buffetid}&token=${token}&tokenapi=${tokenapi}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const postFactor = async (buffetid, descfactor, methodpayed, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${Orders}PostFactor`, {
      method: POST,
      headers,
      body: JSON.stringify({
        buffetid,
        descfactor,
        methodpayed,
        token,
        tokenapi
      })
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const postAddressOrderBuffet = async (idfactor, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${Orders}PostAddress`, {
      method: POST,
      headers,
      body: JSON.stringify({
        idfactor,
        token,
        tokenapi
      })
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const deleteOrderAll = async (token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${Orders}Delete?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
