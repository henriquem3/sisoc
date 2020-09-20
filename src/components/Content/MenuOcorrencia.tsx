import React from 'react';

import { MenuOcorrenciaWrapper } from './styles';

export const MenuOcorrencia: React.FC = () => (
  <MenuOcorrenciaWrapper>
    <ul className="primary">
      <li>
        <span />
        Listar ocorrências
      </li>
      <li>
        <span />
        Criar ocorrência
      </li>
    </ul>
  </MenuOcorrenciaWrapper>
);
