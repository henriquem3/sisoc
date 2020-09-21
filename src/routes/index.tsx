import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignOut from '../pages/SignOut';

import Inicio from '../pages/Inicio';

import Usuario from '../pages/Usuario';
import CriarUsuario from '../pages/Usuario/Criar';

import Ocorrencia from '../pages/Ocorrencia';
import CriarOcorrencia from '../pages/Ocorrencia/Criar';

import OcorrenciaTipo from '../pages/OcorrenciaTipo';
import CriarOcorrenciaTipo from '../pages/OcorrenciaTipo/Criar';

import Setor from '../pages/Setor';
import CriarSetor from '../pages/Setor/Criar';

import UsuarioTipo from '../pages/UsuarioTipo';
import CriarUsuarioTipo from '../pages/UsuarioTipo/Criar';
import EditarUsuarioTipo from '../pages/UsuarioTipo/Editar';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact needAuthentication component={Inicio} />

    <Route path="/usuario" exact needAuthentication component={Usuario} />
    <Route path="/usuario/criar" needAuthentication component={CriarUsuario} />

    <Route path="/ocorrencia" exact needAuthentication component={Ocorrencia} />
    <Route
      path="/ocorrencia/criar"
      needAuthentication
      component={CriarOcorrencia}
    />

    <Route
      path="/ocorrenciatipo"
      exact
      needAuthentication
      component={OcorrenciaTipo}
    />
    <Route
      path="/ocorrenciatipo/criar"
      needAuthentication
      component={CriarOcorrenciaTipo}
    />

    <Route path="/setor" exact needAuthentication component={Setor} />
    <Route path="/setor/criar" needAuthentication component={CriarSetor} />

    <Route
      path="/usuariotipo"
      exact
      needAuthentication
      component={UsuarioTipo}
    />
    <Route
      path="/usuariotipo/criar"
      needAuthentication
      component={CriarUsuarioTipo}
    />
    <Route
      path="/usuariotipo/editar/:id"
      needAuthentication
      component={EditarUsuarioTipo}
    />

    <Route path="/login" component={SignIn} />
    <Route path="/logout" needAuthentication component={SignOut} />
  </Switch>
);

export default Routes;
