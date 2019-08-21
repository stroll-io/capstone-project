import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import DiscoverMap from './DiscoverMap';
import ExploreMap from './ExploreMap';
import CreateWalk from './CreateWalk';
import AccountInfo from './AccountInfo';
import PastWalks from './PastWalks';
import StarredWalks from './StarredWalks';
import WalkingMap from './WalkingMap';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const DashboardStackNavigator = createStackNavigator(
  {
    Dashboard: Dashboard,
    Discover: DiscoverMap,
    Explore: ExploreMap,
    'Walking Map': WalkingMap,
    'Create Walk': CreateWalk,
    'Past Walks': PastWalks,
    'Starred Walks': StarredWalks,
    'Account Info': AccountInfo,
  },
  {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: 'tomato',
        },
        headerRight: (
          <Ionicons
            name="md-menu"
            size={30}
            style={{ paddingRight: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      };
    },

    // defaultNavigationOptions: {
    //   headerStyle: {
    //     backgroundColor: 'tomato',
    //   },
    //   headerRight: (
    //     <Ionicons
    //       name="md-menu"
    //       size={30}
    //       style={{ paddingRight: 10 }}
    //       onPress={navigation => navigation.openDrawer()}
    //     />
    //   ),
    // },
  }
);

const DashboardNavigator = createDrawerNavigator(
  {
    Dashboard: DashboardStackNavigator,
    Discover: DiscoverMap,
    Explore: ExploreMap,
    'Walking Map': WalkingMap,
    'Create Walk': CreateWalk,
    'Past Walks': PastWalks,
    'Starred Walks': StarredWalks,
    'Account Info': AccountInfo,
  },
  {
    initialRouteName: 'Dashboard',
    drawerPosition: 'right',
  }
);

const DashboardContainer = createAppContainer(DashboardNavigator);

export default DashboardContainer;
