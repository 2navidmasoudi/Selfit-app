import {CategoryProduct, GET, headers, SAPI, Selfit } from './type';

export const getAllCategoryProduct = async (token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${CategoryProduct}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('CategoryProduct/GetAll');
  console.log(json);
  return json.Data.$values;
};
