import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

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

export default function Deliveries() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  const [deliveries, setDeliveries] = useState([]);
  const [deliveryman, setDeliveryman] = useState({});
  const [pendencies, setPendencies] = useState(true);

  async function loadDeliveries() {
    if (pendencies) {
      const response = await api.get(`delivery/${id}/pendencies`);
      setDeliveries(response.data);
    } else {
      const response = await api.get(`delivery/${id}/deliveries`);
      setDeliveries(response.data);
    }
  }

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get(`delivery/${id}`);

      setDeliveryman(response.data);
    }

    loadDeliveryman();
    loadDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pendencies]);

  const handleSelectPendencies = useCallback(() => {
    setPendencies(true);
  }, [setPendencies]);

  const handleSelectDeliveries = useCallback(() => {
    setPendencies(false);
  }, [setPendencies]);

  function handleLogout() {
    dispatch(signOut());
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
          <TouchableOpacity onPress={handleSelectPendencies}>
            <Option selected={pendencies}>Pendentes</Option>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSelectDeliveries}>
            <Option selected={!pendencies}>Entregues</Option>
          </TouchableOpacity>
        </Show>
      </Page>

      <List
        data={deliveries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Delivery data={item} />}
      />
    </Container>
  );
}
