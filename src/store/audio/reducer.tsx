import { AnyAction } from 'redux'

import {
  GET_CURRENT_PLAYING_AUDIO,
  SET_CURRENT_PLAYING_AUDIO
} from './types';

const initialState = {
  audio: null
}

const audioReducer = (state = initialState, action: AnyAction) => {
  switch(action.type) {
    case GET_CURRENT_PLAYING_AUDIO: {
      return state.audio;
    }

    case SET_CURRENT_PLAYING_AUDIO: {
      return {
        ...state,
        audio: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export default audioReducer;
