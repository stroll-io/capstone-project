import React from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import { Text, Button, Input } from 'native-base';

class Register extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ fontSize: 30 }}>Registration </Text>
        </View>
        <View>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}
          >
            <Text
              style={{ fontSize: 18, padding: 5, width: '30%', marginRight: 3 }}
            >
              First Name:
            </Text>
            <TextInput style={{ backgroundColor: 'tomato', width: '65%' }} />
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}
          >
            <Text
              style={{ fontSize: 18, padding: 5, width: '30%', marginRight: 3 }}
            >
              Email:
            </Text>
            <TextInput style={{ backgroundColor: 'tomato', width: '65%' }} />
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}
          >
            <Text
              style={{ fontSize: 18, padding: 5, width: '30%', marginRight: 3 }}
            >
              Password:
            </Text>
            <TextInput style={{ backgroundColor: 'tomato', width: '65%' }} />
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Button
              style={{
                backgroundColor: 'gold',
                justifyContent: 'center',
                width: '50%',
              }}
            >
              <Text>Create account!</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default Register;
