import Button from "../Button/Button";

function SpecialOffer() {
  return (
    <div className="w-full bg-neutral-white my-[40px] min-[1025px]:my-[80px]">
      <section className="w-full max-w-[1440px] mx-auto flex flex-col min-[1025px]:flex-row items-center justify-between px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[104px] py-[48px] min-[1025px]:py-[80px] gap-[32px] text-center min-[1025px]:text-left">
        <div className="flex-1 relative flex items-center justify-center w-full">
          <div className="w-[240px] h-[240px] min-[641px]:w-[320px] min-[641px]:h-[320px] min-[1025px]:w-[466px] min-[1025px]:h-[466px] bg-gradient-to-b from-[rgba(66,0,255,0.25)] to-transparent rounded-full absolute z-[1]" />
          <img
            className="relative z-[2] w-full max-w-[360px] min-[641px]:max-w-[440px] min-[1025px]:w-[573px] object-contain"
            src="/special-offer-banner.png"
            alt="Air Jordan Exclusive"
            loading="lazy"
          />
        </div>
        <div className="flex-1 z-[3] flex flex-col items-center min-[1025px]:items-start">
          <p className="text-primary font-bold text-[14px] tracking-[0.75px] mb-[12px]">Oferta especial</p>
          <h2 className="text-[32px] min-[641px]:text-[40px] min-[1025px]:text-[48px] leading-[1.1] text-neutral-darkGray2 font-extrabold mb-[16px]">
            Air Jordan edição de colecionador
          </h2>
          <p className="text-neutral-darkGray2 text-[16px] leading-[26px] mb-[24px] max-w-[520px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          </p>
          <Button
            size="lg"
            variant="primary"
            className="px-[40px] text-[16px]"
          >
            Ver Oferta
          </Button>
        </div>
      </section>
    </div>
  );
}

export default SpecialOffer;
