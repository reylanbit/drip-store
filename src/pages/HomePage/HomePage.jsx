import React from 'react';
import { Link } from 'react-router-dom';
import Button from "../../components/Button/Button";
import Layout from "../../Layouts/Layout";
import Section from "../../components/Section/Section";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";
import SpecialOffer from "../../components/SpecialOffer/SpecialOffer";
import ProductListing from "../../components/ProductListing/ProductListing";
import Hero from "../../components/Hero/Hero";
import { PRODUCTS, HOME_SLIDES, COLLECTIONS } from "../../data/db";

const HomePage = () => {
  return (
    <Layout>
      <main className="flex flex-col gap-[48px] min-[1025px]:gap-[80px] bg-neutral-lightGray3 pb-[60px] min-[1025px]:pb-[80px]">
        <Hero slides={HOME_SLIDES} />

        <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[104px] w-full">
          <div className="flex flex-col gap-[40px]">
            <Section>
              <div className="flex flex-col min-[641px]:flex-row justify-between items-start min-[641px]:items-center w-full mb-[20px] gap-[12px]">
                <h2 className="text-[20px] min-[641px]:text-[24px] text-[#474747] font-bold">Coleções em destaque</h2>
              </div>
              <div className="grid grid-cols-1 min-[641px]:grid-cols-2 min-[1025px]:grid-cols-3 gap-[16px] min-[1025px]:gap-[20px] mt-[20px] w-full">
                {COLLECTIONS.map((col, i) => (
                  <div
                    key={i}
                    className="relative h-[200px] min-[641px]:h-[230px] min-[1025px]:h-[251px] bg-[#D8E3ED] rounded-[8px] p-[20px] min-[1025px]:p-[30px] flex flex-col justify-between overflow-hidden"
                  >
                    <span className="bg-[#E7FF86] text-[#474747] font-extrabold text-[12px] px-[15px] py-[5px] rounded-[20px] w-fit mb-[10px] z-20">
                      30% OFF
                    </span>
                    <Button
                      size="lg"
                      variant="primary"
                      className="w-[153px] text-[16px] z-20 mt-auto"
                    >
                      Comprar
                    </Button>
                    <img
                      className="absolute right-0 bottom-0 h-full z-10 object-contain max-w-full"
                      src={col.image}
                      alt="Coleção"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Categorias em destaque" titleAlign="center">
              <CategoryGrid />
            </Section>

            <Section>
              <div className="flex flex-col min-[641px]:flex-row justify-between items-start min-[641px]:items-center w-full mb-[20px] gap-[12px]">
                <h2 className="text-[20px] min-[641px]:text-[24px] text-[#474747] font-bold">Produtos em alta</h2>
                <Link
                  to="/produtos"
                  className="text-primary no-underline font-normal text-[16px] min-[641px]:text-[18px] flex items-center gap-[8px] hover:underline"
                >
                  Ver todos <span>&rarr;</span>
                </Link>
              </div>
              <ProductListing products={PRODUCTS.slice(0, 8)} />
            </Section>
          </div>
        </div>

        <SpecialOffer />
      </main>
    </Layout>
  );
};

export default HomePage;
