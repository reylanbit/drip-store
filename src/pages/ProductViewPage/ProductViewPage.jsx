import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../Layouts/Layout';
import Gallery from '../../components/Gallery/Gallery';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import ProductOptions from '../../components/ProductOptions/ProductOptions';
import ProductListing from '../../components/ProductListing/ProductListing';
import Button from '../../components/Button/Button';
import { PRODUCTS } from '../../data/db';
import { useCart } from '../../hooks/useCart';

export default function ProductViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((item) => String(item.id) === String(id)) || PRODUCTS[0];
  const images = [
    { src: `/${product.image}` },
    { src: `/${product.image}` },
    { src: `/${product.image}` },
    { src: `/${product.image}` }
  ];
  const related = PRODUCTS.filter((item) => item.id !== product.id).slice(0, 4);
  const sizes = ['39', '40', '41', '42', '43'];
  const colors = ['#62D2FF', '#FF5A7D', '#444444', '#6F73D2'];
  const sampleColors = ['#FFD6A5', '#C4F1BE', '#C0E5FF', '#E0C3FC', '#F9C6D4'];
  const [selections, setSelections] = useState({});
  const currentSelection = selections[id] || {
    size: sizes[0],
    color: colors[0],
    sampleColor: sampleColors[0]
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const onBuy = () => {
    addToCart({
      ...product,
      selectedSize: currentSelection.size,
      selectedColor: currentSelection.color,
      selectedSampleColor: currentSelection.sampleColor
    });
    navigate('/pedidos');
  };

  const updateSelection = (partial) => {
    setSelections((prev) => ({
      ...prev,
      [id]: { ...currentSelection, ...partial }
    }));
  };

  return (
    <Layout>
      <main className="bg-neutral-lightGray3">
        <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[100px] py-[32px] min-[1025px]:py-[40px]">
          <div className="flex flex-col min-[1025px]:flex-row gap-[24px] min-[1025px]:gap-[40px]">
            <Gallery width="100%" height="min(70vw, 520px)" radius="8px" showThumbs images={images} />
            <div className="flex-1 flex flex-col gap-[24px]">
              <ProductDetails
                name={product.name}
                category={product.category}
                price={product.price}
                priceDiscount={product.priceDiscount}
                description="Produto com acabamento premium, conforto e estilo para o dia a dia. Ideal para compor looks casuais e esportivos com máxima versatilidade."
                rating={4}
                reviews={14011988}
              />
              <ProductOptions
                sizes={sizes}
                colors={colors}
                sampleColors={sampleColors}
                selectedSize={currentSelection.size}
                selectedColor={currentSelection.color}
                selectedSampleColor={currentSelection.sampleColor}
                onSizeChange={(size) => updateSelection({ size })}
                onColorChange={(color) => updateSelection({ color })}
                onSampleColorChange={(sampleColor) => updateSelection({ sampleColor })}
              />
              <div className="flex flex-col min-[641px]:flex-row items-stretch min-[641px]:items-center gap-[16px]">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={onBuy}
                  className="w-full min-[641px]:w-[220px] text-[16px]"
                >
                  Comprar
                </Button>
                <a
                  href="/pedidos"
                  className="text-[16px] text-primary font-bold no-underline hover:underline text-center min-[641px]:text-left"
                >
                  Meus pedidos
                </a>
              </div>
            </div>
          </div>
          <div className="mt-[60px]">
            <h2 className="text-[20px] min-[641px]:text-[24px] text-neutral-darkGray2 font-bold mb-[20px]">
              Produtos relacionados
            </h2>
            <ProductListing products={related} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
