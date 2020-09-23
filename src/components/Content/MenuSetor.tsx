import React from 'react';
import { Link } from 'react-router-dom';

import { MenuSetorWrapper } from './styles';

export const MenuSetor: React.FC = () => (
  <MenuSetorWrapper>
    <ul className="primary">
      <li>
        <span />
        <Link to="/setor">Listar setores</Link>
      </li>
      <li>
        <span />
        <Link to="/setor/criar">Criar setor</Link>
      </li>
    </ul>
  </MenuSetorWrapper>
);
