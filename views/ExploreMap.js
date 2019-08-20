import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Modal,  Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Button, Text } from 'native-base';
import { connect } from "react-redux";
import { getAllWalksThunk } from "../store/walks";
import {  setActiveWalkThunk } from '../store/activeWalk'


function ExploreMap(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coordinate, setCoordinate] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(null)
  const [id, setId] = useState(null)



  useEffect(() => {
    props.getAllWalks();
  }, []);

  const handleModal = (walkName, walkDescription, walkCoordinate, walkId) => {
    setName(walkName);
    setDescription(walkDescription);
    setCoordinate(walkCoordinate);
    setId(walkId)
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    currentMarker.hideCallout()
  };

  const handleWalk = () => {
    props.setActiveWalk(id);
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
        <View style={{ marginTop: 75 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              textAlign: "center",
              marginBottom: 20
            }}
          >
            {name}
          </Text>

          <Image
            source={{
              url:
                "https://www.seattle.gov/images/Departments/ParksAndRecreation/Parks/MNOP/MadisonPark4.jpg"
            }}
            style={{ height: 400, width: 400 }}
          />
          <Text style={{ margin: 20 }}>{description}</Text>
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
              warning
              onPress={handleCancel}
              style={{ margin: 20 }}
            >
              <Text>Back</Text>
            </Button>
            <Button large primary onPress={handleWalk} style={{ margin: 20 }}>
              <Text>Walk</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <MapView
        //initial region should be stateful based on users current location
        provider="google"
        showsUserLocation={true}

        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.895442,
          longitude: -87.638957,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <View />
        {props.walks.length
          ? props.walks.map(walk => {
              return (
                <Marker
                  ref={_marker => {
                    this.marker = _marker;
                  }}
                  key={walk.name}
                  title={walk.name}
                  pinColor="#006aff"
                  description={walk.description}
                  onPress={() => {
                    handleModal(
                      walk.name,
                      walk.description,
                      walk.coordinate,
                      walk.id
                    );
                    setCurrentMarker(this.marker);
                  }}
                  coordinate={{
                    longitude: walk.start.coordinates[1],
                    latitude: walk.start.coordinates[0]
                  }}
                >
                  <Callout>
                    <View>
                      <Text>{walk.name}</Text>
                    </View>
                  </Callout>
                </Marker>
                //put a modal that opens when the button is clicked with name, description, tag, picture, and button to setActiveWalk
              );
            })
          : null}
      </MapView>
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
    },
    setActiveWalk: (id) => {
      dispatch(setActiveWalkThunk(id));
    }
  };
};

export default connect(mapState, mapDispatch)(ExploreMap);
