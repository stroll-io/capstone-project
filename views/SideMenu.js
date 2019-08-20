import React from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

class SideMenu extends React.Component {
  //   navigateToScreen(route) {
  //     const navigateAction = NavigationActions.navigate({ routeName: route });
  //     this.props.navigation.dispatch(navigateAction);
  //   }

  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <View>
              <Text> Account Info Placeholder</Text>
            </View>
            <View>
              <Text> Discover</Text>
            </View>
            <View>
              <Text>Exploratory Map</Text>
            </View>
            <View>
              <Text>Past walks</Text>
            </View>
            <View>
              <Text>Starred walks</Text>
            </View>
            <View>
              <Text>Create new walk</Text>
            </View>
            <View>
              <Text>Settings</Text>
            </View>
            <View>
              <Text>Logout</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SideMenu;
