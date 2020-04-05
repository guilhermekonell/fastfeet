import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from '@react-navigation/compat';
import { API_URL } from 'react-native-dotenv';

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
  Loading,
  NoOrders,
} from './styles';

// eslint-disable-next-line react/prop-types
function Deliveries({ isFocused }) {
  const dispatch = useDispatch();
  const deliveryman = useSelector((state) => state.user.deliveryman);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPage, setSelectedPage] = useState('pendencies');

  async function loadOrders(nextPage = page) {
    if (orders.length !== 0 && nextPage > total) return;
    if (loading) return;

    setLoading(true);

    const response = await api.get(
      `delivery/${deliveryman.id}/${selectedPage}`,
      {
        params: {
          page: nextPage,
        },
      }
    );

    const totalItems = response.data.count;
    setTotal(Math.ceil(totalItems / 5));

    setOrders(
      nextPage >= 2 ? [...orders, ...response.data.rows] : response.data.rows
    );
    setPage(nextPage);
    setRefreshing(false);
    setLoading(false);
  }

  function loadMore() {
    loadOrders(page + 1);
  }

  function refreshList() {
    setRefreshing(true);
    loadOrders(1);
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    if (isFocused) {
      loadOrders(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, selectedPage]);

  function handleSelectedPage(selectPage) {
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
                ? `${API_URL}/files/${deliveryman.avatar.path}`
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
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Delivery data={item} />}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadMore()}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListFooterComponent={() => (
          <>
            {loading && (
              <Loading>
                <ActivityIndicator size="small" />
              </Loading>
            )}
          </>
        )}
        ListEmptyComponent={() => (
          <>{!loading && <NoOrders>Não há entregas a mostrar</NoOrders>}</>
        )}
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
