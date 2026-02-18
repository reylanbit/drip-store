import Layout from "../../Layouts/Layout"; 
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import ProductListing from "../../components/ProductListing/ProductListing";
import { PRODUCTS } from "../../data/db";

const ProductListingPage = () => {
  return (
    <Layout>
      <div className="flex flex-col min-[1025px]:flex-row px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[100px] py-[32px] min-[1025px]:py-[40px] bg-[#F5F5F5] gap-[24px]">
        <aside className="w-full min-[1025px]:w-[308px]">
          <div className="bg-white p-[20px] min-[1025px]:p-[30px] rounded-[8px]">
            <h3 className="text-[16px] text-[#474747] mb-[5px]">Filtrar por</h3>
            <hr className="my-[15px] border border-[#CCCCCC]" />
            <FilterGroup 
              title="Marca" 
              inputType="checkbox" 
              options={[{text: "Adidas"}, {text: "Balenciaga"}, {text: "K-Swiss"}, {text: "Nike"}, {text: "Puma"}]} 
            />
            <FilterGroup 
              title="Categoria" 
              inputType="checkbox" 
              options={[{text: "Esporte e Lazer"}, {text: "Casual"}, {text: "Utilitário"}, {text: "Corrida"}]} 
            />
            <FilterGroup 
              title="Gênero" 
              inputType="checkbox" 
              options={[{text: "Masculino"}, {text: "Feminino"}, {text: "Unissex"}]} 
            />
          </div>
        </aside>

        <section className="flex-1">
          <div className="flex flex-col min-[641px]:flex-row justify-between items-start min-[641px]:items-center mb-[24px] gap-[12px]">
            <h4 className="text-[#474747] text-[16px]">
              Resultados para "Ténis" - {PRODUCTS.slice(0, 15).length} produtos
            </h4>
            <div className="flex items-center gap-[10px] w-full min-[641px]:w-auto">
              <label className="text-[16px] font-bold text-[#474747]">Ordenar por:</label>
              <select className="w-full min-[641px]:w-auto h-[48px] border border-[#474747] rounded-[8px] px-[15px] text-[16px] text-[#474747] bg-transparent cursor-pointer">
                <option value="relevantes">Mais relevantes</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </div>
          </div>
          <div className="grid gap-[20px]">
            <ProductListing products={PRODUCTS.slice(0, 15)} />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductListingPage;
