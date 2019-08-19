import React, { useEffect } from "react";
import { View, SafeAreaView, Modal } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { connect } from "react-redux";
import { getAllWalksThunk} from "../store/walks";

function ExploreMap(props) {

  useEffect(() => {
    console.log('props :', props);
    props.getAllWalks()}, []);

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
        {props.walks.length
          ? props.walks.map(walk => {
              return (
                <Marker
                  key={walk.name}
                  title={walk.name}
                  pinColor="#006aff"
                  description={walk.description}
                  coordinate={{
                    longitude: walk.start.coordinates[1],
                    latitude: walk.start.coordinates[0]
                  }}
                />
              );
            })
          : null}
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

const mapState = (state) => {
  return {
    walks: state.walks
  };
};

const mapDispatch = dispatch => {
  return {
    getAllWalks: () => {
      dispatch(getAllWalksThunk());
    }
  };
};

export default connect(mapState, mapDispatch)(ExploreMap);
