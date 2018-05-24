import { combineReducers } from 'redux';
import user from './userReducer';
import gym from './gymReducer';
import buffet from './buffetReducer';
import store from './storeReducer';
import blog from './blogReducer';
import basket from './basketReducer';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
      break;
    default:
      return state;
  }
};

export default combineReducers({
  rehydrated,
  user,
  gym,
  buffet,
  store,
  blog,
  basket
});

