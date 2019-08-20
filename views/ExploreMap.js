import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Modal, Button, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import { getAllWalksThunk} from "../store/walks";

function ExploreMap(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coordinate, setCoordinate] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    props.getAllWalks();
  }, []);

  const handleModal = (walkName, walkDescription, walkCoordinate) => {
    console.log('in handle modal')
    setName(walkName);
    setDescription(walkDescription);
    setCoordinate(walkCoordinate);
    setIsModalVisible(true);
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
            style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", marginBottom: 20 }}
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
        </View>
      </Modal>
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
        <View />
        {props.walks.length
          ? props.walks.map(walk => {
              return (
                <Marker
                  key={walk.name}
                  title={walk.name}
                  pinColor="#006aff"
                  description={walk.description}
                  onPress={() => {
                    handleModal(walk.name, walk.description, walk.coordinate);
                  }}
                  coordinate={{
                    longitude: walk.start.coordinates[1],
                    latitude: walk.start.coordinates[0]
                  }}
                >
                  <Callout>
                    <View>
                      {/* <Text style={{ fontWeight: "bold" }}>
                        {walk.name}
                      </Text>
                      <Text>{walk.description}</Text>
                      <Button
                        medium
                        primary
                        title="See More"
                        onPress={() => {
                          handleModal(
                            walk.name,
                            walk.description,
                            walk.coordinate
                          );
                        }}
                      /> */}
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
    }
  };
};

export default connect(mapState, mapDispatch)(ExploreMap);
