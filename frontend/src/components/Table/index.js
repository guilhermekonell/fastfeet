import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function Table({ children, noResults }) {
  return (
    <>
      {noResults ? (
        <Container>
          <strong>Não há resultados a mostrar</strong>
        </Container>
      ) : (
        <Content>{children}</Content>
      )}
    </>
  );
}

Table.propTypes = {
  children: PropTypes.element.isRequired,
  noResults: PropTypes.bool.isRequired,
};
