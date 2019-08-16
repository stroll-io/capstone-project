import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, Text } from 'native-base';

class AccountInfo extends React.Component {
  render() {
    return (
      <View>
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
