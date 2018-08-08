import {
  DECREMENT_MIN,
  GET_BUFFET_BASKET,
  GET_MATERIAL_BASKET,
  GET_ORDER_BUFFET,
  GET_ORDER_MATERIAL,
  GET_PRODUCT_BASKET,
  INCREMENT_MIN,
  LOCATE_USER,
  RECEIVE_BLOG,
  RECEIVE_BUFFET,
  RECEIVE_GYM,
  RECEIVE_PRODUCT,
  RECIEVE_MATERIAL,
  RECIEVE_MENUFOOD,
  REFRESH_BLOG,
  REFRESH_BUFFET,
  REFRESH_GYM,
  REFRESH_PRODUCT,
  SELECT_BUFFET, SELECT_GYM,
  SET_DESC_PRODUCT,
  SET_ID_BASKET,
  SET_ORDER_ID_BUFFET,
  SET_ORDER_ID_MATERIAL,
  SET_PHONE,
  SET_PRODUCT_IDACCESS,
  SET_PRODUCT_PRICEALL,
  SET_ROAD,
  SET_TOKEN_API,
  SET_TOKEN_MEMBER,
  SET_USER,
  TOKEN_BLOG,
  TOKEN_BUFFET,
  TOKEN_GYM,
  TOKEN_STORE
} from './type';

// USER
export const setUser = user => ({
  type: SET_USER,
  user,
});
export const setPhone = user => ({
  type: SET_PHONE,
  user,
});
export const setTokenapi = user => ({
  type: SET_TOKEN_API,
  user,
});
export const setTokenmember = user => ({
  type: SET_TOKEN_MEMBER,
  user,
});
export const locateUser = (latval, longval) => ({
  type: LOCATE_USER,
  payload: {
    latval,
    longval
  }
});
// MIN
export const incrementMin = () => ({
  type: INCREMENT_MIN,
});

export const decrementMin = () => ({
  type: DECREMENT_MIN,
});
// GYM
export const receiveGym = (gym, min) => ({
  type: RECEIVE_GYM,
  payload: {
    gym,
    min
  }
});
export const refreshGym = () => ({
  type: REFRESH_GYM,
});
export const tokenGym = tokenapi => ({
  type: TOKEN_GYM,
  tokenapi
});
// BUFFET
export const receiveBuffet = (buffet, min) => ({
  type: RECEIVE_BUFFET,
  payload: {
    buffet,
    min
  }
});
export const refreshBuffet = () => ({
  type: REFRESH_BUFFET,
});
export const tokenBuffet = tokenapi => ({
  type: TOKEN_BUFFET,
  tokenapi
});
// MenuFood
export const selectBuffet = (buffetid, namebuffet) => ({
  type: SELECT_BUFFET,
  buffetid,
  namebuffet,
});
export const selectGym = gymid => ({
  type: SELECT_GYM,
  gymid
});
export const receiveMenuFood = MenuFood => ({
  type: RECIEVE_MENUFOOD,
  MenuFood
});
export const receiveMaterial = Material => ({
  type: RECIEVE_MATERIAL,
  Material
});
// Store
export const receiveProduct = (product, min) => ({
  type: RECEIVE_PRODUCT,
  payload: {
    product,
    min
  }
});
export const refreshProduct = () => ({
  type: REFRESH_PRODUCT
});
export const tokenStore = tokenapi => ({
  type: TOKEN_STORE,
  tokenapi,
});
// Blog
export const receiveBlog = (blog, min) => ({
  type: RECEIVE_BLOG,
  payload: {
    blog,
    min
  }

});
export const refreshBlog = () => ({
  type: REFRESH_BLOG,
});
export const tokenBlog = tokenapi => ({
  type: TOKEN_BLOG,
  tokenapi,
});

export const reBasketBuffet = (buffetBasket, buffetBasketCount, PriceAll) => ({
  type: GET_BUFFET_BASKET,
  buffetBasket,
  buffetBasketCount,
  PriceAll,
});
export const reBasketMaterial = (materialBasket, materialBasketCount, PriceAll) => ({
  type: GET_MATERIAL_BASKET,
  materialBasket,
  materialBasketCount,
  PriceAll,
});
export const setIDBasket = idbasket => ({
  type: SET_ID_BASKET,
  idbasket,
});
export const reBasketProduct = (productBasket, productBasketCount) => ({
  type: GET_PRODUCT_BASKET,
  productBasket,
  productBasketCount,
});
export const setRoad = roadTo => ({
  type: SET_ROAD,
  roadTo,
});
export const setOrderIDBuffet = orderid => ({
  type: SET_ORDER_ID_BUFFET,
  orderid,
});
export const setOrderIDMaterial = orderid => ({
  type: SET_ORDER_ID_MATERIAL,
  orderid,
});
export const getOrderBuffet = orderBuffet => ({
  type: GET_ORDER_BUFFET,
  orderBuffet,
});
export const getOrderMaterial = OrderMaterial => ({
  type: GET_ORDER_MATERIAL,
  OrderMaterial,
});
export const setDescProduct = descProduct => ({
  type: SET_DESC_PRODUCT,
  descProduct,
});
export const setProductPriceAll = PriceAllProduct => ({
  type: SET_PRODUCT_PRICEALL,
  PriceAllProduct,
});
export const setProductIDAccess = idtimefactor => ({
  type: SET_PRODUCT_IDACCESS,
  idtimefactor,
});
export const musicOn = () => ({
  type: 'MUSIC_ON'
});
