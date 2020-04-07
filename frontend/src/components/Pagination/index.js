import React from 'react';
import PropTypes from 'prop-types';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Content } from './styles';

export default function Pagination({ page, setPage, disabled }) {
  return (
    <Content>
      <button
        type="button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <MdChevronLeft color="#333" size={26} />
        <strong>Voltar</strong>
      </button>
      <strong>{page}</strong>
      <button
        type="button"
        onClick={() => setPage(page + 1)}
        disabled={disabled}
      >
        <strong>Próximo</strong>
        <MdChevronRight color="#333" size={26} />
      </button>
    </Content>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
