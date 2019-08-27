import React from 'react';
import { Image, View, SafeAreaView, Modal } from 'react-native';
// import { Modal } from 'react-native-modal';
import {
  Button,
  Text,
  Content,
  Container,
  Form,
  Item,
  Picker,
  Icon,
} from 'native-base';
import { getAttractionsThunk } from '../store/attractions';
import { setActiveWalkThunk } from '../store/activeWalk';
import { addSavedWalkThunk } from '../store/savedWalks';
import { getAllWalksThunk, getWalksByTagThunk } from '../store/walks';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { AntDesign, SimpleLineIcons } from 'react-native-vector-icons';

class AllWalks extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
    };
    this.handlePicker = this.handlePicker.bind(this);
    this.handleWalkNavigation = this.handleWalkNavigation.bind(this);
    this.handleWalkInfo = this.handleWalkInfo.bind(this);
    this.handleSaveWalk = this.handleSaveWalk.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  static navigationOptions = {
    title: 'Recommended Walks',
  };

  async componentDidMount() {
    await this.props.getAllWalks();
  }

  openModal() {
    this.setState({
      isModalVisible: true,
    });
  }

  closeModal() {
    this.setState({
      isModalVisible: false,
    });
  }

  handlePicker(e) {
    if (e === 'View All') {
      this.props.getAllWalks();
    } else {
      this.props.getWalksByTag(e);
    }
  }

  handleWalkNavigation(walkId) {
    this.props.setActiveWalk(walkId);
    setTimeout(() => {
      this.props.navigation.navigate('Walking Map');
    }, 600);
  }

  handleWalkInfo(walkId) {
    this.props.setActiveWalk(walkId);
    this.props.getAttractions(walkId);
    this.props.navigation.navigate('WalkInfo');
  }

  handleSaveWalk(userId, walkId) {
    this.props.addSavedWalk(userId, walkId);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isModalVisible}
          style={{
            height: 300,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{ display: 'flex', flexDirection: 'column', margin: 50 }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Avenir-Heavy',
                  justifyContent: 'center',
                  marginTop: 50,
                }}
              >
                Here is some text in the modal
              </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Button
                style={{ justifyContent: 'center', borderRadius: 20 }}
                onPress={this.closeModal}
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
        <Container>
          <Content>
            <View>
              <View
                className="heading"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingBottom: 8,
                }}
              >
                <View style={{ width: '80%' }}>
                  <Form
                    style={{
                      margin: 5,
                      borderColor: 'black',
                      borderWidth: 2,
                      borderRadius: 20,
                      width: '50%',
                    }}
                  >
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        iosHeader="Filter"
                        placeholder="Filter by tag"
                        style={{
                          height: 30,
                          width: undefined,
                        }}
                        onValueChange={this.handlePicker}
                      >
                        <Picker.Item label="View All" value="none" />
                        <Picker.Item label="Nature" value="nature" />
                        <Picker.Item label="Scenic" value="scenic" />
                        <Picker.Item
                          label="Architecture"
                          value="architecture"
                        />
                        <Picker.Item label="Historical" value="historical" />
                      </Picker>
                    </Item>
                  </Form>
                </View>
                <View style={{ width: '18%', margin: 5 }}>
                  <AntDesign
                    name="questioncircleo"
                    size={30}
                    color="black"
                    onPress={this.openModal}
                  />
                </View>
              </View>
              {this.props.walks.length ? (
                this.props.walks.map(walk => {
                  let tag;
                  if (walk.category) {
                    tag =
                      walk.category[0].toUpperCase() + walk.category.slice(1);
                  }
                  return (
                    <View
                      key={walk.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: 245,
                        width: '100%',
                      }}
                    >
                      <View
                        className="cardTitle"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          borderWidth: 2,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          borderColor: '#859F3C',
                          justifyContent: 'space-around',
                          alignContent: 'center',
                          backgroundColor: '#859F3C',
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: '100%',
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 20,
                          }}
                        >
                          <View
                            style={{
                              width: '80%',
                              padding: 5,
                            }}
                          >
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 18,
                                fontFamily: 'Avenir-Heavy',
                              }}
                            >
                              {walk.name}
                            </Text>
                          </View>
                          <Button
                            onPress={() => {
                              this.handleWalkInfo(walk.id);
                            }}
                            style={{
                              width: '10%',
                              height: 38,
                              backgroundColor: '#859F3C',
                              borderRadius: 100,
                              justifyContent: 'center',
                            }}
                          >
                            <SimpleLineIcons
                              name="info"
                              size={25}
                              color="white"
                            />
                          </Button>
                        </View>
                      </View>
                      <View
                        className="cardBody"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          margin: 10,
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: 10,
                          }}
                        >
                          <View
                            className="cardText"
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '65%',
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Avenir-Heavy',
                              }}
                            >
                              {walk.description}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Avenir-Heavy',
                              }}
                            >
                              Distance: {walk.distance} mi
                            </Text>
                          </View>
                          <View>
                            <Image
                              source={require('../public/thumbnails/scenic.png')}
                              style={{
                                height: 80,
                                width: 80,
                              }}
                            />
                          </View>
                        </View>
                        <View
                          key={walk.id}
                          className="buttonPanel"
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}
                        >
                          <View
                            style={{
                              width: '35%',
                              borderRadius: 20,
                              backgroundColor: '#FFA614',
                              alignContent: 'center',
                              justifyContent: 'center',
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
                                <SimpleLineIcons
                                  name="tag"
                                  size={25}
                                  color="white"
                                />
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
                          <Button
                            onPress={() => {
                              this.handleSaveWalk(this.props.user.id, walk.id);
                            }}
                            style={{
                              width: '28%',
                              borderRadius: 20,
                              backgroundColor: 'tomato',
                              alignContent: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <View style={{ marginLeft: 8, marginRight: 5 }}>
                              <SimpleLineIcons
                                name="heart"
                                size={25}
                                color="white"
                              />
                            </View>
                            <Text
                              style={{
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: 14,
                                fontFamily: 'Avenir-Heavy',
                              }}
                            >
                              Save
                            </Text>
                          </Button>
                          <Button
                            onPress={() => {
                              this.handleWalkNavigation(walk.id);
                            }}
                            style={{
                              justifyContent: 'center',
                              alignContent: 'center',
                              width: '28%',
                              borderRadius: 20,
                              backgroundColor: '#417dc1',
                            }}
                          >
                            <View style={{ marginLeft: 8, marginRight: 5 }}>
                              <SimpleLineIcons
                                name="cursor"
                                size={20}
                                color="white"
                              />
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
                    </View>
                  );
                })
              ) : (
                <View />
              )}
            </View>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    walks: state.walks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllWalks: () => {
      dispatch(getAllWalksThunk());
    },
    getWalksByTag: tag => {
      dispatch(getWalksByTagThunk(tag));
    },
    setActiveWalk: walkId => {
      dispatch(setActiveWalkThunk(walkId));
    },
    getAttractions: walkId => {
      dispatch(getAttractionsThunk(walkId));
    },
    addSavedWalk: (userId, walkId) => {
      dispatch(addSavedWalkThunk(userId, walkId));
    },
  };
};

AllWalks.propTypes = {
  getAllWalks: propTypes.func,
  getWalksByTag: propTypes.func,
  setActiveWalk: propTypes.func,
  addSavedWalk: propTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllWalks);
