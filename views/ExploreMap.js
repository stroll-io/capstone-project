import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Modal } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { Form, Item, Picker, Icon } from 'native-base';
import { getAllWalksThunk, getWalksByTagThunk } from '../store/walks';
import { setActiveWalkThunk } from '../store/activeWalk';
import { getAttractionsThunk } from '../store/attractions';
import { AntDesign } from 'react-native-vector-icons';

function ExploreMap(props) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickerPlaceholder, setPickerPlaceholder] = useState("Filter by tag");


  if (!props.activeWalk.navPoints) {
    props.activeWalk.navPoints = [];
  }
  useEffect(() => {
    props.getAllWalks();
  }, [props.activeWalk.navPoints]);


  const handlePicker = e => {
    setPickerPlaceholder(e);
    e = e.toLowerCase()
    if (e === 'all walks') {
      props.getAllWalks();
    } else {
      props.getWalksByTag(e);
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const pinColor = walk => {
    if (walk.category === "architecture") {
      return "#478FCD";
    }
    if (walk.category === "nature") {
      return "#5fAD46";
    }
    if (walk.category === "Street art") {
      return "violet";
    }
    if (walk.category === "historical") {
      return "tomato";
    }
    if (walk.category === 'Scenic"') {
      return "blue";
    }
    if (walk.category === "Dog") {
      return "orange";
    }
    if (walk.category === "Hiking") {
      return "brown";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Modal animationType="slide" transparent={false} visible={isModalVisible}>
        <View style={{ display: 'flex', flexDirection: 'column', margin: 50 }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Avenir-Heavy',
                justifyContent: 'center',
                marginTop: 50,
              }}
            >
              Here is some text in the modal
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Button
              style={{ justifyContent: 'center', borderRadius: 20 }}
              onPress={closeModal}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: 'white',
                  fontFamily: 'Avenir-Heavy',
                }}
              >
                Close
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
      <MapView
        provider="google"
        showsUserLocation={true}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.895442,
          longitude: -87.638957,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <View style={{ position: 'absolute', backgroundColor: 'white' }}>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                iosHeader="Filter"
                placeholder={pickerPlaceholder}
                style={{ width: undefined }}
                onValueChange={handlePicker}
              >
                <Picker.Item label="All Walks" value="All Walks" />
                <Picker.Item label="Nature" value="Nature" />
                <Picker.Item label="Scenic" value="Scenic" />
                <Picker.Item label="Architecture" value="Architecture" />
                <Picker.Item label="Dog" value="Dog" />
                <Picker.Item label="Historical" value="Historical" />
                <Picker.Item label="Hiking" value="Hiking" />
                <Picker.Item label="Street art" value="Street Art" />
              </Picker>
            </Item>
          </Form>
          <AntDesign
            name="questioncircleo"
            size={27}
            color="black"
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              width: 300,
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 250,
              left: 90,
            }}
            onPress={openModal}
          />
        </View>
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
                  description={walk.description}
                  onPress={() => {
                    props.setActiveWalk(walk.id);
                    props.getAllAttractions(walk.id);
                    props.navigation.navigate("WalkInfo");
                  }}
                  coordinate={{
                    longitude: walk.start.coordinates[1],
                    latitude: walk.start.coordinates[0]
                  }}
                  pinColor={pinColor(walk)}
                >
                  <Callout>
                    <View>
                      <Text>{walk.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })
          : null}
      </MapView>
    </SafeAreaView>
  );
}

ExploreMap.navigationOptions = {
  title: 'Nearby Walks',
};

const mapState = state => {
  return {
    walks: state.walks,
    activeWalk: state.activeWalk,
  };
};

const mapDispatch = dispatch => {
  return {
    getAllWalks: () => {
      dispatch(getAllWalksThunk());
    },
    setActiveWalk: id => {
      dispatch(setActiveWalkThunk(id));
    },
    getWalksByTag: tag => {
      dispatch(getWalksByTagThunk(tag));
    },
    getAllAttractions: id => {
      dispatch(getAttractionsThunk(id));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(ExploreMap);
