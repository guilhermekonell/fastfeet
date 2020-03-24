import React, { useState, useEffect } from 'react';

import { MdEdit, MdDelete } from 'react-icons/md';

import { toast } from 'react-toastify';

import Table from '~/components/Table';
import HeaderPage from '~/components/HeaderPage';
import MenuModal from '~/components/MenuModal';

import { Container } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Deliveryman() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [deliveryman, setDeliveryman] = useState('');

  async function loadDeliverymans(deliverymanName) {
    const response = await api.get('deliverymans', {
      params: deliverymanName ? { q: deliverymanName } : {},
    });

    setDeliverymans(response.data);
  }

  useEffect(() => {
    loadDeliverymans(deliveryman);
  }, [deliveryman]);

  function handleNew() {
    history.push('/deliveryman/new');
  }

  function handleEdit(deliv) {
    history.push({
      pathname: '/deliveryman/edit',
      state: { deliv },
    });
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/deliverymans/${id}`);
      loadDeliverymans(deliveryman);
      toast.warn('Entregador deletado com sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <Container>
      <HeaderPage
        title="entregadores"
        setState={setDeliveryman}
        handleNew={handleNew}
      />

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymans.map(deliv => (
            <tr>
              <td>#{deliv.id}</td>
              <td>
                <main>
                  <img
                    src={
                      deliv.avatar
                        ? deliv.avatar.url
                        : 'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif'
                    }
                    alt={deliv.name}
                  />
                </main>
              </td>
              <td>{deliv.name}</td>
              <td>{deliv.email}</td>
              <td>
                <MenuModal>
                  <button type="button" onClick={() => handleEdit(deliv)}>
                    <MdEdit color="#4D85EE" size={12} />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Você tem certeza que deseja deletar este entregador?'
                        )
                      )
                        handleDelete(deliveryman.id);
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
    </Container>
  );
}
