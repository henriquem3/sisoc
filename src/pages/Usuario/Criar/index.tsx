import React, { useCallback, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { Container, Content } from './styles';

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
  usuario_tipo: number;
}

const Criar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          ra_siape: Yup.string().required('RA/SIAPE obrigatório'),
          email: Yup.string().required('E-mail obrigatório'),
          senha: Yup.string().required('Senha obrigatória'),
          usuario_tipo: Yup.number().required('Tipo de usuário obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/usuarios', data, {
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
          description: 'Não foi possível executar esta ação',
          type: 'error',
        });
      }
    },
    [addToast, history]
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
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

export default Criar;
