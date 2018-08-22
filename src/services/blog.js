import {Blog, GET, headers, SAPI, Selfit} from './type';

export const getAllBlog = async (token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Blog}GetAll?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('blog/getAllBlog');
  console.log(json);
  return json.Data.$values;
};

export const getSearchBlog = async (search, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Blog}GetSearchAll?search=${search}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('blog/getSearchBlog');
  console.log(json);
  return json.Data.$values;
};
