import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button } from 'native-base';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import AttractionsMap from './AttractionsMap';
import ExploreMap from './ExploreMap';
import AllWalks from './AllWalks';
import CreateWalk from './CreateWalk';
import AccountInfo from './AccountInfo';
import PastWalks from './PastWalks';
import SavedWalks from './SavedWalks';
import WalkingMap from './WalkingMap';
import EditAccount from './EditAccount';
import PasswordReset from './PasswordReset';
import DeleteAccount from './DeleteAccount';
import { SimpleLineIcons } from 'react-native-vector-icons';
import Login from './Login';
import WalkInfo from './WalkInfo';

class Dashboard extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../public/sky.png')} style={{ flex: 1 }} />
        <View style={{ position: 'absolute' }}>
          <View style={{ marginLeft: 10, marginBottom: 20 }}>
            <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 35 }}>
              Welcome!
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontFamily: 'Avenir-Heavy' }}>
                Quick Start Guide:
              </Text>
            </View>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 8,
                    marginBottom: 8,
                  }}
                >
                  <View style={{ justifyContent: 'center', marginRight: 10 }}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        fontSize: 18,
                        fontFamily: 'Avenir-Heavy',
                      }}
                    >
                      To navigate between screens, click
                    </Text>
                  </View>
                  <View>
                    <SimpleLineIcons name="menu" size={25} color="black" />
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 14,
                      fontFamily: 'Avenir-Heavy',
                    }}
                  >
                    (Top right corner)
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                <View>
                  <Text style={{ fontSize: 18, fontFamily: 'Avenir-Heavy' }}>
                    To view walks, navigate to:
                  </Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Avenir-Heavy',
                    }}
                  >
                    - Recommended Walks (List View)
                  </Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Avenir-Heavy',
                    }}
                  >
                    - Explore Map (Map View)
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                <View>
                  <Text style={{ fontSize: 18, fontFamily: 'Avenir-Heavy' }}>
                    To view attractions, navigate to:
                  </Text>
                </View>
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Avenir-Heavy' }}>
                    - Nearby Attractions
                  </Text>
                </View>
              </View>

              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 8,
                    marginBottom: 8,
                  }}
                >
                  <View style={{ justifyContent: 'center', marginRight: 10 }}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        fontSize: 18,
                        fontFamily: 'Avenir-Heavy',
                      }}
                    >
                      For help: click
                    </Text>
                  </View>
                  <View>
                    <SimpleLineIcons name="question" size={25} color="black" />
                  </View>
                </View>
                {/* <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 14,
                      fontFamily: 'Avenir-Heavy',
                    }}
                  >
                    (Below each header)
                  </Text>
                </View> */}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 15,
                  marginBottom: 8,
                }}
              >
                <View style={{ justifyContent: 'center' }}>
                  <Text
                    style={{
                      justifyContent: 'center',
                      fontSize: 18,
                      fontFamily: 'Avenir-Heavy',
                      marginRight: 5,
                    }}
                  >
                    To save a walk, click
                  </Text>
                </View>

                <View
                  style={{
                    width: '28%',
                    borderRadius: 20,
                    backgroundColor: 'tomato',
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
                      <SimpleLineIcons name="heart" size={23} color="white" />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          alignContent: 'center',
                          color: 'white',
                          fontSize: 14,
                          fontFamily: 'Avenir-Heavy',
                        }}
                      >
                        Save
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 8,
                  marginBottom: 8,
                }}
              >
                <View style={{ justifyContent: 'center' }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Avenir-Heavy',
                      marginRight: 5,
                    }}
                  >
                    To start a walk, click
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '28%',
                    borderRadius: 20,
                    backgroundColor: '#417dc1',
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 5,
                      alignContent: 'center',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <View>
                      <SimpleLineIcons name="cursor" size={20} color="white" />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          alignContent: 'center',
                          color: 'white',
                          fontSize: 14,
                          fontFamily: 'Avenir-Heavy',
                          marginLeft: 5,
                        }}
                      >
                        Start!
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 8,
                  marginBottom: 8,
                }}
              >
                <View style={{ justifyContent: 'center', marginRight: 10 }}>
                  <Text
                    style={{
                      justifyContent: 'center',
                      fontSize: 18,
                      fontFamily: 'Avenir-Heavy',
                    }}
                  >
                    For more info about a walk, click
                  </Text>
                </View>
                <View>
                  <SimpleLineIcons name="info" size={25} color="black" />
                </View>
              </View>
              <View style={{ alignContent: 'center' }}>
                <Button
                  style={{
                    width: '50%',
                    backgroundColor: '#859F3C',
                    borderRadius: '20px',
                    marginBottom: 20,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('Recommended Walks')
                  }
                >
                  <Text
                    style={{ textAlign: 'center', fontFamily: 'Avenir-Heavy' }}
                  >
                    Get strollin'!
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const DashboardStackNavigator = createStackNavigator(
  {
    Dashboard: Dashboard,
    'Recommended Walks': AllWalks,
    'Nearby Attractions': AttractionsMap,
    Explore: ExploreMap,
    'Walking Map': WalkingMap,
    'Create Walk': CreateWalk,
    'Past Walks': PastWalks,
    'Saved Walks': SavedWalks,
    'Account Info': AccountInfo,
    EditAccount: EditAccount,
    PasswordReset: PasswordReset,
    DeleteAccount: DeleteAccount,
    WalkInfo: WalkInfo,
  },
  {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          borderBottomWidth: '0',
          backgroundColor: '#FFF',
          elevation: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Avenir-Heavy',
          fontWeight: 'bold',
        },
        headerRight: (
          <SimpleLineIcons
            name="menu"
            size={30}
            style={{ paddingRight: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        ),
      };
    },
  }
);

const DashboardNavigator = createDrawerNavigator(
  {
    Dashboard: DashboardStackNavigator,
    'Recommended Walks': AllWalks,
    'Nearby Attractions': AttractionsMap,
    Explore: ExploreMap,
    'Create Walk': CreateWalk,
    'Past Walks': PastWalks,
    'Saved Walks': SavedWalks,
    'Account Info': AccountInfo,
    Logout: Login,
  },
  {
    initialRouteName: 'Dashboard',
    drawerPosition: 'right',
    contentOptions: {
      labelStyle: { fontFamily: 'Avenir-Heavy' },
    },
  }
);

const DashboardContainer = createAppContainer(DashboardNavigator);

export default DashboardContainer;
