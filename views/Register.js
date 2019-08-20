import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, Text } from 'native-base';

class Register extends React.Component {
  render() {
    return (
      <View>
        <View>
          <Text>Registration Component</Text>
          <Button>
            <Text>Click me to register!</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Register;
