import { Asset } from 'expo-media-library';
import { Dispatch } from 'redux';

import {
  INIT_HISTORY_PLAYLIST,
  RESET_STACK,
  SHUFFLE_PLAYLIST,
  SORT_PLAYLIST
} from './types';

const initHistoryPlaylist = (playlist: Asset[] | null) => (dispatch: Dispatch) => dispatch({
  payload: playlist,
  type: INIT_HISTORY_PLAYLIST,
});

const resetStack = () => (dispatch: Dispatch) => dispatch({
  type: RESET_STACK
});

const shufflePlaylist = () => (dispatch: Dispatch) => dispatch({
  type: SHUFFLE_PLAYLIST
});

const sortPlaylist = () => (dispatch: Dispatch) => dispatch({
  type: SORT_PLAYLIST
});

export {
  initHistoryPlaylist,
  resetStack,
  shufflePlaylist,
  sortPlaylist
};
