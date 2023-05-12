/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { lazy, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import cn from 'classnames';

import 'swiper/scss/pagination';
import 'swiper/scss';

import { artistsSelector, authArtistsSelector } from '@store/selectors';
import {
  addCurrentPainting,
  choiceMainPainting,
} from '@store/slices/authArtistsSlice';

import Loader from '@ui/Loader';
import Button from '@ui/Button';

import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import useTheme from '@hooks/useTheme';
import useAuth from '@hooks/useAuth';

import { ReactComponent as BtnClose } from '@svg/close-btn.svg';
import { ReactComponent as SliderArrow } from '@svg/slider-arrow.svg';
import { ReactComponent as MakeSlider } from '@svg/make-slider.svg';

import './style.scss';

const LazyLoad = lazy(() => import('@components/LazyLoad'));

const Modal = lazy(() => import('@components/Modals'));

interface ISliderProps {
  artistId: string;
  id: string;
  onClose?: () => void;
}

const Slider = ({ onClose, id, artistId }: ISliderProps) => {
  const { isDark } = useTheme();

  const dispatch = useAppDispatch();

  const { isLoading, artist } = useAppSelector(artistsSelector);

  const { currentPainting } = useAppSelector(authArtistsSelector);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isCurrentCover, setIsCurrentCover] = useState(false);

  const { paintings } = artist;

  const currentIndexSlide = paintings.findIndex((item) => item._id === id);

  const firstId = paintings[0]._id;

  const isCover = (index: number) => {
    setCurrentIndex(index);
    setIsCurrentCover(currentPainting === paintings[index]?._id);
  };

  useEffect(() => {
    isCover(currentIndexSlide);
  }, []);

  const currId = paintings[currentIndex]?._id;

  const paintingDispatch = () => {
    if (currentPainting === currId) {
      dispatch(choiceMainPainting({ id: firstId, artistId }));
      dispatch(addCurrentPainting(firstId));
      setIsCurrentCover(false);
    } else {
      dispatch(choiceMainPainting({ id: currId, artistId }));
      dispatch(addCurrentPainting(currId));
    }
  };

  const isAuth = useAuth();

  return (
    <Modal variant='slider'>
      <div className={cn('wrapper', { 'wrapper--dark': isDark })}>
        <button
          type='button'
          onClick={onClose}
          className={cn('wrapper__close')}
        >
          <BtnClose />
        </button>
        {isAuth && (
          <Button
            onClick={paintingDispatch}
            variant='text'
            className={cn('wrapper__cover', {
              'wrapper__cover--disabled':
                paintings[currentIndex]._id === firstId &&
                currentPainting === firstId,
            })}
          >
            <span className={cn('wrapper__icon')}>
              <MakeSlider />
            </span>
            <span className={cn('wrapper__text')}>
              {isCurrentCover || currentPainting === currId
                ? 'Remove the cover'
                : 'Make the cover'}
            </span>
          </Button>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <Swiper
            slidesPerView={1}
            pagination={{
              type: 'fraction',
            }}
            navigation={{
              prevEl: '.wrapper__slider-prev',
              nextEl: '.wrapper__slider-next',
            }}
            onSlideChangeTransitionEnd={(swiper) => isCover(swiper.realIndex)}
            initialSlide={currentIndexSlide}
            modules={[Pagination, Navigation]}
          >
            {paintings?.map(({ yearOfCreation, _id, name, image }) => (
              <SwiperSlide className={cn('wrapper__slider')} key={_id}>
                <div className={cn('wrapper__slider-block')}>
                  <div className={cn('wrapper__slider-info')}>
                    <div className={cn('wrapper__slider-creation')}>
                      {yearOfCreation}
                    </div>
                    <div className={cn('wrapper__slider-name')}>{name}</div>
                  </div>
                </div>
                <LazyLoad
                  name={name}
                  className={cn('wrapper__slider-images')}
                  image={image}
                />
              </SwiperSlide>
            ))}
            <button type='button' className={cn('wrapper__slider-prev')}>
              <SliderArrow />
            </button>
            <button type='button' className={cn('wrapper__slider-next')}>
              <SliderArrow />
            </button>
          </Swiper>
        )}
      </div>
    </Modal>
  );
};

export default Slider;
