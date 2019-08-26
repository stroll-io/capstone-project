import React, { useState } from 'react';
import { View, SafeAreaView, Modal } from 'react-native';
import { Button, Text, Form, Item, Input, Picker, Icon } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { ngrokSecret } from '../secrets';
import { connect } from 'react-redux';
import { getAllWalksThunk } from '../store/walks';
import { setActiveWalkThunk } from '../store/activeWalk';
import { AntDesign } from 'react-native-vector-icons';

function CreateWalk(props) {
  const [coords, setCoords] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [walkTitle, setWalkTitle] = useState('');
  const [walkDescription, setWalkDescription] = useState('');
  const [walkTag, setWalkTag] = useState('');

  const handleUndo = () => {
    const coordsCopy = coords.slice();
    coordsCopy.pop();
    setCoords(coordsCopy);
  };

  const handleCreate = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setWalkTitle('');
    setWalkDescription('');
  };

  const handleSubmit = async () => {
    await axios.post(`${ngrokSecret}/api/navPoints`, {
      coords,
      walkTitle,
      walkDescription,
      walkTag,
    });
    props.navigation.navigate('Explore');
    setIsModalVisible(false);
  };

  const handleStart = async () => {
    const { data } = await axios.post(`${ngrokSecret}/api/navPoints`, {
      coords,
      walkTitle,
      walkDescription,
      walkTag,
    });
    props.setActiveWalkThunk(data.id);
    setTimeout(() => {
      props.navigation.navigate('Walking Map');
      setIsModalVisible(false);
    }, 200);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: '80%' }}>
            <Text
              style={{
                fontFamily: 'Avenir-Heavy',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Tap the map to add points to your walk
            </Text>
          </View>
          <View style={{ width: '20%', justifyContent: 'center' }}>
            <AntDesign
              name="questioncircleo"
              size={25}
              color="black"
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                padding: 10,
              }}
            />
          </View>
        </View>
      </View>
      <MapView
        provider="google"
        style={{ flex: 18 }}
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
          bottom: 40,
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          console.log('onRequestClose');
        }}
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
