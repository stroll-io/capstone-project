import React from 'react';
import { Image, View } from 'react-native';
import { Text, Content, Container } from 'native-base';
import { fetchStarredWalks } from '../store/starredWalks';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class StarredWalks extends React.Component {
  static navigationOptions = {
    title: 'Starred Walks',
  };

  async componentDidMount() {
    await this.props.fetchStarredWalks(2);
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
            {this.props.starredWalks.length ? (
              this.props.starredWalks.map(walk => {
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
                              Walked: {walk.favorite_walks.createdAt}
                            </Text>
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
    fetchStarredWalks: userId => {
      dispatch(fetchStarredWalks(userId));
    },
  };
};

const mapStateToProps = state => {
  return {
    starredWalks: state.starredWalks,
  };
};

StarredWalks.propTypes = {
  fetchStarredWalks: propTypes.func,
  starredWalks: propTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredWalks);
