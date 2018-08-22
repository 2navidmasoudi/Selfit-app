import { DECREMENT_MIN, INCREMENT_MIN, RECEIVE_BLOG, REFRESH_BLOG, TOKEN_BLOG, } from '../actions/type';

const initialState = {
  BlogList: [],
  min: 0,
  tokenapi: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVE_BLOG:
      const { blog, min } = action.payload;
      return {
        ...state,
        BlogList: min === 0 ? blog : [...state.BlogList, ...blog],
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
    case REFRESH_BLOG:
      return {
        ...state,
        BlogList: [],
        min: 0,
      };
    case TOKEN_BLOG:
      return {
        ...state,
        tokenapi: action.tokenapi,
      };
    default:
      return state;
  }
};
