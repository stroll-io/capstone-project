import React, { useEffect } from "react";
import { View, SafeAreaView, Modal } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { connect } from "react-redux";
import { getAllPinsThunk } from "../store/userpins";

function DiscoverMap(props) {

  useEffect(() => {
    props.getAllPins();}, []);

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
        {props.userpins.length
          ? props.userpins.map(coord => {
            console.log('chord:', coord)
              return (
                <Marker
                  key={coord.title}
                  title={coord.title}
                  description={coord.description}
                  coordinate={{
                    longitude:
                      coord.location.coordinates[1],
                    latitude: coord.location.coordinates[0]
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
    userpins: state.userpins
  };
};

const mapDispatch = dispatch => {
  return {
    getAllPins: () => {
      dispatch(getAllPinsThunk());
    }
  };
};

export default connect(mapState, mapDispatch)(DiscoverMap);
