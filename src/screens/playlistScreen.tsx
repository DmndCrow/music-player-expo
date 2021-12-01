import React, {
  useState, useEffect,
} from 'react';
import {
  StyleSheet, Alert, ScrollView,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-media-library';
import { connect } from 'react-redux';

import {
  View,
} from '../components/Themed';
import AudioComponent from '../components/Audio';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

function PlaylistScreen(props: any) {
  const [, setAudioFiles] = useState<Asset[]>([]);
  const [filteredAudioFiles, setFilteredAudioFiles] = useState<Asset[]>([]);

  const getAudioFiles = async () => {
    let audio = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
    audio = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio', first: audio.totalCount,
    });

    return audio.assets;
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    let files: Asset[] = [];

    if (permission.granted) {
      files = await getAudioFiles();
    } else if (!permission.granted && permission.canAskAgain) {
      const {
        status, canAskAgain,
      } = await MediaLibrary.requestPermissionsAsync();

      if (status === 'denied') {
        // denied
        permissionAlert();
      } else {
        files = await getAudioFiles();
      }
    } else {
      permissionAlert();
    }

    return files.filter((file) => file.filename.endsWith('.mp3'));
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

  useEffect(() => {
    getPermission().then((files) => {
      setAudioFiles(files);
      setFilteredAudioFiles(files);
    });
  }, []);

  const navigate = (route: any) => {
    props.navigation.navigate(route);
  };

  return (
    <View>
      <ScrollView>
        {filteredAudioFiles.map((audio: Asset, i: number) => (
          <AudioComponent
            key={i}
            audio={audio}
            navigate={navigate}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default connect()(PlaylistScreen);
