import axios from 'axios';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Button,
  Text,
  Input,
} from 'native-base';
import { View } from 'react-native';
import { fetchUpdatedUser } from '../store';

const EditAccount = props => {
  const [nameInput, setNameInput] = useState(props.user.firstName);
  const [emailInput, setEmailInput] = useState(props.user.email);

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
      //TODO figure out where to put the reqbody object
      await props.fetchUpdatedUser(props.user.id, nameInput, emailInput);
    }
  };

  return (
    <>
      <Container>
        <Content>
          <Form>
            <Item>
              <Text style={{ fontWeight: '700' }}>First Name:</Text>
              <Input
                placeholder={nameInput}
                onChangeText={text => setNameInput(text)}
                value={nameInput}
              />
            </Item>
            <Item>
              <Text style={{ fontWeight: '700' }}>Email:</Text>
              <Input
                placeholder={emailInput}
                onChangeText={text => setEmailInput(text)}
                value={emailInput}
              />
            </Item>
          </Form>
          <View style={{ justifyContent: 'center' }}>
            <Button onPress={handleSubmit} style={{ width: 150 }}>
              <Text>Update Info</Text>
            </Button>
          </View>
        </Content>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUpdatedUser: (userId, name, email) => {
      dispatch(fetchUpdatedUser(userId, name, email));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAccount);
