import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, Text } from 'native-base';

class Login extends React.Component {
  render() {
    return (
      <View>
        <Text>Login Component</Text>
        <Button>
          <Text>Click me to login!</Text>
        </Button>
      </View>
    );
  }
}

export default Login;
