import { AnyAction } from 'redux'

import {
  SET_CURRENT_PLAYING_AUDIO
} from './types';
import {audioState} from '../../models/reduxState';

const initialState: audioState = {
  audio: null,
  index: -1
}

const audioReducer = (state: audioState = initialState, action: AnyAction) => {
  switch(action.type) {
    case SET_CURRENT_PLAYING_AUDIO: {
      return {
        ...state,
        audio: action.payload.audio,
        index: action.payload.index
      }
    }

    default: {
      return state
    }
  }
}

export default audioReducer;
