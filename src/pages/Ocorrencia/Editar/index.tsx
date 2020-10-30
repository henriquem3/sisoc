/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiClock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Content } from './styles';

import InputMasked from '../../../components/InputMasked';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';

import { getValidationErrors } from '../../../utils/validators';
import api from '../../../services/api';
import Tooltip from '../../../components/Tooltip';

interface FormData {
  alvo: string;
  descricao: string;
  situacao: string;
  ocorrencia_tipo_id: number;
  datahora: string;
}

interface Tipo {
  id: number;
  nome: string;
  descricao: string;
}

interface Ocorrencia extends FormData {
  id: number;
}

interface Params {
  id: string | undefined;
}

const Editar: React.FC = () => {
  const { id } = useParams<Params>();
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();

  const [ocorrencia, setOcorrencia] = useState({} as Ocorrencia);

  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState({} as Tipo);

  const [situacaoSelecionada, setSituacaoSelecionada] = useState('');

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    const carregar = async (): Promise<void> => {
      try {
        const { data } = await api.get<Tipo[]>('/ocorrencias/tipo', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
          },
        });
        setTipos(data);

        const response = await api.get<Ocorrencia>(`/ocorrencias/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('@Sisoc:token')}`,
          },
        });

        const dthr = new Date(response.data.datahora);
        const datahora = `${dthr.getDate().toString().padStart(2, '0')}/${(
          dthr.getMonth() + 1
        )
          .toString()
          .padStart(
            2,
            '0'
          )}/${dthr.getFullYear()} ${dthr
          .getHours()
          .toString()
          .padStart(2, '0')}:${dthr.getMinutes().toString().padStart(2, '0')}`;

        setOcorrencia(response.data);

        formRef.current?.setFieldValue('datahora', datahora);

        setSituacaoSelecionada(response.data.situacao);

        const selTipo = data.find(
          (item) => item.id === response.data.ocorrencia_tipo_id
        );
        if (selTipo) setTipoSelecionado(selTipo);
      } catch (e) {
        if (e.response.status === 401) history.push('/');
      }
    };

    carregar();
  }, [id, history]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        Object.assign(data, {
          ocorrencia_tipo_id: tipoSelecionado.id,
          situacao: situacaoSelecionada,
          datahora: new Date(data.datahora).toISOString(),
        });

        const schema = Yup.object().shape({
          alvo: Yup.string().required('Alvo obrigatório'),
          descricao: Yup.string().required('Descrição obrigatória'),
          datahora: Yup.date().required('Data/hora obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/ocorrencias/${id}`, data, {
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
    [addToast, id, history, tipoSelecionado, situacaoSelecionada]
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
          <Form ref={formRef} onSubmit={handleSubmit} initialData={ocorrencia}>
            <h1>Cadastro de ocorrência</h1>

            <span>Quando aconteceu?</span>
            <InputMasked
              mask="99/99/9999 99:99"
              name="datahora"
              icon={FiClock}
            />

            <Input
              name="alvo"
              placeholder="Alvo"
              icon={() => (
                <Tooltip title="Pessoa envolvida/Problema encontrado">
                  <FiUser />
                </Tooltip>
              )}
            />

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

export default Editar;
