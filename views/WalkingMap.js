import React, { useEffect } from 'react';
import { View, SafeAreaView, Modal } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { getAllPinsThunk } from '../store/userpins';
import MapViewDirections from 'react-native-maps-directions';
import { googleSecret } from '../secrets';

function WalkingMap(props) {
  useEffect(() => {
    props.getAllPins();
  }, []);

  const navPoints = [];
  props.activeWalk.navPoints.forEach(navPoint => {
    navPoints.push({
      latitude: navPoint.location.coordinates[0],
      longitude: navPoint.location.coordinates[1],
    });
  });
  // console.log('here are your navPoints :', navPoints);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <MapView
        //initial region should be stateful based on users current location
        provider="google"
        ref={_map => {
          this.map = _map;
        }}
        onUserLocationChange={async e => {
          this.map.animateCamera({
            center: {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            },
          });
        }}
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
        />
        {props.userpins.length
          ? props.userpins.map(coord => {
              // console.log('chord:', coord);
              return (
                <Marker
                  key={coord.name}
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
        {/* {props.activeWalk.navPoints.length ? (
          <Polyline
            coordinates={navPoints}
            strokeColor="#EE6A22"
            strokeWidth={3}
          />
        ) : null} */}
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
  };
};

const mapDispatch = dispatch => {
  return {
    getAllPins: () => {
      dispatch(getAllPinsThunk());
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(WalkingMap);
