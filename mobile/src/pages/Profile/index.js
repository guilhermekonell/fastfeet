import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { signOut } from '~/store/modules/auth/actions';

import Button from '~/components/Button';

import { Container, Avatar, Content, Field, Value, Info } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const deliveryman = useSelector((state) => state.user.deliveryman);

  const date = useMemo(
    () =>
      deliveryman.created_at
        ? format(parseISO(deliveryman.created_at), 'dd/MM/yyyy', {
            locale: pt,
          })
        : null,
    [deliveryman.created_at]
  );

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Avatar
        source={{
          uri: deliveryman.avatar
            ? `http://10.0.3.2:3333/files/${deliveryman.avatar.path}`
            : `https://api.adorable.io/avatar/50/${deliveryman.name}.png/`,
        }}
      />

      <Content>
        <Info>
          <Field>Nome Completo</Field>
          <Value>{deliveryman.name}</Value>
          <Field>Email</Field>
          <Value>{deliveryman.email}</Value>
          <Field>Data de cadastro</Field>
          <Value>{date}</Value>
        </Info>

        <Button background="#E74040" onPress={handleLogout}>
          Logout
        </Button>
      </Content>
    </Container>
  );
}
