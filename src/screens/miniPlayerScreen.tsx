import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

// screen that will be displayed under playlist when:
// - song is playing
// - we are not at PlayerScreen tab
function MiniPlayerScreen(props: any) {
  return (
    <View>
      <Text>My Mini Player</Text>
    </View>
  )
}

const mapStateToProps = (state: any) => {

}

export default MiniPlayerScreen;
