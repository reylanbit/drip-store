import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductListing({ products = [] }) {
  return (
    <div className="grid grid-cols-1 gap-[16px] min-[641px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          image={p.image}
          name={p.name}
          price={p.price}
          priceDiscount={p.priceDiscount}
          category={p.category}
          tag={p.tag}
        />
      ))}
    </div>
  );
}
