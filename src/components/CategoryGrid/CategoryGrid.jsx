import { Link } from "react-router-dom";
import { CATEGORIES } from "../../data/db";
import { IoShirtOutline } from "react-icons/io5";
import { PiBaseballCapLight, PiHeadphonesLight, PiPantsLight } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";

// 2. Função auxiliar para escolher o ícone baseado no texto
const getIcon = (label) => {
  switch (label.toLowerCase()) {
    case 'camisetas': return <IoShirtOutline className="w-[64px] h-[64px]" />;
    case 'calças': return <PiPantsLight className="w-[64px] h-[64px]" />;
    case 'bonés': return <PiBaseballCapLight className="w-[64px] h-[64px]" />;
    case 'headphones': return <PiHeadphonesLight className="w-[64px] h-[64px]" />;
    case 'tênis': return <GiConverseShoe className="w-[64px] h-[64px]" />;
    default: return <IoShirtOutline className="w-[64px] h-[64px]" />;
  }
};

const CategoryGrid = () => (
  <div className="flex justify-center gap-[24px] my-[32px] flex-wrap">
    {CATEGORIES.map((cat, idx) => (
      <Link key={idx} to="/categorias" className="flex flex-col items-center gap-[12px] no-underline">
        <div className="w-[84px] h-[84px] min-[641px]:w-[104px] min-[641px]:h-[104px] rounded-full bg-neutral-white flex items-center justify-center shadow-[0px_4px_10px_rgba(0,0,0,0.1)] cursor-pointer transition text-neutral-darkGray2 hover:text-primary hover:-translate-y-[5px]">
          {getIcon(cat.label)}
        </div>
        <span className="font-bold text-[14px] text-[#474747]">
          {cat.label}
        </span>
      </Link>
    ))}
  </div>
);

export default CategoryGrid;
