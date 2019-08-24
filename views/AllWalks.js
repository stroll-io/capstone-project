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
import { getAllWalksThunk, getWalksByTagThunk } from '../store/walks';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

class AllWalks extends React.Component {
  constructor() {
    super();
    this.state = {
      walks: [],
    };
    this.handlePicker = this.handlePicker.bind(this);
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <Content>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Form
                  style={{
                    margin: 5,
                    borderColor: 'black',
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                >
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      iosHeader="Filter"
                      placeholder="Filter by tag"
                      style={{ width: undefined }}
                      onValueChange={this.handlePicker}
                    >
                      <Picker.Item label="View All" value="none" />
                      <Picker.Item label="Nature" value="nature" />
                      <Picker.Item label="Scenic" value="scenic" />
                      <Picker.Item label="Architecture" value="architecture" />
                      <Picker.Item label="Historical" value="historical" />
                    </Picker>
                  </Item>
                </Form>
                <SimpleLineIcons name="info" size={30} color="#4F8EF7" />
              </View>
              {this.props.walks.length ? (
                this.props.walks.map(walk => {
                  return (
                    <View
                      key={walk.id}
                      style={{
                        height: 200,
                        width: '95%',
                        borderStyle: 'solid',
                        borderWidth: 2,
                        borderColor: 'black',
                        // borderRadius: 25,
                        // backgroundColor: '#9DBE76',
                        // backgroundColor: '#b9cd74',
                        marginTop: 5,
                        marginBottom: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          justifyContent: 'center',
                          padding: 5,
                          textAlign: 'center',
                        }}
                      >
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-around',
                              marginLeft: 10,
                              marginRight: 15,
                            }}
                          >
                            <Image
                              source={require('../public/thumbnails/fountain.png')}
                              style={{
                                display: 'flex',
                                height: 100,
                                width: 100,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              height: '90%',
                              width: '70%',
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
                                Distance:
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
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',

                                  alignContent: 'center',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginRight: 10,
                                    alignContent: 'center',
                                  }}
                                >
                                  <SimpleLineIcons
                                    name="tag"
                                    size={25}
                                    color="#4F8EF7"
                                  />
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      fontFamily: 'Avenir-Heavy',
                                      marginLeft: 5,
                                    }}
                                  >
                                    {walk.category}
                                  </Text>
                                </View>
                                <View style={{ marginRight: 10 }}>
                                  <SimpleLineIcons
                                    name="heart"
                                    size={25}
                                    color="#4F8EF7"
                                  />
                                </View>
                                <View style={{ marginRight: 10 }}>
                                  <SimpleLineIcons
                                    name="arrow-right-circle"
                                    size={25}
                                    color="#4F8EF7"
                                  />
                                </View>
                              </View>
                              {/* <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderWidth: 2,
                                borderColor: 'black',
                                borderRadius: 20,
                                alignContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontFamily: 'Avenir-Heavy',
                                }}
                              >
                                Start Walk!
                              </Text>
                            </View> */}
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
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllWalks: () => {
      dispatch(getAllWalksThunk());
    },
    getWalksByTag: tag => {
      dispatch(getWalksByTagThunk(tag));
    },
  };
};

const mapStateToProps = state => {
  return {
    walks: state.walks,
  };
};

AllWalks.propTypes = {
  getAllWalks: propTypes.func,
  getWalksByTag: propTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllWalks);
