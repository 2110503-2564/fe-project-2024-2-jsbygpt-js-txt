'use client';

import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';

interface CardProps {
  venueName: string;
  imgSrc: string;
  rating?: number;
  onRatingChange?: (venue: string, newRating: number) => void;
}

const Card = ({ venueName, imgSrc, rating, onRatingChange }: CardProps) => {
  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null && onRatingChange) {
      onRatingChange(venueName, newValue);
    }
  };

  return (
    <InteractiveCard contentName={venueName}>
      <div className='w-full h-[70%] relative rounded-t-lg'>
        {/* <Image src={imgSrc} alt={venueName} fill={true} className='object-cover rounded-t-lg' /> */}
      </div>
      <div className='w-full h-[30%] p-[10px]'>
        <div className='text-2xl text-black mb-2'>{venueName}</div>
        {onRatingChange && rating !== undefined && (
          <Rating
            name={venueName + ' Rating'}
            id={venueName + ' Rating'}
            data-testid={venueName + ' Rating'}
            value={rating}
            onChange={handleRatingChange}
          />
        )}
      </div>
    </InteractiveCard>
  );
};

export default Card;