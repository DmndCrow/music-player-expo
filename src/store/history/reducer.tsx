import { AnyAction } from 'redux';
import { Asset } from 'expo-media-library';
import { audioState, historyState } from '../../models/reduxState';

import {
  INIT_HISTORY_PLAYLIST,
  RESET_STACK,
  SHUFFLE_PLAYLIST,
  SORT_PLAYLIST
} from './types';
import { shuffleArray } from '../../utils/functions';

const initialState: historyState = {
  orderedPlaylist: [],
  playlist: [],
  index: -1
};

const historyReducer = (state: historyState = initialState, action: AnyAction) => {
  switch (action.type) {

    case INIT_HISTORY_PLAYLIST: {
      const newPlaylist: audioState[] = action.payload.map((audio: Asset, index: number) => {
        return {audio, index};
      });

      return {
        ...state,
        playlist: [...newPlaylist],
        orderedPlaylist: [...newPlaylist],
        index: 0
      }
    }

    case RESET_STACK: {
      return {
        ...initialState
      }
    }

    case SHUFFLE_PLAYLIST: {
      const currentAudioId = state.playlist[state.index].audio?.id ?? 0;
      const shuffled = shuffleArray(state.playlist);
      const newIndex = shuffled.findIndex(x => x.audio?.id === currentAudioId);

      return {
        ...state,
        playlist: [...shuffled],
        index: newIndex
      }
    }

    case SORT_PLAYLIST: {
      const currentAudioId = state.playlist[state.index].audio?.id ?? 0;
      const newIndex = state.orderedPlaylist.findIndex(x => x.audio?.id === currentAudioId);

      return {
        ...state,
        playlist: [...state.orderedPlaylist],
        index: newIndex
      }
    }

    default: {
      return state;
    }
  }
};

export default historyReducer;
