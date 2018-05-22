import {headers, PUT, GET, POST, Selfit, OrderBuffet, DELETE} from './type';

export const getAllOrder = async (active, token, tokenapi, max, min) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}GetAll?active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}`, {
            method: GET,
            headers
        });
        if (response.status == 204) return {Basket: [], PriceAll: 0};
        let json = await response.json();
        console.log(json);
        return {Basket: json.BasketBuffet.$values, PriceAll: json.PriceAll};
    } catch (e) {
        console.log(e);
    }
};

export const getOrderBuffetid = async (id, active, token, tokenapi, max, min, ssort, fsort) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}GetOrderBuffet/${id}?active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
            method: GET,
            headers
        });
        if (response.status == 204) return [];
        let json = await response.json();
        return json.OrderBuffetList.$values;
    } catch (e) {
        console.log(e);

    }
};

export const getBasketOrderBuffet = async (id, methodpayed, buffetid, token, tokenapi, max, min, ssort, fsort) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}GetOrderBuffet/${id}?methodpayed=${methodpayed}&buffetid=${buffetid}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
            method: GET,
            headers
        });
        // if (response.status == 204) return [];
        let json = await response.json();
        console.log(json, 'getBasketOrderBuffet');
        return json.OrderBuffetList.$values;
    } catch (e) {
        console.log(e);

    }
};
export const getBasketOrderAllBuffet = async (id, buffetid, active, token, tokenapi, max, min, fsort = true) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}GetBasketOrderAll/${id}?buffetid=${buffetid}&active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&fsort=${fsort}`, {
            method: GET,
            headers
        });
        // if (response.status == 204) return [];
        let json = await response.json();
        return json.Buffet_BasketBuffetOrderList.$values;
    } catch (e) {
        console.log(e);

    }
};


export const postOrderBuffet = async (buffetid, menufoodid, numbermenufood, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}Post`, {
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
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const putOrderBuffet = async (idbasketbuffet, menufoodid, numbermenufood, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}Put`, {
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
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const postFactor = async (buffetid, descfactor, methodpayed, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}PostFactor`, {
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
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};
export const postAddressOrderBuffet = async (idfactor, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}PostAddress`, {
            method: POST,
            headers,
            body: JSON.stringify({
                idfactor,
                token,
                tokenapi
            })
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};
export const putFactor = async (idfactor, refpayed, salepayed, pricepayed, resultpayed, datepayed, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}PutFactorOnline`, {
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
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const deleteOrderBuffet = async (id, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}Delete/${id}?token=${token}&tokenapi=${tokenapi}`, {
            method: DELETE,
            headers,
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const deleteBasket = async (id, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderBuffet}DeleteBasketAll/${id}?token=${token}&tokenapi=${tokenapi}`, {
            method: DELETE,
            headers,
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};
