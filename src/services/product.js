import { GET, headers, PicProduct, Product, PUT, Selfit } from './type';

export const getAllAccessProduct = async (catid, token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${Product}GetAccessAll?catid=${catid}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json.ProductAccess.$values;
  } catch (e) {
    console.log(e);
  }
};
export const getSearchProduct = async (search, token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${Product}GetSearch?search=${search}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const putVisitProduct = async (idproduct, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${Product}PutVisit`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        idproduct,
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
export const getAllPicProduct = async (idproduct, token, tokenapi, max, min, ssort) => {
  try {
    const response = await fetch(`${Selfit}${PicProduct}GetAll/${idproduct}?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
