import {Asset} from 'expo-media-library';

interface audioState {
  audio: Asset | null;
}

interface rootState {
  audioReducer: audioState;
}

export {
  audioState,
  rootState
}
