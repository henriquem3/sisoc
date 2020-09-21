import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface Tipo {
  id: number;
  nome: string;
  descricao: string;
}

const UsuarioTipo: React.FC = () => {
  const [tipos, setTipos] = useState<Tipo[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    const carregarTipos = async (): Promise<void> => {
      const { data } = await api.get('/usuarios/tipo', {
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
          await api.delete(`/usuarios/tipo/${id}`, {
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
    <div>
      <Header />
      <h1>Tipos de Usuário</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Editar</th>
            <th>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo.id}>
              <td>{tipo.nome}</td>
              <td>{tipo.descricao}</td>
              <td>
                <Link to={`/usuariotipo/editar/${tipo.id}`}>Editar</Link>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteClick(tipo.id)}
                  type="button"
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioTipo;
