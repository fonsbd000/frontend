/**
 * Native fetch wrapper for Strapi API
 */

import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

export function getStrapiURL(path = '') {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if it's already an absolute URL
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * Uses `qs` to properly stringify nested objects (filters, pagination, etc.)
 */
export async function fetchAPI(path: string, urlParamsObject: Record<string, any> = {}, options: RequestInit = {}) {
  // Merge default and user options
  const mergedOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL using qs for proper nested object encoding
  const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
  const requestUrl = `${getStrapiURL(`/api${path}`)}${queryString ? `?${queryString}` : ''}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }
  const data = await response.json();
  return data;
}

/**
 * Fetch Categories
 */
export async function getCategories() {
  const data = await fetchAPI('/categories', { populate: '*' });
  return data;
}

/**
 * Fetch Products with optional query params (filters, pagination, sort, etc.)
 */
export async function getProducts(params: Record<string, any> = {}) {
  const data = await fetchAPI('/products', {
    populate: '*',
    ...params,
  });
  return data;
}

/**
 * Fetch Single Product by Slug or ID
 */
export async function getProductBySlug(slug: string) {
  const data = await fetchAPI('/products', {
    populate: '*',
    pagination: {
      page: 1,
      pageSize: 200,
    },
  });

  const products = data?.data || [];

  return (
    products.find((product: any) => {
      const productId = product?.id != null ? String(product.id) : null;
      const documentId = product?.documentId ?? product?.attributes?.documentId;
      const legacySlug = product?.slug ?? product?.attributes?.slug;

      return productId === slug || documentId === slug || legacySlug === slug;
    }) || null
  );
}

/**
 * Fetch Services
 */
export async function getServices() {
  const data = await fetchAPI('/services', { populate: '*' });
  return data;
}

/**
 * Fetch Downloads
 */
export async function getDownloads() {
  const data = await fetchAPI('/downloads', { populate: '*' });
  return data;
}
