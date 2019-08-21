import React from 'react';
import { View, Button } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { Text } from 'native-base';
import DashboardContainer from './Dashboard';

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Component</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
      </View>
    );
  }
}

const LoginNavigator = createSwitchNavigator(
  {
    Login: Login,
    Dashboard: DashboardContainer,
  },
  {
    initialRouteName: 'Login',
    headerStyle: {
      headerMode: 'none',
    },
  }
);

const LoginContainer = createAppContainer(LoginNavigator);

export default LoginContainer;
