import { AnyAction } from 'redux';

import {
  GET_CURRENT_PLAYING_AUDIO,
  SET_CURRENT_PLAYING_AUDIO,
} from './types';
import { audioState } from '../../models/reduxState';

const initialState: audioState = {
  audio: null,
};

const audioReducer = (state: audioState = initialState, action: AnyAction) => {
  switch (action.type) {
  case GET_CURRENT_PLAYING_AUDIO: {
    return state.audio;
  }

  case SET_CURRENT_PLAYING_AUDIO: {
    return {
      ...state,
      audio: action.payload,
    };
  }

  default: {
    return state;
  }
  }
};

export default audioReducer;
