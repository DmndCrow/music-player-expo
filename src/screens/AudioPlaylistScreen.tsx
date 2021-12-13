import React, { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-media-library';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import { View } from '../components/Themed';
import AudioComponent from '../components/Audio';
import { setPlaylist } from '../store/playlist/action';
import { initHistoryPlaylist } from '../store/history/action';

function AudioPlaylistScreen(props: any) {
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

  const filterFiles = (files: Asset[]) => files.filter((file) => {
    const mp3 = file.filename.endsWith('.mp3');
    const duration = file.duration > 10;
    return mp3 && duration;
  });

  useEffect(() => {
    getPermission().then((files) => {
      const filtered = filterFiles(files);

      setAudioFiles(filtered);
      props.updatePlaylist(filtered);   // playlist in main screen
      props.generateHistory(filtered);  // playlist that will be used to play songs
      setFilteredAudioFiles(filtered);
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
  generateHistory: (playlist: Asset[] | null) => dispatch(initHistoryPlaylist(playlist)),
});

export default connect(null, mapDispatchToProps)(AudioPlaylistScreen);
