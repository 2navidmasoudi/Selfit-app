import {
    GET_BUFFET_BASKET,
    GET_MATERIAL_BASKET,
    GET_ORDER_BUFFET,
    GET_ORDER_MATERIAL,
    GET_PRODUCT_BASKET,
    SET_DESC_PRODUCT,
    SET_ID_BASKET,
    SET_ORDER_ID_BUFFET,
    SET_PRODUCT_IDACCESS,
    SET_PRODUCT_PRICEALL,
    SET_ROAD
} from "../actions/type";

const initialState = {
    buffetBasket: [],
    materialBasket: [],
    productBasket: [],
    buffetBasketCount: 0,
    materialBasketCount: 0,
    productBasketCount: 0,
    idbasket: null,
    roadTo:'buffet',
    PriceAllBuffet:0,
    PriceAllMaterial:0,
    PriceAllProduct:0,
    idOrderBuffet:null,
    idOrderMaterial:null,
    orderMaterial:[],
    orderBuffet:[],
    descProduct:null,
    idtimefactor:null,
};

export default basket = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_BUFFET_BASKET:
            return {
                ...state,
                buffetBasket: action.buffetBasket,
                buffetBasketCount: action.buffetBasketCount,
                PriceAllBuffet: action.PriceAll,
            };
            break;
        case GET_MATERIAL_BASKET:
            return {
                ...state,
                materialBasket: action.materialBasket,
                materialBasketCount: action.materialBasketCount,
                PriceAllMaterial: action.PriceAll,
            };
            break;
        case SET_ID_BASKET:
            return {
                ...state,
                idbasket: action.idbasket,
            };
            break;
        case GET_PRODUCT_BASKET:
            return {
                ...state,
                productBasket: action.productBasket,
                productBasketCount: action.productBasketCount,
            };
            break;
        case SET_ROAD:
            return {
                ...state,
                roadTo: action.roadTo,
            };
        case SET_ORDER_ID_BUFFET:
            return {
                ...state,
                idOrderBuffet: action.orderid,
            };

        case SET_ORDER_ID_BUFFET:
            return {
                ...state,
                idOrderMaterial: action.orderid,
            };
        case GET_ORDER_BUFFET:
            return {
                ...state,
                orderBuffet: action.orderBuffet,
            };
        case GET_ORDER_MATERIAL:
            return {
                ...state,
                orderMaterial: action.orderMaterial,
            };
        case SET_DESC_PRODUCT:
            return {
                ...state,
                descProduct: action.descProduct,
            };
        case SET_PRODUCT_PRICEALL:
            return {
                ...state,
                PriceAllProduct: action.PriceAllProduct,
            };
            break;
        case SET_PRODUCT_IDACCESS:
            return {
                ...state,
                idtimefactor: action.idtimefactor,
            };
        default:
            return state;
    }
}