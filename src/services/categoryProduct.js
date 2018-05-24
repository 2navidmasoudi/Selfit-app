import { CategoryProduct, GET, headers, Selfit, } from './type';

export const getAllCategoryProduct = async (token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${CategoryProduct}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.CategoryProductList.$values;
};
