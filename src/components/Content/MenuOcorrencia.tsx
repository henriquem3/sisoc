import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { MenuOcorrenciaWrapper } from './styles';

export const MenuOcorrencia: React.FC = () => {
  const { user } = useAuth();
  return (
    <MenuOcorrenciaWrapper>
      <ul className="primary">
        <li>
          <span />
          <Link to="/ocorrencia">Listar minhas ocorrências</Link>
        </li>
        <li>
          <span />
          <Link to="/criar-ocorrencia">Criar ocorrências</Link>
        </li>
        {user.usuario_tipo.nome.toLowerCase() === 'admin' && (
          <li>
            <span />
            <Link to="/ocorrencia/todas">Ver todas as ocorrências</Link>
          </li>
        )}
      </ul>
    </MenuOcorrenciaWrapper>
  );
};
