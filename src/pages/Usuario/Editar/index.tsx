import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Content } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

import { useToast } from '../../../hooks/toast';

import { getValidationErrors } from '../../../utils/validators';
import api from '../../../services/api';

interface FormData {
  nome: string;
  descricao: string;
}

interface Usuario extends FormData {
  id: number;
}

interface Params {
  id: string | undefined;
}

const Editar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);

  const { addToast } = useToast();
  const { id } = useParams<Params>();
  const history = useHistory();

  useEffect(() => {
    const carregarUsuario = async (): Promise<void> => {
      const { data } = await api.get(`/usuarios/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setUsuario(data);
    };
    carregarUsuario();
  }, [id]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          descricao: Yup.string().required('Descrição obrigatória'),
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

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={usuario}>
            <h1>Cadastro de usuário</h1>
            <Input name="nome" icon={FiEdit} placeholder="Nome do usuário" />
            <Input
              name="ra_siape"
              icon={FiEdit}
              placeholder="RA/SIAPE do usuário"
            />
            <Input
              name="email"
              icon={FiEdit}
              placeholder="Email do usuário"
            />
            <Input
              type="password"
              name="senha"
              icon={FiEdit}
              placeholder="Senha"
            />
            <Input
              name="usuario_tipo"
              icon={FiEdit}
              placeholder="Tipo do usuário"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Editar;
