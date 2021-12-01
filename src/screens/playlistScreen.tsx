import React, {
  useState, useEffect,
} from 'react';
import {
  Alert, ScrollView,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-media-library';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import {
  View,
} from '../components/Themed';
import AudioComponent from '../components/Audio';
import { setPlaylist } from '../store/playlist/action';

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

    return filterFiles(files);
  };

  const filterFiles = (files: Asset[]) => {
    return files.filter((file) => {
      let mp3 = file.filename.endsWith('.mp3');
      let duration = file.duration > 10;
      return mp3 && duration;
    });
  }

  useEffect(() => {
    getPermission().then((files) => {
      setAudioFiles(filterFiles(files));
      props.updatePlaylist(filterFiles(files));
      setFilteredAudioFiles(filterFiles(files));
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
            index={i}
            audio={audio}
            navigate={navigate}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => ({
  updatePlaylist: (playlist: Asset[] | null) => dispatch(setPlaylist(playlist)),
});

export default connect(null, mapDispatchToProps)(PlaylistScreen);
