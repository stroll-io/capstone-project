import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

class TestRegister extends React.Component {
  render() {
    return (
      <View>
        <Text>Registration Component</Text>
        <Button>
          <Text>Click me to register!</Text>
        </Button>
      </View>
    );
  }
}

export default TestRegister
