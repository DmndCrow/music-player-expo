import { Asset } from 'expo-media-library';
import { Dispatch } from 'redux';

import {
  GET_CURRENT_PLAYING_AUDIO, SET_CURRENT_PLAYING_AUDIO
} from './types';

const getCurrentPlayingAudio = () => (dispatch: Dispatch) => dispatch({
  type: GET_CURRENT_PLAYING_AUDIO
});

const setCurrentPlayingAudio = (audio: Asset | null) => (dispatch: Dispatch) => dispatch({
  payload: audio,
  type: SET_CURRENT_PLAYING_AUDIO
});

export {
  getCurrentPlayingAudio,
  setCurrentPlayingAudio
};
