import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Modal } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { Form, Item, Picker, Icon } from 'native-base';
import { getAllWalksThunk, getWalksByTagThunk } from '../store/walks';
import { setActiveWalkThunk } from '../store/activeWalk';
import { getAttractionsThunk } from '../store/attractions';
import { AntDesign, SimpleLineIcons } from 'react-native-vector-icons';

function ExploreMap(props) {

  const [isModalVisible, setIsModalVisible] = useState(false);


  if (!props.activeWalk.navPoints) {
    props.activeWalk.navPoints = [];
  }
  useEffect(() => {
    props.getAllWalks();
  }, [props.activeWalk.navPoints]);


  const handlePicker = e => {
    if (e === 'All Walks') {
      props.getAllWalks();
    } else {
      props.getWalksByTag(e);
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Modal animationType="slide" transparent={false} visible={isModalVisible}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 50,
            marginTop: 100,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <SimpleLineIcons name="map" size={25} />
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Avenir-Heavy',
                justifyContent: 'center',
                marginLeft: 10,
              }}
            >
              Filter by tag to see the types of walks nearby. Tap on a walk to
              learn more about it.
            </Text>
          </View>
          <View style={{ justifyContent: 'center', marginTop: 30 }}>
            <Button
              style={{ justifyContent: 'center', borderRadius: 20 }}
              onPress={closeModal}
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
      <MapView
        provider="google"
        showsUserLocation={true}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.895442,
          longitude: -87.638957,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <View style={{ position: 'absolute', backgroundColor: 'white' }}>
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
                <Picker.Item label="All Walks" value="All Walks" />
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
        <View />
        {props.walks.length
          ? props.walks.map(walk => {
              return (
                <Marker
                  ref={_marker => {
                    this.marker = _marker;
                  }}
                  key={walk.name}
                  title={walk.name}
                  pinColor="#006aff"
                  description={walk.description}
                  onPress={() => {
                    props.setActiveWalk(walk.id);
                    props.getAllAttractions(walk.id);
                    props.navigation.navigate('WalkInfo');
                  }}
                  coordinate={{
                    longitude: walk.start.coordinates[1],
                    latitude: walk.start.coordinates[0],
                  }}
                >
                  <Callout>
                    <View>
                      <Text>{walk.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })
          : null}
      </MapView>
    </SafeAreaView>
  );
}

ExploreMap.navigationOptions = {
  title: 'Nearby Walks',
};

const mapState = state => {
  return {
    walks: state.walks,
    activeWalk: state.activeWalk,
  };
};

const mapDispatch = dispatch => {
  return {
    getAllWalks: () => {
      dispatch(getAllWalksThunk());
    },
    setActiveWalk: id => {
      dispatch(setActiveWalkThunk(id));
    },
    getWalksByTag: tag => {
      dispatch(getWalksByTagThunk(tag));
    },
    getAllAttractions: id => {
      dispatch(getAttractionsThunk(id));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(ExploreMap);
