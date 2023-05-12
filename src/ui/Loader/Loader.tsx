import cn from 'classnames';

import useTheme from '@hooks/useTheme';

import './style.scss';

const Loader = () => {
  const { isDark } = useTheme();

  return (
    <div className={cn('loader', { 'loader--dark': isDark })}>
      <svg className={cn('loader__icon')} viewBox='0 0 50 50'>
        <circle
          className={cn('firstCircle')}
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='5'
        />
      </svg>

      <svg className={cn('loader__icon')} viewBox='0 0 50 50'>
        <circle
          className={cn('secondCircle')}
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='5'
        />
      </svg>

      <svg className={cn('loader__icon')} viewBox='0 0 50 50'>
        <circle
          className={cn('thirdCircle')}
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='5'
        />
      </svg>

      <svg className={cn('loader__icon')} viewBox='0 0 50 50'>
        <circle
          className={cn('fourthCircle')}
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='5'
        />
      </svg>
    </div>
  );
};

export default Loader;
