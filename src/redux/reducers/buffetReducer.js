import {
  DECREMENT_MIN,
  INCREMENT_MIN,
  RECEIVE_BUFFET,
  RECIEVE_MATERIAL,
  RECIEVE_MENUFOOD,
  REFRESH_BUFFET, RESET_FOOD,
  SELECT_BUFFET,
  TOKEN_BUFFET
} from '../actions/type';

const initialState = {
  BuffetList: [],
  min: 0,
  tokenapi: null,
  buffetid: null,
  namebuffet: null,
  MenuFood: [],
  Material: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVE_BUFFET:
      const { buffet, min } = action.payload;
      return {
        ...state,
        BuffetList: min === 0 ? buffet : [...state.BuffetList, ...buffet],
        min
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
    case REFRESH_BUFFET:
      return {
        ...state,
        min: 0,
      };
    case TOKEN_BUFFET:
      return {
        ...state,
        tokenapi: action.tokenapi,
      };
    case SELECT_BUFFET:
      return {
        ...state,
        buffetid: action.buffetid,
        namebuffet: action.namebuffet
      };
    case RECIEVE_MENUFOOD:
      return {
        ...state,
        MenuFood: action.MenuFood,
      };
    case RECIEVE_MATERIAL:
      return {
        ...state,
        Material: action.Material,
      };
    case RESET_FOOD:
      return {
        ...state,
        Material: [],
        MenuFood: [],
      };
    default:
      return state;
  }
};
