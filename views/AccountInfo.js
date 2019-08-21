import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

class AccountInfo extends React.Component {
  //navigation header update
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text>Account Info</Text>
        </View>
        <View>
          <Text>First Name:</Text>
          <Text>Email:</Text>
          <Button>
            <Text>Edit Info</Text>
          </Button>
          <Button>
            <Text>Request password reset</Text>
          </Button>
          <Button>
            <Text>Delete account</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default AccountInfo;
