import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { googleSecret } from '../secrets';
import { SimpleLineIcons } from 'react-native-vector-icons';
const WalkInfo = props => {
  const [navPoints, setNavPoints] = useState([]);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState({
    latitude: 41.884061,
    longitude: -87.633389,
  });

  useEffect(() => {
    const navArr = [];
    if (props.activeWalk.navPoints) {
      props.activeWalk.navPoints.forEach(navPoint => {
        navArr.push({
          latitude: navPoint.location.coordinates[0],
          longitude: navPoint.location.coordinates[1],
        });
      });
      setNavPoints(navArr);
    }
    if (props.activeWalk.start) {
      setStart(props.activeWalk.start);
      animateCamera(props.activeWalk);
    }
  }, [props.activeWalk]);

  const handleOnReady = e => {
    const roundedDuration = parseFloat(e.duration).toFixed(1);
    setDistance(parseFloat(e.distance / 1.609).toFixed(2));
    setDuration(roundedDuration);
    animateCamera(props.activeWalk);
  };

  const animateCamera = activeWalk => {
    this.map.animateCamera({
      center: {
        latitude: activeWalk.start.coordinates[0],
        longitude: activeWalk.start.coordinates[1],
      },
    });
  };

  const handleWalk = () => {
    setTimeout(() => {
      props.navigation.navigate('Walking Map');
    }, 600);
  };



  if (props.activeWalk.start) {
    const tag =
      props.activeWalk.category[0].toUpperCase() +
      props.activeWalk.category.slice(1);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            marginTop: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: 'Avenir-Heavy',
                  fontWeight: 'bold',
                  fontSize: 30,
                  textAlign: 'center',
                  marginBottom: 5,
                }}
              >
                {props.activeWalk.name}
              </Text>
            </View>

            <View
              style={{
                width: '35%',
                borderRadius: 20,
                backgroundColor: '#FFA614',
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-evenly',
                  padding: 5,
                }}
              >
                <View>
                  <SimpleLineIcons name="tag" size={25} color="white" />
                </View>
                <Text
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: 14,
                    fontFamily: 'Avenir-Heavy',
                  }}
                >
                  {tag}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 3 }}>
            <MapView
              ref={_map => {
                this.map = _map;
              }}
              provider="google"
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 41.884061,
                longitude: -87.633389,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              scrollEnabled={false}
            >
              {navPoints.length ? (
                <MapViewDirections
                  origin={navPoints[0]}
                  waypoints={
                    navPoints.length > 2 ? navPoints.slice(1, -1) : null
                  }
                  destination={navPoints[navPoints.length - 1]}
                  apikey={googleSecret}
                  strokeWidth={6}
                  strokeColor="green"
                  onReady={handleOnReady}
                  mode="WALKING"
                />
              ) : null}
              {props.attractions.length
                ? props.attractions.map(attraction => {
                    return (
                      <Marker
                        key={attraction.location.coordinates[1]}
                        title={attraction.name}
                        description={attraction.description}
                        coordinate={{
                          longitude: attraction.location.coordinates[1],
                          latitude: attraction.location.coordinates[0],
                        }}
                      />
                    );
                  })
                : null}
            </MapView>
          </View>
          <View style={{ margin: 10, flex: 1 }}>
            <Text style={{ fontSize: 14, fontFamily: 'Avenir-Heavy' }}>
              Total Distance: {distance} miles
            </Text>
            <Text style={{ fontSize: 14, fontFamily: 'Avenir-Heavy' }}>
              Average Time: {duration} minutes
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Avenir-Heavy',
                marginTop: 30,
              }}
            >
              Description: {props.activeWalk.description}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 50,
              flex: 1,
            }}
          >
            <Button
              onPress={handleWalk}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                width: '28%',
                borderRadius: 20,
                backgroundColor: '#417dc1',
              }}
            >
              <View style={{ marginLeft: 8, marginRight: 5 }}>
                <SimpleLineIcons name="cursor" size={20} color="white" />
              </View>
              <Text
                style={{
                  alignContent: 'center',
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'Avenir-Heavy',
                }}
              >
                Start!
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <ActivityIndicator
          style={{ marginTop: 300 }}
          size="large"
          color="#417dc1"
        ></ActivityIndicator>
      </View>
    );
  }
};

const mapState = state => {
  return {
    activeWalk: state.activeWalk,
    attractions: state.attractions,
  };
};

export default connect(mapState)(WalkInfo);
