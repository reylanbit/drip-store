const BASE_URL = (import.meta?.env?.VITE_API_URL || 'https://dummyjson.com').replace(/\/$/, '');

const mapProduct = (p) => ({
  id: p.id,
  name: p.title || p.name || 'Produto',
  image: p.thumbnail || (Array.isArray(p.images) && p.images[0]) || '/product-placeholder.png',
  price: typeof p.price === 'number' ? p.price : Number(p.price) || 0,
  priceDiscount: null,
  category: p.category || 'Geral',
  description:
    p.description ||
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
});

export async function fetchProducts(limit = 20) {
  const url = `${BASE_URL}/products${limit ? `?limit=${limit}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao buscar produtos (${res.status})`);
  const data = await res.json();
  const list = Array.isArray(data?.products) ? data.products : Array.isArray(data) ? data : [];
  return list.map(mapProduct);
}

export async function fetchProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Produto não encontrado (${res.status})`);
  const data = await res.json();
  return mapProduct(data);
}
