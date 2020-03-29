import React, { useMemo } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Container, Description, Date } from './styles';

export default function Problem({ data }) {
  const date = useMemo(
    () =>
      data.created_at
        ? format(parseISO(data.created_at), 'dd/MM/yyyy', {
            locale: pt,
          })
        : null,
    [data.created_at]
  );

  return (
    <Container>
      <Description>{data.description}</Description>
      <Date>{date}</Date>
    </Container>
  );
}
