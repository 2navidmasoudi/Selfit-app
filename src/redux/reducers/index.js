import user from './userReducer';
import gym from './gymReducer';
import buffet from './buffetReducer';
import store from './storeReducer';
import blog from './blogReducer';
import basket from './basketReducer';
import help from './helpReducer';

const music = (state = { music: false }, action = {}) => {
  switch (action.type) {
    case 'MUSIC_ON':
      return {
        ...state,
        music: true,
      };
    default:
      return state;
  }
};

export default {
  user,
  gym,
  buffet,
  store,
  blog,
  basket,
  help,
  music,
};
