import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text>Hello Walkers!</Text>
        <MapView style={{ alignSelf: "stretch", height: 700 }}>
          <Polyline
            coordinates={[
              { latitude: 41.895546, longitude: -87.639462 },
              { latitude: 41.895498, longitude: -87.641509 },
              { latitude: 41.893483, longitude: -87.641477 },
              { latitude: 41.889138, longitude: -87.638076 },
              { latitude: 41.889074, longitude: -87.640007 },
              { latitude: 41.88394, longitude: -87.639782 }
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider

            strokeWidth={6}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
