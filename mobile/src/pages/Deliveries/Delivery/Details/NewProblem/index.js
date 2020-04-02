import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import Button from '~/components/Button';
import Background from '~/components/Background';

import api from '~/services/api';

import { Container, Content, Input } from './styles';

export default function ConfirmDelivery() {
  const [problem, setProblem] = useState('');
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  async function handleSubmit() {
    if (problem) {
      await api.post(`delivery/${id}/problems`, { description: problem });
    }

    navigation.navigate('Detalhes');
  }

  return (
    <Container>
      <Background />

      <Content>
        <Input
          placeholder="Inclua aqui o problema que ocorreu na entrega."
          onSubmitEditing={handleSubmit}
          value={problem}
          onChangeText={setProblem}
        />
        <Button background="#7159c1" onPress={handleSubmit}>
          Enviar
        </Button>
      </Content>
    </Container>
  );
}
