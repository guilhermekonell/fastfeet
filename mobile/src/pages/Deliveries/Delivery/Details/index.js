import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Buttom from '~/components/Button';
import Background from '~/components/Background';

import api from '~/services/api';

import {
  Container,
  Content,
  Info,
  Header,
  HeaderText,
  Detail,
  Text,
  Dates,
  DateContent,
  Options,
  Option,
  OptionText,
} from './styles';

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  const start_date = useMemo(
    () =>
      data.start_date
        ? format(parseISO(data.start_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : null,
    [data.start_date]
  );

  const end_date = useMemo(
    () =>
      data.end_date
        ? format(parseISO(data.end_date), 'dd/MM/yyyy', {
            locale: pt,
          })
        : null,
    [data.end_date]
  );

  async function handleStartDelivery() {
    await api.put(`delivery/${data.id}/start`, {
      start_date: new Date(),
    });

    navigation.navigate('Entregas');
  }

  return (
    <Container>
      <Background />

      <Content>
        <Info>
          <Header>
            <Icon name="local-shipping" size={25} color="#7159c1" />
            <HeaderText>Informações da entrega</HeaderText>
          </Header>
          <Detail>DESTINATÁRIO</Detail>
          <Text>{data.recipient.name}</Text>
          <Detail>ENDEREÇO DA ENTREGA</Detail>
          <Text>
            {data.recipient.street}, {data.recipient.street_number},{' '}
            {data.recipient.city} - {data.recipient.state},{' '}
            {data.recipient.zip_code}
          </Text>
          <Detail>PRODUTO</Detail>
          <Text>{data.product}</Text>
        </Info>
        <Info>
          <Header>
            <Icon name="event" size={25} color="#7159c1" />
            <HeaderText>Situação da entrega</HeaderText>
          </Header>
          <Detail>STATUS</Detail>
          <Text>{data.status}</Text>
          <Dates>
            <DateContent>
              <Detail>DATA DE RETIRADA</Detail>
              <Text>{start_date || '-- / -- / --'}</Text>
            </DateContent>
            <DateContent>
              <Detail>DATA DE ENTREGA</Detail>
              <Text>{end_date || '-- / -- / --'}</Text>
            </DateContent>
          </Dates>
        </Info>
        {data.status === 'PENDENTE' ? (
          <Buttom background="#7159c1" onPress={handleStartDelivery}>
            Retirar encomenda
          </Buttom>
        ) : (
          <>
            {data.status !== 'ENTREGUE' ? (
              <Options>
                <Option
                  onPress={() =>
                    navigation.navigate('InformarProblema', { id: data.id })
                  }
                >
                  <Icon name="highlight-off" size={25} color="#E74040" />
                  <OptionText>Informar</OptionText>
                  <OptionText>Problema</OptionText>
                </Option>
                <Option
                  onPress={() =>
                    navigation.navigate('VisualizarProblema', { id: data.id })
                  }
                >
                  <Icon name="info-outline" size={25} color="#E7BA40" />
                  <OptionText>Visualizar</OptionText>
                  <OptionText>Problema</OptionText>
                </Option>
                <Option
                  onPress={() =>
                    navigation.navigate('ConfirmarEntrega', { id: data.id })
                  }
                >
                  <Icon name="check-circle" size={25} color="#7159c1" />
                  <OptionText>Confirmar</OptionText>
                  <OptionText>Entrega</OptionText>
                </Option>
              </Options>
            ) : (
              <></>
            )}
          </>
        )}
      </Content>
    </Container>
  );
}
