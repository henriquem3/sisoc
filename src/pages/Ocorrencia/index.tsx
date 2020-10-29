import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Link, useParams, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Tooltip from '../../components/Tooltip';
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

interface Params {
  s: string | undefined;
}

const Ocorrencia: React.FC = () => {
  const { s } = useParams<Params>();
  const history = useHistory();

  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    const carregarOcorrencias = async (): Promise<void> => {
      try {
        if (s === 'todas') {
          const { data } = await api.get(`/ocorrencias/todas`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
            },
          });
          setOcorrencias(data);
        } else if (s) {
          const { data } = await api.get(`/ocorrencias/situacao/${s}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
            },
          });
          setOcorrencias(data);
        } else {
          const { data } = await api.get('/ocorrencias', {
            headers: {
              authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
            },
          });
          setOcorrencias(data);
        }
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/');
        }
      }
    };

    carregarOcorrencias();
  }, [s, history]);

  const getTooltipTitle = useCallback((situacao: string): string => {
    switch (situacao) {
      case 'A':
        return 'Aberto';
      case 'D':
        return 'Deferido';
      case 'I':
        return 'Indeferido';
      default:
        return 'Situação';
    }
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
              <td>
                <Tooltip title={getTooltipTitle(ocorrencia.situacao)}>
                  {ocorrencia.situacao}
                </Tooltip>
              </td>
              <td>{`${formatter.format(new Date(ocorrencia.datahora))}`}</td>
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
