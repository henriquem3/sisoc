import React from 'react';

import { MenuOcorrenciaTipoWrapper } from './styles';

export const MenuOcorrenciaTipo: React.FC = () => (
  <MenuOcorrenciaTipoWrapper>
    <ul className="primary">
      <li>
        <span />
        Listar tipo de ocorrências
      </li>
      <li>
        <span />
        Criar tipo de ocorrência
      </li>
    </ul>
  </MenuOcorrenciaTipoWrapper>
);
