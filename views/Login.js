import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, Text } from 'native-base';
import { fetchUser } from '../store/user';
import * as Haptics from 'expo-haptics';
import { AntDesign } from 'react-native-vector-icons';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.easyLogin = this.easyLogin.bind(this);
  }

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.fetchUser(this.state.email, this.state.password);
      this.props.navigation.navigate('Dashboard');
    } catch (err) {
      //this was handled in the thunk creator and rethrown here
      Haptics.notificationAsync();
    }
  }

  easyLogin() {
    this.props.fetchUser('test@test.com', 'test');
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={require('../public/cloud.png')} style={{ flex: 1 }} />
          <View style={{ position: 'absolute' }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Avenir-Heavy',
                  fontSize: 35,
                  marginBottom: 100,
                }}
                onPress={this.easyLogin}
              >
                Sign into your account
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Avenir-Heavy',
                  fontSize: 20,
                  width: '25%',
                }}
              >
                Email:
              </Text>
              <TextInput
                placeholder="test@test.com"
                onChangeText={email => this.setState({ email })}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 20,
                  width: '70%',
                  height: 35,
                  paddingLeft: 10,
                  marginRight: 5,
                }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                paddingBottom: 20,
                marginBottom: 50,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Avenir-Heavy',
                  fontSize: 20,
                  width: '30%',
                }}
              >
                Password:
              </Text>
              <TextInput
                secureTextEntry={true}
                placeholder="test"
                onChangeText={password => this.setState({ password })}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 20,
                  width: '65%',
                  height: 35,
                  paddingLeft: 10,
                  marginRight: 5,
                }}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Button
                style={{
                  backgroundColor: '#003e19',
                  borderRadius: 20,
                  marginBottom: 20,
                }}
                onPress={this.handleSubmit}
              >
                <Text style={{ fontFamily: 'Avenir-Heavy' }}>Login</Text>
              </Button>
              {this.props.error && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    margin: 10,
                  }}
                >
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Avenir-Heavy', color: 'red' }}>
                      Incorrect email or password
                    </Text>
                  </View>
                  <View style={{ padding: 5, justifyContent: 'center' }}>
                    <AntDesign name="frown" size={25} color="red" />
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

const mapState = state => {
  return {
    email: state.email,
    password: state.password,
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchUser: (email, password) => {
      return dispatch(fetchUser(email, password));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Login);
