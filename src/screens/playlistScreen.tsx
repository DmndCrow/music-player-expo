import React, {useState, useEffect} from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {Asset} from 'expo-media-library';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import AudioComponent from '../components/Audio';

export default function PlaylistScreen({ navigation }: RootTabScreenProps<'Playlist'>) {
  const [audioFiles, setAudioFiles] = useState<Asset[]>([]);
  const [filteredAudioFiles, setFilteredAudioFiles] = useState<Asset[]>([]);
  const [playing, setPlaying] = useState<Asset>();

  const getAudioFiles = async () => {
    let audio = await MediaLibrary.getAssetsAsync({mediaType: 'audio'});
    audio = await MediaLibrary.getAssetsAsync({mediaType: 'audio', first: audio.totalCount});

    return audio.assets;
  };

  const permissionAlert = () => {
    Alert.alert('Permission required', 'Application needs to read audio files', [
      {
        text: 'Allow',
        onPress: () => getPermission(),
      }, {
        text: 'Deny',
        onPress: () => permissionAlert(),
      },
    ]);
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    let files: Asset[] = [];

    if (permission.granted) {
      files = await getAudioFiles();
    } else if (!permission.granted && permission.canAskAgain) {
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();

      if (status === 'denied') {
        // denied
        permissionAlert();
      } else {
        files = await getAudioFiles();
      }
    } else {
      permissionAlert();
    }

    return files.filter(file => file.filename.endsWith('.mp3'));
  };

  useEffect(() => {
    getPermission().then((files) => {
      setAudioFiles(files);
      setFilteredAudioFiles(files);
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {filteredAudioFiles.map((audio: Asset, i: number) => {
          return <AudioComponent key={i}
                                audio={audio}
                                isPlaying={audio.id === playing?.id}
                                setPlaying={setPlaying}
                                navigation={navigation}
          />
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
