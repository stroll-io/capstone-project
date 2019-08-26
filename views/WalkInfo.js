import React, { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import MapView, {Marker} from "react-native-maps";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { googleSecret } from "../secrets";




const WalkInfo = (props) => {
    const [navPoints, setNavPoints] = useState([])
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [start, setStart] = useState({
      latitude: 41.884061,
      longitude: -87.633389
    });


  useEffect(() => {
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
    if(props.activeWalk.start) {
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

  const animateCamera = (activeWalk) => {
    this.map.animateCamera({
      center: {
        latitude: activeWalk.start.coordinates[0],
        longitude: activeWalk.start.coordinates[1]
      }
    }
    )
  }

  const handleWalk = () => {
    setTimeout(() => {
      props.navigation.navigate("Walking Map");
    }, 1000);
  };

  if (props.activeWalk.start) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ marginTop: 20, flex: 1 }}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                textAlign: "center",
                marginBottom: 5
              }}
            >
              {props.activeWalk.name}
            </Text>
            <Text style={{ textAlign: "center", marginBottom: 5 }}>
              Type: {props.activeWalk.category}
            </Text>
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
                longitudeDelta: 0.02
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
                          latitude: attraction.location.coordinates[0]
                        }}
                      />
                    );
                  })
                : null}
            </MapView>
          </View>
          <View style={{ marginTop: 5, flex: 1 }}>
            <Text>
              {distance} miles {duration} minutes
            </Text>
            <Text style={{ marginTop: 30, flex: 1 }}>
              {props.activeWalk.description}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 50,
              flex: 1
            }}
          >
            {/* <Button large warning onPress={handleCancel} style={{ margin: 20 }}>
              <Text>Back</Text>
            </Button> */}
            <Button large primary onPress={handleWalk} style={{ margin: 20 }}>
              <Text>Start Walk</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

}

const mapState = state => {
  return {
    activeWalk: state.activeWalk,
    attractions: state.attractions
  };
};


export default connect(
  mapState
)(WalkInfo);
