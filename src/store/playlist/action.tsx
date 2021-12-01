import {Asset} from 'expo-media-library';
import {Dispatch} from 'redux';

import {
  GET_PLAYLIST,
  SET_PLAYLIST
} from './types';


export const get_playlist = () => (dispatch: Dispatch) => dispatch({
  type: GET_PLAYLIST
});

export const set_playlist = (playlist: Asset[] | null) => (dispatch: Dispatch) => dispatch({
  payload: playlist,
  type: SET_PLAYLIST
});
