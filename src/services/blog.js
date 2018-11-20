import { Blog, GET, headers, SAPI } from './type';

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

export const getCategoryBlog = async (token, tokenapi, max, min, sort = null) => {
  const response = await fetch(`${SAPI}${Blog}GetCategory?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('blog/getCategoryBlog');
  console.log(json);
  return json.Data.$values;
};

export const getCategoryChildrenBlog = async (id, token, tokenapi, max, min, sort = null) => {
  const response = await fetch(`${SAPI}${Blog}GetCateAll/${id}?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('blog/getCategoryChildrenBlog');
  console.log(json);
  return json.Data.$values;
};
