import React from 'react';
import { View, Text, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class HomeScreen extends React.Component {
  static navigationOptions({ navigation }) {
    return {
      headerRight: (
        <View style={{ padding: 10 }}>
          <Ionicons
            name="md-menu"
            size={24}
            onPress={() => navigation.navigate('DrawerOpen')}
          />
        </View>
      ),
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Welcome"
          onPress={() => this.props.navigation.navigate('Welcome')}
        />
        <Button
          title="Registration"
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    );
  }
}

export default HomeScreen;
