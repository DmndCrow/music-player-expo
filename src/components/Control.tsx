import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
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
  },
  shuffleBadge: {
    position: 'absolute',
    top: -8,
    right: 9
  },
  repeatBadge: {
    position: 'absolute',
    top: -8,
    right: 6
  }
})

function ControlComponent({
  handlePreviousTrack, handleNextTrack, handlePlayPause,
  isPlaying, isShuffling, isRepeating
}: InferProps<typeof ControlComponent.propTypes>) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.0} onPress={() => console.log('shuffle')}>
        <FontAwesome name='random' color={Colors.darkColor} size={24} />
        <Badge status={isShuffling ? 'success' : 'error'}
               containerStyle={styles.shuffleBadge} />
      </TouchableOpacity>
      <View style={{ width: 40 }} />
      <TouchableOpacity onPress={handlePreviousTrack}>
        <FontAwesome name='arrow-left' color={Colors.darkColor} size={24} />
      </TouchableOpacity>
      <View style={{ width: 20 }} />
        <TouchableOpacity onPress={handlePlayPause}>
          <View style={styles.playButton}>
            <FontAwesome name={isPlaying ? 'pause' : 'play'} color={Colors.darkColor} size={24} />
          </View>
        </TouchableOpacity>
      <View style={{ width: 20 }} />
      <TouchableOpacity onPress={handleNextTrack}>
        <FontAwesome name='arrow-right' color={Colors.darkColor} size={24} />
      </TouchableOpacity>
      <View style={{ width: 40 }} />
      <TouchableOpacity activeOpacity={0.0} onPress={() => console.log('repeat')}>
        <FontAwesome name='repeat' color={Colors.darkColor} size={24} />
        <Badge status={isRepeating ? 'success' : 'error'}
               containerStyle={styles.repeatBadge} />
      </TouchableOpacity>
    </View>
  )
}

ControlComponent.propTypes = {
  handlePreviousTrack: PropTypes.func.isRequired,
  handleNextTrack: PropTypes.func.isRequired,
  handlePlayPause: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isShuffling: PropTypes.bool.isRequired,
  isRepeating: PropTypes.bool.isRequired
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AnyAction>) => ({
});

const mapStateToProps = (state: rootState, ownProps: InferProps<typeof ControlComponent.propTypes>) => ({
  ...ownProps,
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlComponent);
