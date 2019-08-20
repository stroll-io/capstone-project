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
import { fetchStarredWalks } from '../store/starredWalks';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class StarredWalks extends React.Component {
  async componentDidMount() {
    await this.props.fetchStarredWalks(2);
  }

  render() {
    return (
      <Container>
        <Header>
          <Text style={{ fontSize: 24, alignSelf: 'center' }}>
            Your Starred Walks
          </Text>
        </Header>
        <Content>
          {this.props.starredWalks.length ? (
            this.props.starredWalks.map(walk => {
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
                      <Text>Walked: {walk.favorite_walks.createdAt}</Text>
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
    fetchStarredWalks: userId => {
      dispatch(fetchStarredWalks(userId));
    },
  };
};

const mapStateToProps = state => {
  return {
    starredWalks: state.starredWalks,
  };
};

StarredWalks.propTypes = {
  fetchStarredWalks: propTypes.func,
  starredWalks: propTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredWalks);
