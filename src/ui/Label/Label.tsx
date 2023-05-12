import cn from 'classnames';

import useTheme from '@hooks/useTheme';

import './style.scss';

interface ILabelProps {
  children: string;
  className?: string;
}

const Label = ({ className, children }: ILabelProps) => {
  const { isDark } = useTheme();

  return (
    <li className={cn('label', className, { 'label--dark': isDark })}>
      {children}
    </li>
  );
};

export default Label;
