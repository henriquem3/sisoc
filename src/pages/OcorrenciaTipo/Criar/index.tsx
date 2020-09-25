import React, { useCallback, useEffect, useRef, useState } from 'react';
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

interface Setor {
  id: number;
  sigla: string;
}

const Criar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [setorSelecionado, setSetorSelecionado] = useState({} as Setor);

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    const carregarSetores = async (): Promise<void> => {
      const { data } = await api.get('/setores', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setSetores(data);
    };
    carregarSetores();
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        Object.assign(data, {
          setor_id: setorSelecionado.id,
        });
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          descricao: Yup.string().required('Descrição obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/ocorrencias/tipo', data, {
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
    [addToast, history, setorSelecionado]
  );

  const handleSelectChange = useCallback(
    (val) => {
      const selecionado = setores.find((setor) => setor.id === Number(val));
      if (selecionado) setSetorSelecionado(selecionado);
    },
    [setores]
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

            <select
              value={setorSelecionado.id}
              onChange={(e) => handleSelectChange(e.target.value)}
              required
              name="usuario_tipo_id"
            >
              <option value="">Selecione um setor...</option>
              {setores.map((setor) => (
                <option value={setor.id} key={setor.id}>
                  {setor.sigla}
                </option>
              ))}
            </select>
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Criar;
