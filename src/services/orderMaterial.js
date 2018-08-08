import { BasketMaterial, DELETE, GET, headers, Material, POST, PUT, Selfit } from './type';
// BasketMaterial
export const getAllBasketMaterial = async (active, token, tokenapi, max, min, ssort = false) => {
  try {
    const response = await fetch(`${Selfit}${BasketMaterial}GetAll?active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
      method: GET,
      headers
    });
    if (response.status === 204) return { Basket: [], PriceAll: 0 };
    const json = await response.json();
    console.log('BasketMaterial/GetAll');
    console.log(json);
    const basketMaterial = await json.BasketMaterialList.$values;
    let materialOrder = [];
    for (let i = 0; i < basketMaterial.length; i++) {
      for (let j = 0; j < basketMaterial[i].MixMaterialList.$values.length; j++) {
        materialOrder = [...materialOrder, basketMaterial[i].MixMaterialList.$values[j]];
      }
    }
    return { Basket: materialOrder, PriceAll: json.PriceAll, idbuffet: basketMaterial[0].idbuffet };
  } catch (e) {
    console.log(e);
  }
};
export const postBasketMaterial = async (iddish, buffetid, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${BasketMaterial}Post`, {
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
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const postMixMaterial =
  async (idbasketmaterail, idmaterial, numbermaterial, token, tokenapi) => {
    try {
      const response = await fetch(`${Selfit}${BasketMaterial}PostMixMaterial`, {
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
      return json;
    } catch (e) {
      console.log(e);
    }
  };
export const deleteMixMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${BasketMaterial}DeleteMixMaterial/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    console.log('BasketMaterial/DeleteMixMaterial');
    console.log(json);
    return json;
  } catch (e) {
    console.log(e);
  }
};
// Material
export const getAllMaterial = async (token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${Material}GetAll?&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Material/GetAll');
    console.log(json);
    return json.MaterialList.$values;
  } catch (e) {
    console.log(e);
  }
};
export const getAllBuffetMaterial = async (id, state, token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${Material}GetAllBuffetMaterial/${id}?state=${state}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Material/GetAllBuffetMaterial');
    console.log(json);
    return json.Buffet_MaterialList.$values;
  } catch (e) {
    console.log(e);
  }
};
export const postBuffetMaterial = async (idmaterial, buffetid, active, percent, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${Material}PostBuffetMaterial`, {
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
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const putActiveBuffetMaterial = async (buffetid, idbuffet_material, active, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${Material}PutActiveBuffetMaterial`, {
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
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const deleteBuffetMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${Material}DeleteBuffetMaterial/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    console.log('Material/DeleteBuffetMaterial');
    console.log(json);
    return json;
  } catch (e) {
    console.log(e);
  }
};
// Useless API(s)
export const deleteAllBasketMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${BasketMaterial}Delete/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json;
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
