import React, { Link, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import MapView, { Polyline } from "react-native-maps";

export default function Map() {
  const [coords, setCoords] = useState([])
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
        onPress={e => {
          const newCord = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          };
          setCoords([...coords, newCord ])
          console.log(e.nativeEvent)}}
        //use onPress to gather the coordinates for creating walks, dropping pins, etc..
      >
        <Polyline
          coordinates={coords}
          strokeColor="#EE6A22"
          strokeWidth={3}
        />
      </MapView>
    </SafeAreaView>
  );
}


