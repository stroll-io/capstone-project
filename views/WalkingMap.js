import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import { getAllPinsThunk } from '../store/userpins';
import { getAttractionsThunk } from '../store/attractions';
import { addSavedWalkThunk } from '../store/savedWalks';
import { addPastWalkThunk } from '../store/pastWalks';
import MapViewDirections from 'react-native-maps-directions';
import { googleSecret } from '../secrets';
import * as Haptics from 'expo-haptics';
import axios from 'axios';
import HTML from 'react-native-render-html';

function WalkingMap(props) {
  const [isWalkComplete, setIsWalkComplete] = useState(false);
  const [destination, setDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [hapticHasTriggered, setHapticHasTriggered] = useState(false);
  const [areDirectionsVisible, setDirectionsVisible] = useState(false);
  const [directions, setDirections] = useState('');

  useEffect(() => {
    props.getAttractions(props.activeWalk.id);
  }, []);

  const navPoints = [];
  props.activeWalk.navPoints.forEach(navPoint => {
    navPoints.push({
      latitude: navPoint.location.coordinates[0],
      longitude: navPoint.location.coordinates[1],
    });
  });

  const handleSave = () => {
    props.saveWalk(props.user.id, props.activeWalk.id);
  };

  const handleHome = () => {
    props.navigation.navigate('Dashboard');
  };

  const getDirections = async () => {
    let formattedNavPoints = [];
    for (let i = 0; i < navPoints.length; i++) {
      let currentPoint = `${navPoints[i].latitude}, ${navPoints[i].longitude}`;
      formattedNavPoints.push(currentPoint);
    }

    let directionsArr = [];

    for (let i = 0; i < formattedNavPoints.length - 1; i++) {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          formattedNavPoints[i]
        }&destination=${
          formattedNavPoints[i + 1]
        }&mode=walking&key=${googleSecret}`
      );
      res.data.routes[0].legs[0].steps.forEach(step => {
        directionsArr.push(step.html_instructions);
      });
    }
    setDirections(directionsArr.join('<br>'));
  };

  const handleOnReady = e => {
    setDestination(e.coordinates[e.coordinates.length - 1]);
    this.map.animateCamera({
      center: {
        latitude: e.coordinates[0].latitude,
        longitude: e.coordinates[0].longitude,
      },
    });
    getDirections();
  };

  const handleUserLocationChange = async e => {
    setUserLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
    checkCompletion();
  };

  const checkCompletion = () => {
    if (userLocation && destination) {
      let latDiff = userLocation.latitude - destination.latitude;
      let longDiff = userLocation.longitude - destination.longitude;

      if (latDiff < 0) latDiff = latDiff * -1;
      if (longDiff < 0) longDiff = longDiff * -1;

      if (latDiff < 0.0001 && longDiff < 0.0001) {
        setIsWalkComplete(true);
        if (!hapticHasTriggered) {
          Haptics.notificationAsync();
          setHapticHasTriggered(true);
          props.addPastWalk(props.user.id, props.activeWalk.id);
        }
      }
    }
  };

  const handleDirections = () => {
    setDirectionsVisible(true);
  };

  const closeDirections = () => {
    setDirectionsVisible(false);
  };

  const htmlStyles = { p: { fontSize: 30 } };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal animationType="slide" transparent={false} visible={isWalkComplete}>
        <View style={{ marginTop: 250 }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Avenir-Heavy"
            }}
          >
            Congratulations, you completed your walk!
          </Text>
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
              onPress={handleSave}
              style={{
                margin: 20,
                backgroundColor: "tomato",
                borderRadius: 20
              }}
            >
              <Text
                style={{
                  fontFamily: "Avenir-Heavy"
                }}
              >
                Save
              </Text>
            </Button>
            <Button
              large
              success
              onPress={handleHome}
              style={{
                backgroundColor: "#417dc1",
                borderRadius: 20,
                margin: 20
              }}
            >
              <Text
                style={{
                  fontFamily: "Avenir-Heavy"
                }}
              >
                Go to Dashboard
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={areDirectionsVisible}
      >
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Button
            medium
            onPress={closeDirections}
            style={{
              borderRadius: 20,
              position: "absolute",
              bottom: 50,
              left: 145,
              zIndex: 1000,
              backgroundColor: "tomato"
            }}
          >
            <Text style={{ fontFamily: "Avenir-Heavy" }}>Close</Text>
          </Button>
          {directions ? (
            <ScrollView
              style={{ marginTop: 70, marginBottom: 100, flex: 1, zIndex: 1 }}
            >
              <HTML
                html={directions}
                scalePageToFit={false}
                tagsStyles={htmlStyles}
              ></HTML>
            </ScrollView>
          ) : (
            <View>
              <ActivityIndicator
                style={{ marginTop: 300 }}
                size="large"
                color="#417dc1"
              ></ActivityIndicator>
            </View>
          )}
        </View>
      </Modal>
      <MapView
        provider="google"
        ref={_map => {
          this.map = _map;
        }}
        onUserLocationChange={handleUserLocationChange}
        showsUserLocation={true}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.895442,
          longitude: -87.638957,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <MapViewDirections
          origin={navPoints[0]}
          waypoints={navPoints.length > 2 ? navPoints.slice(1, -1) : null}
          destination={navPoints[navPoints.length - 1]}
          apikey={googleSecret}
          strokeWidth={4}
          strokeColor="blue"
          onReady={handleOnReady}
          mode="WALKING"
        />

        {props.attractions.length
          ? props.attractions.map(coord => {
              return (
                <Marker
                  key={coord.location.coordinates[1]}
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
        {navPoints.length ? (
          <Marker title={"Start"} coordinate={navPoints[0]} pinColor="green" />
        ) : null}
      </MapView>
      <View
        style={{
          display: "flex",
          position: "absolute",
          bottom: 30,
          left: 110,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Button
          onPress={handleDirections}
          style={{ backgroundColor: "#417dc1", borderRadius: 20, margin: 20 }}
        >
          <Text style={{ fontFamily: "Avenir-Heavy" }}>Directions</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const mapState = state => {
  return {
    userpins: state.userpins,
    activeWalk: state.activeWalk,
    user: state.user,
    attractions: state.attractions,
  };
};

const mapDispatch = dispatch => {
  return {
    getAllPins: () => {
      dispatch(getAllPinsThunk());
    },
    saveWalk: (userId, walkId) => {
      dispatch(addSavedWalkThunk(userId, walkId));
    },
    addPastWalk: (userId, walkId) => {
      dispatch(addPastWalkThunk(userId, walkId));
    },
    getAttractions: walkId => {
      dispatch(getAttractionsThunk(walkId));
    },
  };
};
WalkingMap.navigationOptions = {
  title: 'Strolling',
};
export default connect(
  mapState,
  mapDispatch
)(WalkingMap);
