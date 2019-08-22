import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { Button, Text, Form, Item, Input } from 'native-base';
import { getAllPinsThunk, addPinThunk } from "../store/userpins";

function DiscoverMap(props) {
  const [isPinBeingAdded, setIsPinBeingAdded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coord, setCoord] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    props.getAllPins();
  }, []);

  const logLocationChange = (e) => {
    // console.log('location changed')
  }

  const addPin = () => {
    setIsPinBeingAdded(true);
  }

  const handleBack = () => {
    setIsModalVisible(false);
    setTitle('');
    setDescription('');
    setIsPinBeingAdded(false);
    setCoord(null);
  }

  const handleSubmit = async () => {
    props.addPin({
      coordinate: coord,
      title,
      description
    })
    setIsPinBeingAdded(false);
    setIsModalVisible(false);
    setCoord(null);
    setTitle('');
    setDescription('')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          console.log("onRequestClose");
        }}
      >
        <View>
          <Text
            style={{
              marginTop: 150,
              marginBottom: 40,
              textAlign: "center",
              fontSize: 20
            }}
          >
            Add some information to your pin.
          </Text>
          <Form>
            <Item>
              <Input
                placeholder="Title"
                value={title}
                onChangeText={text => {
                  setTitle(text);
                }}
              />
            </Item>
            <Item>
              <Input
                placeholder="Description"
                value={description}
                onChangeText={text => {
                  setDescription(text);
                }}
              />
            </Item>
          </Form>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 50
            }}
          >
            <Button
              large
              danger
              style={{ margin: 20 }}
              onPress={handleBack}
            >
              <Text>Back</Text>
            </Button>
            <Button
              large
              success
              onPress={handleSubmit}
              style={{ margin: 20 }}
            >
              <Text>Create</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <MapView
        //initial region should be stateful based on users current location
        provider="google"
        onUserLocationChange={logLocationChange()}
        showsUserLocation={true}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.895442,
          longitude: -87.638957,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onPress={e => {
          const newCoord = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          };
          setCoord(newCoord);
          if (isPinBeingAdded) {
            setIsModalVisible(true);
          }
        }}
      >
      {isPinBeingAdded ? <Text style={{position:'absolute', backgroundColor:'white' }}>
        Tap the location where you would like to add a pin
      </Text> : <Text></Text>}
        {props.userpins.length
          ? props.userpins.map(coord => {
              return (
                <Marker
                  key={coord.id}
                  title={coord.name}
                  description={coord.description}
                  coordinate={{
                    longitude: coord.location.coordinates[1],
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
          left: 120,
          right: 120
        }}
      >
        <Button large primary style={{ margin: 0 }} onPress={addPin}>
          <Text style={{ textAlign: "center" }}>Add a Pin</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const mapState = state => {
  return {
    userpins: state.userpins
  };
};

const mapDispatch = dispatch => {
  return {
    getAllPins: () => {
      dispatch(getAllPinsThunk());
    },
    addPin: (pin) => {
      dispatch(addPinThunk(pin))
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(DiscoverMap);
