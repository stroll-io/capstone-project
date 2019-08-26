import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Modal, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { Form, Item, Picker, Icon } from 'native-base';
import { getAllWalksThunk, getWalksByTagThunk } from '../store/walks';
import { setActiveWalkThunk } from '../store/activeWalk';
import MapViewDirections from "react-native-maps-directions";
import { googleSecret } from "../secrets";
import { getAttractionsThunk } from '../store/attractions'

function ExploreMap(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coordinate, setCoordinate] = useState({
    latitude: 41.88407,
    longitude: -87.630634
  });
  const [category, setCategory] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [id, setId] = useState(null);
  const [navPoints, setNavPoints]  = useState([]);
  const [isMapReady, setIsMapReady] = useState(false)
  const [isDirectionsReady, setIsDirectionsReady] = useState(false)
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!props.activeWalk.navPoints) {
    props.activeWalk.navPoints = []
  }
  useEffect(() => {
    props.getAllWalks();
    const navArr = [];
    if (props.activeWalk.navPoints) {
      props.activeWalk.navPoints.forEach(navPoint => {
        navArr.push({
          latitude: navPoint.location.coordinates[0],
          longitude: navPoint.location.coordinates[1]
        });
      });
      setNavPoints(navArr);
    }
    }, [props.activeWalk.navPoints]);

  const handleCancel = () => {
    setIsModalVisible(false);
    currentMarker.hideCallout();
  };

  const handleWalk = () => {
    props.setActiveWalk(id);
    setTimeout(() => {
      setIsModalVisible(false);
      props.navigation.navigate('Walking Map');
    }, 1000);
  };

  const handlePicker = e => {
    if (e === 'none') {
      props.getAllWalks();
    } else {
      props.getWalksByTag(e);
    }
  }

  const handleOnMapReady = (e) => {
    if(!isMapReady)
    setIsMapReady(true)
  }

  const handleOnReady = (e) => {
    const roundedDuration = parseFloat(e.duration).toFixed(2);
    setDistance(e.distance / 1.609);
    setDuration(roundedDuration)
    if (!isDirectionsReady) setIsDirectionsReady(true)
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
        <View style={{ marginTop: 75, flex: 1 }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                textAlign: "center",
                marginBottom: 5
              }}
            >
              {name}
            </Text>
            <Text style={{ textAlign: "center", marginBottom: 5 }}>
              Type: {category}
            </Text>
          </View>
          <View style={{flex: 3}}>
            <MapView
              provider="google"
              style={{ flex: 1 }}
              initialRegion={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
              scrollEnabled={false}
              onMapReady={handleOnMapReady}
            />
            { navPoints.length ?
            <MapViewDirections
              origin={navPoints[0]}
              waypoints={navPoints.length > 2 ? navPoints.slice(1, -1) : null}
              destination={navPoints[navPoints.length - 1]}
              apikey={googleSecret}
              strokeWidth={6}
              strokeColor="green"
              onReady={handleOnReady}
              mode="WALKING"
            /> : null}
          </View>
          <Text style={{ margin: 20, flex: 1 }}>
            {distance} miles {duration} minutes
          </Text>
          <Text style={{ margin: 20, flex: 1 }}>{description}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 50,
              flex: 1
            }}
          >
            <Button large warning onPress={handleCancel} style={{ margin: 20 }}>
              <Text>Back</Text>
            </Button>
            <Button large primary onPress={handleWalk} style={{ margin: 20 }}>
              <Text>Start Walk</Text>
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
        <View style={{ position: 'absolute', backgroundColor: 'white' }}>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                iosHeader="Filter"
                placeholder="Filter by tag"
                style={{ width: undefined }}
                onValueChange={handlePicker}
              >
                <Picker.Item label="none" value="none" />
                <Picker.Item label="Nature" value="nature" />
                <Picker.Item label="Scenic" value="scenic" />
                <Picker.Item label="Architecture" value="architecture" />
                <Picker.Item label="Dog" value="dog" />
                <Picker.Item label="Historical" value="historical" />
                <Picker.Item label="Hiking" value="hiking" />
                <Picker.Item label="Street art" value="street art" />
              </Picker>
            </Item>
          </Form>
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
                  pinColor="#006aff"
                  description={walk.description}
                  onPress={() => {
                    props.setActiveWalk(walk.id)
                    props.getAllAttractions(walk.id)
                    props.navigation.navigate('WalkInfo')
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
              );
            })
          : null}
      </MapView>
    </SafeAreaView>
  );
}

ExploreMap.navigationOptions = {
  title: "Nearby Walks"
};

const mapState = state => {
  return {
    walks: state.walks,
    activeWalk: state.activeWalk
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
      dispatch(getWalksByTagThunk(tag))
    },
    getAllAttractions: id => {
      dispatch(getAttractionsThunk(id))
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(ExploreMap);
