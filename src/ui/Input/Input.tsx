import { InputHTMLAttributes, FC, FocusEvent, LegacyRef } from 'react';
import cn from 'classnames';

import { ReactComponent as Error } from '@svg/error.svg';
import useTheme from '@hooks/useTheme';

import './style.scss';

export interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  labelText: string;
  isError?: boolean;
  errorText?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  inputRef: LegacyRef<HTMLInputElement>;
  required: boolean;
}

const Input: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  name,
  type,
  labelText,
  placeholder,
  isError,
  errorText = 'This is an error message!',
  children,
  className,
  onClick,
  onChange,
  onBlur,
  inputRef,
  required,
}) => {
  const { isDark } = useTheme();

  return (
    <>
      <label
        htmlFor={type}
        className={cn('input__label', {
          'input__label--dark': isDark,
        })}
      >
        {labelText}
      </label>
      <input
        placeholder={placeholder}
        required={required}
        onBlur={onBlur}
        ref={inputRef}
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        className={cn(
          'input',
          { 'input--error': isError },
          { 'input--dark': isDark },
          className
        )}
      />
      {children && (
        <button
          type='button'
          onClick={onClick}
          className={cn('input__visible', {
            'input__visible--dark': isDark,
          })}
        >
          {children}
        </button>
      )}
      {isError && (
        <div className={cn('input__error')}>
          <span className={cn('input__error-icon')}>
            <Error />
          </span>
          <label htmlFor={name} className={cn('input__error-text')}>
            {errorText}
          </label>
        </div>
      )}
    </>
  );
};

export default Input;
