import React from 'react';
import { Image, View } from 'react-native';
import { Text, Content, Container, Button } from 'native-base';
import { fetchSavedWalks, removeSavedWalkThunk } from '../store/savedWalks';
import { setActiveWalkThunk } from '../store/activeWalk';
import { getAttractionsThunk } from '../store/attractions';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { SimpleLineIcons } from 'react-native-vector-icons';

class SavedWalks extends React.Component {
  constructor() {
    super();
    this.handleWalkNavigation = this.handleWalkNavigation.bind(this);
    this.handleWalkInfo = this.handleWalkInfo.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  static navigationOptions = {
    title: 'Saved Walks',
  };

  async componentDidMount() {
    await this.props.fetchSavedWalks(this.props.user.id);
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

  handleRemove(userId, walkId) {
    this.props.removeSavedWalk(userId, walkId);
  }

  render() {
    return (
      <Container>
        <Content>
          <View>
            {this.props.savedWalks.length ? (
              this.props.savedWalks.map(walk => {
                let tag;
                if (walk.category) {
                  tag = walk.category[0].toUpperCase() + walk.category.slice(1);
                }
                return (
                  <View
                    className="card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      height: 245,
                      width: '100%',
                    }}
                    key={walk.id}
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
                          onPress={() =>
                            this.handleRemove(this.props.user.id, walk.id)
                          }
                          style={{
                            width: '28%',
                            borderRadius: 20,
                            backgroundColor: 'tomato',
                            alignContent: 'center',
                            justifyContent: 'center',
                            paddingLeft: 10,
                            paddingRight: 5,
                          }}
                        >
                          <View style={{ paddingLeft: 10 }}>
                            <SimpleLineIcons
                              name="close"
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
                            Remove
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
    fetchSavedWalks: userId => {
      dispatch(fetchSavedWalks(userId));
    },
    setActiveWalk: walkId => {
      dispatch(setActiveWalkThunk(walkId));
    },
    getAttractions: walkId => {
      dispatch(getAttractionsThunk(walkId));
    },
    removeSavedWalk: (userId, walkId) => {
      dispatch(removeSavedWalkThunk(userId, walkId));
    },
  };
};

const mapStateToProps = state => {
  return {
    savedWalks: state.savedWalks,
    user: state.user,
  };
};

SavedWalks.propTypes = {
  fetchSavedWalks: propTypes.func,
  savedWalks: propTypes.array,
  setActiveWalk: propTypes.func,
  removeSavedWalk: propTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedWalks);
