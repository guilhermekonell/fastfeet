import React, { useState, useEffect } from 'react';

import { MdVisibility, MdDelete } from 'react-icons/md';

import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import Table from '~/components/Table';
import MenuModal from '~/components/MenuModal';
import Pagination from '~/components/Pagination';

import { Container, ProblemInfo } from './styles';

import api from '~/services/api';

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadProblems() {
    setLoading(true);
    const response = await api.get('delivery/problems', {
      params: { page },
    });

    setProblems(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadProblems();
    // eslint-disable-next-line
  }, [page]);

  async function handleCancel(id) {
    try {
      await api.delete(`/problem/${id}/cancel-delivery`);
      loadProblems();
      toast.warn('Encomenda cancelada com sucesso');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <Container>
      <span>Problemas na entrega</span>

      {loading ? (
        <Loading />
      ) : (
        <Table noResults={problems.length === 0}>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr>
                <td>#{problem.id}</td>
                <td>
                  <p>{problem.problems[0].description}</p>
                </td>
                <td>
                  <MenuModal>
                    <Modal
                      trigger={
                        <button type="button">
                          <MdVisibility color="#7159c1" size={12} />
                          Visualizar
                        </button>
                      }
                    >
                      <ProblemInfo>
                        <strong>VISUALIZAR PROBLEMA</strong>
                        <p>{problem.problems[0].description}</p>
                      </ProblemInfo>
                    </Modal>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            'Você tem certeza que deseja cancelar esta encomenda?'
                          )
                        )
                          handleCancel(problem.problems[0].id);
                      }}
                    >
                      <MdDelete color="#DE3B3B" size={12} />
                      Cancelar encomenda
                    </button>
                  </MenuModal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {loading ? (
        <></>
      ) : (
        <Pagination
          page={page}
          setPage={setPage}
          disabled={problems.length < 5}
        />
      )}
    </Container>
  );
}
