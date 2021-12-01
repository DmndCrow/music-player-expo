import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {Audio} from 'expo-av';
import {Sound} from 'expo-av/build/Audio/Sound';
import {FontAwesome} from '@expo/vector-icons';
import {Slider} from 'react-native-elements';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

import {
  set_current_playing_audio,
} from '../store/audio/action';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../../types';
import PlayButtonComponent from '../components/playButton';
import {rootState} from '../models/reduxState';
import {get_duration_as_string, get_asset_title } from '../utils/functions';
import { Asset } from 'expo-media-library';

function PlayerScreen(props: any) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackInstance, setPlaybackInstance] = useState<Sound | null>(null);
  const [volume, setVolume] = useState<number>(1.0);
  const [isBuffering, setIsBuffering] = useState<boolean>(true);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);


  useEffect(() => {
    if (props.index > -1) {
      console.log(props.index);
      loadAudio();
    }
  }, [props.index]);

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

  const loadAudio = async () => {
    try {
      const newPlaybackInstance = new Audio.Sound();
      const source = {
        uri: props.audio.uri,
      };

      const status = {
        shouldPlay: isPlaying,
        volume: volume,
      };

      newPlaybackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await newPlaybackInstance.loadAsync(source, status, false);
      setPlaybackInstance(newPlaybackInstance);
    } catch (e) {
      console.log(e);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    setIsBuffering(status.isBuffering);
  };

  const handlePlayPause = async () => {
    isPlaying ? await playbackInstance?.pauseAsync() : await playbackInstance?.playAsync();
    setIsPlaying(!isPlaying);
  };

  const handlePreviousTrack = async () => {
    let newIndex = props.index;
    await playbackInstance?.unloadAsync();
    if (props.index == 0) {
      newIndex = props.playlist.length - 1;
    } else if (props.index > 0) {
      newIndex -= 1;
    }
    props.changeSong(props.playlist[newIndex].audio, newIndex);
  };

  const handleNextTrack = async () => {
    let newIndex = props.index;
    await playbackInstance?.unloadAsync();

    if (props.index == props.playlist.length - 1) {
      newIndex = 0;
    } else if (props.index > 0){
      newIndex += 1;
    }
    props.changeSong(props.playlist[newIndex].audio, newIndex);
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.titleContainer}>
          <Text style={[styles.textLight, {fontSize: 12}]}>PLAYLIST</Text>
          <Text style={styles.text}>Instaplayer</Text>
        </View>
        <View style={styles.coverContainer}>
          <Image source={{uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'}}
                 style={styles.cover}
          />
        </View>
        <View style={styles.trackName}>
          <Text style={[styles.textDark, {fontSize: 20, fontWeight: '500'}]}>
            {get_asset_title(props.audio)}
          </Text>
        </View>
      </View>
      <View style={styles.seekbar}>
        <Slider
          minimumValue={0}
          maximumValue={100}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          value={0}
          minimumTrackTintColor="#93A8B3"
          // onValueChange={(seconds) => changeTime(seconds)}
          onSlidingComplete={handleNextTrack}
        />
        <View style={styles.inProgress}>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {get_duration_as_string(timeElapsed)}
          </Text>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {get_duration_as_string(props.audio?.duration)}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePreviousTrack}>
          <FontAwesome name="backward" size={32} color="#93A8B3"/>
        </TouchableOpacity>
        {!isPlaying ? (
          <PlayButtonComponent onPress={() => handlePlayPause()} state="play"/>
        ) : (
          <PlayButtonComponent onPress={() => handlePlayPause()} state="pause"/>
        )}
        <TouchableOpacity onPress={handleNextTrack}>
          <FontAwesome name="forward" size={32} color="#93A8B3"/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state: rootState, ownProps: any) => {
  return {
    ...ownProps,
    playlist: state.playlistReducer.playlist,
    audio: state.audioReducer.audio,
    index: state.audioReducer.index
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    changeSong: (audio: Asset | null, index: number) => dispatch(set_current_playing_audio(audio, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);


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
  titleContainer: {alignItems: 'center', marginTop: 24},
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
  seekbar: {margin: 32},
  inProgress: {
    marginTop: -12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackName: {alignItems: 'center', marginTop: 32},
});
