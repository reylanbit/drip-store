import LogoFooter from "../../assets/logo-footer.svg";
import facebookIcon from "../../assets/facebook.svg";
import instagramIcon from "../../assets/instagram.svg";
import twitterIcon from "../../assets/twitter.svg";
import InfoColumn from "./InfoColumn";

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] w-full font-inter">
      <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[104px] pt-[48px] min-[1025px]:pt-[72px] pb-[32px]">
        <div className="flex flex-col min-[1025px]:flex-row items-start gap-[32px] min-[1025px]:gap-[80px]">
          <div className="w-full min-[1025px]:w-[255px]">
            <img className="w-[220px] min-[641px]:w-[253px] h-auto" src={LogoFooter} alt="Drip Store Logo" />
            <p className="max-w-[340px] my-[16px] text-[16px] leading-[26px] text-[#cccccc]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-[24px]">
              <a href="#" className="w-[44px] h-[44px] flex items-center justify-center">
                <img className="w-[14px] h-auto" src={facebookIcon} alt="Facebook" />
              </a>
              <a href="#" className="w-[44px] h-[44px] flex items-center justify-center">
                <img className="w-[20px] h-[20px]" src={instagramIcon} alt="Instagram" />
              </a>
              <a href="#" className="w-[44px] h-[44px] flex items-center justify-center">
                <img className="w-[22px] h-[18px]" src={twitterIcon} alt="Twitter" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 min-[641px]:grid-cols-3 gap-[24px] w-full">
            <div className="w-full">
              <InfoColumn
                title="Informação"
                informations={[
                  { text: "Sobre Drip Store", link: "/about" },
                  { text: "Segurança", link: "#" },
                  { text: "Wishlist", link: "#" },
                  { text: "Blog", link: "#" },
                  { text: "Trabalhe conosco", link: "#" },
                  { text: "Meus Pedidos", link: "/pedidos" },
                ]}
              />
            </div>

            <div className="w-full">
              <InfoColumn
                title="Categorias"
                informations={[
                  { text: "Camisetas", link: "/categorias" },
                  { text: "Calças", link: "/categorias" },
                  { text: "Bonés", link: "/categorias" },
                  { text: "Headphones", link: "/categorias" },
                  { text: "Tênis", link: "/categorias" },
                ]}
              />
            </div>

            <div className="w-full">
              <InfoColumn
                title="Contato"
                informations={[
                  { text: "Av. Santos Dumont, 1510 - CE", link: "#" },
                  { text: "(85) 3051-3411", link: "#" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#444] mt-[40px] min-[1025px]:mt-[60px] pt-[20px] text-center text-[14px] text-[#cccccc]">
          © 2026 Digital Store
        </div>
      </div>
    </footer>
  );
};

export default Footer;
