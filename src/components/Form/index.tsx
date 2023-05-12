import { useState } from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'classnames';

import type { IFormData, IUserRequest } from '@types';

import Button from '@ui/Button';
import Input from '@ui/Input';

import { registerUser, loginUser } from '@store/slices/authSlice';
import { useAppDispatch } from '@hooks/useStore';

import { ReactComponent as VisiblePass } from '@svg/visiblepass.svg';
import { ReactComponent as HiddenPass } from '@svg/hiddenpass.svg';

import './style.scss';

interface IForm {
  variant: 'sign up' | 'login';
}

const Form = ({ variant }: IForm) => {
  const [visiblePass, setVisiblePass] = useState(false);

  const { data } = useVisitorData();

  const dispatch = useAppDispatch();

  const schema = yup.object({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Enter your email'),
    password: yup
      .string()
      .min(6, 'Min number of characters 6')
      .required('Enter your password'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormData> = ({ email, password }) => {
    const getValues: IUserRequest = {
      username: email,
      password,
      fingerprint: `${data?.visitorId}`,
    };

    if (variant === 'login') {
      dispatch(loginUser(getValues));
    } else if (variant === 'sign up') {
      dispatch(registerUser(getValues));
    }
  };

  const emailData = register('email');

  const passwordData = register('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('form')}>
      <div className={cn('form__email')}>
        <Input
          required={emailData.required as boolean}
          placeholder='Type here your email'
          errorText={errors.email?.message}
          isError={!!errors.email}
          inputRef={emailData.ref}
          name={emailData.name}
          type='email'
          labelText='Email'
          onBlur={emailData.onBlur}
          onChange={emailData.onChange}
        />
      </div>

      <div className={cn('form__password')}>
        <Input
          required={passwordData.required as boolean}
          placeholder='Type here your password'
          errorText={errors.password?.message}
          isError={!!errors.password}
          inputRef={passwordData.ref}
          name={passwordData.name}
          type={visiblePass ? 'text' : 'password'}
          labelText='Password'
          className={cn('input__password')}
          onBlur={passwordData.onBlur}
          onChange={passwordData.onChange}
          onClick={() => setVisiblePass(!visiblePass)}
        >
          {visiblePass ? <HiddenPass /> : <VisiblePass />}
        </Input>
      </div>

      <Button
        disabled={
          passwordData.disabled ||
          emailData.disabled ||
          !!errors.email ||
          !!errors.password ||
          !isValid
        }
        type='submit'
        variant='default'
        className={cn('form__button')}
      >
        {variant}
      </Button>
    </form>
  );
};

export default Form;
