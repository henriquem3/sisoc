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
  const [tipos, setTipos] = useState<Setor[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    const carregarTipos = async (): Promise<void> => {
      const { data } = await api.get('/ocorrenciatipos', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setTipos(data);
    };

    carregarTipos();
  }, []);

  const handleDeleteClick = useCallback(
    async (id: number) => {
      if (window.confirm('Você tem certeza?')) {
        try {
          await api.delete(`/ocorrenciatipos/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
            },
          });
          const tiposAtualizados = tipos.filter((tipo) => tipo.id !== id);
          setTipos(tiposAtualizados);
        } catch (ex) {
          addToast({
            title: 'Erro',
            description: ex.response.data.error,
            type: 'error',
          });
        }
      }
    },
    [tipos, addToast]
  );

  return (
    <Container>
      <Header />
      
      <h1>Tipos de Ocorrência</h1>
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
          {tipos.map((tipo) => (
            <tr key={tipo.id}>
              <td>{tipo.nome}</td>
              <td>{tipo.sigla}</td>
              <td>{tipo.email}</td>

              <td>
                <Link to={`/ocorrenciatipo/editar/${tipo.id}`}>
                  <FiEdit />
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteClick(tipo.id)}
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