import {Asset} from 'expo-media-library';
import {Dispatch} from 'redux';

import {
  SET_CURRENT_PLAYING_AUDIO
} from './types';


export const set_current_playing_audio = (audio: Asset | null, index: number) => (dispatch: Dispatch) => dispatch({
  payload: {audio, index},
  type: SET_CURRENT_PLAYING_AUDIO
});
