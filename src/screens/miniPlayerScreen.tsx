import React from 'react';
import {
  View, Text,
} from 'react-native';

// screen that will be displayed under playlist when:
// - song is playing
// - we are not at PlayerScreen tab
function MiniPlayerScreen(props: any) {
  return (
    <View>
      <Text>My Mini Player</Text>
    </View>
  );
}

export default MiniPlayerScreen;
