import React, { useState } from 'react';
import { View, SafeAreaView, Modal } from 'react-native';
import { Button, Text, Form, Item, Input, Picker, Icon } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { ngrokSecret } from '../secrets';
import { connect } from 'react-redux';
import { getAllWalksThunk } from '../store/walks';
import { setActiveWalkThunk } from '../store/activeWalk';
import { AntDesign, SimpleLineIcons } from 'react-native-vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import { googleSecret } from '../secrets';

function CreateWalk(props) {
  const [coords, setCoords] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [walkTitle, setWalkTitle] = useState('');
  const [walkDescription, setWalkDescription] = useState('');
  const [distance, setDistance] = useState(0);
  const [walkTag, setWalkTag] = useState('');
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);

  const handleUndo = () => {
    const coordsCopy = coords.slice();
    coordsCopy.pop();
    setCoords(coordsCopy);
  };

  const handleCreate = () => {
    setIsCreateModalVisible(true);
  };

  const handleCancel = () => {
    setIsCreateModalVisible(false);
    setWalkTitle('');
    setWalkDescription('');
  };

  const handleSubmit = async () => {
    await axios.post(`${ngrokSecret}/api/navPoints`, {
      coords,
      walkTitle,
      walkDescription,
      walkTag,
      distance,
    });
    props.navigation.navigate('Explore');
    setIsCreateModalVisible(false);
  };

  const handleStart = async () => {
    const { data } = await axios.post(`${ngrokSecret}/api/navPoints`, {
      coords,
      walkTitle,
      walkDescription,
      walkTag,
      distance,
    });
    props.setActiveWalkThunk(data.id);
    setTimeout(() => {
      props.navigation.navigate('Walking Map');
      setIsCreateModalVisible(false);
    }, 200);
  };

  const openQuestionModal = () => {
    setIsQuestionModalVisible(true);
  };

  const closeQuestionModal = () => {
    setIsQuestionModalVisible(false);
  };

  const handleOnReady = event => {
    setDistance((event.distance * 0.621371).toFixed(2));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isQuestionModalVisible}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 50,
            marginTop: 100,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text
              style={{
                justifyContent: 'center',
                fontSize: 18,
                fontFamily: 'Avenir-Heavy',
                paddingLeft: 10,
              }}
            >
              To create a walk, start by touching the map where you would like
              to put down a pin.{' '}
            </Text>
            <SimpleLineIcons
              name="location-pin"
              size={25}
              color="tomato"
              style={{ paddingTop: 43, paddingLeft: 5 }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Avenir-Heavy',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 20,
                paddingLeft: 10,
              }}
            >
              Each pin acts as a point of navigation or interest along the walk.
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Button
              style={{ justifyContent: 'center', borderRadius: 20 }}
              onPress={closeQuestionModal}
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
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: '88%',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Avenir-Heavy',
                fontSize: 18,
                textAlign: 'center',
                paddingTop: 10,
              }}
            >
              Tap to add points to your walk
            </Text>
          </View>
          <View
            style={{
              width: '12%',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <AntDesign
              name="questioncircleo"
              size={27}
              color="black"
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                paddingTop: 10,
              }}
              onPress={openQuestionModal}
            />
          </View>
        </View>
      </View>
      <MapView
        provider="google"
        style={{ flex: 12 }}
        initialRegion={{
          latitude: 41.895442,
          longitude: -87.638957,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={e => {
          const newCord = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          };
          setCoords([...coords, newCord]);
        }}
      >
        <MapViewDirections
          origin={coords[0]}
          waypoints={coords.length > 2 ? coords.slice(1, -1) : null}
          destination={coords[coords.length - 1]}
          apikey={googleSecret}
          strokeWidth={4}
          strokeColor="blue"
          onReady={handleOnReady}
          mode="WALKING"
        />
        {coords.length
          ? coords.map(coord => {
              return (
                <Marker
                  key={coord.latitude}
                  coordinate={{
                    longitude: coord.longitude,
                    latitude: coord.latitude,
                  }}
                />
              );
            })
          : null}
      </MapView>
      <View
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 60,
          left: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Button
          onPress={handleUndo}
          style={{ backgroundColor: 'tomato', borderRadius: 20, margin: 20 }}
        >
          <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 18 }}>Undo</Text>
        </Button>
        <Button onPress={handleCreate} style={{ borderRadius: 20, margin: 20 }}>
          <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 18 }}>
            Create Walk
          </Text>
        </Button>
      </View>
      <Text
        style={{
          paddingTop: 10,
          paddingBottom: 5,
          textAlign: 'center',
          fontFamily: 'Avenir-Heavy',
        }}
      >
        Current Distance: {distance} mi
      </Text>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isCreateModalVisible}
        // onRequestClose={() => {
        //   console.log('onRequestClose');
        // }}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text
              style={{
                fontFamily: 'Avenir-Heavy',
                marginTop: 150,
                marginBottom: 40,
                textAlign: 'center',
                fontSize: 20,
              }}
            >
              Add some information about your stroll.
            </Text>
            <Form>
              <Item>
                <Input
                  placeholder="Name"
                  value={walkTitle}
                  onChangeText={text => {
                    setWalkTitle(text);
                  }}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Description"
                  value={walkDescription}
                  onChangeText={text => {
                    setWalkDescription(text);
                  }}
                />
              </Item>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  iosHeader="Select a tag"
                  placeholder="Select a tag"
                  style={{ width: undefined }}
                  selectedValue={walkTag}
                  onValueChange={setWalkTag}
                >
                  <Picker.Item label="Nature" value="nature" />
                  <Picker.Item label="Scenic" value="scenic" />
                  <Picker.Item label="Architecture" value="architecture" />
                  <Picker.Item label="Dog" value="dog" />
                  <Picker.Item label="Historical" value="historical" />
                  <Picker.Item label="Hiking" value="hiking" />
                  <Picker.Item label="Street art" value="street art" />
                </Picker>
              </Item>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 50,
                }}
              >
                <Button
                  small
                  success
                  onPress={handleSubmit}
                  style={{ margin: 10, borderRadius: 20 }}
                >
                  <Text style={{ fontFamily: 'Avenir-Heavy' }}>
                    Create and Save Walk
                  </Text>
                </Button>
                <Button
                  small
                  success
                  onPress={handleStart}
                  style={{ margin: 10, borderRadius: 20 }}
                >
                  <Text style={{ fontFamily: 'Avenir-Heavy' }}>
                    Create and Start Walk
                  </Text>
                </Button>
              </View>
              <View
                style={{ alignItems: 'flex-start', justifyContent: 'center' }}
              >
                <Button
                  small
                  danger
                  style={{
                    margin: 20,
                    width: 100,
                    justifyContent: 'center',

                    borderRadius: 20,
                  }}
                  onPress={handleCancel}
                >
                  <Text style={{ fontFamily: 'Avenir-Heavy' }}>Cancel</Text>
                </Button>
              </View>
            </Form>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

CreateWalk.navigationOptions = {
  title: 'Create Walk',
};

const mapDispatch = dispatch => {
  return {
    getAllWalks: () => {
      dispatch(getAllWalksThunk());
    },
    setActiveWalkThunk: walkId => {
      dispatch(setActiveWalkThunk(walkId));
    },
  };
};

export default connect(
  null,
  mapDispatch
)(CreateWalk);
