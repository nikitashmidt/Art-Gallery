import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import type { Image } from '@/types';

import { baseURL } from '@/api';

interface ILazyLoad {
  name: string;
  className?: string;
  image: Image;
}

const LazyLoad = ({ name, className, image }: ILazyLoad) => (
  <LazyLoadImage
    alt={name}
    className={className}
    effect='blur'
    useIntersectionObserver
    loading='lazy'
    width='100%'
    height='100%'
    style={{ transition: '.5s all' }}
    srcSet={`${baseURL}${image?.webp2x} 320w, 
        ${baseURL}${image?.webp} 768w,
        ${baseURL}${image?.original} 1440w`}
    sizes='(max-width: 320px) 280px,
        (max-width: 768px) 464px,
        (max-width: 1440px) 392px '
    src={`${baseURL}${image?.original}`}
  />
);

export default LazyLoad;
