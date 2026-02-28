import { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout"; 
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import ProductListing from "../../components/ProductListing/ProductListing";
import { fetchProducts } from "../../services/api";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(15);
        if (mounted) setProducts(data);
      } catch {
        if (mounted) setError("Não foi possível carregar os produtos.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

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
              Resultados para "Ténis" - {products.length} produtos
            </h4>
            <div className="flex items-center gap-[10px] w-full min-[641px]:w-auto">
              <button className="h-[48px] px-[16px] border border-[#474747] rounded-[8px] text-[16px] bg-white">
                Filtrar
              </button>
              <button className="h-[48px] px-[16px] border border-[#474747] rounded-[8px] text-[16px] bg-white">
                Ordenar
              </button>
            </div>
          </div>
          <div className="grid gap-[20px]">
            {error && <div className="text-error">{error}</div>}
            {loading ? (
              <div className="text-[#474747]">Carregando produtos...</div>
            ) : (
              <ProductListing products={products} />
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductListingPage;
