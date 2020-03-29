import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

import Background from '~/components/Background';
import Problem from './Problem';

import api from '~/services/api';

import { Container, Content, Title, List } from './styles';

export default function ConfirmDelivery() {
  const route = useRoute();
  const { id } = route.params;
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`delivery/${id}/problems`);

      setProblems(response.data);
    }

    loadProblems();
  }, [id]);

  return (
    <Container>
      <Background />

      <Content>
        <Title>Encomenda {id}</Title>

        <List
          data={problems.problems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Problem data={item} />}
        />
      </Content>
    </Container>
  );
}
