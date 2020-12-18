import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  ra_siape: string;
  email: string;
  senha: string;
  usuario_tipo_id: number;
}

interface Tipo {
  id: number;
  nome: string;
  descricao: string;
}

const Criar: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState({} as Tipo);

  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    const carregarTipos = async (): Promise<void> => {
      const { data } = await api.get('/usuarios/tipo', {
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
          usuario_tipo_id: tipoSelecionado.id,
        });
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          ra_siape: Yup.string().required('RA/SIAPE obrigatório'),
          email: Yup.string().required('E-mail obrigatório'),
          senha: Yup.string().required('Senha obrigatória'),
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
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro de usuário</h1>

            <Wrap>
              <span>Nome do usuário</span>
              <Input name="nome" icon={FiEdit} placeholder="Nome do usuário" />
            </Wrap>

            <Wrap>
              <span>RA/Siape</span>
              <Input
                name="ra_siape"
                icon={FiEdit}
                placeholder="RA/Siape do usuário"
              />
            </Wrap>

            <Wrap>
              <span>E-mail do usuário</span>
              <Input
                name="email"
                icon={FiEdit}
                placeholder="E-mail do usuário"
              />
            </Wrap>

            <Wrap>
              <span>Senha do usuário</span>
              <Input
                name="senha"
                icon={FiEdit}
                placeholder="Senha do usuário"
              />
            </Wrap>

            <Wrap>
              <span>Tipo do usuário</span>
              <select
                value={tipoSelecionado.id}
                onChange={(e) => handleSelectChange(e.target.value)}
                required
                name="usuario_tipo_id"
              >
                <option value="">Selecione um tipo...</option>
                {tipos.map((tipo) => (
                  <option value={tipo.id} key={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </Wrap>
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Criar;
