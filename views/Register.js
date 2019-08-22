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

  handleSubmit(event) {
    try {
      event.preventDefault();
      this.props.createAccount(
        this.state.firstName,
        this.state.email,
        this.state.password
      );
      this.props.navigation.navigate('Dashboard');
    } catch (err) {
      console.log(err);
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
            </View>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

// const RegisterNavigator = createSwitchNavigator(
//   {
//     Register: Register,
//     Dashboard: DashboardContainer,
//   },
//   {
//     initialRouteName: 'Register',
//   }
// );

// const RegisterContainer = createAppContainer(RegisterNavigator);

const mapState = state => {
  return {
    firstName: state.firstName,
    email: state.email,
    password: state.password,
  };
};

const mapDispatch = dispatch => {
  return {
    createAccount: (firstName, email, password) => {
      dispatch(createAccount(firstName, email, password));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Register);
