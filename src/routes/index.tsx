import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignOut from '../pages/SignOut';

import Inicio from '../pages/Inicio';

import Usuario from '../pages/Usuario';
import CriarUsuario from '../pages/Usuario/Criar';
import EditarUsuario from '../pages/Usuario/Editar';

import Ocorrencia from '../pages/Ocorrencia';
import CriarOcorrencia from '../pages/Ocorrencia/Criar';
import EditarOcorrencia from '../pages/Ocorrencia/Editar';

import OcorrenciaTipo from '../pages/OcorrenciaTipo';
import CriarOcorrenciaTipo from '../pages/OcorrenciaTipo/Criar';
import EditarOcorrenciaTipo from '../pages/OcorrenciaTipo/Editar';

import Setor from '../pages/Setor';
import CriarSetor from '../pages/Setor/Criar';
import EditarSetor from '../pages/Setor/Editar';

import UsuarioTipo from '../pages/UsuarioTipo';
import CriarUsuarioTipo from '../pages/UsuarioTipo/Criar';
import EditarUsuarioTipo from '../pages/UsuarioTipo/Editar';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact needAuthentication component={Inicio} />

    <Route
      path="/usuario"
      exact
      needAuthentication
      needAdmin
      component={Usuario}
    />
    <Route
      path="/usuario/criar"
      needAuthentication
      needAdmin
      component={CriarUsuario}
    />
    <Route
      path="/usuario/editar/:id"
      needAuthentication
      component={EditarUsuario}
    />

    <Route path="/ocorrencia" exact needAuthentication component={Ocorrencia} />

    <Route
      path="/ocorrencia/criar"
      needAuthentication
      component={CriarOcorrencia}
    />

    <Route
      path="/ocorrencia/:s"
      exact
      needAuthentication
      component={Ocorrencia}
    />

    <Route
      path="/ocorrencia/editar/:id"
      needAuthentication
      component={EditarOcorrencia}
    />

    <Route
      path="/ocorrenciatipo"
      exact
      needAuthentication
      needAdmin
      component={OcorrenciaTipo}
    />
    <Route
      path="/ocorrenciatipo/criar"
      needAuthentication
      needAdmin
      component={CriarOcorrenciaTipo}
    />
    <Route
      path="/ocorrenciatipo/editar/:id"
      needAuthentication
      needAdmin
      component={EditarOcorrenciaTipo}
    />

    <Route path="/setor" exact needAdmin needAuthentication component={Setor} />
    <Route
      path="/setor/criar"
      needAdmin
      needAuthentication
      component={CriarSetor}
    />
    <Route
      path="/setor/editar/:id"
      needAuthentication
      needAdmin
      component={EditarSetor}
    />

    <Route
      path="/usuariotipo"
      exact
      needAuthentication
      needAdmin
      component={UsuarioTipo}
    />
    <Route
      path="/usuariotipo/criar"
      needAuthentication
      needAdmin
      component={CriarUsuarioTipo}
    />
    <Route
      path="/usuariotipo/editar/:id"
      needAuthentication
      needAdmin
      component={EditarUsuarioTipo}
    />

    <Route path="/login" component={SignIn} />
    <Route path="/logout" needAuthentication component={SignOut} />
  </Switch>
);

export default Routes;
