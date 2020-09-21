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

interface Tipo extends FormData {
  id: number;
}

interface Params {
  id: string | undefined;
}

const Editar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [tipo, setTipo] = useState<Tipo>({} as Tipo);

  const { addToast } = useToast();
  const { id } = useParams<Params>();
  const history = useHistory();

  useEffect(() => {
    const carregarTipo = async (): Promise<void> => {
      const { data } = await api.get(`/usuarios/tipo/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setTipo(data);
    };
    carregarTipo();
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

        await api.put(`/usuarios/tipo/${id}`, data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
          },
        });

        history.push('/usuariotipo');
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
          <Form ref={formRef} onSubmit={handleSubmit} initialData={tipo}>
            <h1>Atualizar de tipo de usuário</h1>
            <Input name="nome" icon={FiEdit} placeholder="Nome do tipo" />
            <Input
              name="descricao"
              icon={FiEdit}
              placeholder="Descrição do tipo"
            />
            <Button type="submit">Atualizar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Editar;
