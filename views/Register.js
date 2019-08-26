import React from 'react';
import {
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
// import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { createAccount } from '../store/user';
import * as Haptics from 'expo-haptics';

// import DashboardContainer from './Dashboard';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await this.props.createAccount(
        this.state.firstName,
        this.state.email,
        this.state.password
      );
      if (user) {
        this.props.navigation.navigate('Dashboard');
      }
    } catch (err) {
      //this was handled in the thunk creator and rethrown here
      Haptics.notificationAsync();
    }
  }

  render() {
    return (
      <DismissKeyboard>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            source={require('../public/sunrise.png')}
            style={{ flex: 1 }}
          />
          <View style={{ position: 'absolute' }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Avenir-Heavy',
                  fontSize: 35,
                  marginBottom: 100,
                }}
              >
                Register for an account
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Avenir-Heavy',
                  fontSize: 20,
                  width: '30%',
                  marginRight: 5,
                }}
              >
                First Name:
              </Text>
              <TextInput
                placeholder="Bob"
                onChangeText={firstName => this.setState({ firstName })}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 20,
                  width: '68%',
                  height: 35,
                  paddingLeft: 10,
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
                paddingLeft: 10,
                paddingRight: 10,
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
                placeholder="bobloblaw@lawblog.com"
                onChangeText={email => this.setState({ email })}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 20,
                  width: '75%',
                  height: 35,
                  paddingLeft: 10,
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
                paddingLeft: 10,
                paddingRight: 10,
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
                placeholder="blahblahblah123"
                onChangeText={password => this.setState({ password })}
                style={{
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 20,
                  width: '70%',
                  height: 35,
                  paddingLeft: 10,
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
                <Text style={{ fontFamily: 'Avenir-Heavy' }}>Register</Text>
              </Button>
              {this.props.error && (
                <Text style={{ color: 'red' }}>
                  An account is already registered with this email
                </Text>
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
    error: state.user.error,
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    createAccount: (firstName, email, password) => {
      return dispatch(createAccount(firstName, email, password));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Register);
