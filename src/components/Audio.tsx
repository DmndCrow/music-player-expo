import React, {
  useState, useEffect,
} from 'react';
import {
  View, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { Asset } from 'expo-media-library';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Text } from './Themed';
import { rootState } from '../models/reduxState';
import {
  getAssetTitle, getDurationAsString,
} from '../utils/functions';
import {
  setCurrentPlayingAudio,
} from '../store/audio/action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    color: 'black',
  },
  duration: {
    fontSize: 8,
    color: 'black',
  },
});

function AudioComponent(props: any) {
  const play = 'play-circle';
  const pause = 'pause-circle';
  const size = 48;
  const color = 'red';

  const [iconName, setIconName] = useState<any>(props.isPlaying ? pause : play);

  useEffect(() => {
    setIconName(props.isPlaying ? pause : play);
  }, [props.isPlaying]);

  const handleSongAction = () => {
    if (!props.isPlaying) {
      props.playSong(props.audio, props.index);
      props.navigate('Player');
    } else {
      props.playSong(null, -1);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSongAction}>
      <Ionicons name={iconName} size={size} color={color} />
      <View>
        <Text style={styles.name} numberOfLines={1}>
          {getAssetTitle(props.audio)}
        </Text>
        <Text style={styles.duration} numberOfLines={1}>
          {getDurationAsString(props.audio.duration * 1000)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AnyAction>) => ({
  playSong: (audio: Asset | null, index: number) => dispatch(setCurrentPlayingAudio(audio, index)),
});

const mapStateToProps = (state: rootState, ownProps: any) => ({
  ...ownProps,
  isPlaying: state.audioReducer.audio?.id === ownProps.audio.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioComponent);
