import { Link, useLocation } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import Button from "../../components/Button/Button";

const ThankYouPage = () => {
  const location = useLocation();
  const order = location?.state;

  const formatBRL = (value) =>
    typeof value === "number"
      ? value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : value;

  const getImageSrc = (value) => {
    if (!value) return "/product-placeholder.png";
    if (value.startsWith("http")) return value;
    if (value.startsWith("/")) return value;
    return `/${value}`;
  };

  if (!order) {
    return (
      <Layout>
        <main className="bg-neutral-lightGray3">
          <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[104px] py-[32px] min-[1025px]:py-[40px]">
            <div className="bg-white rounded-[16px] p-[32px] max-w-[720px] mx-auto text-center">
              <div className="text-[36px]">✅</div>
              <h1 className="text-[24px] min-[641px]:text-[28px] font-bold text-neutral-darkGray2 mt-[8px]">
                Pedido concluído
              </h1>
              <p className="text-[16px] text-neutral-darkGray3 mt-[8px]">
                Não encontramos detalhes da sua compra. Volte para a home e continue comprando.
              </p>
              <div className="mt-[24px]">
                <Link to="/" className="no-underline">
                  <Button size="lg" variant="primary" className="px-[40px] text-[16px]">
                    Voltar para Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  const { customer, paymentLabel, items, total } = order;

  return (
    <Layout>
      <main className="bg-neutral-lightGray3">
        <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[104px] py-[32px] min-[1025px]:py-[40px]">
          <div className="bg-white rounded-[16px] p-[32px] max-w-[720px] mx-auto">
            <div className="flex flex-col items-center text-center gap-[8px]">
              <div className="text-[36px]">🎉</div>
              <h1 className="text-[24px] min-[641px]:text-[28px] font-bold text-neutral-darkGray2">
                Compra realizada com sucesso!
              </h1>
              <p className="text-[14px] text-neutral-darkGray3">
                Obrigado por comprar com a Digital Store.
              </p>
            </div>

            <div className="mt-[24px] border-t border-neutral-lightGray2 pt-[20px]">
              <div className="grid gap-[20px]">
                <div>
                  <h2 className="text-[14px] font-bold text-neutral-darkGray2 mb-[10px]">
                    Informações Pessoais
                  </h2>
                  <div className="grid gap-[6px] text-[14px] text-neutral-darkGray3">
                    <p>Nome: {customer.fullName}</p>
                    <p>E-mail: {customer.email}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-[14px] font-bold text-neutral-darkGray2 mb-[10px]">
                    Informações de Entrega
                  </h2>
                  <div className="grid gap-[6px] text-[14px] text-neutral-darkGray3">
                    <p>
                      Endereço: {customer.street}, {customer.number}
                    </p>
                    {customer.complement && <p>Complemento: {customer.complement}</p>}
                    <p>Bairro: {customer.neighborhood}</p>
                    <p>Cidade: {customer.city}</p>
                    <p>CEP: {customer.cep}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-[14px] font-bold text-neutral-darkGray2 mb-[10px]">
                    Informações de Pagamento
                  </h2>
                  <div className="grid gap-[6px] text-[14px] text-neutral-darkGray3">
                    <p>Forma: {paymentLabel}</p>
                    <p>Titular: {customer.fullName}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-[14px] font-bold text-neutral-darkGray2 mb-[10px]">
                    Resumo da compra
                  </h2>
                  <div className="flex flex-col gap-[12px]">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedSize || ""}-${item.selectedColor || ""}`}
                        className="flex items-center gap-[12px] border border-neutral-lightGray2 rounded-[10px] p-[12px]"
                      >
                        <img
                          src={getImageSrc(item.image)}
                          alt={item.name}
                          className="w-[48px] h-[48px] object-cover rounded-[6px] bg-neutral-lightGray3"
                        />
                        <div className="flex-1">
                          <p className="text-[14px] font-bold text-neutral-darkGray2">{item.name}</p>
                          <p className="text-[12px] text-neutral-darkGray3">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                        <div className="text-[14px] font-bold text-neutral-darkGray2">
                          {formatBRL(item.subtotal)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-[20px] rounded-[10px] bg-[#FFF7E6] px-[16px] py-[12px] flex items-center justify-between">
                <span className="text-[16px] font-bold text-neutral-darkGray2">Total</span>
                <span className="text-[18px] font-bold text-neutral-darkGray2">{formatBRL(total)}</span>
              </div>

              <div className="mt-[20px] flex flex-col items-center gap-[12px]">
                <button type="button" className="text-[13px] text-primary underline">
                  Imprimir recibo
                </button>
                <Link to="/" className="no-underline w-full">
                  <Button size="lg" variant="primary" className="w-full text-[16px]">
                    Voltar para Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ThankYouPage;

