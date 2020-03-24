import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch, MdAdd } from 'react-icons/md';

import { Container } from './styles';

export default function HeaderPage({ title, setState, handleNew }) {
  return (
    <Container>
      <strong>Gerenciando {title}</strong>
      <header>
        <div>
          <MdSearch size={22} color="#ccc" />
          <input
            type="text"
            placeholder={`Buscar por ${title}`}
            onChange={e => setState(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleNew}>
          <div>
            <MdAdd size={22} />
            <span>CADASTRAR</span>
          </div>
        </button>
      </header>
    </Container>
  );
}

HeaderPage.propTypes = {
  title: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  handleNew: PropTypes.func.isRequired,
};
