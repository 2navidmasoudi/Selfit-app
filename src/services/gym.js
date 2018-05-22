import {headers, PUT, GET, POST, Selfit, Gym, PicGym} from './type';

export const getAllGyms = async (token, tokenapi, max, min, ssort, fsort) => {
    let response = await fetch(`${Selfit}${Gym}GetAll?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
        method: GET,
        headers
    });
    let json = await response.json();
    return json;
};
export const getAllGym = async (latval, longval, token, tokenapi, max, min, ssort, fsort) => {
    let response = await fetch(`${Selfit}${Gym}GetAllMap?latval=${latval}&longval=${longval}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
        method: GET,
        headers
    });
    let json = await response.json();
    return json.GymMapList.$values;
};
export const getSearchGym = async (search, token, tokenapi, max, min, ssort, fsort) => {
    let response = await fetch(`${Selfit}${Gym}GetSearch?search=${search}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
        method: GET,
        headers
    });
    let json = await response.json();
    return json.GymSearchList.$values;
};
export const putVisit = async (idgym, token, tokenapi) => {
    let response = await fetch(`${Selfit}${Gym}PutVisit`, {
        method: PUT,
        headers,
        body: JSON.stringify({
            idgym,
            token,
            tokenapi
        })
    });
    let json = await response.json();
    return json;
};
export const getAllPicGym = async (idgym, token, tokenapi, max, min, ssort) => {
    let response = await fetch(`${Selfit}${PicGym}GetAll/${idgym}?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
        method: GET,
        headers
    });
    let json = await response.json();
    return json;
};
export const getSingleGym = async (idgym, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Gym}GetSingle/${idgym}?token=${token}&tokenapi=${tokenapi}`, {
            method: GET,
            headers
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
    }
};
export const putGym = async (idgym, namegym, descgym, picgym, tuitiongym, numbertuitiongym, latgym, longgym, active, tel, addressgym,token,tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Gym}Put`, {
            method: PUT,
            headers,
            body: JSON.stringify({
                idgym,
                namegym,
                descgym,
                picgym,
                tuitiongym,
                numbertuitiongym,
                latgym,
                longgym,
                active,
                tel,
                addressgym,
                token,
                tokenapi,
            })
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
    }
};