import { BasketMaterial, DELETE, GET, headers, Material, POST, PUT, SAPI, Selfit } from './type';
// BasketMaterial
export const getAllBasketMaterial = async (active, token, tokenapi, max, min, sort = null) => {
  try {
    const response = await fetch(`${SAPI}${BasketMaterial}GetAll?active=${active}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('BasketMaterial/GetAll');
    console.log(json);
    const basketMaterial = await json.Data.$values;
    let materialOrder = [];
    for (let i = 0; i < basketMaterial.length; i++) {
      for (let j = 0; j < basketMaterial[i].MixMaterialList.$values.length; j++) {
        materialOrder = [...materialOrder, basketMaterial[i].MixMaterialList.$values[j]];
      }
    }
    return { Basket: materialOrder, PriceAll: json.Price, idbuffet: basketMaterial[0].idbuffet };
  } catch (e) {
    console.log(e);
  }
};
export const postBasketMaterial = async (iddish, buffetid, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${BasketMaterial}Post`, {
      method: POST,
      headers,
      body: JSON.stringify({
        iddish,
        buffetid,
        token,
        tokenapi,
      })
    });
    const json = await response.json();
    console.log('BasketMaterial/Post');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
export const postMixMaterial =
  async (idbasketmaterail, idmaterial, numbermaterial, token, tokenapi) => {
    try {
      const response = await fetch(`${SAPI}${BasketMaterial}PostMixMaterial`, {
        method: POST,
        headers,
        body: JSON.stringify({
          idbasketmaterail,
          idmaterial,
          numbermaterial,
          token,
          tokenapi
        })
      });
      const json = await response.json();
      console.log('BasketMaterial/PostMixMaterial');
      console.log(json);
      return json.ResponseCode;
    } catch (e) {
      console.log(e);
    }
  };
export const deleteMixMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${BasketMaterial}DeleteMixMaterial/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    console.log('BasketMaterial/DeleteMixMaterial');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
// Material
export const getAllMaterial = async (token, tokenapi, max, min, sort = null) => {
  try {
    const response = await fetch(`${SAPI}${Material}GetAll?&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Material/GetAll');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};
export const getAllBuffetMaterial = async (id, state, token, tokenapi, max, min, sort = null) => {
  try {
    const response = await fetch(`${SAPI}${Material}GetAllBuffetMaterial/${id}?state=${state}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Material/GetAllBuffetMaterial');
    console.log(json);
    return json.Data.$values;
  } catch (e) {
    console.log(e);
  }
};
export const postBuffetMaterial =
  async (idmaterial, buffetid, active, percent, token, tokenapi) => {
    try {
      const response = await fetch(`${SAPI}${Material}PostBuffetMaterial`, {
        method: POST,
        headers,
        body: JSON.stringify({
          idmaterial,
          buffetid,
          active,
          percent,
          token,
          tokenapi
        })
      });
      const json = await response.json();
      console.log('Material/PostBuffetMaterial');
      console.log(json);
      return json.ResponseCode;
    } catch (e) {
      console.log(e);
    }
  };
export const putActiveBuffetMaterial =
  async (buffetid, idbuffet_material, active, token, tokenapi) => {
    try {
      const response = await fetch(`${SAPI}${Material}PutActiveBuffetMaterial`, {
        method: PUT,
        headers,
        body: JSON.stringify({
          buffetid,
          idbuffet_material,
          active,
          token,
          tokenapi
        })
      });
      const json = await response.json();
      console.log('Material/PutActiveBuffetMaterial');
      console.log(json);
      return json.ResponseCode;
    } catch (e) {
      console.log(e);
    }
  };
export const deleteBuffetMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Material}DeleteBuffetMaterial/${id}?t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    console.log('Material/DeleteBuffetMaterial');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
// Useless API(s)
export const deleteAllBasketMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${BasketMaterial}Delete/${id}?t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
// export const getAllDish = async (token, tokenapi, max, min, ssort) => {
//   try {
//     const response = await fetch(`${Selfit}${OrderMaterial}GetAllDish?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
//       method: GET,
//       headers
//     });
//     const json = await response.json();
//     return json.DishList.$values;
//   } catch (e) {
//     console.log(e);
//   }
// };
