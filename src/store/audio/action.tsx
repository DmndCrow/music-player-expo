import { Asset } from 'expo-media-library';
import { Dispatch } from 'redux';

import {
  SET_CURRENT_PLAYING_AUDIO,
} from './types';

const setCurrentPlayingAudio = (audio: Asset | null, index: number) => (dispatch: Dispatch) => dispatch({
  payload: {
    audio, index,
  },
  type: SET_CURRENT_PLAYING_AUDIO,
});

export {
  setCurrentPlayingAudio,
};
