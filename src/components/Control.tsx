import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { rootState } from '../models/reduxState';
import Colors from '../utils/constants/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: Colors.darkColor,
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.30,
  }
})

function ControlComponent(props: any) {
  const shuffleOn = true;
  const repeatOn = true;

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.0} onPress={() => console.log('shuffle')}>
        <FontAwesome name='random' color={Colors.darkColor} size={24} />
      </TouchableOpacity>
      <View style={{ width: 40 }} />
      <TouchableOpacity onPress={props.handlePreviousTrack}>
        <FontAwesome name='arrow-left' color={Colors.darkColor} size={24} />
      </TouchableOpacity>
      <View style={{ width: 20 }} />
        <TouchableOpacity onPress={props.handlePlayPause}>
          <View style={styles.playButton}>
            <FontAwesome name={props.isPlaying ? 'pause' : 'play'} color={Colors.darkColor} size={24} />
          </View>
        </TouchableOpacity>
      <View style={{ width: 20 }} />
      <TouchableOpacity onPress={props.handleNextTrack}>
        <FontAwesome name='arrow-right' color={Colors.darkColor} size={24} />
      </TouchableOpacity>
      <View style={{ width: 40 }} />
      <TouchableOpacity activeOpacity={0.0} onPress={() => console.log('repeat')}>
        <FontAwesome name='repeat' color={Colors.darkColor} size={24} />
      </TouchableOpacity>
    </View>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AnyAction>) => ({
});

const mapStateToProps = (state: rootState, ownProps: any) => ({
  ...ownProps,
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlComponent);
