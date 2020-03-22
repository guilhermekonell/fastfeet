import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <FaSpinner color="#333" size={26} />
    </Container>
  );
}
