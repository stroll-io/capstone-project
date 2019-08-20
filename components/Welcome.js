import React from 'react';
import { View} from 'react-native';
import { Button, Text } from 'native-base';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Welcome Screen</Text>
        <Button>
          <Text>Login!</Text>
        </Button>
        <Button>
          <Text>Register!</Text>
        </Button>
      </View>
    );
  }
}

export default WelcomeScreen
