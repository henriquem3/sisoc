import React from 'react';

import { MenuUsuario } from '../Content/MenuUsuario';

import { DropdownOption, DropdownProvider, DropdownRoot } from '../Dropdown';
import { DropdownStyles, Container } from './styles';

const Header: React.FC = () => {
  return (
    <DropdownProvider>
      <DropdownStyles>
        <Container>
          <ul>
            <li>
              <DropdownOption name="Usuários" content={MenuUsuario} />
            </li>
            <li>
              <DropdownOption
                name="Ocorrências"
                content={() => <h1>Ocorrências</h1>}
              />
            </li>
          </ul>
        </Container>

        <DropdownRoot />
      </DropdownStyles>
    </DropdownProvider>
  );
};

export default Header;
