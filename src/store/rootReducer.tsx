import { combineReducers } from 'redux';
import { audioReducer } from './audio';
import { historyReducer } from './history';
import { playlistReducer } from './playlist';

const rootReducer = combineReducers({
  audioReducer,
  historyReducer,
  playlistReducer,
});

export default rootReducer;
