import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Button, Text, Form, Item, Input, Picker, Icon } from 'native-base';
import {
  getAllAttractionsThunk,
  getAttractionsByTagThunk,
} from '../store/attractions';

function AttractionsMap(props) {
  useEffect(() => {
    props.getAllAttractions();
  }, []);

  const logLocationChange = e => {
    // console.log('location changed')
  };

  // const handleBack = () => {
  //   setIsModalVisible(false);
  //   setTitle('');
  //   setDescription('');
  //   setIsPinBeingAdded(false);
  //   setCoord(null);
  // };

  // const handleSubmit = async () => {
  //   props.addPin({
  //     coordinate: coord,
  //     title,
  //     description,
  //   });
  //   setIsPinBeingAdded(false);
  //   setIsModalVisible(false);
  //   setCoord(null);
  //   setTitle('');
  //   setDescription('');
  // };

  const handlePicker = e => {
    if (e === 'All Tags') {
      props.getAllAttractions();
    } else {
      props.getAttractionsByTag(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
          longitudeDelta: 0.0421,
        }}
        // onPress={e => {
        //   const newCoord = {
        //     latitude: e.nativeEvent.coordinate.latitude,
        //     longitude: e.nativeEvent.coordinate.longitude,
        //   };
        //   setCoord(newCoord);
        //   if (isPinBeingAdded) {
        //     setIsModalVisible(true);
        //   }
        // }}
      >
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
          }}
        >
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
                <Picker.Item label="All Tags" value="none" />
                <Picker.Item label="Architecture" value="architecture" />
                <Picker.Item label="Art and Museums" value="art and museums" />
                <Picker.Item label="Historical" value="historical" />
                <Picker.Item label="Nature" value="nature" />
                <Picker.Item label="Scenic" value="scenic" />
              </Picker>
            </Item>
          </Form>
        </View>

        {props.attractions.length
          ? props.attractions.map(coord => {
              return (
                <Marker
                  key={coord.id}
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
      </MapView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 40,
          // left: 120,
          // right: 120,
        }}
      >
        <Button large primary style={{ margin: 0 }}>
          <Text style={{ textAlign: 'center' }}>More Info</Text>
        </Button>
        <Button large primary style={{ margin: 0 }}>
          <Text style={{ textAlign: 'center' }}>Legend</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

AttractionsMap.navigationOptions = {
  title: 'Nearby Attractions',
};

const mapState = state => {
  return {
    attractions: state.attractions,
  };
};

const mapDispatch = dispatch => {
  return {
    getAllAttractions: () => dispatch(getAllAttractionsThunk()),
    getAttractionsByTag: tag => dispatch(getAttractionsByTagThunk(tag)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(AttractionsMap);
