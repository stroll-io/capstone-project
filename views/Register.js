import React from 'react';
import { View, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Text } from 'native-base';
import DashboardContainer from './Dashboard';

class Register extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Registration Component</Text>
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
      </View>
    );
  }
}

const RegisterNavigator = createSwitchNavigator(
  {
    Register: Register,
    Dashboard: DashboardContainer,
  },
  {
    initialRouteName: 'Register',
  }
);

const RegisterContainer = createAppContainer(RegisterNavigator);

export default RegisterContainer;
