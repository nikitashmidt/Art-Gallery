import cn from 'classnames';

import type { IGenre } from '@types';

import Label from '@ui/Label';
import useTheme from '@hooks/useTheme';
import ReadMore from './ReadMore';

import './style.scss';

interface InfoProps {
  name: string;
  yearsOfLife: string;
  description: string;
  genres: IGenre[];
}

const Info = ({ name, yearsOfLife, description, genres }: InfoProps) => {
  const { isDark } = useTheme();

  return (
    <div className={cn('info', { 'info--dark': isDark })}>
      <div className={cn('info__header')}>
        <time className={cn('info__date')}> {yearsOfLife} </time>
        <div className={cn('info__country')}> Feodosia, Russian Empire </div>
        <h1 className={cn('info__title')}> {name} </h1>
      </div>
      <div className={cn('info__divider')} />
      <ReadMore description={description} />
      <ul>
        {genres?.map((genre) => (
          <Label key={genre._id}>{genre.name}</Label>
        ))}
      </ul>
    </div>
  );
};

export default Info;
