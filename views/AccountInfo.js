import React from 'react';
import { View, Modal } from 'react-native';
import { Button, Text } from 'native-base';
import { fetchLoggedInUser } from '../store/user';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import EditAccount from './EditAccount';
import { createStackNavigator } from 'react-navigation';

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
      <>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                marginBottom: 20,
                marginTop: 40,
              }}
            >
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
                  <Button
                    rounded
                    primary
                    style={{ marginTop: 15, justifyContent: 'center' }}
                  >
                    <Text>Edit Info</Text>
                  </Button>
                  <Button
                    rounded
                    primary
                    style={{ marginTop: 15, justifyContent: 'center' }}
                  >
                    <Text>Request password reset</Text>
                  </Button>
                </>
              ) : (
                <Text>Loading...</Text>
              )}
            </View>
            <Button
              rounded
              danger
              style={{ marginTop: 300, justifyContent: 'center' }}
            >
              <Text style={{ alignSelf: 'center' }}>Delete account</Text>
            </Button>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => {
            console.log('onRequestClose');
          }}
        >
          <View>
            <Text>Modal for </Text>
          </View>
        </Modal>
      </>
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
