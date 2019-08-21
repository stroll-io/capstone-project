import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Info from './Info';
import Walk from './Walk';

class Dashboard extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text>Dashboard Component</Text>
        </View>
      </View>
    );
  }
}

const DashboardNavigator = createDrawerNavigator(
  {
    Dashboard: Dashboard,
    Info: Info,
    Walk: Walk,
  },
  {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'tomato',
      },
    },
  }
);

const DashboardContainer = createAppContainer(DashboardNavigator);

export default DashboardContainer;
