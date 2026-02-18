import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import Button from "../../components/Button/Button";
import { useCart } from "../../hooks/useCart";

const OrdersPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    cep: "",
    payment: "cartao"
  });
  const [errors, setErrors] = useState({});
  const total = getCartTotal();

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = "Informe seu nome";
    if (!formData.email.trim()) {
      nextErrors.email = "Informe seu e-mail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "E-mail inválido";
    }
    if (!formData.street.trim()) nextErrors.street = "Informe a rua";
    if (!formData.number.trim()) nextErrors.number = "Informe o número";
    if (!formData.neighborhood.trim()) nextErrors.neighborhood = "Informe o bairro";
    if (!formData.city.trim()) nextErrors.city = "Informe a cidade";
    if (!formData.cep.trim()) nextErrors.cep = "Informe o CEP";
    return nextErrors;
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const paymentLabels = {
      cartao: "Cartão de Crédito",
      boleto: "Boleto",
      pix: "Pix"
    };
    const orderItems = cart.map((item) => {
      const unitPrice = item.priceDiscount ?? item.price;
      return {
        ...item,
        unitPrice,
        subtotal: unitPrice * item.quantity
      };
    });
    const order = {
      customer: { ...formData },
      paymentLabel: paymentLabels[formData.payment] ?? formData.payment,
      items: orderItems,
      total
    };
    navigate("/compra-confirmada", { state: order });
    clearCart();
    setFormData({
      fullName: "",
      email: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      cep: "",
      payment: "cartao"
    });
  };

  return (
    <Layout>
      <main className="bg-neutral-lightGray3">
        <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[104px] py-[32px] min-[1025px]:py-[40px]">
          <h1 className="text-[24px] min-[641px]:text-[28px] font-bold text-neutral-darkGray2 mb-[24px]">Meus Pedidos</h1>
          {cart.length === 0 ? (
            <div className="bg-white rounded-[8px] p-[32px]">
              <p className="text-[16px] text-neutral-darkGray3 mb-[24px]">
                Você ainda não possui pedidos. Explore os produtos e faça sua primeira compra.
              </p>
              <a
                href="/produtos"
                className="inline-flex items-center justify-center h-[48px] px-[24px] rounded-[8px] bg-primary text-white font-bold text-[16px] no-underline transition hover:brightness-110"
              >
                Ir para produtos
              </a>
            </div>
          ) : (
            <div className="grid gap-[24px] min-[1025px]:grid-cols-[1.2fr_0.8fr]">
              <div className="bg-white rounded-[8px] p-[24px]">
                <div className="flex items-center justify-between mb-[16px]">
                  <h2 className="text-[20px] font-bold text-neutral-darkGray2">Seu carrinho</h2>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[14px] font-bold text-neutral-darkGray3 hover:text-primary transition"
                  >
                    Limpar carrinho
                  </button>
                </div>
                <div className="flex flex-col gap-[16px]">
                  {cart.map((item) => {
                    const unitPrice = item.priceDiscount ?? item.price;
                    const subtotal = unitPrice * item.quantity;
                    return (
                      <div
                        key={`${item.id}-${item.selectedSize || ""}-${item.selectedColor || ""}`}
                        className="flex flex-col min-[641px]:flex-row gap-[16px] border border-neutral-lightGray2 rounded-[8px] p-[16px]"
                      >
                        <img
                          src={getImageSrc(item.image)}
                          alt={item.name}
                          className="w-[96px] h-[96px] object-cover rounded-[8px] bg-neutral-lightGray3"
                        />
                        <div className="flex-1 min-w-[200px]">
                          <h3 className="text-[16px] font-bold text-neutral-darkGray2">{item.name}</h3>
                          <p className="text-[14px] text-neutral-darkGray3">{item.category}</p>
                          <p className="text-[14px] text-neutral-darkGray3">
                            Tamanho: {item.selectedSize || "—"} · Cor: {item.selectedColor || "—"}
                          </p>
                          <div className="mt-[10px] flex items-center gap-[10px]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-[44px] h-[44px] border border-neutral-lightGray2 rounded-[6px] font-bold text-[16px] hover:border-primary hover:text-primary transition"
                            >
                              -
                            </button>
                            <span className="text-[14px] font-bold text-neutral-darkGray2">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-[44px] h-[44px] border border-neutral-lightGray2 rounded-[6px] font-bold text-[16px] hover:border-primary hover:text-primary transition"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-[14px] font-bold text-neutral-darkGray3 hover:text-primary transition"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                        <div className="min-w-[140px] text-left min-[641px]:text-right">
                          <div className="text-[14px] text-neutral-darkGray3">Unitário</div>
                          <div className="text-[16px] font-bold text-neutral-darkGray2">
                            {formatBRL(unitPrice)}
                          </div>
                          <div className="mt-[8px] text-[14px] text-neutral-darkGray3">Subtotal</div>
                          <div className="text-[16px] font-bold text-neutral-darkGray2">
                            {formatBRL(subtotal)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-[20px] border-t border-neutral-lightGray2 pt-[16px]">
                  <span className="text-[16px] font-bold text-neutral-darkGray2">Total</span>
                  <span className="text-[20px] font-bold text-primary">{formatBRL(total)}</span>
                </div>
              </div>

              <form className="bg-white rounded-[8px] p-[24px]" onSubmit={handleConfirm}>
                <h2 className="text-[20px] font-bold text-neutral-darkGray2 mb-[16px]">Checkout</h2>
                <div className="flex flex-col gap-[12px]">
                  <div>
                    <label className="text-[14px] font-bold text-neutral-darkGray2">Nome completo</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full h-[44px] border border-neutral-lightGray2 rounded-[8px] px-[12px] mt-[6px]"
                    />
                    {errors.fullName && <p className="text-[12px] text-red-500 mt-[4px]">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="text-[14px] font-bold text-neutral-darkGray2">E-mail</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-[44px] border border-neutral-lightGray2 rounded-[8px] px-[12px] mt-[6px]"
                    />
                    {errors.email && <p className="text-[12px] text-red-500 mt-[4px]">{errors.email}</p>}
                  </div>
                  <div className="grid gap-[12px] min-[768px]:grid-cols-2">
                    <div>
                      <label className="text-[14px] font-bold text-neutral-darkGray2">Rua</label>
                      <input
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full h-[44px] border border-neutral-lightGray2 rounded-[8px] px-[12px] mt-[6px]"
                      />
                      {errors.street && <p className="text-[12px] text-red-500 mt-[4px]">{errors.street}</p>}
                    </div>
                    <div>
                      <label className="text-[14px] font-bold text-neutral-darkGray2">Número</label>
                      <input
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className="w-full h-[44px] border border-neutral-lightGray2 rounded-[8px] px-[12px] mt-[6px]"
                      />
                      {errors.number && <p className="text-[12px] text-red-500 mt-[4px]">{errors.number}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-[14px] font-bold text-neutral-darkGray2">Complemento</label>
                    <input
                      name="complement"
                      value={formData.complement}
                      onChange={handleChange}
                      className="w-full h-[44px] border border-neutral-lightGray2 rounded-[8px] px-[12px] mt-[6px]"
                    />
                  </div>
                  <div className="grid gap-[12px] min-[768px]:grid-cols-2">
                    <div>
                      <label className="text-[14px] font-bold text-neutral-darkGray2">Bairro</label>
                      <input
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleChange}
                        className="w-full h-[44px] border border-neutral-lightGray2 rounded-[8px] px-[12px] mt-[6px]"
                      />
                      {errors.neighborhood && (
                        <p className="text-[12px] text-red-500 mt-[4px]">{errors.neighborhood}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-[14px] font-bold text-neutral-darkGray2">Cidade</label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full h-[44px] border border-neutral-lightGray2 rounded-[8px] px-[12px] mt-[6px]"
                      />
                      {errors.city && <p className="text-[12px] text-red-500 mt-[4px]">{errors.city}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-[14px] font-bold text-neutral-darkGray2">CEP</label>
                    <input
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      className="w-full h-[44px] border border-neutral-lightGray2 rounded-[8px] px-[12px] mt-[6px]"
                    />
                    {errors.cep && <p className="text-[12px] text-red-500 mt-[4px]">{errors.cep}</p>}
                  </div>
                  <div>
                    <label className="text-[14px] font-bold text-neutral-darkGray2">Forma de pagamento</label>
                    <div className="flex flex-wrap gap-[12px] mt-[8px]">
                      {[
                        { value: "cartao", label: "Cartão de Crédito" },
                        { value: "boleto", label: "Boleto" },
                        { value: "pix", label: "Pix" }
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-[6px] px-[12px] h-[40px] rounded-[8px] border cursor-pointer transition ${
                            formData.payment === option.value
                              ? "border-primary text-primary"
                              : "border-neutral-lightGray2 text-neutral-darkGray2"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={option.value}
                            checked={formData.payment === option.value}
                            onChange={handleChange}
                            className="accent-primary"
                          />
                          <span className="text-[14px] font-bold">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full mt-[20px] text-[16px]"
                >
                  Confirmar compra
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default OrdersPage;
