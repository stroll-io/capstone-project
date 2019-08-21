import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { fetchLoggedInUser } from '../store/user';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
class AccountInfo extends React.Component {
  componentDidMount() {
    this.props.fetchLoggedInUser(2);
  }
  //navigation header update
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 20 }}>
            Your account details:{' '}
          </Text>
        </View>
        <View>
          <View>
            {this.props.loggedInUser.firstName ? (
              <>
                <Text style={{ fontWeight: '700', marginBottom: 2 }}>
                  First Name: {this.props.loggedInUser.firstName}
                </Text>
                <Text style={{ fontWeight: '700' }}>
                  Email: {this.props.loggedInUser.email}
                </Text>
                <Button rounded primary style={{ marginTop: 15 }}>
                  <Text>Edit Info</Text>
                </Button>
                <Button rounded primary style={{ marginTop: 15 }}>
                  <Text>Request password reset</Text>
                </Button>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
          <Button rounded danger style={{ marginTop: 300 }}>
            <Text style={{ alignSelf: 'center' }}>Delete account</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLoggedInUser: userId => {
      dispatch(fetchLoggedInUser(userId));
    },
  };
};

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

AccountInfo.propTypes = {
  fetchLoggedInUser: propTypes.func,
  loggedInUser: propTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountInfo);
