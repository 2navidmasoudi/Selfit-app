import { DECREMENT_MIN, INCREMENT_MIN, RECEIVE_PRODUCT, REFRESH_PRODUCT, TOKEN_STORE } from '../actions/type';

const initialState = {
  ProductList: [],
  min: 0,
  tokenapi: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVE_PRODUCT:
      return {
        ...state,
        ProductList: action.payload.min === 0
          ? action.payload.product : [...state.ProductList, ...action.payload.product],
        min: action.payload.min
      };
    case INCREMENT_MIN:
      return {
        ...state,
        min: state.min + 10
      };
    case DECREMENT_MIN:
      return {
        ...state,
        min: state.min - 10
      };
    case REFRESH_PRODUCT:
      return {
        ...state,
        min: 0,
      };
    case TOKEN_STORE:
      return {
        ...state,
        tokenapi: action.tokenapi,
      };
    default:
      return state;
  }
};
