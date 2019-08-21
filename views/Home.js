import React from 'react';
import { View, Text, Button } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Home Screen</Text>
        <Button
          title="CreateWalk"
          onPress={() => this.props.navigation.navigate("CreateWalk")}
        />

        <Button
          title="Camera"
          onPress={() => this.props.navigation.navigate("Camera")}
        />
        <Button
          title="Location"
          onPress={() => this.props.navigation.navigate("Location")}
        />
        <Button
          title="Live View"
          onPress={() => this.props.navigation.navigate("LiveView")}
        />
        <Button
          title="Side Menu"
          onPress={() => this.props.navigation.navigate("SideMenu")}
        />
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate("Register")}
        />
        <Button
          title="Account Info"
          onPress={() => this.props.navigation.navigate("AccountInfo")}
        />
        <Button
          title="Starred Walks"
          onPress={() => this.props.navigation.navigate("StarredWalks")}
        />
        <Button
          title="Past Walks"
          onPress={() => this.props.navigation.navigate("PastWalks")}
        />
        <Button
          title="DiscoverMap"
          onPress={() => this.props.navigation.navigate("DiscoverMap")}
        />
        <Button
          title="ExploreMap"
          onPress={() => this.props.navigation.navigate("ExploreMap")}
        />
        <Button
          title="WalkingMap"
          onPress={() => this.props.navigation.navigate("WalkingMap")}
        />
      </View>
    );
  }
}

export default HomeScreen;
