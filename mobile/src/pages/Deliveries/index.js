import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from '@react-navigation/compat';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { signOut } from '~/store/modules/auth/actions';

import Delivery from './Delivery';

import api from '~/services/api';

import {
  Container,
  Header,
  Left,
  Avatar,
  Info,
  Title,
  Name,
  Page,
  PageName,
  Show,
  Option,
  List,
} from './styles';

// eslint-disable-next-line react/prop-types
function Deliveries({ isFocused }) {
  const dispatch = useDispatch();
  const deliveryman = useSelector((state) => state.user.deliveryman);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState('pendencies');

  async function loadOrders() {
    if (loading) return;

    setLoading(true);

    const response = await api.get(
      `delivery/${deliveryman.id}/${selectedPage}`,
      {
        params: {
          page,
        },
      }
    );

    setOrders(page >= 2 ? [...orders, ...response.data] : response.data);
    setLoading(false);
  }

  async function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);

    loadOrders();
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    if (isFocused) {
      loadOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, selectedPage]);

  function handleSelectedPage(selectPage) {
    setPage(1);
    setOrders([]);
    setSelectedPage(selectPage);
  }

  return (
    <Container>
      <Header>
        <Left>
          <Avatar
            source={{
              uri: deliveryman.avatar
                ? `http://10.0.3.2:3333/files/${deliveryman.avatar.path}`
                : `https://api.adorable.io/avatar/50/${deliveryman.name}.png/`,
            }}
          />

          <Info>
            <Title>Bem vindo de volta,</Title>
            <Name>{deliveryman.name}</Name>
          </Info>
        </Left>

        <TouchableOpacity onPress={handleLogout}>
          <Icon name="exit-to-app" size={25} color="#f64c75" />
        </TouchableOpacity>
      </Header>

      <Page>
        <PageName>Entregas</PageName>
        <Show>
          <TouchableOpacity onPress={() => handleSelectedPage('pendencies')}>
            <Option selected={selectedPage === 'pendencies'}>Pendentes</Option>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectedPage('deliveries')}>
            <Option selected={selectedPage === 'deliveries'}>Entregues</Option>
          </TouchableOpacity>
        </Show>
      </Page>

      <List
        data={orders}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Delivery data={item} />}
      />
    </Container>
  );
}

export default withNavigationFocus(Deliveries);

Deliveries.propstypes = {
  isFocused: PropTypes.bool,
};

Deliveries.defaultProps = {
  isFocused: false,
};
