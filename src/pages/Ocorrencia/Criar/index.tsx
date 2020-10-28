import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { Container, Content } from './styles';

import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';

import { getValidationErrors } from '../../../utils/validators';
import api from '../../../services/api';

interface FormData {
  descricao: string;
  situacao: string;
  ocorrencia_tipo_id: number;
  datahora: Date;
}

interface Tipo {
  id: number;
  nome: string;
  descricao: string;
}

const Criar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();

  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState({} as Tipo);

  const [situacaoSelecionada, setSituacaoSelecionada] = useState('');

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    const carregarTipos = async (): Promise<void> => {
      const { data } = await api.get('/ocorrencias/tipo', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
        },
      });
      setTipos(data);
    };
    carregarTipos();
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        Object.assign(data, {
          ocorrencia_tipo_id: tipoSelecionado.id,
          situacao: situacaoSelecionada,
        });

        const schema = Yup.object().shape({
          descricao: Yup.string().required('Descrição obrigatória'),
          datahora: Yup.date().required('Data/hora obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/ocorrencias', data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
          },
        });

        history.push('/ocorrencia');
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
    [addToast, history, tipoSelecionado, situacaoSelecionada]
  );

  const handleTipoChange = useCallback(
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
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro de ocorrência</h1>

            <span>Quando aconteceu?</span>
            <Input name="datahora" type="datetime-local" icon={FiClock} />

            <select
              value={situacaoSelecionada}
              onChange={(e) => setSituacaoSelecionada(e.target.value)}
              required
              name="situacao"
            >
              <option value="">Selecione uma situação...</option>
              {user.usuario_tipo.nome.toLowerCase() !== 'admin' ? (
                <option value="A">ABERTO</option>
              ) : (
                <>
                  <option value="A">ABERTO</option>
                  <option value="D">DEFERIDO</option>
                  <option value="I">INDEFERIDO</option>
                </>
              )}
            </select>

            <select
              value={tipoSelecionado.id}
              onChange={(e) => handleTipoChange(e.target.value)}
              required
              name="ocorrencia_tipo_id"
            >
              <option value="">Selecione um tipo...</option>
              {tipos.map((tipo) => (
                <option value={tipo.id} key={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </select>
            <Textarea name="descricao" placeholder="Descrição" />
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Criar;
