import React from 'react';
import { Link } from 'react-router-dom';

import { MenuOcorrenciaTipoWrapper } from './styles';

export const MenuOcorrenciaTipo: React.FC = () => (
  <MenuOcorrenciaTipoWrapper>
    <ul className="primary">
      <li>
        <span />
        <Link to="/ocorrenciatipo">Listar tipos de ocorrência</Link>
      </li>
      <li>
        <span />
        <Link to="/ocorrenciatipo/criar">Criar tipo de ocorrência</Link>
      </li>
    </ul>
  </MenuOcorrenciaTipoWrapper>
);
