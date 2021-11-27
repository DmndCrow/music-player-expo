import {
  GET_CURRENT_PLAYING_AUDIO,
  SET_CURRENT_PLAYING_AUDIO
} from './types';

import {Asset} from 'expo-media-library';


export const get_current_playing_audio = () => (dispatch: any) => dispatch({
  type: GET_CURRENT_PLAYING_AUDIO
});

export const set_current_playing_audio = (audio: Asset | null) => (dispatch: any) => dispatch({
  payload: audio,
  type: SET_CURRENT_PLAYING_AUDIO
});
