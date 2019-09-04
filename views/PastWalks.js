import React from 'react';
import { Text, View, Image } from 'react-native';
import { Content, Container, Button } from 'native-base';
import { fetchAllPastWalks } from '../store/pastWalks';
import { setActiveWalkThunk } from '../store/activeWalk';
import { addSavedWalkThunk } from '../store/savedWalks';
import { getAttractionsThunk } from '../store/attractions';

import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { SimpleLineIcons } from 'react-native-vector-icons';

class PastWalks extends React.Component {
  constructor() {
    super();
    this.handleWalkNavigation = this.handleWalkNavigation.bind(this);
    this.totalDistanceReducer = this.totalDistanceReducer.bind(this);
    this.handleSaveWalk = this.handleSaveWalk.bind(this);
    this.handleImageRender = this.handleImageRender.bind(this);
  }
  static navigationOptions = {
    title: 'Past Walks',
  };

  async componentDidMount() {
    await this.props.fetchAllPastWalks(this.props.user.id);
  }

  handleWalkInfo(walkId) {
    this.props.setActiveWalk(walkId);
    this.props.getAttractions(walkId);
    this.props.navigation.navigate('WalkInfo');
  }

  handleWalkNavigation(walkId) {
    this.props.setActiveWalk(walkId);
    setTimeout(() => {
      this.props.navigation.navigate('Walking Map');
    }, 600);
  }

  totalDistanceReducer(walkArray) {
    return walkArray.reduce((accum, currVal) => {
      return accum + currVal.distance;
    }, 0);
  }

  handleSaveWalk(userId, walkId) {
    this.props.addSavedWalk(userId, walkId);
  }

  handleImageRender(category) {
    switch (category) {
      case 'architecture':
        return require('../public/thumbnails/architecture.png');
      case 'dog':
        return require('../public/thumbnails/dog.png');
      case 'fountain':
        return require('../public/thumbnails/fountain.png');
      case 'historical':
        return require('../public/thumbnails/historical.png');
      case 'nature':
        return require('../public/thumbnails/nature.png');
      case 'scenic':
        return require('../public/thumbnails/scenic.png');
      default:
        return require('../public/sky.png');
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Avenir-Heavy', textAlign: 'center' }}>
                {this.props.pastWalks.length
                  ? `You've walked ${this.totalDistanceReducer(
                      this.props.pastWalks
                    ).toFixed(2)} miles so far - great job!`
                  : ''}
              </Text>
            </View>
            {this.props.pastWalks.length ? (
              this.props.pastWalks.map(walk => {
                let tag;
                if (walk.category) {
                  tag = walk.category[0].toUpperCase() + walk.category.slice(1);
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
                            onPress={() => {
                              this.handleWalkInfo(walk.id);
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
                            source={this.handleImageRender(walk.category)}
                            style={{
                              display: 'flex',
                              height: 80,
                              width: 80,
                              marginRight: 10,
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
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchAllPastWalks: userId => {
      dispatch(fetchAllPastWalks(userId));
    },
    setActiveWalk: walkId => {
      dispatch(setActiveWalkThunk(walkId));
    },
    addSavedWalk: (userId, walkId) => {
      dispatch(addSavedWalkThunk(userId, walkId));
    },
    getAttractions: walkId => {
      dispatch(getAttractionsThunk(walkId));
    },
  };
};

const mapStateToProps = state => {
  return {
    pastWalks: state.allPastWalks,
    user: state.user,
  };
};

PastWalks.propTypes = {
  fetchAllPastWalks: propTypes.func,
  pastWalks: propTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PastWalks);
