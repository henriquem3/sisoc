import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Container } from './styles';

interface Setor {
  id: number;
  nome: string;
  sigla: string;
  email: string;
}

const Setor: React.FC = () => {
  const [setores, setSetores] = useState<Setor[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    const carregarSetores = async (): Promise<void> => {
      const { data } = await api.get('/setores', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setSetores(data);
    };

    carregarSetores();
  }, []);

  const handleDeleteClick = useCallback(
    async (id: number) => {
      if (window.confirm('Você tem certeza?')) {
        try {
          await api.delete(`/setores/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
            },
          });
          const setoresAtualizados = setores.filter((setor) => setor.id !== id);
          setSetores(setoresAtualizados);
        } catch (ex) {
          addToast({
            title: 'Erro',
            description: ex.response.data.error,
            type: 'error',
          });
        }
      }
    },
    [setores, addToast]
  );

  return (
    <Container>
      <Header />
      
      <h1>Setores</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sigla</th>
            <th>Email</th>
            <th>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {setores.map((setor) => (
            <tr key={setor.id}>
              <td>{setor.nome}</td>
              <td>{setor.sigla}</td>
              <td>{setor.email}</td>

              <td>
                <Link to={`/setor/editar/${setor.id}`}>
                  <FiEdit />
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteClick(setor.id)}
                  type="button"
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Setor;