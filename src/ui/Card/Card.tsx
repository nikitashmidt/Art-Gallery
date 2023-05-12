import cn from 'classnames';

import type { IPainting } from '@types';
import LazyLoad from '@components/LazyLoad';
import useTheme from '@hooks/useTheme';
import { ReactComponent as Arrow } from '@svg/arrow.svg';

import './style.scss';

const Card = ({ name, yearOfCreation, image }: IPainting) => {
  const { isDark } = useTheme();

  return (
    <div className={cn('card', { 'card--dark': isDark })}>
      <LazyLoad className={cn('card__images')} image={image} name={name} />
      <div className={cn('card__block')}>
        <div className={cn('card__info')}>
          <span className={cn('card__name')}> {name} </span>
          <time className={cn('card__date')}> {yearOfCreation} </time>
        </div>
        <div className={cn('card__arrow')}>
          <Arrow />
        </div>
      </div>
    </div>
  );
};

export default Card;
