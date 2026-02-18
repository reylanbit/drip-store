import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ className = "" }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/produtos?filter=${search}`);
    }
  };

  return (
    <div
      className={`w-full h-[48px] min-[641px]:h-[56px] rounded-[8px] bg-[#F5F5F5] flex items-center px-[16px] ${className}`}
    >
      <input
        type="text"
        placeholder="Pesquisar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 border-none bg-transparent outline-none text-[16px]"
      />
      <button
        onClick={handleSearch}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <FiSearch className="text-lg" />
      </button>
    </div>
  );
};

export default SearchBar;
