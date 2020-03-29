import React from 'react';

import Button from '~/components/Button';
import Background from '~/components/Background';

import { Container, Content, Input } from './styles';

export default function ConfirmDelivery() {
  return (
    <Container>
      <Background />

      <Content>
        <Input placeholder="Inclua aqui o problema que ocorreu na entrega." />
        <Button background="#7159c1">Enviar</Button>
      </Content>
    </Container>
  );
}
