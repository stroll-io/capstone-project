import React from 'react';
import { Image, View, SafeAreaView } from 'react-native';
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
import { getAllWalksThunk, getWalksByTagThunk } from '../store/walks';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { AntDesign, SimpleLineIcons } from 'react-native-vector-icons';

class AllWalks extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   walks: [],
    // };
    this.handlePicker = this.handlePicker.bind(this);
    this.handleWalkNavigation = this.handleWalkNavigation.bind(this);
    this.handleWalkInfo = this.handleWalkInfo.bind(this);
  }

  static navigationOptions = {
    title: 'Recommended Walks',
  };

  async componentDidMount() {
    await this.props.getAllWalks();
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
    }, 200);
  }

  handleWalkInfo(walkId) {
    this.props.setActiveWalk(walkId);
    this.props.getAttractions(walkId);
    this.props.navigation.navigate('WalkInfo');
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                  <AntDesign name="questioncircleo" size={30} color="black" />
                </View>
              </View>
              {this.props.walks.length ? (
                this.props.walks.map(walk => {
                  const tag =
                    walk.category[0].toUpperCase() + walk.category.slice(1);
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
                              backgroundColor: 'tomato',
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
                              Distance:
                            </Text>
                          </View>
                          <View>
                            <Image
                              source={require('../public/thumbnails/fountain.png')}
                              style={{
                                height: 80,
                                width: 80,
                              }}
                            />
                          </View>
                        </View>
                        <View
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
  };
};

AllWalks.propTypes = {
  getAllWalks: propTypes.func,
  getWalksByTag: propTypes.func,
  setActiveWalk: propTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllWalks);
