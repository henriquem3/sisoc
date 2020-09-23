import React from 'react';
import { Link } from 'react-router-dom';

import { MenuUsuarioWrapper } from './styles';

export const MenuUsuario: React.FC = () => (
  <MenuUsuarioWrapper>
    <ul className="primary">
      <li>
        <span />
        <Link to="/usuario">Listar usuários</Link>
      </li>
      <li>
        <span />
        <Link to="/usuario/criar">Criar usuário</Link>
      </li>
    </ul>
  </MenuUsuarioWrapper>
);
