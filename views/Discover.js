import React, { useState } from "react";
import { View, SafeAreaView, Modal } from "react-native";
import { Button, Text, Form, Item, Input, Picker, Icon } from "native-base";
import MapView, { Polyline, Marker } from "react-native-maps";
import axios from "axios";

export default function Map() {
  const [coords, setCoords] = useState([
    {
      title: "Fullstack Academy",
      description: "a top-ranked coding bootcamp",
      coordinate: { latitude: 41.895394, longitude: -87.639032 }
    },
    { title: "Yolk",
      description: "I effing love brunch!",
      coordinate: { latitude: 41.896256, longitude: -87.633928 }
  ]);


  const handleUndo = () => {
    const coordsCopy = coords.slice();
    coordsCopy.pop();
    setCoords(coordsCopy);
  };

  const handleCreate = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    await axios.post("http://576e347c.ngrok.io/api/navPoints", {
      coords,
      walkTitle,
      walkDescription,
      walkTag
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <MapView
        // showsPointsOfInterest={true}
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
        }}
        //use onPress to gather the coordinates for creating walks, dropping pins, etc..
      >
        {/* <Marker
          title="Ben's apartment"
          description="This is where Ben, Kait, and Belle live."
          coordinate={{ latitude: 42.064119, longitude: -87.691495 }}
        /> */}
        {coords.map(coord => {
          return (
            <Marker
            title={coord.title}
            description={coord.description}
            coordinate={coord.coordinate}
            ></Marker>
          )
        })}
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
