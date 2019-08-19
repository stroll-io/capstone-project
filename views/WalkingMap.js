import React, { useEffect } from "react";
import { View, SafeAreaView, WebView } from "react-native";
import { Image } from "expo";
import Thumbnail from "native-base";
import MapView, { Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import { getAllWalksThunk } from "../store/walks";

function WalkingMap(props) {
  // useEffect(() => {
  //   props.getAllWalks();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <MapView
        //initial region should be stateful based on users current location
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.895442,
          longitude: -87.638957,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      </MapView>
      <View
        style={{
          display: "flex",
          position: "absolute",
          bottom: 40,
          left: 50,
          flexDirection: "row",
          justifyContent: "center"
        }}
      />
    </SafeAreaView>
  );
}

const mapState = state => {
  return {
    activeWalk: state.activeWalk
  };
};

const mapDispatch = dispatch => {
  return {

    }

};

export default connect(
  mapState,
  mapDispatch
)(WalkingMap);
