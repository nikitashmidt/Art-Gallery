import cn from 'classnames';

import './style.scss';

interface IGridProps {
  children: React.ReactNode;
  className?: string;
}

const Grid = ({ children, className = '' }: IGridProps) => (
  <ul className={cn('grid', className)}>{children}</ul>
);

export default Grid;
