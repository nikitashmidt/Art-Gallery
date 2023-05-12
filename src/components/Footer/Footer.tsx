import { memo } from 'react';
import cn from 'classnames';

import useTheme from '@hooks/useTheme';
import { ReactComponent as Vk } from '@svg/vk.svg';
import { ReactComponent as Facebook } from '@svg/facebook.svg';
import { ReactComponent as Instagram } from '@svg/inst.svg';
import LinkSocial from './LinkSocial';

import './style.scss';

const Footer = memo(() => {
  const { isDark } = useTheme();

  return (
    <footer className={cn('footer', { 'footer--dark': isDark })}>
      <div className={cn('footer__container')}>
        <div className={cn('footer__info')}>
          <p className={cn('footer__info-description')}>
            Проект реализован в рамках стажировки для Frontend разработчиков от
            компании
            <LinkSocial
              href='https://framework.team'
              title='Framework Team'
              className={cn('footer__info-company')}
            >
              Framework Team
            </LinkSocial>
          </p>
          <span className={cn('footer__info-author')}>Шмидт Никита, 2022</span>
        </div>
        <div className={cn('footer__socials')}>
          <LinkSocial
            href='https://facebook.com'
            title='facebook'
            className={cn('footer__socials-link')}
          >
            <Facebook />
          </LinkSocial>
          <LinkSocial
            href='https://instagram.com'
            title='instagram'
            className={cn('footer__socials-link')}
          >
            <Instagram />
          </LinkSocial>
          <LinkSocial
            href='https://vk.com'
            title='vk'
            className={cn('footer__socials-link')}
          >
            <Vk />
          </LinkSocial>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
