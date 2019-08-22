import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

export default class DeleteAccount extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 30 }}>
            DeleteAccount Component
          </Text>
        </View>
      </View>
    );
  }
}
