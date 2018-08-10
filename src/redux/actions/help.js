import {
  HELP_DONE_BUFFET,
  HELP_DONE_BUFFET_INDEX,
  HELP_DONE_BUFFET_LIST, HELP_DONE_BUFFET_MENU, HELP_DONE_COACH_LIST, HELP_DONE_EDIT_GYM,
  HELP_DONE_GYM, HELP_DONE_GYM_DETAIL,
  HELP_DONE_GYM_LIST,
  HELP_DONE_GYM_MAP,
  HELP_DONE_MEMBER, HELP_DONE_MY_GYM, HELP_DONE_STORE, HELP_DONE_STORE_TIME,
  HELP_OFF,
  HELP_RESET
} from './type';

export const helpOff = () => ({
  type: HELP_OFF
});
export const helpReset = () => ({
  type: HELP_RESET
});
export const helpDoneMember = () => ({
  type: HELP_DONE_MEMBER,
});
export const helpDoneBuffet = () => ({
  type: HELP_DONE_BUFFET,
});
export const helpDoneGym = () => ({
  type: HELP_DONE_GYM,
});
export const helpDoneBuffetIndex = () => ({
  type: HELP_DONE_BUFFET_INDEX,
});
export const helpDoneBuffetList = () => ({
  type: HELP_DONE_BUFFET_LIST
});
export const helpDoneGymList = () => ({
  type: HELP_DONE_GYM_LIST
});
export const helpDoneGymMap = () => ({
  type: HELP_DONE_GYM_MAP
});
export const helpDoneStore = () => ({
  type: HELP_DONE_STORE
});
export const helpDoneStoreTime = () => ({
  type: HELP_DONE_STORE_TIME
});
export const helpDoneMyGym = () => ({
  type: HELP_DONE_MY_GYM
});
export const helpDoneEditGym = () => ({
  type: HELP_DONE_EDIT_GYM
});
export const helpDoneCoachList = () => ({
  type: HELP_DONE_COACH_LIST
});
export const helpDoneBuffetMenu = () => ({
  type: HELP_DONE_BUFFET_MENU
});
export const helpDoneGymDetail = () => ({
  type: HELP_DONE_GYM_DETAIL,
});
