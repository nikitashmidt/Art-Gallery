import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import Button from '@ui/Button';
import { ReactComponent as More } from '@svg/arrow-down.svg';

interface IReadMoreProps {
  description: string;
}

const ReadMore = ({ description }: IReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [fullHeigth, setFullHeigth] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) setFullHeigth(contentRef.current?.scrollHeight);
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const minHeight = 80;

  const compare = fullHeigth <= minHeight;

  const getCurrentHeight = () =>
    isExpanded || compare ? fullHeigth : minHeight;

  return (
    <div className={cn('info__readmore')}>
      <div
        className={cn('info__readmore-description')}
        style={{ height: `${getCurrentHeight()}px` }}
      >
        <p ref={contentRef}>{description}</p>
      </div>

      {!compare && (
        <Button variant='text' onClick={toggleExpand}>
          <span className={cn('info__readmore-text')}>
            {isExpanded ? 'Read less' : 'Read more'}
          </span>
          <span
            className={cn('info__readmore-svg', {
              'info__readmore-svg--active': isExpanded,
            })}
          >
            <More />
          </span>
        </Button>
      )}
    </div>
  );
};

export default ReadMore;
