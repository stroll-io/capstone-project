import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
// import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Button, Text } from 'native-base';
// import DashboardContainer from './Dashboard';
// import { fetchUser } from '../store/user';

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
  }

  static navigationOptions = {
    header: null,
  };

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
                placeholder="Email"
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
                placeholder="Password"
                secureTextEntry={true}
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
                onPress={() => this.props.navigation.navigate('Dashboard')}
              >
                <Text style={{ fontFamily: 'Avenir-Heavy' }}>Login</Text>
              </Button>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

export default Login;

// const LoginNavigator = createSwitchNavigator(
//   {
//     Login: Login,
//     Dashboard: DashboardContainer,
//   },
//   {
//     initialRouteName: 'Login',
//     headerStyle: {
//       headerMode: 'none',
//     },
//   }
// );

// const LoginContainer = createAppContainer(LoginNavigator);

// const mapState = state => {
//   return {
//     email: state.email,
//     password: state.password,
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     fetchUser: (email, password) => {
//       dispatch(fetchUser(email, password));
//     },
//   };
// };

// export default connect(
//   mapState,
//   mapDispatch
// )(Login);
