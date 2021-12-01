import { combineReducers } from 'redux';
import { audioReducer } from './audio';
import { playlistReducer } from './playlist';

const rootReducer = combineReducers({
  audioReducer,
  playlistReducer,
});

export default rootReducer;
