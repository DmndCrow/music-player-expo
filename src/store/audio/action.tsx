import {Asset} from 'expo-media-library';
import {Dispatch} from 'redux';

import {
  GET_CURRENT_PLAYING_AUDIO,
  SET_CURRENT_PLAYING_AUDIO
} from './types';


export const get_current_playing_audio = () => (dispatch: Dispatch) => dispatch({
  type: GET_CURRENT_PLAYING_AUDIO
});

export const set_current_playing_audio = (audio: Asset | null) => (dispatch: Dispatch) => dispatch({
  payload: audio,
  type: SET_CURRENT_PLAYING_AUDIO
});
