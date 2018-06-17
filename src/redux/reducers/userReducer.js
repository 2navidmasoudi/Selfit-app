import { LOCATE_USER, SET_PHONE, SET_TOKEN_API, SET_TOKEN_MEMBER, SET_USER } from '../actions/type';

const initialState = {
  namefamilymember: null,
  mailmember: null,
  sexmember: null,
  birthdaymember: null,
  typememberid: null,
  phone: null,
  tokenmember: null,
  latval: null,
  longval: null,
  datesave: null,
  httpserver: null,
  pathserver: null,
  picmember: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        namefamilymember: action.user.namefamilymember,
        mailmember: action.user.mailmember,
        sexmember: action.user.sexmember,
        birthdaymember: action.user.birthdaymember,
        typememberid: action.user.typememberid,
        phone: action.user.phone,
        datesave: action.user.datesave,
        httpserver: action.user.httpserver,
        pathserver: action.user.pathserver,
        picmember: action.user.picmember,
      };
    case SET_PHONE:
      return {
        ...state,
        phone: action.user.phone,
      };
    case SET_TOKEN_API:
      return {
        ...state,
        tokenapi: action.user.tokenapi
      };
    case SET_TOKEN_MEMBER:
      return {
        ...state,
        tokenmember: action.user.tokenmember
      };
    case LOCATE_USER:
      return {
        ...state,
        latval: action.payload.latval,
        longval: action.payload.longval,
      };
    default:
      return state;
  }
};
