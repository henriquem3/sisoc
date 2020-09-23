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
  descricao: string;
  setor_id: number;
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
          descricao: Yup.string().required('Descrição obrigatória'),
          setor_id: Yup.number().required('Setor obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/ocorrenciatipos', data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
          },
        });

        history.push('/ocorrenciatipo');
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
            <h1>Cadastro de tipo de ocorrência</h1>
            <Input
              name="nome"
              icon={FiEdit}
              placeholder="Nome do tipo de ocorrência" 
            />
            <Input
              name="descricao"
              icon={FiEdit}
              placeholder="Descrição do tipo de ocorrência"
            />
            <Input
              name="setor_id"
              icon={FiEdit}
              placeholder="ID do Setor"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Criar;