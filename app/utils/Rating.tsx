import React, { FC } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

type Props = {
    rating: number,
}

const Rating:FC<Props> = ({rating}) => {
    const starts = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starts.push(
                <AiFillStar
                    key={i}
                    size={20}
                    color='#f6b100'
                    className='mr-2 cursor-pointer'
                />
            );
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            starts.push(
                <BsStarHalf
                key={i}
                size={17}
                color='#f6ba00'
                className='mr-2 cursor-pointer'
                />
            );
        } else {
            starts.push(
                <AiOutlineStar
                    key={i}
                    size={20}
                    color='#f6ba00'
                    className='mr-2 cursor-pointer'
                />
            );
        };
    };
  return (
    <div className='flex mt-1 ml-2 800px:mt-0 800px:ml-0'>
        {starts}
    </div>
  );
}

export default Rating