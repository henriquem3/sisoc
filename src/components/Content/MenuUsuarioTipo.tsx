import React from 'react';
import { Link } from 'react-router-dom';

import { MenuUsuarioTipoWrapper } from './styles';

export const MenuUsuarioTipo: React.FC = () => (
  <MenuUsuarioTipoWrapper>
    <ul className="primary">
      <li>
        <span />
        <Link to="/usuariotipo">Listar tipos de usuário</Link>
      </li>
      <li>
        <span />
        <Link to="/usuariotipo/criar">Criar tipo de usuário</Link>
      </li>
    </ul>
  </MenuUsuarioTipoWrapper>
);
