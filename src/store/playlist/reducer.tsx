import { AnyAction } from 'redux';

import {
  SET_PLAYLIST,
} from './types';
import { playlistState } from '../../models/reduxState';

const initialState: playlistState = {
  playlist: null,
};

const playlistReducer = (state: playlistState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_PLAYLIST: {
      return {
        ...state,
        playlist: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default playlistReducer;
