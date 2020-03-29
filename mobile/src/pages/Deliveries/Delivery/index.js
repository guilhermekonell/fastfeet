import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Title,
  Name,
  Progress,
  Line,
  Status,
  Point,
  PointName,
  Infos,
  Info,
  InfoName,
  InfoField,
  ViewDetail,
} from './styles';

export default function Delivery({ data }) {
  const navigation = useNavigation();

  const dateFormatted = useMemo(
    () =>
      format(parseISO(data.created_at), 'dd/MM/yyyy', {
        locale: pt,
      }),
    [data.created_at]
  );

  return (
    <Container>
      <Title>
        <Icon name="local-shipping" size={30} color="#7159c1" />
        <Name>Encomenda {data.id}</Name>
      </Title>
      <Progress>
        <Line />
        <Status>
          <Point filled />
          <PointName>Aguardando Retirada</PointName>
        </Status>
        <Status>
          <Point
            filled={data.status === 'RETIRADA' || data.status === 'ENTREGUE'}
          />
          <PointName>Retirada</PointName>
        </Status>
        <Status>
          <Point filled={data.status === 'ENTREGUE'} />
          <PointName>Entregue</PointName>
        </Status>
      </Progress>
      <Infos>
        <Info>
          <InfoName>Data</InfoName>
          <InfoField>{dateFormatted}</InfoField>
        </Info>
        <Info>
          <InfoName>Cidade</InfoName>
          <InfoField>{data.recipient.city}</InfoField>
        </Info>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detalhes', { data })}
        >
          <ViewDetail>Ver Detelhes</ViewDetail>
        </TouchableOpacity>
      </Infos>
    </Container>
  );
}

Delivery.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
