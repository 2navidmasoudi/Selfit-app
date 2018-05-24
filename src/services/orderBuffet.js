import { DELETE, GET, headers, OrderBuffet, POST, PUT, Selfit } from './type';

export const getAllOrder = async (active, accept, token, tokenapi, max, min) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}GetAll?active=${active}&accept=${accept}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}`, {
      method: GET,
      headers
    });
    if (response.status == 204) return { Basket: [], PriceAll: 0 };
    const json = await response.json();
    console.log(json);
    return { Basket: json.BasketBuffet.$values, PriceAll: json.PriceAll };
  } catch (e) {
    console.log(e);
  }
};

export const getOrderBuffetid = async (id, active, token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}GetOrderBuffet/${id}?active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    if (response.status == 204) return [];
    const json = await response.json();
    return json.OrderBuffetList.$values;
  } catch (e) {
    console.log(e);
  }
};

export const getOrderBuffetAll = async (id, methodpayed, statepayed, buffetid, token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}GetOrderBuffet/${id}?methodpayed=${methodpayed}&statepayed=${statepayed}&buffetid=${buffetid}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
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
export const checkOrderBuffet = async (buffetid, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}CheckOrder?buffetid=${buffetid}&token=${token}&tokenapi=${tokenapi}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const getBasketOrderAllBuffet = async (id, buffetid, active, token, tokenapi, max, min, fsort = true) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}GetBasketOrderAll/${id}?buffetid=${buffetid}&active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    // if (response.status == 204) return [];
    const json = await response.json();
    return json.Buffet_BasketBuffetOrderList.$values;
  } catch (e) {
    console.log(e);
  }
};


export const postOrderBuffet = async (buffetid, menufoodid, numbermenufood, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}Post`, {
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

export const putOrderBuffet = async (idbasketbuffet, menufoodid, numbermenufood, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}Put`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        idbasketbuffet,
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

export const postFactor = async (buffetid, descfactor, methodpayed, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}PostFactor`, {
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
    const response = await fetch(`${Selfit}${OrderBuffet}PostAddress`, {
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
export const putFactor = async (idfactor, refpayed, salepayed, pricepayed, resultpayed, datepayed, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}PutFactorOnline`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        idfactor,
        refpayed,
        salepayed,
        pricepayed,
        resultpayed,
        datepayed,
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
    const response = await fetch(`${Selfit}${OrderBuffet}Delete/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

export const deleteOrderAll = async (token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderBuffet}DeleteOrderAll?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
