import React from 'react';
import { Text, View, Image } from 'react-native';
import { Content, Container, Button } from 'native-base';
import { fetchAllPastWalks } from '../store/pastWalks';
import { setActiveWalkThunk } from '../store/activeWalk';
import { addSavedWalkThunk } from '../store/savedWalks';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { SimpleLineIcons } from 'react-native-vector-icons';

class PastWalks extends React.Component {
  constructor() {
    super();
    this.handleWalkNavigation = this.handleWalkNavigation.bind(this);
    this.totalDistanceReducer = this.totalDistanceReducer.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  static navigationOptions = {
    title: 'Past Walks',
  };

  async componentDidMount() {
    await this.props.fetchAllPastWalks(this.props.user.id);
  }

  handleWalkNavigation(walkId) {
    this.props.setActiveWalkThunk(walkId);
    setTimeout(() => {
      this.props.navigation.navigate('Walking Map');
    }, 200);
  }

  totalDistanceReducer(walkArray) {
    return walkArray.reduce((accum, currVal) => {
      return accum + currVal.distance;
    }, 0);
  }

  handleSave(userId, walkId) {
    this.props.addSavedWalkThunk(userId, walkId);
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontWeight: '700', textAlign: 'center' }}>
              {this.props.pastWalks.length
                ? `You've walked ${this.totalDistanceReducer(
                    this.props.pastWalks
                  )} miles so far - great job!`
                : ''}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            {this.props.pastWalks.length ? (
              this.props.pastWalks.map(walk => {
                const type =
                  walk.category[0].toUpperCase() + walk.category.slice(1);
                return (
                  <View
                    key={walk.id}
                    style={{
                      height: 200,
                      width: '95%',
                      borderStyle: 'dashed',
                      borderWidth: 5,
                      borderColor: '#436904',
                      borderRadius: 25,
                      backgroundColor: '#b9cd74',
                      marginTop: 10,
                      marginBottom: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'center',
                        padding: 10,
                        textAlign: 'center',
                      }}
                    >
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                          }}
                        >
                          <Image
                            source={require('../public/thumbnails/dog.png')}
                            style={{
                              display: 'flex',
                              height: 100,
                              width: 100,
                              marginRight: 10,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            height: '90%',
                            width: '70%',
                            paddingTop: 5,
                            paddingBottom: 5,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Avenir-Heavy',
                              }}
                            >
                              {walk.name}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Avenir-Heavy',
                              }}
                            >
                              Type: {type}
                            </Text>
                          </View>
                          <View
                            style={{ display: 'flex', flexFlow: 'row-wrap' }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Avenir-Heavy',
                              }}
                            >
                              {walk.description}
                            </Text>
                          </View>
                          <View
                            style={{ display: 'flex', flexFlow: 'row-wrap' }}
                          >
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
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Avenir-Heavy',
                              }}
                            >
                              Walked:{' '}
                              {new Date(
                                walk.past_walks.createdAt
                              ).toDateString()}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                              <Button
                                style={{
                                  width: '30%',
                                  borderRadius: 20,
                                  marginRight: 10,
                                  backgroundColor: 'tomato',
                                  alignContent: 'center',
                                  justifyContent: 'center',
                                }}
                                onPress={() =>
                                  this.handleSave(this.props.user.id, walk.id)
                                }
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
                                onPress={() =>
                                  this.handleWalkNavigation(walk.id)
                                }
                                style={{
                                  borderRadius: '20px',
                                  width: '60%',
                                  justifyContent: 'center',
                                }}
                              >
                                <Text style={{ color: 'white' }}>
                                  Start this Walk
                                </Text>
                              </Button>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View />
                  </View>
                );
              })
            ) : (
              <Text />
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
    setActiveWalkThunk: walkId => {
      dispatch(setActiveWalkThunk(walkId));
    },
    addSavedWalkThunk: (userId, walkId) => {
      dispatch(addSavedWalkThunk(userId, walkId));
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
