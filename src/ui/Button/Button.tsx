import cn from 'classnames';

import useTheme from '@hooks/useTheme';

import './style.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'default' | 'text' | 'icon' | 'circle';
}

const Button = ({ className, variant = 'default', ...props }: IButtonProps) => {
  const { isDark } = useTheme();

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={cn(
        'button',
        className,
        { [`button--dark`]: isDark },
        `button--${variant}`
      )}
      {...props}
    />
  );
};

export default Button;
