import { Link } from "react-router-dom";
import Button from "../Button/Button";

const AuthLinks = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-[16px] ${className}`}>
      <Link
        to="/register"
        className="min-h-[44px] px-[12px] text-[16px] text-[#474747] underline flex items-center justify-center"
      >
        Cadastre-se
      </Link>
      <Link to="/login" className="no-underline">
        <Button
          size="lg"
          variant="primary"
          className="px-[40px] text-[16px]"
        >
          Entrar
        </Button>
      </Link>
    </div>
  );
};

export default AuthLinks;
