import { lazy, memo, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { logOutUser } from '@store/slices/authSlice';

import { useAppDispatch } from '@hooks/useStore';
import useTheme from '@hooks/useTheme';
import useAuth from '@hooks/useAuth';

import Modal from '@components/Modals/Modal';
import Loader from '@ui/Loader';

import { ReactComponent as Logo } from '@svg/logo.svg';
import { ReactComponent as DarkTheme } from '@svg/dark-theme.svg';
import { ReactComponent as Hamburger } from '@svg/hamburger.svg';
import { ReactComponent as CloseBtn } from '@svg/close-btn.svg';
import { ReactComponent as LightTheme } from '@svg/light-theme.svg';

import './style.scss';

const ModalSignup = lazy(() => import('@components/Modals/ModalSignup'));
const ModalLogin = lazy(() => import('@components/Modals/ModalLogin'));

const Header = memo(() => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const [visibleModal, setVisibleModal] = useState('');

  const { isDark, toggleTheme } = useTheme();

  const toggleOpenMenu = () => setIsOpenMenu(!isOpenMenu);

  const toggleChangeTheme = () => toggleTheme(!isDark);

  const dispatch = useAppDispatch();

  const isAuth = useAuth();

  return (
    <header className={cn('header', { 'header--dark': isDark })}>
      {isOpenMenu && <Modal variant='menu' onClose={toggleOpenMenu} />}

      {visibleModal === 'login' && (
        <Suspense fallback={<Loader />}>
          <ModalLogin
            isDark={isDark}
            onCloseLogin={() => setVisibleModal('')}
            loginClick={() => setVisibleModal('signup')}
          />
        </Suspense>
      )}

      {visibleModal === 'signup' && (
        <Suspense fallback={<Loader />}>
          <ModalSignup
            isDark={isDark}
            onCloseSignup={() => setVisibleModal('')}
            signupClick={() => setVisibleModal('login')}
          />
        </Suspense>
      )}

      <div className={cn('container header__container')}>
        <Link to='/' className={cn('header__logo')}>
          <Logo />
        </Link>

        {isAuth && <div>Welcome Back User </div>}

        <div className={cn('header__right')}>
          <button
            type='button'
            className={cn('header__hamburger')}
            onClick={toggleOpenMenu}
          >
            {isOpenMenu ? <CloseBtn /> : <Hamburger />}
          </button>
          <div
            className={cn('header__menu', {
              'header__menu--active': isOpenMenu,
            })}
          >
            <button
              type='button'
              className={cn('header__theme')}
              onClick={toggleChangeTheme}
            >
              <span className={cn('header__theme-icon')}>
                {isDark ? <LightTheme /> : <DarkTheme />}
              </span>

              <span className={cn('header__theme-mode')}>
                {isDark ? 'light mode' : 'Dark mode'}
              </span>
            </button>

            <div className={cn('header__authorization')}>
              {isAuth ? (
                <button
                  type='button'
                  className={cn('header__logout')}
                  onClick={() => dispatch(logOutUser())}
                >
                  Log Out
                </button>
              ) : (
                <>
                  <button
                    type='button'
                    className={cn('header__login')}
                    onClick={() => {
                      setVisibleModal('login');
                      setIsOpenMenu(false);
                    }}
                  >
                    Log in
                  </button>
                  <button
                    type='button'
                    className={cn('header__signup')}
                    onClick={() => {
                      setVisibleModal('signup');
                      setIsOpenMenu(false);
                    }}
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
