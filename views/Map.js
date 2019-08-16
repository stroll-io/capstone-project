import React, { useState } from "react";
import {  View, SafeAreaView } from "react-native";
import { Button, Text} from 'native-base'
import MapView, { Polyline } from "react-native-maps";
import axios from "axios";

export default function Map() {

  const [coords, setCoords] = useState([]);

  const handleUndo = () => {
    const coordsCopy = coords.slice();
    coordsCopy.pop();
    setCoords(coordsCopy);
  };

  const handleSubmit = async() => {
    await axios.post("http://f579603d.ngrok.io/api/navPoints", {coords});
  }

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
          setCoords([...coords, newCord]);
          console.log(e.nativeEvent);
        }}
        //use onPress to gather the coordinates for creating walks, dropping pins, etc..
      >
        <Polyline
          coordinates={coords}
          strokeColor="#EE6A22"
          strokeWidth={3}
        />
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
      >
        <Button large warning onPress={handleUndo} style={{ margin: 20 }}>
          <Text>Undo</Text>
        </Button>
        <Button large primary onPress={handleSubmit} style={{ margin: 20 }}>
          <Text>Submit</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}


