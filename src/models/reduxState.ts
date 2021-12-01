import {Asset} from 'expo-media-library';

interface audioState {
  audio: Asset | null;
  index: number;
}

interface playlistState {
  playlist: Asset[] | null;
}

interface rootState {
  audioReducer: audioState;
  playlistReducer: playlistState;
}

export {
  audioState,
  playlistState,
  rootState
}
