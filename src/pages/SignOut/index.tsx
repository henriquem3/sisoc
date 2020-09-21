import React, { useEffect } from 'react';

import { useAuth } from '../../hooks/auth';
import history from '../../services/history';

const SignOut: React.FC = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
    history.push('/login');
  }, [signOut]);

  return <h1>Saindo...</h1>;
};

export default SignOut;
