import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Map"
          onPress={() => this.props.navigation.navigate('Map')}
        />
        <Button
          title="Camera"
          onPress={() => this.props.navigation.navigate('Camera')}
        />
        <Button
          title="Location"
          onPress={() => this.props.navigation.navigate('Location')}
        />
        <Button
          title="Live View"
          onPress={() => this.props.navigation.navigate('LiveView')}
        />
        <Button
          title="Side Menu"
          onPress={() => this.props.navigation.navigate('SideMenu')}
        />
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate('Register')}
        />
        <Button
          title="Account Info"
          onPress={() => this.props.navigation.navigate('AccountInfo')}
        />
        <Button
          title="Starred Walks"
          onPress={() => this.props.navigation.navigate('StarredWalks')}
        />
        <Button
          title="Past Walks"
          onPress={() => this.props.navigation.navigate('PastWalks')}
        />
      </View>
    );
  }
}

export default HomeScreen;
