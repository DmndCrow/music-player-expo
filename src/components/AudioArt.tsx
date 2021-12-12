import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { rootState } from '../models/reduxState';

const { width, height } = Dimensions.get('window');
const imageSize = width - 100;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
    paddingLeft: 24,
    paddingRight: 24,
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
})

function AudioArtComponent(props: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View
          style={[styles.image, {
            elevation: 10, shadowColor: '#d9d9d9',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 2,
            borderRadius: 20,
            backgroundColor: '#ffffff'
          }]}
        >
          <Image
            style={[styles.image, { borderRadius: 20 }]}
            source={{ uri: props.url }}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AnyAction>) => ({
});

const mapStateToProps = (state: rootState, ownProps: any) => ({
  ...ownProps,
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioArtComponent);
