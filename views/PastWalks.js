import React from 'react';
import { View, SafeAreaView } from 'react-native';
import {
  Button,
  Text,
  Content,
  Card,
  CardItem,
  Body,
  Container,
  Header,
  Image,
  Thumbnail,
} from 'native-base';
import axios from 'axios';
import ngrokSecret from '../secrets';

class PastWalks extends React.Component {
  constructor() {
    super();
    this.state = {
      walks: [],
    };
  }

  async componentDidMount() {
    const pastWalks = await axios.get(`${ngrokSecret}/api/users/2/past-walks`);
    this.setState({ walks: pastWalks });
  }

  pastWalkList() {
    for (let i = 0; i < 4; i++) {
      return (
        <Card>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                A Walk in The Park
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'center' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                sagittis magna quam. Praesent fermentum lectus mollis felis
                interdum, at efficitur nisl viverra. Duis et risus sem. Cras
                mattis laoreet turpis eget commodo. Donec eleifend at velit nec
                ultricies. Curabitur metus est, iaculis vitae egestas vel,
                elementum suscipit erat. Nulla vulputate.
              </Text>
            </Body>
          </CardItem>
        </Card>
      );
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Text style={{ fontSize: 24, alignSelf: 'center' }}>
            Your past walks:
          </Text>
        </Header>
        <Content>
          <Card style={{ marginLeft: 1, marginRight: 1 }}>
            <CardItem>
              <Body>
                <Thumbnail
                  source={{ uri: 'https://picsum.photos/id/10/200/300' }}
                />
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                  A Walk in The Park
                </Text>
                <Text style={{ fontSize: 14, textAlign: 'center' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  sagittis magna quam. Praesent fermentum lectus mollis felis
                  interdum, at efficitur nisl viverra. Duis et risus sem. Cras
                  mattis laoreet turpis eget commodo. Donec eleifend at velit
                  nec ultricies. Curabitur metus est, iaculis vitae egestas vel,
                  elementum suscipit erat. Nulla vulputate.
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                  A Walk in The Park
                </Text>
                <Text style={{ fontSize: 14, textAlign: 'center' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  sagittis magna quam. Praesent fermentum lectus mollis felis
                  interdum, at efficitur nisl viverra. Duis et risus sem. Cras
                  mattis laoreet turpis eget commodo. Donec eleifend at velit
                  nec ultricies. Curabitur metus est, iaculis vitae egestas vel,
                  elementum suscipit erat. Nulla vulputate.
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                  A Walk in The Park
                </Text>
                <Text style={{ fontSize: 14, textAlign: 'center' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  sagittis magna quam. Praesent fermentum lectus mollis felis
                  interdum, at efficitur nisl viverra. Duis et risus sem. Cras
                  mattis laoreet turpis eget commodo. Donec eleifend at velit
                  nec ultricies. Curabitur metus est, iaculis vitae egestas vel,
                  elementum suscipit erat. Nulla vulputate.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default PastWalks;
