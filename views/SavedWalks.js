import React from 'react';
import { Image, View } from 'react-native';
import { Text, Content, Container, Button } from 'native-base';
import { fetchSavedWalks } from '../store/savedWalks';
import { setActiveWalkThunk } from '../store/activeWalk';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class SavedWalks extends React.Component {
  constructor() {
    super();
    this.handleWalkNavigation = this.handleWalkNavigation.bind(this);
  }
  static navigationOptions = {
    title: 'Saved Walks',
  };

  async componentDidMount() {
    await this.props.fetchSavedWalks(this.props.user.id);
  }

  handleWalkNavigation(walkId) {
    this.props.setActiveWalkThunk(walkId);
    setTimeout(() => {
      this.props.navigation.navigate('Walking Map');
    }, 200);
  }

  render() {
    return (
      <Container>
        <Content>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            {this.props.savedWalks.length ? (
              this.props.savedWalks.map(walk => {
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
                      // backgroundColor: '#9DBE76',
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
                            source={require('../public/thumbnails/fountain.png')}
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
                          <View>
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: 'Avenir-Heavy',
                              }}
                            >
                              {walk.description}
                            </Text>
                          </View>
                          <View>
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
                              Walked: {walk.saved_walks.createdAt}
                            </Text>
                            <Button
                              onPress={() => this.handleWalkNavigation(walk.id)}
                              style={{ borderRadius: '20px', width: '60%' }}
                            >
                              <Text>Start this Walk</Text>
                            </Button>
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
    fetchSavedWalks: userId => {
      dispatch(fetchSavedWalks(userId));
    },
    setActiveWalkThunk: walkId => {
      dispatch(setActiveWalkThunk(walkId));
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedWalks);
