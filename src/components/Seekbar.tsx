import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Slider } from 'react-native-elements';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Colors from '../utils/constants/Colors';

import { rootState } from '../models/reduxState';
import { getDurationAsString } from '../utils/functions';

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.darkColor,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  },
});

function SeekbarComponent({
  onValueChange, value, duration,
}: InferProps<typeof SeekbarComponent.propTypes>) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.text, { color: Colors.darkColor }]}>
          {getDurationAsString(value)}
        </Text>
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { width: 40, color: Colors.darkColor }]}>
          {getDurationAsString(duration)}
        </Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={Math.max(duration, 1)}
        value={value}
        minimumTrackTintColor={Colors.darkColor}
        maximumTrackTintColor={Colors.lightGrayColor}
        trackStyle={styles.track}
        thumbStyle={styles.thumb}
        onValueChange={onValueChange}
      />
    </View>
  );
}

SeekbarComponent.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AnyAction>) => ({
});

const mapStateToProps = (state: rootState, ownProps: InferProps<typeof SeekbarComponent.propTypes>) => ({
  ...ownProps,
});

export default connect(mapStateToProps, mapDispatchToProps)(SeekbarComponent);
