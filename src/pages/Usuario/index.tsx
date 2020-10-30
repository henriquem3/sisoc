import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import { Container } from './styles';

interface Usuario {
  id: number;
  nome: string;
  ra_siape: string;
  email: string;
  senha: string;
  usuario_tipo: {
    nome: string;
  };
}

const Usuario: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    const carregarUsuarios = async (): Promise<void> => {
      const { data } = await api.get('/usuarios', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setUsuarios(data);
    };

    carregarUsuarios();
  }, []);

  const handleDeleteClick = useCallback(
    async (id: number) => {
      if (window.confirm('Você tem certeza?')) {
        try {
          await api.delete(`/usuarios/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
            },
          });
          const usuariosAtualizados = usuarios.filter(
            (usuario) => usuario.id !== id
          );
          setUsuarios(usuariosAtualizados);
        } catch (ex) {
          addToast({
            title: 'Erro',
            description: ex.response.data.error,
            type: 'error',
          });
        }
      }
    },
    [usuarios, addToast]
  );

  return (
    <Container>
      <Header />
      <h1>Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>RA/SIAPE</th>
            <th>Email</th>
            <th>Tipo de Usuário</th>
            <th>Editar</th>
            <th>Apagar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.ra_siape}</td>
              <td>{usuario.email}</td>
              <td>{usuario.usuario_tipo.nome}</td>
              <td>
                <Link to={`/usuario/editar/${usuario.id}`}>
                  <FiEdit />
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteClick(usuario.id)}
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

export default Usuario;
