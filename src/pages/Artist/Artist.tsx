import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import Info from '@components/Info';
import Cover from '@components/MakeCover';

import Grid from '@ui/Grid';
import Card from '@ui/Card';
import Loader from '@ui/Loader';
import Button from '@ui/Button';

import { artistsSelector } from '@store/selectors';
import { getOneArtist } from '@store/slices/artistsSlice';
import { addCurrentPainting } from '@store/slices/authArtistsSlice';

import useTheme from '@hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import useAuth from '@hooks/useAuth';

import { ReactComponent as BackButton } from '@svg/back-button.svg';
import { ReactComponent as GearIcon } from '@svg/gear.svg';
import { ReactComponent as AddIcon } from '@svg/add.svg';

import './style.scss';

const Slider = lazy(() => import('@components/Slider'));
const LazyLoad = lazy(() => import('@components/LazyLoad'));
const ModalChange = lazy(() => import('@components/Modals/ModalChange'));

const Artist = () => {
  const [currentIdForSlider, setCurrentIdForSlider] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [getIdForMakeCover, setGetIdForMakeCover] = useState('');

  const { isDark } = useTheme();

  const { authorId } = useParams();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isAuth = useAuth();

  const { artist, isLoading } = useAppSelector(artistsSelector);

  const { name, avatar, paintings, mainPainting } = artist;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (authorId) {
      dispatch(getOneArtist({ id: authorId, isAuth }));
    }
  }, [dispatch, authorId, isAuth]);

  useEffect(() => {
    if (mainPainting) dispatch(addCurrentPainting(mainPainting._id));
  }, [mainPainting]);

  const visibleCover = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation();

    if (getIdForMakeCover !== '') {
      return setGetIdForMakeCover('');
    }

    return setGetIdForMakeCover(id);
  };

  return (
    <section className={cn('artist', { 'artist--dark': isDark })}>
      {currentIdForSlider && (
        <Suspense fallback={<Loader />}>
          <Slider
            artistId={authorId || ''}
            id={currentIdForSlider}
            onClose={() => setCurrentIdForSlider('')}
          />
        </Suspense>
      )}

      {isModalOpen && (
        <Suspense fallback={<Loader />}>
          <ModalChange onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className={cn('artist__content')}>
          <Button
            variant='text'
            onClick={() => navigate(-1)}
            className={cn('artist__back')}
          >
            <BackButton />
            <span className={cn('artist__back-text')}>Back</span>
          </Button>
          <div className={cn('artist__block')}>
            <div className='artist__image'>
              <LazyLoad
                name={name}
                className={cn('artist__avatar')}
                image={avatar}
              />
            </div>
            <Info {...artist} />
          </div>
          <h3 className={cn('artist__subtitle')}>Artworks</h3>
          {isAuth && (
            <Button
              onClick={() => setIsModalOpen(true)}
              variant='text'
              className={cn('artist__add')}
            >
              <AddIcon /> add picture
            </Button>
          )}
          <Grid className={cn('artist__grid')}>
            {paintings?.map((author) => (
              <li
                className={cn('artist__card')}
                role='presentation'
                data-button='card'
                onClick={() => setCurrentIdForSlider(author._id)}
                key={author._id}
              >
                <Card {...author} />
                {isAuth && (
                  <>
                    <button
                      type='button'
                      data-button='gear'
                      className={cn('artist__gear', {
                        'artist__gear--active':
                          getIdForMakeCover === author._id,
                      })}
                      onClick={(e) => visibleCover(e, author._id)}
                    >
                      <GearIcon style={{ pointerEvents: 'none' }} />
                    </button>
                    {getIdForMakeCover === author._id && (
                      <Cover
                        indexId={paintings[0]._id}
                        id={getIdForMakeCover}
                        artistId={authorId as string}
                      />
                    )}
                  </>
                )}
              </li>
            ))}
          </Grid>
        </div>
      )}
    </section>
  );
};

export default Artist;
