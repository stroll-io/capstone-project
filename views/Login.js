import React from 'react';
import { View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Text } from 'native-base';
import DashboardContainer from './Dashboard';

class Login extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };

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

const LoginNavigator = createStackNavigator(
  {
    Login: Login,
    Dashboard: DashboardContainer,
  },
  {
    initialRouteName: 'Login',
  }
);

const LoginContainer = createAppContainer(LoginNavigator);

export default LoginContainer;
