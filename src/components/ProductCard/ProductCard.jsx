import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useCart } from '../../hooks/useCart';

export default function ProductCard({ id, image, name, price, priceDiscount, category }) {
  const { addToCart } = useCart();
  const formatBRL = (value) =>
    typeof value === 'number'
      ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : value;

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart({ id, image, name, price, priceDiscount, category });
  };

  return (
    <Link
      to={id ? `/produto/${id}` : '/produto'}
      className="w-full max-w-[292px] flex flex-col gap-[12px] cursor-pointer group sm:max-w-full no-underline text-[#474747] visited:text-[#474747] [&_*]:text-[#474747] [&_*]:visited:text-[#474747]"
    >
      <div className="w-full h-[321px] bg-neutral-lightGray3 rounded-[4px] flex items-center justify-center overflow-hidden relative shadow-[0_4px_10px_rgba(0,0,0,0.03)] sm:h-[180px]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-[248px] h-[134px] max-w-full object-contain rotate-[-30deg] transition-transform duration-300 group-hover:scale-110 sm:w-[80%] sm:h-auto"
        />
      </div>
      <div className="text-[16px] text-neutral-darkGray2 font-normal">{name}</div>
      {!priceDiscount ? (
        <div className="text-[24px] font-bold text-neutral-darkGray sm:text-[18px]">{formatBRL(price)}</div>
      ) : (
        <div className="flex items-center gap-[12px]">
          <div className="text-[24px] font-bold text-neutral-darkGray sm:text-[18px]">
            {formatBRL(priceDiscount)}
          </div>
          <div className="text-[24px] text-neutral-lightGray line-through sm:text-[18px]">
            {formatBRL(price)}
          </div>
        </div>
      )}
      <Button
        size="lg"
        variant="primary"
        onClick={handleAddToCart}
        className="w-full text-[14px]"
      >
        Adicionar ao carrinho
      </Button>
    </Link>
  );
}
