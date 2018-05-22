import {headers, PUT, GET, POST, Selfit, Member, DELETE} from './type';

export const putCheckToken = async (token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Member}PutCheckToken`, {
            method: PUT,
            headers,
            body: JSON.stringify({
                token,
                tokenapi
            })
        });
        let json = await response.json();
        console.log('Token Extended: ', json);
        return json;
    } catch (e) {
        console.log(e);
    }
};

export const putMemberLogin = async (phone, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Member}PutMemberLogin`, {
            method: PUT,
            headers,
            body: JSON.stringify({
                phone,
                tokenapi
            })
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const getSingleToken = async (token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Member}GetSingleToken?token=${token}&tokenapi=${tokenapi}`, {
            method: GET,
            headers
        });
        let json = await response.json();
        return json;
    } catch (e) {

    }
};

export const putUserLogout = async (token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Member}PutLogout`, {
            method: PUT,
            headers,
            body: JSON.stringify({
                token,
                tokenapi
            })
        });
        let json = await response.json();
        console.log('Log out status:', json);
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const putCodeLogin = async (Method, phone, code, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Member}${Method}`, {
            method: PUT,
            headers,
            body: JSON.stringify({
                phone,
                code,
                tokenapi
            })
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const postMember = async (phone, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Member}Post`, {
            method: POST,
            headers,
            body: JSON.stringify({
                phone,
                tokenapi
            })
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
    }
};

export const putMember = async (namefamilymember, mailmember, birthdaymember, sexmember, typememberid, phone, token, tokenapi, picmember = "Default.png") => {
    try {
        let response = await fetch(`${Selfit}${Member}Put`, {
            method: PUT,
            headers,
            body: JSON.stringify({
                namefamilymember,
                mailmember,
                birthdaymember,
                sexmember,
                typememberid,
                picmember,
                phone,
                token,
                tokenapi
            })
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const getAddress = async (id, token, tokenapi, max, min, ssort, fsort) => {
    try {
        let response = await fetch(`${Selfit}${Member}GetAddressAll/${id}?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
            method: GET,
            headers
        });
        let json = await response.json();
        return json.AddressList.$values;
    } catch (e) {
        console.log(e);

    }
};

export const postAddress = async (titleaddress, plaque, floor, latval, longval, districtid, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Member}PostAddress`, {
            method: POST,
            headers,
            body: JSON.stringify({
                titleaddress,
                plaque,
                floor,
                latval,
                longval,
                districtid,
                token,
                tokenapi
            })
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const activeAddress = async (idaddress, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Member}PutActiveAddress`, {
            method: PUT,
            headers,
            body: JSON.stringify({
                idaddress,
                token,
                tokenapi
            })
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};

export const deleteAddress = async (id, token, tokenapi) => {
    try {
        let response = await fetch(`${Selfit}${Member}DeleteAddress/${id}?token=${token}&tokenapi=${tokenapi}`, {
            method: DELETE,
            headers
        });
        let json = await response.json();
        return json;
    } catch (e) {
        console.log(e);

    }
};