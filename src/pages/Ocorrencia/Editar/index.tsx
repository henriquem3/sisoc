import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiClock, FiEdit } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Content } from './styles';

import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

import { useToast } from '../../../hooks/toast';

import { getValidationErrors } from '../../../utils/validators';
import api from '../../../services/api';

interface FormData {
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

  const [ocorrencia, setOcorrencia] = useState({} as Ocorrencia);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState({} as Tipo);

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    const carregar = async (): Promise<void> => {
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
      setOcorrencia({
        ...response.data,
        datahora: response.data.datahora.replace(':00.000Z', ''),
      });

      const selected = data.find(
        (item) => item.id === response.data.ocorrencia_tipo_id
      );
      if (selected) setTipoSelecionado(selected);
    };
    carregar();
  }, [id]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        Object.assign(data, {
          ocorrencia_tipo_id: tipoSelecionado.id,
        });

        const schema = Yup.object().shape({
          descricao: Yup.string().required('Descrição obrigatória'),
          situacao: Yup.string().required('Situação obrigatória'),
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
    [addToast, history, tipoSelecionado]
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
          <Form ref={formRef} onSubmit={handleSubmit} initialData={ocorrencia}>
            <h1>Cadastro de ocorrência</h1>

            <span>Quando aconteceu?</span>
            <Input name="datahora" type="datetime-local" icon={FiClock} />

            <Input name="situacao" icon={FiEdit} placeholder="Situação" />

            <select
              value={tipoSelecionado.id}
              onChange={(e) => handleSelectChange(e.target.value)}
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
