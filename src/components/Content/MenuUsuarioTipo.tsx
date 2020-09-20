import React from 'react';

import { MenuUsuarioTipoWrapper } from './styles';

export const MenuUsuarioTipo: React.FC = () => (
  <MenuUsuarioTipoWrapper>
    <ul className="primary">
      <li>
        <span />
        Listar tipos de usuário
      </li>
      <li>
        <span />
        Criar tipo de usuário
      </li>
    </ul>
  </MenuUsuarioTipoWrapper>
);
