import React from 'react';

import { MenuSetorWrapper } from './styles';

export const MenuSetor: React.FC = () => (
  <MenuSetorWrapper>
    <ul className="primary">
      <li>
        <span />
        Listar setores
      </li>
      <li>
        <span />
        Criar setor
      </li>
    </ul>
  </MenuSetorWrapper>
);
