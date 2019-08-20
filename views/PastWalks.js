import React from 'react';
import { Image } from 'react-native';
import {
  Text,
  Content,
  Card,
  CardItem,
  Body,
  Container,
  Header,
} from 'native-base';
import { fetchAllPastWalks } from '../store/pastWalks';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

//TODO need to be able to dynamically get the userId
class PastWalks extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllPastWalks(2);
  }

  render() {
    return (
      <Container>
        <Header>
          <Text style={{ fontSize: 24, alignSelf: 'center' }}>
            Your Past Walks
          </Text>
        </Header>
        <Content>
          {this.props.pastWalks.length ? (
            this.props.pastWalks.map(walk => {
              return (
                <Card key={walk.id} style={{ height: 200 }}>
                  <CardItem>
                    <Body>
                      <Image
                        source={{
                          uri: `${walk.imageUrl}`,
                        }}
                        style={{ height: 200, width: null, flex: 1 }}
                      />
                      <Text>{walk.name}</Text>
                      <Text>{walk.category} walk</Text>
                      <Text>{walk.description}</Text>
                      <Text>Walked: {walk.past_walks.createdAt}</Text>
                    </Body>
                  </CardItem>
                  <CardItem cardBody />
                </Card>
              );
            })
          ) : (
            <Text />
          )}
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllPastWalks: userId => {
      dispatch(fetchAllPastWalks(userId));
    },
  };
};

const mapStateToProps = state => {
  return {
    pastWalks: state.allPastWalks,
  };
};

PastWalks.propTypes = {
  fetchAllPastWalks: propTypes.func,
  pastWalks: propTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PastWalks);
