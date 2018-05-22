import {headers,PUT,GET,POST,Selfit, Doctor, PicGym} from './type';
export const getAllDoctor = async (token,tokenapi,max,min,ssort,fsort) => {
    let response = await fetch(`${Selfit}${Doctor}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`,{
        method: GET,
        headers
    });
    let json = await response.json();
    return json.DoctorList.$values;
}