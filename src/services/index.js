import { AddressMember, DELETE, GET, headers, Member, POST, PUT, SAPI, SecurityMember, Selfit } from './type';

export const putCheckToken = async (token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${SecurityMember}PutCheckToken`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        token,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('SecurityMember/PutCheckToken');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};

export const putMemberLogin = async (phone, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${SecurityMember}PutMemberLogin`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        phone,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('SecurityMember/PutMemberLogin');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};

export const getSingleToken = async (token, tokenapi, Price = false) => {
  try {
    const response = await fetch(`${SAPI}${Member}GetSingleToken?t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Member/GetSingleToken');
    console.log(json);
    if (Price) {
      return { Data: json.data, Wallet: json.Price };
    }
    return json.Data;
  } catch (e) {
    console.log(e);
  }
};

export const putUserLogout = async (token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${SecurityMember}PutLogout`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        token,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('SecurityMember/PutLogout');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};

export const putCodeLogin = async (Method, phone, code, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${SecurityMember}${Method}`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        phone,
        code,
        tokenapi
      })
    });
    const json = await response.json();
    console.log(`SecurityMember/${Method}`);
    console.log(json);
    return json.Data;
  } catch (e) {
    console.log(e);
  }
};

export const postMember = async (phone, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Member}Post`, {
      method: POST,
      headers,
      body: JSON.stringify({
        phone,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('Member/Post');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};

export const putMember = async (namefamilymember, mailmember, birthdaymember, sexmember, typememberid, phone, token, tokenapi, picmember = 'Default.png', code = null) => {
  try {
    const response = await fetch(`${SAPI}${Member}Put`, {
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
        tokenapi,
        code
      })
    });
    const json = await response.json();
    console.log('Member/Put');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};

export const getAddress = async (id, token, tokenapi, max, min, sort) => {
  try {
    const response = await fetch(`${SAPI}${AddressMember}GetAll/${id}?t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('AddressMember/GetAll');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};

export const postAddress =
  async (titleaddress, desc, plaque, floor, latval, longval, districtid, token, tokenapi) => {
    try {
      const response = await fetch(`${SAPI}${AddressMember}Post`, {
        method: POST,
        headers,
        body: JSON.stringify({
          titleaddress,
          desc,
          plaque,
          floor,
          latval,
          longval,
          districtid,
          token,
          tokenapi
        })
      });
      const json = await response.json();
      console.log('AddressMember/Post');
      console.log(json);
      return json.ResponseCode;
    } catch (e) {
      console.log(e);
    }
  };

export const activeAddress = async (idaddress, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${AddressMember}PutActive`, {
      method: PUT,
      headers,
      body: JSON.stringify({
        idaddress,
        token,
        tokenapi
      })
    });
    const json = await response.json();
    console.log('AddressMember/PutActive');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};

export const deleteAddress = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${AddressMember}Delete/${id}?t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: DELETE,
      headers
    });
    const json = await response.json();
    console.log('AddressMember/Delete');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
