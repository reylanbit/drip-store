import { useMemo, useRef, useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import Button from "../../components/Button/Button";
import adidasImage from "../../assets/brands/adidas/adidas (1).webp";
import asicsImage from "../../assets/brands/asics/asics (1).webp";
import mizunoImage from "../../assets/brands/mizuno/mizuno (1).jpg";
import newBalanceImage from "../../assets/brands/new balance/new balance (1).jpg";
import nikeImage from "../../assets/brands/nike/nike.jpg";
import pumaImage from "../../assets/brands/puma/puma (1).webp";

const CategoriesPage = () => {
  const gridRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const data = useMemo(() => ([
    {
      name: "Nike",
      description: "Inovação, performance e estilo para o dia a dia.",
      imageUrl: nikeImage,
      link: "/categoria/nike",
      tag: "popular"
    },
    {
      name: "Adidas",
      description: "Conforto esportivo com design icônico.",
      imageUrl: adidasImage,
      link: "/categoria/adidas",
      tag: "popular"
    },
    {
      name: "Puma",
      description: "Leveza e atitude para treinos e lifestyle.",
      imageUrl: pumaImage,
      link: "/categoria/puma",
      tag: "new"
    },
    {
      name: "New Balance",
      description: "Estabilidade e conforto premium em cada passo.",
      imageUrl: newBalanceImage,
      link: "/categoria/new-balance",
      tag: "popular"
    },
    {
      name: "Asics",
      description: "Tecnologia de amortecimento para alta performance.",
      imageUrl: asicsImage,
      link: "/categoria/asics",
      tag: "new"
    },
    {
      name: "Mizuno",
      description: "Durabilidade e desempenho para treinos intensos.",
      imageUrl: mizunoImage,
      link: "/categoria/mizuno",
      tag: "new"
    }
  ]), []);

  const filtered = useMemo(() => {
    if (filter === "all") return data;
    return data.filter((item) => item.tag === filter);
  }, [data, filter]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.querySelectorAll("[data-card]"));
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-3");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filtered, visibleCount]);

  const onFilterChange = (e) => {
    setFilter(e.target.value);
    setVisibleCount(6);
  };

  const onViewAll = () => {
    setVisibleCount(filtered.length);
  };

  return (
    <Layout>
      <main className="bg-neutral-lightGray3">
        <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[104px] py-[32px] min-[1025px]:py-[40px]">
          <section aria-labelledby="categorias-title">
            <div className="flex flex-wrap items-center justify-between gap-[12px] mb-[24px]">
              <div>
                <h2 id="categorias-title" className="text-[22px] min-[641px]:text-[28px] font-bold text-neutral-darkGray2">
                  Categorias em destaque
                </h2>
                <p className="text-[16px] text-neutral-darkGray3 mt-[6px]">
                  Explore rapidamente o que você procura.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[12px]">
                <select
                  value={filter}
                  onChange={onFilterChange}
                  className="h-[44px] px-[12px] rounded-[10px] border border-neutral-lightGray2 bg-white text-[14px] text-neutral-darkGray2"
                  aria-label="Filtrar categorias"
                >
                  <option value="all">Todas</option>
                  <option value="popular">Mais populares</option>
                  <option value="new">Novidades</option>
                </select>
                <button
                  type="button"
                  onClick={onViewAll}
                  className="h-[44px] px-[16px] rounded-[10px] bg-primary text-white font-bold text-[14px] transition hover:brightness-110"
                >
                  Ver todas
                </button>
              </div>
            </div>

            <div
              ref={gridRef}
              className="grid gap-[24px] grid-cols-1 min-[641px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4"
              role="list"
            >
              {filtered.slice(0, visibleCount).map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  data-card
                  role="listitem"
                  className="bg-white rounded-[16px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] no-underline text-[#474747] visited:text-[#474747] transition duration-300 ease-in-out opacity-0 translate-y-3 hover:scale-[1.03] hover:shadow-[0_14px_40px_rgba(0,0,0,0.14)]"
                >
                  <img
                    src={item.imageUrl}
                    alt={`Categoria ${item.name}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = "/product-placeholder.png";
                    }}
                    className="w-full h-[180px] object-cover"
                  />
                  <div className="p-[16px] flex flex-col gap-[8px]">
                    <h3 className="text-[18px] font-bold text-[#474747]">{item.name}</h3>
                    <p className="text-[14px] text-neutral-darkGray3 leading-[21px]">
                      {item.description}
                    </p>
                    <span className="text-[14px] font-bold text-primary">Ver mais →</span>
                  </div>
                </a>
              ))}
            </div>

            {filtered.length > visibleCount && (
              <div className="flex justify-center mt-[28px]">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={onViewAll}
                  className="px-[24px] h-[40px] text-[14px]"
                >
                  Ver todas
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default CategoriesPage;
