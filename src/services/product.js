import {headers, PUT, GET, POST, Selfit, Product, PicProduct} from './type';

export const getAllAccessProduct = async (catid, token, tokenapi, max, min, ssort, fsort) => {
    try {
        let response = await fetch(`${Selfit}${Product}GetAccessAll?catid=${catid}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
            method: GET,
            headers
        });
        let json = await response.json();
        return json.ProductAccess.$values;
    } catch (e) {
        console.log(e);
    }
};
export const getSearchProduct = async (search, token, tokenapi, max, min, ssort, fsort) => {
    try {
        let response = await fetch(`${Selfit}${Product}GetSearch?search=${search}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
            method: GET,
            headers
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};
export const putVisitProduct = async (idproduct, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Product}PutVisit`, {
            method: PUT,
            headers,
            body: JSON.stringify({
                idproduct,
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
export const getAllPicProduct = async (idproduct, token, tokenapi, max, min, ssort) => {
    try {
        let response = await fetch(`${Selfit}${PicProduct}GetAll/${idproduct}?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
            method: GET,
            headers
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};