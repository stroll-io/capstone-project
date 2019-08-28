import React from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class AccountInfo extends React.Component {
  static navigationOptions = {
    title: 'Account Info',
  };

  render() {
    return (
      <>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={require('../public/sky.png')} style={{ flex: 1 }} />
          <View style={{ position: 'absolute' }}>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: 'Avenir-Heavy',
                  marginBottom: 20,
                  marginTop: 40,
                }}
              >
                Your account details:{' '}
              </Text>
            </View>
            <View>
              <View>
                {this.props.user.firstName ? (
                  <>
                    <Text
                      style={{ fontFamily: 'Avenir-Heavy', marginBottom: 2 }}
                    >
                      First Name: {this.props.user.firstName}
                    </Text>
                    <Text style={{ fontFamily: 'Avenir-Heavy' }}>
                      Email: {this.props.user.email}
                    </Text>
                    <Button
                      rounded
                      primary
                      style={{ marginTop: 15, justifyContent: 'center' }}
                      onPress={() =>
                        this.props.navigation.navigate('EditAccount')
                      }
                    >
                      <Text style={{ fontFamily: 'Avenir-Heavy' }}>
                        Edit Info
                      </Text>
                    </Button>
                    <Button
                      rounded
                      primary
                      style={{ marginTop: 15, justifyContent: 'center' }}
                      onPress={() =>
                        this.props.navigation.navigate('PasswordReset')
                      }
                    >
                      <Text style={{ fontFamily: 'Avenir-Heavy' }}>
                        Request password reset
                      </Text>
                    </Button>
                  </>
                ) : (
                  <Text style={{ fontFamily: 'Avenir-Heavy' }}>Loading...</Text>
                )}
              </View>
              <Button
                rounded
                danger
                style={{ marginTop: 300, justifyContent: 'center' }}
                onPress={() => this.props.navigation.navigate('DeleteAccount')}
              >
                <Text
                  style={{ fontFamily: 'Avenir-Heavy', alignSelf: 'center' }}
                >
                  Delete account
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mergeProps = (state, dispatch, ownProps) => {
  return {
    ...ownProps,
    ...state,
    ...dispatch,
  };
};

AccountInfo.propTypes = {
  fetchLoggedInUser: propTypes.func,
  loggedInUser: propTypes.object,
};

export default connect(
  mapStateToProps,
  mergeProps
)(AccountInfo);
