import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

class Info extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Info</Text>
      </View>
    );
  }
}

export default Info;
