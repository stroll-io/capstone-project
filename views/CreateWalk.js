import React, { useState } from 'react';
import { View, SafeAreaView, Modal } from 'react-native';
import { Button, Text, Form, Item, Input, Picker, Icon } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { ngrokSecret } from '../secrets';

export default function Map(props) {
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
    props.navigation.navigate('Explore')
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <MapView
        provider="google"
        style={{ flex: 1 }}
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
                    latitude: coord.latitude
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
        <Button large warning onPress={handleUndo} style={{ margin: 20 }}>
          <Text>Undo</Text>
        </Button>
        <Button large primary onPress={handleCreate} style={{ margin: 20 }}>
          <Text>Create</Text>
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
                  large
                  danger
                  style={{ margin: 20 }}
                  onPress={handleCancel}
                >
                  <Text>Cancel</Text>
                </Button>
                <Button
                  large
                  success
                  onPress={handleSubmit}
                  style={{ margin: 20 }}
                >
                  <Text>Create</Text>
                </Button>
              </View>
            </Form>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
