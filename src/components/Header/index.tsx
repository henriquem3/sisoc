import React from 'react';
import { Link } from 'react-router-dom';

import { MenuUsuario } from '../Content/MenuUsuario';
import { MenuOcorrencia } from '../Content/MenuOcorrencia';
import { MenuOcorrenciaTipo } from '../Content/MenuOcorrenciaTipo';
import { MenuUsuarioTipo } from '../Content/MenuUsuarioTipo';
import { MenuSetor } from '../Content/MenuSetor';

import { DropdownOption, DropdownProvider, DropdownRoot } from '../Dropdown';
import { DropdownStyles, Container } from './styles';

const Header: React.FC = () => {
  return (
    <DropdownProvider>
      <DropdownStyles>
        <Container>
          <ul>
            <li>
              <button onClick={() => window.location.assign('/')} type="button">
                Início
              </button>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
            <li>
              <DropdownOption name="Usuários" content={MenuUsuario} />
            </li>
            <li>
              <DropdownOption name="Ocorrências" content={MenuOcorrencia} />
            </li>
            <li>
              <DropdownOption
                name="Tipos de Ocorrência"
                content={MenuOcorrenciaTipo}
              />
            </li>
            <li>
              <DropdownOption
                name="Tipos de Usuário"
                content={MenuUsuarioTipo}
              />
            </li>
            <li>
              <DropdownOption name="Setores" content={MenuSetor} />
            </li>
          </ul>
        </Container>
        <DropdownRoot />
      </DropdownStyles>
    </DropdownProvider>
  );
};

export default Header;
