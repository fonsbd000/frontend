import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fonsbangladesh.com';

  const routes = [
    '',
    '/about',
    '/products',
    '/services',
    '/industries',
    '/downloads',
    '/contact',
    '/quote',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // ⛔ ADD TIMEOUT PROTECTION
    const controller = new AbortController();

    const timeout = setTimeout(() => controller.abort(), 5000);

    const productsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?pagination[pageSize]=50`,
      { signal: controller.signal }
    );

    clearTimeout(timeout);

    const data = await productsRes.json();
    const products = data?.data || [];

    const productRoutes = products.map((product: any) => ({
      url: `${baseUrl}/products/${product.slug || product.id}`,
      lastModified: new Date(product.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error('Sitemap API failed, using static only:', error);
    return routes;
  }
}
