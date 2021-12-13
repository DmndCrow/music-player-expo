import { Asset } from 'expo-media-library';

interface audioState {
  audio: Asset | null;
  index: number;
}

interface historyState {
  playlist: audioState[];
  orderedPlaylist: audioState[];
  index: number;
}

interface playlistState {
  playlist: Asset[] | null;
}

interface rootState {
  audioReducer: audioState;
  playlistReducer: playlistState;
  historyReducer: historyState;
}

export {
  audioState,
  historyState,
  playlistState,
  rootState,
};
