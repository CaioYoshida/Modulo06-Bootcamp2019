import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Autor,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    loading: true,
  };

  async componentDidMount() {
    console.tron.log(this.props);
    this.loadingStars();
  }

  loadingStars = async () => {
    const { page, stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({ stars: [...stars, ...response.data], loading: false });
  };

  handlePaginate = async () => {
    const { page } = this.state;

    await this.setState({ page: page + 1 });

    this.loadingStars();
  };

  renderFooter = () => {
    const { loading } = this.state;

    if (!loading) return null;
    return (
      <View>
        <ActivityIndicator color="#999" />
      </View>
    );
  };

  handleNavigate = url => {
    const { navigation } = this.props;

    navigation.navigate('Webpage', { url });
  };

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const { stars } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred onPress={() => this.handleNavigate(item)}>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Autor>{item.owner.login}</Autor>
              </Info>
            </Starred>
          )}
          onEndReachedThreshold={0.2}
          onEndReached={this.handlePaginate}
          ListFooterComponent={this.renderFooter}
        />
      </Container>
    );
  }
}
