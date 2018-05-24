import { Blog, GET, headers, Selfit } from './type';

export const getAllBlog = async (token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Blog}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.BlogList.$values;
};

export const getSearchBlog = async (search, token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Blog}GetSearchAll?search=${search}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.BlogSearch.$values;
};
