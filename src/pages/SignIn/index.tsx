import React, { useCallback, useEffect, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { Container, Content, AnimationContainer, Background } from './styles';
import bgImage from '../../assets/ifms-logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { getValidationErrors } from '../../utils/validators';

interface FormData {
  email: string;
  senha: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          senha: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email.toLowerCase(),
          senha: data.senha,
        });

        history.replace(from);
      } catch (ex) {
        if (ex instanceof Yup.ValidationError) {
          const errors = getValidationErrors(ex);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro ao fazer login',
          description: 'Verifique suas credenciais',
          type: 'error',
        });
      }
    },
    [signIn, addToast, history, from]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>SISOC - Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="senha"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>

            {/* <Link to="forgot">Esqueci minha senha</Link> */}
          </Form>

          {/* <Link to="signup">
            <FiLogIn />
            Criar conta
          </Link> */}
        </AnimationContainer>
      </Content>
      <Background src={bgImage} />
    </Container>
  );
};

export default SignIn;
