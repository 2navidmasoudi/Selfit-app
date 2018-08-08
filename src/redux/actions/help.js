import {
  HELP_DONE_BUFFET,
  HELP_DONE_BUFFET_INDEX,
  HELP_DONE_BUFFET_LIST,
  HELP_DONE_GYM,
  HELP_DONE_GYM_LIST,
  HELP_DONE_GYM_MAP,
  HELP_DONE_MEMBER,
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
export const helpDpneGymMap = () => ({
  type: HELP_DONE_GYM_MAP
});
