import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useDispatch, connect } from 'react-redux';
import {
  get_current_playing_audio, set_current_playing_audio
} from '../store/audio/action';


import {Text} from './Themed';
import {Asset} from 'expo-media-library';
import { Dispatch } from 'react';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {rootState} from '../models/reduxState';


function AudioComponent(props: any) {
  const dispatch = useDispatch();

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
      props.playSong(props.audio);
      props.navigate('Player')
    } else {
      props.playSong(null);
    }
  }

  const getAudioName = () => {
    let filename = props.audio.filename.replace('.mp3', '');
    filename.trim();

    return filename;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleSongAction}>
      <Ionicons name={iconName} size={size} color={color}/>
      <View>
        <Text style={styles.name} numberOfLines={1}>
          {getAudioName()}
        </Text>
        <Text style={styles.duration} numberOfLines={1}>
          {props.audio.duration}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AnyAction>) => {
  return {
    playSong: (audio: Asset | null) => dispatch(set_current_playing_audio(audio)),
  }
}

const mapStateToProps = (state: rootState, ownProps: any) => {
  return {
    ...ownProps,
    isPlaying: state.audioReducer.audio?.id === ownProps.audio.id,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    color: 'black'
  },
  duration: {
    fontSize: 8,
    color: 'black'
  }
});
