import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Modal, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Form, Item, Picker, Icon, Button } from 'native-base';
import { AntDesign } from 'react-native-vector-icons';
import {
  getAllAttractionsThunk,
  getAttractionsByTagThunk,
} from '../store/attractions';

function AttractionsMap(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    props.getAllAttractions();
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
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

  // let filter = 'Filter by tag';
  const handlePicker = e => {
    if (e === 'All Tags') {
      // filter = 'All Tags';
      props.getAllAttractions();
    } else {
      props.getAttractionsByTag(e);
      // filter = 'e[0].toUpperCase() + e.slice(1)';
    }
  };

  const pinColor = coord => {
    if (coord.category === 'architecture') {
      return '#478FCD';
    }
    if (coord.category === 'nature') {
      return '#5fAD46';
    }
    if (coord.category === 'art and museums') {
      return 'violet';
    }
    if (coord.category === 'historical') {
      return 'tomato';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Modal animationType="slide" transparent={false} visible={isModalVisible}>
        <Text style={{ marginTop: 50 }}>Here is some text in the modal</Text>
        <Button large info onPress={closeModal}>
          <Text>This closes the modal</Text>
        </Button>
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
                placeholder="Filter by Tag"
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
              paddingLeft: 190,
              left: 150,
            }}
            onPress={openModal}
          />
        </View>

        {props.attractions.length
          ? props.attractions.map(coord => {
              return (
                <Marker
                  key={coord.id}
                  title={coord.name}
                  description={coord.description}
                  pinColor={pinColor(coord)}
                  coordinate={{
                    longitude: coord.location.coordinates[1],
                    latitude: coord.location.coordinates[0],
                  }}
                />
              );
            })
          : null}
      </MapView>
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
