import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

export default function ProductDetails({
  name,
  category,
  price,
  priceDiscount,
  description,
  rating = 4,
  reviews = 14011988
}) {
  const formatBRL = (value) =>
    typeof value === 'number'
      ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : value;

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="text-[12px] text-neutral-lightGray uppercase tracking-[1px]">{category}</div>
      <h1 className="text-[24px] min-[641px]:text-[28px] min-[1025px]:text-[32px] font-bold text-neutral-darkGray2">
        {name}
      </h1>
      <div className="flex items-center gap-[8px] text-[14px] text-neutral-darkGray2">
        <span className="bg-warning text-white px-[8px] py-[2px] rounded-[4px] font-bold">
          {rating.toFixed(1)}
        </span>
        <div className="flex items-center gap-[2px] text-warning">
          {[0, 1, 2, 3, 4].map((i) =>
            i < Math.round(rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
        </div>
        <span>({reviews} avaliações)</span>
      </div>
      <div className="flex items-center gap-[12px]">
        <span className="text-[24px] min-[641px]:text-[28px] font-bold text-neutral-darkGray">
          {formatBRL(priceDiscount || price)}
        </span>
        {priceDiscount && (
          <span className="text-[18px] text-neutral-lightGray line-through">{formatBRL(price)}</span>
        )}
      </div>
      <p className="text-[16px] leading-[28px] text-neutral-darkGray3">{description}</p>
    </div>
  );
}
