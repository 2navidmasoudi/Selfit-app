import {GET, headers, PicProduct, Product, PUT, SAPI, Selfit} from './type';

export const getAllAccessProduct = async (catid, token, tokenapi, max, min, sort) => {
  try {
    const response = await fetch(`${SAPI}${Product}GetAccessAll?catid=${catid}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Product/GetAccessAll');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};
export const getSearchProduct = async (search, token, tokenapi, max, min, sort) => {
  try {
    const response = await fetch(`${SAPI}${Product}GetSearch?search=${search}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Product/GetSearch');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};
export const putVisitProduct = async (idproduct, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Product}PutVisit`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        idproduct,
        token,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('Product/PutVisit');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
export const getAllPicProduct = async (idproduct, token, tokenapi, max, min, sort) => {
  try {
    const response = await fetch(`${SAPI}${PicProduct}GetAll/${idproduct}?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('PicProduct/GetAll');
    console.log(json);
    return json.Data;
  } catch (e) {
    console.log(e);
  }
};
