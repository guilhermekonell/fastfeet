import React from 'react';
import PropTypes from 'prop-types';

import { MdChevronLeft, MdCheck } from 'react-icons/md';

import history from '~/services/history';

import { Container } from './styles';

export default function Header({ title, path }) {
  return (
    <Container>
      <header>
        <strong>{title}</strong>
        <div>
          <button type="button" onClick={() => history.push(`/${path}`)}>
            <div>
              <MdChevronLeft size={22} />
              <span>VOLTAR</span>
            </div>
          </button>
          <button type="submit">
            <div>
              <MdCheck size={22} />
              <span>SALVAR</span>
            </div>
          </button>
        </div>
      </header>
    </Container>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
