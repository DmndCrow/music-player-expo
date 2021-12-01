import { AnyAction } from 'redux'

import {
  GET_PLAYLIST,
  SET_PLAYLIST
} from './types';
import {playlistState} from '../../models/reduxState';

const initialState: playlistState = {
  playlist: null
}

const playlistReducer = (state: playlistState = initialState, action: AnyAction) => {
  switch(action.type) {
    case GET_PLAYLIST: {
      return state.playlist;
    }

    case SET_PLAYLIST: {
      return {
        ...state,
        playlist: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export default playlistReducer;
