import React, {
  useState, useEffect,
} from 'react';
import {
  Image, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio/Sound';
import { FontAwesome } from '@expo/vector-icons';
import { Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { Asset } from 'expo-media-library';
import {
  setCurrentPlayingAudio,
} from '../store/audio/action';
import {
  Text, View,
} from '../components/Themed';
import PlayButtonComponent from '../components/playButton';
import { rootState } from '../models/reduxState';
import {
  getAssetTitle, getDurationAsString,
} from '../utils/functions';
import { AVPlaybackStatus } from '../models/audioStatus';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEC',
  },
  textLight: {
    color: '#B6B7BF',
  },
  text: {
    color: '#8E97A6',
  },
  titleContainer: {
    alignItems: 'center', marginTop: 24,
  },
  textDark: {
    color: '#3D425C',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  coverContainer: {
    marginTop: 32,
    width: 250,
    height: 250,
    shadowColor: '#5D3F6A',
    // shadowOffset: { height: 15 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  cover: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFF',
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: '#3D425C',
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: '500',
  },
  seekbar: { margin: 32 },
  inProgress: {
    marginTop: -12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackName: {
    alignItems: 'center', marginTop: 32,
  },
});

function PlayerScreen(props: any) {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackInstance, setPlaybackInstance] = useState<Sound | null>(null);
  const [volume] = useState<number>(1.0);
  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      if (playbackStatus.isPlaying) {
        const position = playbackStatus.positionMillis ?? 0;
        const duration = playbackStatus.durationMillis ?? 0.1;
        setTimeElapsed(position);
        setPercentage(Math.floor(position / duration * 100));
      } else {
        setIsPlaying(false);
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        handleNextTrack();
      }

    }
  };

  const loadAudio = async () => {
    try {
      const newPlaybackInstance = new Audio.Sound();

      const source = {
        uri: props.audio.uri
      };

      const status: AVPlaybackStatus = {
        shouldPlay: true,
        volume,
      };

      newPlaybackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await newPlaybackInstance.loadAsync(source, status, false);
      setPlaybackInstance(newPlaybackInstance);
      setIsPlaying(true);
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
    setAudioLoaded(true);
    await loadAudio();
  };

  useEffect(() => {
    if (props.index > -1) {
      console.log('efffect new index', props.index);
      setDuration(props.audio.duration * 1000);
      setTimeElapsed(0);
      setPercentage(0);
      if (!audioLoaded){
        initAudio();
      } else {
        loadAudio();
      }
    }
  }, [props.index]);

  const handlePlayPause = async () => {
    isPlaying ? await playbackInstance?.pauseAsync() : await playbackInstance?.playAsync();
    setIsPlaying(!isPlaying);
  };

  const playNewAudio = async (newIndex: number) => {
    await props.changeSong(props.playlist[newIndex], newIndex);
  }

  const handlePreviousTrack = async () => {
    let newIndex = props.index;
    await playbackInstance?.unloadAsync();
    if (props.index === 0) {
      newIndex = props.playlist.length - 1;
    } else if (props.index > 0) {
      newIndex -= 1;
    }
    await playNewAudio(newIndex);
  };

  const handleNextTrack = async () => {
    let newIndex = props.index;
    await playbackInstance?.unloadAsync();

    if (props.index === props.playlist.length - 1) {
      newIndex = 0;
    } else if (props.index >= 0) {
      newIndex += 1;
    }
    await playNewAudio(newIndex);
  };

  // TODO: fix slider move
  // TODO: stop current audio, when new one is played
  const updateTimeElapsed = (newPercentage: number) => {
    const newTimeElapsed = newPercentage * props.audio.duration * 10;
    playbackInstance?.setPositionAsync(newTimeElapsed);
    setPlaybackInstance(playbackInstance);
    console.log(duration, newPercentage, newTimeElapsed);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.titleContainer}>
          <Text style={[styles.textLight, { fontSize: 12 }]}>PLAYLIST</Text>
          <Text style={styles.text}>Instaplayer</Text>
        </View>
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
            style={styles.cover}
          />
        </View>
        <View style={styles.trackName}>
          <Text style={[styles.textDark, {
            fontSize: 20, fontWeight: '500',
          }]}
          >
            {getAssetTitle(props.audio)}
          </Text>
        </View>
      </View>
      <View style={styles.seekbar}>
        <Slider
          minimumValue={0}
          maximumValue={100}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          value={percentage}
          minimumTrackTintColor="#93A8B3"
          onValueChange={(newPercentage) => updateTimeElapsed(newPercentage)}
          onSlidingComplete={handleNextTrack}
        />
        <View style={styles.inProgress}>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {getDurationAsString(timeElapsed)}
          </Text>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {getDurationAsString(duration)}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePreviousTrack}>
          <FontAwesome name="backward" size={32} color="#93A8B3" />
        </TouchableOpacity>
        <PlayButtonComponent onPress={() => handlePlayPause()} state={isPlaying ? 'pause' : 'play'} />
        <TouchableOpacity onPress={handleNextTrack}>
          <FontAwesome name="forward" size={32} color="#93A8B3" />
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
