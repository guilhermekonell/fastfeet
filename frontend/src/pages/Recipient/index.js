import React, { useState, useEffect } from 'react';

import { MdEdit, MdDelete } from 'react-icons/md';

import { toast } from 'react-toastify';

import HeaderPage from '~/components/HeaderPage';
import Table from '~/components/Table';
import MenuModal from '~/components/MenuModal';
import Pagination from '~/components/Pagination';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [page, setPage] = useState(1);

  async function loadRecipients(recipientName) {
    const response = await api.get('recipients', {
      params: recipientName ? { q: recipientName } : { page },
    });

    setRecipients(response.data);
  }

  useEffect(() => {
    loadRecipients(recipient);
    // eslint-disable-next-line
  }, [recipient, page]);

  function handleNew() {
    history.push('/recipient/new');
  }

  function handleEdit(recip) {
    history.push({
      pathname: '/recipient/edit',
      state: { recip },
    });
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/recipient/${id}`);
      loadRecipients(recipient);
      toast.warn('Destinatário deletado com sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <Container>
      <HeaderPage
        title="destinatários"
        setState={setRecipient}
        handleNew={handleNew}
      />

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recip => (
            <tr>
              <td>#{recip.id}</td>
              <td>{recip.name}</td>
              <td>
                {`${recip.street}, ${recip.street_number}, ${recip.city} - ${recip.state}`}
              </td>
              <td>
                <MenuModal>
                  <button type="button" onClick={() => handleEdit(recip)}>
                    <MdEdit color="#4D85EE" size={12} />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Você tem certeza que deseja deletar este destinatário?'
                        )
                      )
                        handleDelete(recip.id);
                    }}
                  >
                    <MdDelete color="#DE3B3B" size={12} />
                    Excluir
                  </button>
                </MenuModal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        page={page}
        setPage={setPage}
        disabled={recipients.length < 5}
      />
    </Container>
  );
}
