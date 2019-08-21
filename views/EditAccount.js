import axios from 'axios';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Button,
  Text,
  Input,
} from 'native-base';

const EditAccount = props => {
  return (
    <>
      <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder={props.loggedInUser.name} />
            </Item>
            <Item>
              <Input placeholder={props.loggedInUser.email} />
            </Item>
          </Form>
        </Content>
        <Button>
          <Text>Update Info</Text>
        </Button>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps)(EditAccount);
