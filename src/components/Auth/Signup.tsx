import cn from 'classnames';
import { useEffect, lazy } from 'react';

import useAuth from '@hooks/useAuth';

import './style.scss';

const Form = lazy(() => import('@components/Form'));

interface ISignup {
  onClick?: () => void;
  onCloseSignup?: () => void;
  isDark: boolean;
}

const Signup = ({ onClick, onCloseSignup, isDark }: ISignup) => {
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth && onCloseSignup) onCloseSignup();
  }, [onCloseSignup, isAuth]);

  return (
    <div className={cn('signup', { 'signup--dark': isDark })}>
      <h4 className={cn('signup__title')}> Create your profile </h4>
      <p className={cn('signup__description')}>
        If you already have an account, please
        <button type='button' onClick={onClick} className={cn('signup__btn')}>
          log in
        </button>
      </p>
      <Form variant='sign up' />
    </div>
  );
};

export default Signup;
