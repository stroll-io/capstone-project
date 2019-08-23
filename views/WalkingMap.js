import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import { getAllPinsThunk } from '../store/userpins';
import { getAttractionThunk } from '../store/attractions'
import { addStarredWalkThunk } from '../store/starredWalks';
import { addPastWalkThunk } from '../store/pastWalks'
import MapViewDirections from 'react-native-maps-directions';
import { googleSecret } from '../secrets';
import * as Haptics from 'expo-haptics';


function WalkingMap(props) {
  const [isWalkComplete, setIsWalkComplete] = useState(false);
  const [walkData,setWalkData] = useState(false);
  const [destination, setDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null)
  const [hapticHasTriggered, setHapticHasTriggered] = useState(false)

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

  const handleFavorite = () => {
    props.addFavoriteWalk(props.user.id, props.activeWalk.id);
  }

  const handleHome = () => {
    props.navigation.navigate('Dashboard');
  };

  const handleOnReady = e => {
    console.log('Walk Metadata : ', e);
    setWalkData(e);
    setDestination(e.coordinates[e.coordinates.length - 1]);
  };

    const handleUserLocationChange = async e => {
      // this.map.animateCamera({
      //   center: {
      //     latitude: e.nativeEvent.coordinate.latitude,
      //     longitude: e.nativeEvent.coordinate.longitude
      //   }
      // });
      setUserLocation({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
      });
      checkCompletion();
    };


  const checkCompletion = () => {
    if(userLocation && destination) {
      let latDiff = userLocation.latitude - destination.latitude;
      let longDiff = userLocation.longitude - destination.longitude;

      if (latDiff < 0) latDiff = latDiff * -1;
      if (longDiff < 0) longDiff = longDiff * -1;

      if (latDiff < 0.0001 && longDiff < 0.0001) {
        setIsWalkComplete(true);
        if (!hapticHasTriggered) {
          Haptics.notificationAsync();
          setHapticHasTriggered(true);
          props.addPastWalk(props.user.id, props.activeWalk.id)
        }
      }
    }

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isWalkComplete}
        onRequestClose={() => {
          console.log('onRequestClose');
        }}
      >
        <View style={{ marginTop: 250 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              textAlign: 'center',
            }}
          >
            Congratulations, you completed your walk!
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 50,
            }}
          >
            <Button
              large
              primary
              onPress={handleFavorite}
              style={{ margin: 20 }}
            >
              <Text>Add to Favorites</Text>
            </Button>
            <Button large success onPress={handleHome} style={{ margin: 20 }}>
              <Text>Go to Dashboard</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <MapView
        //initial region should be stateful based on users current location
        provider="google"
        ref={_map => {
          this.map = _map;
        }}
        onUserLocationChange={handleUserLocationChange}
        //e.nativeEvent is like this {target: 215, coordinate {
        // accuracy: 65
        // altitude: 182.97296142578125
        // altitudeAccuracy: 10
        // latitude: 41.89551621857361
        // longitude: -87.63895419445778
        // speed: -1
        // timestamp: 588017852300.918
        // }
        // }
        showsUserLocation={true}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.895442,
          longitude: -87.638957,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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
        {props.userpins.length
          ? props.userpins.map(coord => {
              return (
                <Marker
                  key={coord.location.coordinates[1]}
                  title={coord.name}
                  description={coord.description}
                  coordinate={{
                    longitude: coord.location.coordinates[1],
                    latitude: coord.location.coordinates[0],
                  }}
                />
              );
            })
          : null}
          {navPoints.length ?
        <Marker
          title={"Start"}
          coordinate={navPoints[0]}
          pinColor='green'
        />: null }
      </MapView>
      <View
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 40,
          left: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      />
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
    addFavoriteWalk: (userId, walkId) => {
      dispatch(addStarredWalkThunk(userId, walkId))
    },
    addPastWalk: (userId, walkId) => {
      dispatch(addPastWalkThunk(userId, walkId))
    },
    getAttractions: (walkId) => {
      dispatch(getAttractionThunk(walkId))
    }
  };
};
WalkingMap.navigationOptions = {
  title: "Strolling"
};
export default connect(
  mapState,
  mapDispatch
)(WalkingMap);
