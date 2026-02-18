import { useState, useEffect } from 'react';
import sneakerImage from '../../assets/White-Sneakers-PNG.png';
import fireIcon from '../../assets/fire.png';
import dotsImage from '../../assets/dots.png';
import Button from '../Button/Button';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { desc: 'Descontos imperdíveis em tênis Nike para você renovar seu estilo com conforto e tecnologia.' },
    { desc: 'Aproveite as melhores ofertas da semana com frete grátis para todo o Brasil em compras Nike.' },
    { desc: 'Conheça a nova coleção Air Max com preços exclusivos que você só encontra aqui na Digital Store.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2000); // Muda a cada 2 segundos
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full bg-neutral-lightGray3 overflow-hidden">
      <div className="flex flex-col min-[1025px]:flex-row items-center justify-between w-full max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[100px] py-[40px] min-[1025px]:py-[80px] gap-[32px] relative">
        <div className="w-full min-[1025px]:w-[550px] z-[10]">
          <span className="text-warning font-bold text-[14px] min-[641px]:text-[16px] block mb-[10px]">
            Melhores ofertas personalizadas
          </span>
          <h1 className="text-[36px] min-[641px]:text-[48px] min-[1025px]:text-[64px] font-extrabold leading-[1.1] text-neutral-darkGray mb-[16px]">
            Queima de <br />
            estoque Nike
            <img
              src={fireIcon}
              alt="Fogo"
              className="w-[36px] h-[36px] min-[641px]:w-[44px] min-[641px]:h-[44px] inline-block align-middle ml-[10px] relative -top-[4px]"
            />
          </h1>
          <p
            className="text-[16px] min-[641px]:text-[18px] leading-[26px] text-neutral-darkGray3 mb-[28px] min-h-[52px]"
            key={currentSlide}
          >
            {slides[currentSlide].desc}
          </p>
          <Button
            size="lg"
            variant="primary"
            className="px-[40px] text-[16px]"
          >
            Ver Ofertas
          </Button>
        </div>
        <div className="relative w-full max-w-[640px] min-[1025px]:max-w-none min-[1025px]:w-[733px] aspect-[4/3] min-[1025px]:h-[431px]">
          <img src={sneakerImage} className="w-full h-full object-contain rotate-[-19.34deg] relative z-[2]" alt="Tênis Nike" />
          <img
            src={dotsImage}
            className="hidden min-[641px]:block absolute -top-[40px] -right-[50px] w-[140px] z-[1] opacity-80"
            alt="Pontos decorativos"
          />
        </div>
      </div>
      <div className="absolute bottom-[24px] min-[1025px]:bottom-[40px] left-1/2 -translate-x-1/2 flex gap-[12px] z-[15]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
            className={`w-[12px] h-[12px] rounded-full border-0 transition ${index === currentSlide ? 'bg-primary' : 'bg-[#CCCCCC]'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
