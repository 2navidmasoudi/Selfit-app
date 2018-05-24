import { DELETE, GET, headers, OrderMaterial, POST, PUT, Selfit } from './type';
//---------------------------------------------------------
// وب سرویس برای دریافت تمامی متریال ها
export const getAllMaterial = async (token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}GetAll?&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json.MaterialList.$values;
  } catch (e) {
    console.log(e);
  }
};

// وب سرویس برای دریافت سبد خرید:
// state : وضعیت سبد را مشخص می کند
export const getAllBasketMaterial = async (active, token, tokenapi, max, min, ssort = false) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}GetAllBasketMaterial?active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json.BasketMaterialList.$values;
  } catch (e) {
    console.log(e);
  }
};

export const getBasketOrderMaterial = async (id, buffetid, token, tokenapi, max, min, ssort) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}GetBasketOrderAll/${id}?buffetid=${buffetid}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json.Buffet_BasketMaterialOrderList.$values;
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrderMaterial = async (id, active, token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}GetAllOrderMaterial?/${id}&active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json.Buffet_BasketMaterialOrderList.$values;
  } catch (e) {
    console.log(e);
  }
};

// وب سرویس برای دریافت متریال های افزوده شده به سبد خرید
// id : شناسه بوفه
// state : وضعیت پایداری سبد
export const getAllMixMaterial = async (id, state, token, tokenapi, max, min, ssort) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}GetAllMixMaterial/${id}?state=${state}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
      method: GET,
      headers
    });
    if (response.status == 204) return { Basket: [], PriceAll: 0 };
    const json = await response.json();
    return { Basket: json.MixMaterialList.$values, PriceAll: json.PriceAll };
  } catch (e) {
    console.log(e);
  }
};

// وب سرویس برای دریافت متریال های بوفه
// id : شناسه بوفه
export const getAllBuffetMaterial = async (id, state, token, tokenapi, max, min, ssort, fsort) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}GetAllBuffetMaterial/${id}?state=${state}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}&fsort=${fsort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json.Buffet_MaterialList.$values;
  } catch (e) {
    console.log(e);
  }
};
// fist we need to get the Dish size for OrderMaterial:
export const getAllDish = async (token, tokenapi, max, min, ssort) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}GetAllDish?token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    return json.DishList.$values;
  } catch (e) {
    console.log(e);
  }
};
//---------------------------------------------------------------
// وب سرویس برای افزودن سبد
// iddish : شناسه ظرف
// buffetid : شناسه بوفه
// توجه: وقتی عملیات افزودن سبد با موفقیت انجام می شود بجای یک شناسه سبد افزوده شده را بر می گرداند
export const postBasketMaterial = async (iddish, buffetid, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}PostBasketMaterial`, {
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
    return json;
  } catch (e) {
    console.log(e);
  }
};

// وب سرویس برای افزودن متریال به سبد
// idbasketmaterail : شناسه سبد
// idmaterial : شناسه متریال
// numbermaterial : تعداد متریال
export const postMixMaterial = async (idbasketmaterail, idmaterial, numbermaterial, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}PostMixMaterial`, {
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
    return json;
  } catch (e) {
    console.log(e);
  }
};

// وب سرویس برای انتخاب متریال توسط بوفه دار
// idmaterial : شناسه متریال
// buffetid : شناسه بوفه
// active : وضعیت فعال بودن متریال برای بوفه
// percent : درصدی که روی مبلغ ثابت متریال می آید
export const postBuffetMaterial = async (idmaterial, buffetid, active, percent, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}PostBuffetMaterial`, {
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
    return json;
  } catch (e) {
    console.log(e);
  }
};
//----------------------------------------------
export const putActiveBuffetMaterial =
  async (buffetid, idbuffet_material, active, token, tokenapi) => {
    try {
      const response = await fetch(`${Selfit}${OrderMaterial}PutActiveBuffetMaterial`, {
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
      return json;
    } catch (e) {
      console.log(e);
    }
  };
//------------------------------------------------
// وب سرویس برای حذف سبد متریال
// id : شناسه سبد
export const deleteBasketMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}DeleteBasketMaterial/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const deleteMixMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}DeleteMixMaterial/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
// وب سرویس برای حذف متریال از سبد
// id : شناسه متریال افزوده شده به سبد )دقت کنید که متریال این شناسه با شناسه اصلی متریال متفاوت است!(
export const deleteAllBasketMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}DeleteBasketMaterialAll/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

// وب سرویس برای حذف متریال از بوفه
// id : شناسه متریال
export const deleteBuffetMaterial = async (id, token, tokenapi) => {
  try {
    const response = await fetch(`${Selfit}${OrderMaterial}DeleteBuffetMaterial/${id}?token=${token}&tokenapi=${tokenapi}`, {
      method: DELETE,
      headers,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
