import {
  HELP_RESET,
  HELP_OFF,
  HELP_DONE_MEMBER,
  HELP_DONE_BUFFET, HELP_DONE_GYM, HELP_DONE_BUFFET_INDEX
} from '../actions/type';

const initialState = {
  mainMember: false,
  mainBuffet: false,
  mainGym: false,
  BuffetIndex: false,
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case HELP_RESET:
      return {
        mainMember: false,
        mainBuffet: false,
        mainGym: false,
      };
    case HELP_OFF:
      return {
        mainMember: true,
        mainBuffet: true,
        mainGym: true,
      };
    case HELP_DONE_MEMBER:
      return {
        ...state,
        mainMember: true,
      };
    case HELP_DONE_BUFFET:
      return {
        ...state,
        mainBuffet: true,
      };
    case HELP_DONE_GYM:
      return {
        ...state,
        mainGym: true,
      };
    case HELP_DONE_BUFFET_INDEX:
      return {
        ...state,
        BuffetIndex: true,
      };
    default:
      return state;
  }
};
