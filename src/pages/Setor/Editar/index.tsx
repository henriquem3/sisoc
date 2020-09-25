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

interface Setor extends FormData {
  id: number;
}

interface Params {
  id: string | undefined;
}

const Editar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [setor, setSetor] = useState<Setor>({} as Setor);

  const { addToast } = useToast();
  const { id } = useParams<Params>();
  const history = useHistory();

  useEffect(() => {
    const carregarSetor = async (): Promise<void> => {
      const { data } = await api.get(`/setores/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setSetor(data);
    };
    carregarSetor();
  }, [id]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          sigla: Yup.string().required('Sigla obrigatória'),
          email: Yup.string().required('Email obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/setores/${id}`, data, {
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
          <Form ref={formRef} onSubmit={handleSubmit} initialData={setor}>
            <h1>Atualizar Setor</h1>
            <Input name="nome" icon={FiEdit} placeholder="Nome do setor" />
            <Input name="sigla" icon={FiEdit} placeholder="Sigla do setor" />
            <Input name="email" icon={FiEdit} placeholder="E-mail do setor" />
            <Button type="submit">Atualizar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Editar;
