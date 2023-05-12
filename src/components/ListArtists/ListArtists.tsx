import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Grid from '@ui/Grid';
import Card from '@ui/Card';
import Loader from '@ui/Loader';

import { artistsSelector } from '@store/selectors';
import { getAllArtists } from '@store/slices/artistsSlice';

import useAuth from '@hooks/useAuth';
import { useAppSelector, useAppDispatch } from '@hooks/useStore';

import './style.scss';

const ListArtists = () => {
  const { artists, isLoading } = useAppSelector(artistsSelector);

  const dispatch = useAppDispatch();

  const isAuth = useAuth();

  useEffect(() => {
    dispatch(getAllArtists(isAuth));
  }, [dispatch, isAuth]);

  return (
    <section className={cn('list-artists')}>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
          {artists.map(({ yearsOfLife, mainPainting, _id, name }) => (
            <Link to={`/author/${_id}`} key={_id}>
              <Card
                yearOfCreation={yearsOfLife}
                image={mainPainting?.image}
                key={_id}
                _id={_id}
                name={name}
              />
            </Link>
          ))}
        </Grid>
      )}
    </section>
  );
};

export default ListArtists;
