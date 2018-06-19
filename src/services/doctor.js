import { Doctor, GET, headers, Selfit } from './type';

export const getAllFED = async (token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Doctor}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.DoctorList.$values;
};
export const getSearchFED = async (search, token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Doctor}GetSearchAll?search=${search}token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.DoctorSearch.$values;
};
