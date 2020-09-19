import React from 'react';

import { MenuUsuarioWrapper } from './styles';

export const MenuUsuario: React.FC = () => (
  <MenuUsuarioWrapper>
    <ul className="primary">
      <li>
        <span />
        Listar usuários
      </li>
      <li>
        <span />
        Criar usuário
      </li>
    </ul>
  </MenuUsuarioWrapper>
);
