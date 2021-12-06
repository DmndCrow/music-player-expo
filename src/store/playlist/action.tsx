import { Asset } from 'expo-media-library';
import { Dispatch } from 'redux';

import {
  SET_PLAYLIST,
} from './types';

const setPlaylist = (playlist: Asset[] | null) => (dispatch: Dispatch) => dispatch({
  payload: playlist,
  type: SET_PLAYLIST,
});

export {
  setPlaylist,
};
