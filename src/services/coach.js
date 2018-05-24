import { Coach, GET, headers, Selfit } from './type';

export const getAllCoach = async (token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Coach}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.CoachList.$values;
};
export const getSearchCoach = async (search, token, tokenapi, max, min, ssort, fsort) => {
  const response = await fetch(`${Selfit}${Coach}GetSearchAll?search=${search}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  return json.CoachSearchList.$values;
};
