import React, { useState } from "react";
import { View, SafeAreaView, Modal  } from "react-native";
import { Button, Text, Form, Item, Input, Picker, Icon } from "native-base";
import MapView, { Polyline, Marker } from "react-native-maps";
import axios from "axios";


export default function Map() {

  const [coords, setCoords] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [walkTitle, setWalkTitle] = useState('');
  const [walkDescription, setWalkDescription] = useState('')
  const [walkTag, setWalkTag] = useState('')

  const handleUndo = () => {
    const coordsCopy = coords.slice();
    coordsCopy.pop();
    setCoords(coordsCopy);
  };

  const handleCreate = () => {
    setIsModalVisible(true);
  }



  const handleSubmit = async() => {

    await axios.post("http://576e347c.ngrok.io/api/navPoints", { coords, walkTitle, walkDescription, walkTag });
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
        <Marker
          title="Ben's apartment"
          description="This is where Ben, Kait, and Belle live."
          coordinate={{ latitude: 42.064119, longitude: -87.691495 }}
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
      />
    </SafeAreaView>
  );
}


