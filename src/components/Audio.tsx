import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useDispatch, connect } from 'react-redux';
import {
  get_current_playing_audio, set_current_playing_audio
} from '../store/audio/action';


import {Text} from './Themed';
import {Asset} from 'expo-media-library';


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

  const playSong = () => {
    if (!props.isPlaying) {
      dispatch(set_current_playing_audio(props.audio || null));
    } else {
      dispatch(set_current_playing_audio(null));
    }
  }

  const getAudioName = () => {
    let filename = props.audio.filename.replace('.mp3', '');
    filename.trim();

    return filename;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => props.playSong(props.audio)}>
      <Ionicons name={iconName} size={size} color={color}/>
      <Text style={styles.name} numberOfLines={1}>
        {getAudioName()}
      </Text>
    </TouchableOpacity>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    playSong: (audio: Asset) => dispatch(set_current_playing_audio(audio))
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
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
  }
});