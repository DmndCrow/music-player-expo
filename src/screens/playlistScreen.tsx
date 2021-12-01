import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, ScrollView} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {Asset} from 'expo-media-library';
import {connect} from 'react-redux';

import {
  set_current_playing_audio,
} from '../store/audio/action';
import {Text, View} from '../components/Themed';
import AudioComponent from '../components/Audio';
import MiniPlayerScreen from './miniPlayerScreen';
import {ThunkDispatch} from 'redux-thunk';
import {set_playlist} from '../store/playlist/action';


function PlaylistScreen(props: any) {
  const [audioFiles, setAudioFiles] = useState<Asset[]>([]);
  const [filteredAudioFiles, setFilteredAudioFiles] = useState<Asset[]>([]);

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
      props.updatePlaylist(files);
      setFilteredAudioFiles(files);
    });
  }, []);

  const navigate = (route: any) => {
    props.navigation.navigate(route);
  };

  return (
    <View>
      <ScrollView>
        {filteredAudioFiles.map((audio: Asset, i: number) => {
          return <AudioComponent key={i}
                                 index={i}
                                 audio={audio}
                                 navigate={navigate}
          />;
        })}
      </ScrollView>
    </View>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    updatePlaylist: (playlist: Asset[] | null) => dispatch(set_playlist(playlist)),
  };
};

export default connect(null, mapDispatchToProps)(PlaylistScreen);

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
