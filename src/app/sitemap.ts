import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fonsbangladesh.com';

  // Static routes
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

  // Dynamic product routes
  try {
    const productsRes = await getProducts();
    const products = productsRes?.data || [];
    
    const productRoutes = products.map((product: any) => ({
      url: `${baseUrl}/products/${product.attributes?.slug || product.id}`,
      lastModified: new Date(product.attributes?.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return routes;
  }
}
