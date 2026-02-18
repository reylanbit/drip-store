import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import adidasImage from "../../assets/brands/adidas/adidas (1).jpeg";
import googleIcon from "../../assets/icons/images.jpg";
import facebookIcon from "../../assets/icons/facebook-facebook-logo-png-clipart.jpg";
import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";

const initialErrors = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

const RegisterPage = () => {
  const { register, loginWithProvider, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState(initialErrors);
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormError("");
  };

  const validate = () => {
    const next = { ...initialErrors };
    if (!formData.name.trim()) {
      next.name = "Informe seu nome completo";
    }
    if (!formData.email.trim()) {
      next.email = "Informe seu e-mail";
    } else if (!validateEmail(formData.email)) {
      next.email = "E-mail inválido";
    }
    if (!formData.password) {
      next.password = "Informe uma senha";
    } else if (formData.password.length < 6) {
      next.password = "A senha deve ter pelo menos 6 caracteres";
    }
    if (!formData.confirmPassword) {
      next.confirmPassword = "Confirme sua senha";
    } else if (formData.confirmPassword !== formData.password) {
      next.confirmPassword = "As senhas não coincidem";
    }
    setErrors(next);
    return !next.name && !next.email && !next.password && !next.confirmPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate() || loading) return;
    setFormError("");
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    if (!result.ok) {
      setFormError(result.message || "Não foi possível cadastrar");
      return;
    }
    navigate("/");
  };

  const handleProviderLogin = async (provider) => {
    if (!loginWithProvider || loading) return;
    setFormError("");
    const result = await loginWithProvider(provider);
    if (!result.ok) {
      setFormError(
        result.message ||
          `Não foi possível entrar com ${provider === "google" ? "Google" : "Facebook"}`
      );
      return;
    }
    navigate("/");
  };

  return (
    <Layout>
      <main className="relative min-h-[calc(100vh-200px)]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${adidasImage})` }}
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="pointer-events-none absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-[#E6F0FA] blur-[120px] opacity-80" />
        <div className="pointer-events-none absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] rounded-full bg-[#D4E6FF] blur-[100px] opacity-80" />
        <div className="relative z-[2] flex items-center justify-center min-h-[calc(100vh-200px)] px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[104px] py-[40px]">
          <section className="w-full max-w-[400px] bg-white/85 rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,40,100,0.2)] px-[24px] py-[32px] min-[1025px]:px-[48px] min-[1025px]:py-[40px] backdrop-blur-[12px]">
            <h1 className="text-[24px] min-[641px]:text-[28px] font-semibold text-[#1A2B4C] mb-[8px]">
              Criar conta
            </h1>
            <p className="text-[14px] text-neutral-lightGray3 mb-[20px]">
              Cadastre-se para salvar seus dados e acompanhar seus pedidos.
            </p>
            {formError && (
              <div
                role="alert"
                className="mb-[12px] rounded-[8px] border border-red-300 bg-red-50 text-[14px] text-red-700 px-[12px] py-[8px]"
              >
                {formError}
              </div>
            )}
            <form className="flex flex-col gap-[14px]" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="register-name"
                  className="block text-[14px] font-semibold text-[#1A2B4C] mb-[6px]"
                >
                  Nome completo
                </label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full h-[44px] rounded-[8px] px-[12px] border text-[14px] outline-none transition ${
                    errors.name ? "border-red-400" : "border-[#E0E0E0] focus:border-[#4A90E2]"
                  }`}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "register-name-error" : undefined}
                />
                {errors.name && (
                  <p id="register-name-error" className="mt-[4px] text-[12px] text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="register-email"
                  className="block text-[14px] font-semibold text-[#1A2B4C] mb-[6px]"
                >
                  E-mail
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full h-[44px] rounded-[8px] px-[12px] border text-[14px] outline-none transition ${
                    errors.email ? "border-red-400" : "border-[#E0E0E0] focus:border-[#4A90E2]"
                  }`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "register-email-error" : undefined}
                />
                {errors.email && (
                  <p id="register-email-error" className="mt-[4px] text-[12px] text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="register-password"
                  className="block text-[14px] font-semibold text-[#1A2B4C] mb-[6px]"
                >
                  Senha
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full h-[44px] rounded-[8px] px-[12px] border text-[14px] outline-none transition ${
                    errors.password ? "border-red-400" : "border-[#E0E0E0] focus:border-[#4A90E2]"
                  }`}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "register-password-error" : undefined}
                />
                {errors.password && (
                  <p id="register-password-error" className="mt-[4px] text-[12px] text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="register-confirmPassword"
                  className="block text-[14px] font-semibold text-[#1A2B4C] mb-[6px]"
                >
                  Confirmar senha
                </label>
                <input
                  id="register-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full h-[44px] rounded-[8px] px-[12px] border text-[14px] outline-none transition ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-[#E0E0E0] focus:border-[#4A90E2]"
                  }`}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={errors.confirmPassword ? "register-confirm-error" : undefined}
                />
                {errors.confirmPassword && (
                  <p id="register-confirm-error" className="mt-[4px] text-[12px] text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <Button
                size="lg"
                variant="primary"
                disabled={loading}
                className="w-full mt-[8px] !rounded-[999px] bg-[#C92071] text-white"
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="flex items-center gap-[8px]">
                    <span className="w-[16px] h-[16px] border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Cadastrando...
                  </span>
                ) : (
                  "Cadastrar"
                )}
              </Button>
              <div className="mt-[16px] flex items-center justify-center gap-[12px]">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleProviderLogin("google")}
                  className="w-[40px] h-[40px] rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center transition hover:border-[#4A90E2]"
                  aria-label="Cadastrar com Google"
                >
                  <img src={googleIcon} alt="Google" className="w-[18px] h-[18px]" />
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleProviderLogin("facebook")}
                  className="w-[40px] h-[40px] rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center transition hover:border-[#4A90E2]"
                  aria-label="Cadastrar com Facebook"
                >
                  <img src={facebookIcon} alt="Facebook" className="w-[18px] h-[18px]" />
                </button>
              </div>
              <p className="mt-[8px] text-[14px] text-neutral-lightGray3 text-center">
                Já tem uma conta?{" "}
                <Link to="/login" className="font-semibold text-[#4A90E2] hover:underline">
                  Entrar
                </Link>
              </p>
            </form>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default RegisterPage;
