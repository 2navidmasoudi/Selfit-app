import {headers,PUT,GET,POST,Selfit, CategoryProduct, } from './type';
export const getAllCategoryProduct = async (token,tokenapi,max,min,ssort,fsort) => {
    let response = await fetch(`${Selfit}${CategoryProduct}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`,{
        method: GET,
        headers
    });
    let json = await response.json();
    return json.CategoryProductList.$values;
}