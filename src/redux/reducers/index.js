import { combineReducers } from 'redux';
import user from './userReducer';
import gym from './gymReducer';
import buffet from './buffetReducer';
import store from './storeReducer';
import blog from './blogReducer';
import basket from './basketReducer';
// import * as api from '../../components/root/music/reducers/api.reducer';
// import * as player from '../../components/root/music/reducers/player.reducer';
// import * as routes from '../../components/root/music/reducers/routes';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
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
  basket,
  // ...api,
  // ...player,
  // ...routes,
});

