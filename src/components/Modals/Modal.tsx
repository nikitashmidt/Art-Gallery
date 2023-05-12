import cn from 'classnames';

import useTheme from '@hooks/useTheme';

import { ReactComponent as CloseBtn } from '@svg/close-btn.svg';

import useHidden from './useHidden';

import LoginImage from '@/resources/login-image.png';
import SignupImage from '@/resources/signup-image.png';

import './style.scss';

interface IModalProps {
  children?: React.ReactNode;
  variant: 'login' | 'signup' | 'menu' | 'picture' | 'slider';
  onClose?: () => void;
}

const Modal = ({ children, variant, onClose }: IModalProps) => {
  const { isDark } = useTheme();

  const obj = { login: LoginImage, signup: SignupImage };

  useHidden();

  return (
    <div
      className={cn('modal', {
        'modal--menu': variant === 'menu',
      })}
    >
      {variant === 'login' || variant === 'signup' ? (
        <div className={cn('modal__window', { 'modal__window--dark': isDark })}>
          <div className={cn('modal__window-left')}>
            <img
              src={obj[variant]}
              className={cn('modal__window-image')}
              alt={variant}
            />
          </div>
          <div className={cn('modal__window-right')}>
            <button
              type='button'
              className={cn('modal__window-close')}
              onClick={onClose}
            >
              <CloseBtn />
            </button>
            {children}
          </div>
        </div>
      ) : (
        ''
      )}

      {variant === 'menu' && children}
      {variant === 'picture' && children}
      {variant === 'slider' && children}

      <div
        onClick={onClose}
        role='presentation'
        className={cn('modal__overlay')}
      />
    </div>
  );
};

export default Modal;
