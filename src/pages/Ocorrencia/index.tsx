import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import api from '../../services/api';

import { Container } from './styles';

interface Ocorrencia {
  id: number;
  descricao: string;
  situacao: string;
  ocorrencia_tipo: {
    nome: string;
  };
  datahora: Date;
}

const Ocorrencia: React.FC = () => {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  useEffect(() => {
    const carregarOcorrencias = async (): Promise<void> => {
      const { data } = await api.get('/ocorrencias', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setOcorrencias(data);
    };

    carregarOcorrencias();
  }, []);

  return (
    <Container>
      <Header />

      <h1>Ocorrências</h1>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tipo de ocorrência</th>
            <th>Situação</th>
            <th>Data/hora</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {ocorrencias.map((ocorrencia) => (
            <tr key={ocorrencia.id}>
              <td>{`${ocorrencia.descricao.substring(0, 11)}`}</td>
              <td>{ocorrencia.ocorrencia_tipo.nome}</td>
              <td>{ocorrencia.situacao}</td>
              <td>{ocorrencia.datahora}</td>
              <td>
                <Link to={`/ocorrencia/editar/${ocorrencia.id}`}>
                  <FiEdit />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Ocorrencia;
