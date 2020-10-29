import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import { Content, Grid } from './styles';

interface Info {
  situacao: string;
  count: number;
}

const Inicio: React.FC = () => {
  const [info, setInfo] = useState<Info[]>();

  useEffect(() => {
    const carregarDados = async (): Promise<void> => {
      const { data } = await api.get('/ocorrencias/contar', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setInfo(data);
    };
    carregarDados();
  }, []);

  const getSituacao = useCallback((situacao: string): string => {
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
    <>
      <Header />
      <Content>
        <h1>Suas ocorrências</h1>
        <Grid>
          {info?.map((item, i) => (
            <div key={i}>
              <Link to={`ocorrencia/${item.situacao}`}>
                <p>{item.count}</p> {getSituacao(item.situacao)}
              </Link>
            </div>
          ))}
        </Grid>
      </Content>
    </>
  );
};

export default Inicio;
