import React from 'react';
import { View, Button, Text } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './Home';

class Logout extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Logout</Text>
        <Button
          title="Logout"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

// const LogoutNavigator = createSwitchNavigator(
//   {
//     Logout: Logout,
//     Home: HomeScreen,
//   },
//   {
//     initialRouteName: 'Logout',
//     headerStyle: {
//       headerMode: 'none',
//     },
//   }
// );

// const LogoutContainer = createAppContainer(LogoutNavigator);

export default Logout;
