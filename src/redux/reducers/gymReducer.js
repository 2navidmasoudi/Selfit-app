import {
  DECREMENT_MIN,
  INCREMENT_MIN,
  RECEIVE_GYM,
  REFRESH_GYM,
  SELECT_GYM,
  TOKEN_GYM
} from '../actions/type';

const initialState = {
  GymList: [],
  min: 0,
  tokenapi: null,
  gymid: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVE_GYM:
      const { gym, min } = action.payload;
      return {
        ...state,
        GymList: min === 0 ? gym : [...state.GymList, ...gym],
        min
      };
      break;
    case INCREMENT_MIN:
      return {
        ...state,
        min: state.min + 10
      };
      break;
    case DECREMENT_MIN:
      return {
        ...state,
        min: state.min - 10
      };
      break;
    case REFRESH_GYM:
      return {
        ...state,
        min: 0,
      };
      break;
    case TOKEN_GYM:
      return {
        ...state,
        tokenapi: action.tokenapi,
      };
      break;
    case SELECT_GYM:
      return {
        ...state,
        gymid: action.gymid,
      };
      break;
    default:
      return state;
  }
};
