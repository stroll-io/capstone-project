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
import { fetchUpdatedUser } from '../store';

const EditAccount = props => {
  const [nameInput, setNameInput] = useState(props.loggedInUser.firstName);
  const [emailInput, setEmailInput] = useState(props.loggedInUser.email);

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
          <Button onPress={handleSubmit}>
            <Text>Update Info</Text>
          </Button>
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
