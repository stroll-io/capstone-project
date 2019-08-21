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
          <Text>Your account details: </Text>
        </View>
        <View>
          <View>
            {this.props.loggedInUser.firstName ? (
              <>
                <Text>First Name: {this.props.loggedInUser.firstName}</Text>
                <Text>Email: {this.props.loggedInUser.email}</Text>
                <Button>
                  <Text>Edit Info</Text>
                </Button>
                <Button>
                  <Text>Request password reset</Text>
                </Button>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
          <Button>
            <Text>Delete account</Text>
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
