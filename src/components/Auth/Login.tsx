import cn from 'classnames';
import { lazy, useEffect } from 'react';

import useAuth from '@hooks/useAuth';

import './style.scss';

const Form = lazy(() => import('@components/Form'));

interface ILogin {
  onClick?: () => void;
  onCloseLogin?: () => void;
  isDark: boolean;
}

const Login = ({ onClick, onCloseLogin, isDark }: ILogin) => {
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth && onCloseLogin) onCloseLogin();
  }, [onCloseLogin, isAuth]);

  return (
    <div className={cn('login', { 'login--dark': isDark })}>
      <h4 className={cn('login__title')}> Welcome back </h4>
      <p className={cn('login__description')}>
        If you dont have an account yet, please
        <button type='button' className={cn('login__btn')} onClick={onClick}>
          sign up
        </button>
      </p>
      <Form variant='login' />
    </div>
  );
};

export default Login;
