import {DELETE, GET, headers, OrderProduct, POST, PUT, Selfit} from './type';

export const getBasketProduct = async (active, token, tokenapi, max, min, ssort, fsort) => {
    try {
        let response = await fetch(`${Selfit}${OrderProduct}GetAll?active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
            method: GET,
            headers
        });
        if (response.status == 204) return [];
        let json = await response.json();
        return json.BasketList.$values;
    } catch (e) {
        console.log(e);
    }
};
export const getTimeAccessStore = async (token, tokenapi, max, min, ssort) => {
    try {
        let response = await fetch(`${Selfit}${OrderProduct}GetTimeAccessStore?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
            method: GET,
            headers
        });
        let json = await response.json();
        return json.TimeAccessStore.$values;
    } catch (e) {
        console.log(e);
    }
};
export const postOrderProduct = async (numberproduct, productid, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderProduct}Post`, {
            method: POST,
            headers,
            body: JSON.stringify({
                numberproduct,
                productid,
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
export const postFactorProduct = async (timefactor, descfactor, methodpayed, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderProduct}PostFactor`, {
            method: POST,
            headers,
            body: JSON.stringify({
                timefactor,
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
export const postAddressProduct = async (factorid, Addressmemberid, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderProduct}PostAddress`, {
            method: POST,
            headers,
            body: JSON.stringify({
                factorid,
                Addressmemberid,
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
export const putTimeFactor = async (factorid, timefactor, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderProduct}PutTimeFactor`, {
            method: PUT,
            headers,
            body: JSON.stringify({
                factorid,
                timefactor,
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
//TODO
export const deleteBasketProduct = async (id, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${OrderProduct}Delete/${id}?token=${token}&tokenapi=${tokenapi}`, {
            method: DELETE,
            headers,
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};
