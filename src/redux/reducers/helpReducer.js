import {
  HELP_RESET,
  HELP_OFF,
  HELP_DONE_MEMBER,
  HELP_DONE_BUFFET,
  HELP_DONE_GYM,
  HELP_DONE_BUFFET_INDEX,
  HELP_DONE_BUFFET_LIST,
  HELP_DONE_GYM_LIST,
  HELP_DONE_GYM_MAP
} from '../actions/type';

const HelpReset = {
  mainMember: false,
  mainBuffet: false,
  mainGym: false,
  BuffetIndex: false,
  BuffetList: false,
  GymList: false,
  GymMap: false,
};
const HelpOff = {
  mainMember: true,
  mainBuffet: true,
  mainGym: true,
  BuffetIndex: true,
  BuffetList: true,
  GymList: true,
  GymMap: true,
};
export default (state = HelpReset, action = {}) => {
  switch (action.type) {
    case HELP_RESET:
      return HelpReset;
    case HELP_OFF:
      return HelpOff;
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
    case HELP_DONE_BUFFET_LIST:
      return {
        ...state,
        BuffetList: true,
      };
    case HELP_DONE_GYM_LIST:
      return {
        ...state,
        GymList: true,
      };
    case HELP_DONE_GYM_MAP:
      return {
        ...state,
        GymMap: true,
      };
    default:
      return state;
  }
};
