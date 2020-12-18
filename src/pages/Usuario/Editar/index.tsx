import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Content, Wrap } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

import { useToast } from '../../../hooks/toast';

import { getValidationErrors } from '../../../utils/validators';
import api from '../../../services/api';

interface FormData {
  nome: string;
  ra_siape: string;
  email: string;
  senha: string;
  usuario_tipo_id: number;
}

interface Usuario extends FormData {
  id: number;
}

interface Params {
  id: string | undefined;
}

interface Tipo {
  id: number;
  nome: string;
  descricao: string;
}

const Editar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState({} as Tipo);

  const { addToast } = useToast();
  const { id } = useParams<Params>();
  const history = useHistory();

  useEffect(() => {
    const carregarUsuario = async (): Promise<void> => {
      const response = await api.get<Tipo[]>('/usuarios/tipo', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setTipos(response.data);

      const { data } = await api.get(`/usuarios/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setUsuario(data);
      const selected = response.data.find(
        (item) => item.id === data.usuario_tipo_id
      );
      if (selected) setTipoSelecionado(selected);
    };
    carregarUsuario();
  }, [id]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          ra_siape: Yup.string().required('RA/SIAPE obrigatório'),
          email: Yup.string().required('E-mail obrigatório'),
          senha: Yup.string().required('Senha obrigatória'),
          usuario_tipo_id: Yup.number().required('Tipo de usuário obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/usuarios/${id}`, data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
          },
        });

        history.push('/usuario');
      } catch (ex) {
        if (ex instanceof Yup.ValidationError) {
          const errors = getValidationErrors(ex);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro',
          description: ex.response.data.error,
          type: 'error',
        });
      }
    },
    [addToast, history, id]
  );

  const handleSelectChange = useCallback(
    (val) => {
      const selecionado = tipos.find((tipo) => tipo.id === Number(val));
      if (selecionado) setTipoSelecionado(selecionado);
    },
    [tipos]
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={usuario}>
            <h1>Cadastro de usuário</h1>

            <Wrap>
              <span>Nome do usuário</span>
              <Input name="nome" icon={FiEdit} placeholder="Nome do usuário" />
            </Wrap>

            <Wrap>
              <span>RA/Siape</span>
              <Input
                name="ra_siape"
                icon={FiEdit}
                placeholder="RA/SIAPE do usuário"
              />
            </Wrap>

            <Wrap>
              <span>E-mail do usuário</span>
              <Input
                name="email"
                icon={FiEdit}
                placeholder="Email do usuário"
              />
            </Wrap>

            <Wrap>
              <span>Senha do usuário</span>
              <Input name="senha" icon={FiEdit} placeholder="Senha" />
            </Wrap>

            <Wrap>
              <span>Tipo do usuário</span>
              <select
                value={tipoSelecionado.id}
                onChange={(e) => handleSelectChange(e.target.value)}
                required
                name="usuario_tipo_id"
              >
                <option value="">Selecione um tipo...</option>
                {tipos.map((tipo) => (
                  <option value={tipo.id} key={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </Wrap>

            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Editar;
