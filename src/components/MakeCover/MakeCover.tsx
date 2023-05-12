import cn from 'classnames';

import {
  addCurrentPainting,
  choiceMainPainting,
} from '@store/slices/authArtistsSlice';
import { authArtistsSelector } from '@store/selectors';

import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import useTheme from '@hooks/useTheme';
import { ReactComponent as Triangle } from '@svg/triangle.svg';

import './style.scss';

interface ICover {
  id: string;
  artistId: string;
  indexId: string;
}

const Cover = ({ id, artistId, indexId }: ICover) => {
  const dispatch = useAppDispatch();

  const { isDark } = useTheme();

  const { isLoading, currentPainting } = useAppSelector(authArtistsSelector);

  const check = currentPainting === id;

  const editPaintingDispatch = () => {
    if (check) {
      dispatch(choiceMainPainting({ id: indexId, artistId }));
      dispatch(addCurrentPainting(indexId));
    } else {
      dispatch(choiceMainPainting({ id, artistId }));
      dispatch(addCurrentPainting(id));
    }
  };

  return (
    <div
      role='presentation'
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'make-cover',
        { 'make-cover--active': id },
        { 'make-cover--dark': isDark }
      )}
    >
      <div className={cn('make-cover__icon')}>
        <Triangle />
      </div>
      <ul className={cn('make-cover__items')}>
        <li className={cn('make-cover__item')}>
          <button
            type='button'
            onClick={editPaintingDispatch}
            className={cn('make-cover__button')}
            disabled={isLoading || (id === indexId && id === currentPainting)}
          >
            {check ? 'Remove the cover' : 'Make the cover'}
          </button>
        </li>
        <li className={cn('make-cover__item')}>
          <button type='button' className={cn('make-cover__button')}>
            Edit
          </button>
        </li>
        <li className={cn('make-cover__item')}>
          <button type='button' className={cn('make-cover__button')}>
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Cover;
