import {headers,PUT,GET,POST,Selfit, Blog } from './type';
export const getAllBlog = async (token,tokenapi,max,min,ssort,fsort) => {
    let response = await fetch(`${Selfit}${Blog}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`,{
        method: GET,
        headers
    });
    let json = await response.json();
    return json.BlogList.$values;
}

export const getSearchBlog = async (search,token,tokenapi,max,min,ssort,fsort) => {
    let response = await fetch(`${Selfit}${Blog}GetSearchAll?search=${search}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`,{
        method: GET,
        headers
    });
    let json = await response.json();
    return json.BlogSearch.$values;
}