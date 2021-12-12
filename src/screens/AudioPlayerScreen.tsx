import React, {
  useEffect, useState, useRef,
} from 'react';
import {
  SafeAreaView, StyleSheet, View,
} from 'react-native';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio/Sound';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Asset } from 'expo-media-library';

import ControlComponent from '../components/Control';
import SeekbarComponent from '../components/Seekbar';
import TrackDetailsComponent from '../components/TrackDetails';
import AudioArtComponent from '../components/AudioArt';

import { setCurrentPlayingAudio } from '../store/audio/action';
import { rootState } from '../models/reduxState';
import { AVPlaybackStatus } from '../models/audioStatus';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },

  seekbar: { margin: 32 },
});

function AudioPlayerScreen(props: any) {
  const soundInstance = useRef<Sound>(new Audio.Sound());

  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume] = useState<number>(1.0);
  const [audioInit, setAudioInit] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isRepeating, setIsRepeating] = useState<boolean>(false);

  const getStatus = async () => {
    const status = await soundInstance?.current?.getStatusAsync();
    return status;
  };

  const playNewAudio = async (newIndex: number) => {
    await props.changeSong(props.playlist[newIndex], newIndex);
  };

  const handlePreviousTrack = async () => {
    let newIndex = props.index;
    if (isShuffling) {

    } else {
      if (props.index === 0) {
        newIndex = props.playlist.length - 1;
      } else if (props.index > 0) {
        newIndex -= 1;
      }
    }
    await playNewAudio(newIndex);
  };

  const handleNextTrack = async () => {
    let newIndex = props.index;
    if (isShuffling) {

    } else {
      if (props.index === props.playlist.length - 1) {
        newIndex = 0;
      } else if (props.index >= 0) {
        newIndex += 1;
      }
    }
    await playNewAudio(newIndex);
  };

  const repeatTrack = async () => {

  }

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
      }
    } else {
      if (playbackStatus.isPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
      setTimeElapsed(playbackStatus.positionMillis ?? timeElapsed);

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        handleNextTrack();
      } else if (playbackStatus.didJustFinish && playbackStatus.isLooping) {
        handleRepeatTrack();
      }
    }
  };

  const loadAudio = async () => {
    try {
      await soundInstance?.current?.unloadAsync();

      // TODO: fix error for '85%' audio file not playing
      const source = {
        uri: props.audio.uri,
      };

      const status: AVPlaybackStatus = {
        shouldPlay: true,
        volume,
      };

      soundInstance?.current?.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await soundInstance?.current?.loadAsync(source, status, false);
    } catch (e) {
      console.log(e);
    }
  };

  const initAudio = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true,
    });
    await loadAudio();
  };

  useEffect(() => {
    if (props.index > -1) {
      setDuration(props.audio.duration * 1000);
      if (!audioInit) {
        initAudio();
        setAudioInit(true);
      } else {
        loadAudio();
      }
    }
  }, [props.index]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await soundInstance?.current?.pauseAsync();
    } else {
      await soundInstance?.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRepeatTrackUpdate = async () => {
    await soundInstance?.current?.setIsLoopingAsync(!isRepeating);
    setIsRepeating(!isRepeating);
  }

  const handleRepeatTrack = async () => {
    setTimeElapsed(0);
    await soundInstance?.current?.setPositionAsync(0);
  }

  const updateTimeElapsed = async (newPercentage: number) => {
    const audioDuration = props.audio.duration * 1000;
    const newTimeElapsed = newPercentage * audioDuration;

    const status: AVPlaybackStatus = await getStatus();
    if (status.isLoaded && status.durationMillis) {
      await soundInstance?.current?.setPositionAsync(newTimeElapsed);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AudioArtComponent url="http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg" />

      <TrackDetailsComponent audio={props.audio} />

      <View style={styles.seekbar}>
        <SeekbarComponent
          onValueChange={updateTimeElapsed}
          value={timeElapsed}
          duration={duration}
        />
      </View>

      <View style={styles.control}>
        <ControlComponent
          handlePreviousTrack={handlePreviousTrack}
          handleNextTrack={handleNextTrack}
          handlePlayPause={handlePlayPause}
          setIsShuffling={setIsShuffling}
          handleRepeatTrack={handleRepeatTrackUpdate}
          isPlaying={isPlaying}
          isShuffling={isShuffling}
          isRepeating={isRepeating}
        />
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state: rootState, ownProps: any) => ({
  ...ownProps,
  playlist: state.playlistReducer.playlist,
  audio: state.audioReducer.audio,
  index: state.audioReducer.index,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => ({
  changeSong: (audio: Asset | null, index: number) => dispatch(setCurrentPlayingAudio(audio, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayerScreen);
