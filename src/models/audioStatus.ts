interface AVPlaybackStatus {
  progressUpdateIntervalMillis?: number;
  positionMillis?: number;
  shouldPlay?: boolean;
  rate?: number;
  shouldCorrectPitch?: boolean;
  volume?: number;
  isMuted?: boolean;
  isLooping?: boolean;
  androidImplementation?: string;
  didJustFinish?: boolean;
  durationMillis?: number;
  isBuffering?: boolean;
  isLoaded?: boolean;
  isPlaying?: boolean;
  playableDurationMillis?: number;
  uri?: string;
  error?: string;
}

export { AVPlaybackStatus };
