import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {Text} from './Themed';


export default function AudioComponent({audio, isPlaying, setPlaying, navigation}: any) {
  const play = 'play-circle';
  const pause = 'pause-circle';
  const size = 48;
  const color = 'red';

  const [iconName, setIconName] = useState<any>(isPlaying ? pause : play);

  useEffect(() => {
    setIconName(isPlaying ? pause : play);
  }, [isPlaying]);

  const playSong = () => {
    setPlaying(audio || null);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={playSong}>
      <Ionicons name={iconName} size={size} color={color}/>
      <Text style={styles.name} numberOfLines={1}>
        {audio.filename.replace('.mp3', '')}
      </Text>
    </TouchableOpacity>
  )
}

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
