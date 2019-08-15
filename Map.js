import React, { Link } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import MapView, { Polyline } from "react-native-maps";

export default function App() {
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
        <Polyline
          coordinates={[
            { latitude: 41.895546, longitude: -87.639462 },
            { latitude: 41.895498, longitude: -87.641509 },
            { latitude: 41.893483, longitude: -87.641477 },
            { latitude: 41.889138, longitude: -87.638076 },
            { latitude: 41.889074, longitude: -87.640007 },
            { latitude: 41.88394, longitude: -87.639782 }
          ]}
          strokeColor="#5c69ed" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
