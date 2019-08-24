import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Button, Text, Form, Item, Input, Picker, Icon } from 'native-base';
import { getAllPinsThunk, addPinThunk } from '../store/userpins';
import { getAllAttractionsThunk } from '../store/attractions';

function AttractionsMap(props) {
  const [isPinBeingAdded, setIsPinBeingAdded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coord, setCoord] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    props.getAllPins();
  }, []);

  const logLocationChange = e => {
    // console.log('location changed')
  };

  const addPin = () => {
    setIsPinBeingAdded(true);
  };

  const handleBack = () => {
    setIsModalVisible(false);
    setTitle('');
    setDescription('');
    setIsPinBeingAdded(false);
    setCoord(null);
  };

  const handleSubmit = async () => {
    props.addPin({
      coordinate: coord,
      title,
      description,
    });
    setIsPinBeingAdded(false);
    setIsModalVisible(false);
    setCoord(null);
    setTitle('');
    setDescription('');
  };

  // const handlePicker = (e) => {
  //   if (e === 'none') {
  //     props.getAllPins();
  //   } else {
  //     props.getPinsByTag(e);
  //   }
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          console.log('onRequestClose');
        }}
      >
        <View>
          <Text
            style={{
              marginTop: 150,
              marginBottom: 40,
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            Add some information to your pin.
          </Text>
          <Form>
            <Item>
              <Input
                placeholder="Title"
                value={title}
                onChangeText={text => {
                  setTitle(text);
                }}
              />
            </Item>
            <Item>
              <Input
                placeholder="Description"
                value={description}
                onChangeText={text => {
                  setDescription(text);
                }}
              />
            </Item>
          </Form>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 50,
            }}
          >
            <Button large danger style={{ margin: 20 }} onPress={handleBack}>
              <Text>Back</Text>
            </Button>
            <Button large success onPress={handleSubmit} style={{ margin: 20 }}>
              <Text>Create</Text>
            </Button>
          </View>
        </View>
      </Modal>
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
        onPress={e => {
          const newCoord = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          };
          setCoord(newCoord);
          if (isPinBeingAdded) {
            setIsModalVisible(true);
          }
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            width: '100%',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
            }}
          >
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  iosHeader="Legend"
                  placeholder="Filter by tag"
                  style={{ width: undefined }}
                  // onValueChange={handlePicker}
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
        </View>
        {isPinBeingAdded ? (
          <Text style={{ position: 'absolute', backgroundColor: 'white' }}>
            Tap the location where you would like to add a pin
          </Text>
        ) : (
          <Text></Text>
        )}
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
        <Button large primary style={{ margin: 0 }} onPress={addPin}>
          <Text style={{ textAlign: 'center' }}>Add Pin</Text>
        </Button>
        <Button large primary style={{ margin: 0 }} onPress={addPin}>
          <Text style={{ textAlign: 'center' }}>Legend</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const mapState = state => {
  return {
    attractions: state.attractions,
    userpins: state.userpins,
  };
};

const mapDispatch = dispatch => {
  return {
    getAttractions: () => dispatch(getAllAttractionsThunk()),
    getAllPins: () => {
      dispatch(getAllPinsThunk());
    },
    addPin: pin => {
      dispatch(addPinThunk(pin));
    },
  };
};
AttractionsMap.navigationOptions = {
  title: 'Nearby Attractions',
};
export default connect(
  mapState,
  mapDispatch
)(AttractionsMap);
