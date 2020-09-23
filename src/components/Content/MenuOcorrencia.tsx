import React from 'react';
import { Link } from 'react-router-dom';

import { MenuOcorrenciaWrapper } from './styles';

export const MenuOcorrencia: React.FC = () => (
  <MenuOcorrenciaWrapper>
    <ul className="primary">
      <li>
        <span />
        <Link to="/ocorrencia">Listar ocorrências</Link>
      </li>
      <li>
        <span />
        <Link to="/ocorrencia/criar">Criar ocorrências</Link>
      </li>
    </ul>
  </MenuOcorrenciaWrapper>
);
