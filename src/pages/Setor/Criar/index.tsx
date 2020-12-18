import React, { useCallback, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { Container, Content, Wrap } from './styles';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

import { useToast } from '../../../hooks/toast';

import { getValidationErrors } from '../../../utils/validators';
import api from '../../../services/api';

interface FormData {
  nome: string;
  sigla: string;
  email: string;
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
          sigla: Yup.string().required('Sigla obrigatória'),
          email: Yup.string().required('E-mail obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/setores', data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
          },
        });

        history.push('/setor');
      } catch (ex) {
        if (ex instanceof Yup.ValidationError) {
          const errors = getValidationErrors(ex);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro',
          description: ex.response?.data?.error,
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
            <h1>Cadastro de Setor</h1>

            <Wrap>
              <span>Nome do setor</span>
              <Input name="nome" icon={FiEdit} placeholder="Nome do setor" />
            </Wrap>

            <Wrap>
              <span>Sigla do setor</span>
              <Input name="sigla" icon={FiEdit} placeholder="Sigla do setor" />
            </Wrap>

            <Wrap>
              <span>E-mail do setor</span>
              <Input name="email" icon={FiEdit} placeholder="E-mail do setor" />
            </Wrap>

            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Criar;
