import {
  HELP_RESET,
  HELP_OFF,
  HELP_DONE_MEMBER,
  HELP_DONE_BUFFET,
  HELP_DONE_GYM,
  HELP_DONE_BUFFET_INDEX,
  HELP_DONE_BUFFET_LIST,
  HELP_DONE_GYM_LIST,
  HELP_DONE_GYM_MAP,
  HELP_DONE_STORE,
  HELP_DONE_STORE_TIME,
  HELP_DONE_MY_GYM,
  HELP_DONE_EDIT_GYM,
  HELP_DONE_COACH_LIST,
  HELP_DONE_BUFFET_MENU, HELP_DONE_GYM_DETAIL
} from '../actions/type';

const HelpReset = {
  mainMember: false,
  mainBuffet: false,
  mainGym: false,
  BuffetIndex: false,
  BuffetList: false,
  GymList: false,
  gymMap: false,
  Store: false,
  StoreTime: false,
  myGym: false,
  editGym: false,
  CoachList: false,
  BuffetMenuList: false,
  gymDetail: false,
};
const HelpOff = {
  mainMember: true,
  mainBuffet: true,
  mainGym: true,
  BuffetIndex: true,
  BuffetList: true,
  GymList: true,
  gymMap: true,
  Store: true,
  StoreTime: true,
  myGym: true,
  editGym: true,
  CoachList: true,
  BuffetMenuList: true,
  gymDetail: true,
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
        gymMap: true,
      };
    case HELP_DONE_STORE:
      return {
        ...state,
        Store: true,
      };
    case HELP_DONE_STORE_TIME:
      return {
        ...state,
        StoreTime: true,
      };
    case HELP_DONE_MY_GYM:
      return {
        ...state,
        myGym: true,
      };
    case HELP_DONE_EDIT_GYM:
      return {
        ...state,
        editGym: true,
      };
    case HELP_DONE_COACH_LIST:
      return {
        ...state,
        CoachList: true,
      };
    case HELP_DONE_BUFFET_MENU:
      return {
        ...state,
        BuffetMenuList: true,
      };
    case HELP_DONE_GYM_DETAIL:
      return {
        ...state,
        gymDetail: true,
      };
    default:
      return state;
  }
};
