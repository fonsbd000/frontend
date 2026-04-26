import Image from "next/image";
import Link from "next/link";
import { getProducts, getCategories, getStrapiMedia } from "@/lib/api";

export const revalidate = 60;

interface SearchParams {
  category?: string;
}

const getField = <T,>(item: any, key: string): T | undefined =>
  item?.[key] ?? item?.attributes?.[key];

const stripMarkdown = (value: any) => {
  if (!value) return "";
  
  if (Array.isArray(value)) {
    // Strapi 5 Blocks format
    return value
      .map((block: any) => {
        if (block.children) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        return "";
      })
      .join(" ")
      .trim();
  }

  if (typeof value !== "string") return String(value);

  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~-]/g, "")
    .replace(/\n+/g, " ")
    .trim();
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const categorySlug = params?.category;

  const [productsRes, categoriesRes] = await Promise.all([
    getProducts().catch(() => ({ data: [] })),
    getCategories().catch(() => ({ data: [] })),
  ]);

  const allProducts = productsRes?.data || [];
  const categories = categoriesRes?.data || [];

  // Filter client-side by category slug if provided
  const filteredProducts = categorySlug
    ? allProducts.filter((p: any) => {
        const category = getField<any>(p, "category");
        const categoryId = category?.id != null ? String(category.id) : undefined;
        const categorySlugValue = getField<string>(category, "slug");
        return categorySlug === categorySlugValue || categorySlug === categoryId;
      })
    : allProducts;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Page Header */}
      <section className="bg-[#0A3D62] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Product Catalog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore our extensive range of industrial equipment sourced from world-class manufacturers.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Sidebar: Category Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 sticky top-6">
              <h2 className="text-lg font-bold text-zinc-900 mb-4">Filter by Category</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !categorySlug
                        ? "bg-[#0A3D62] text-white"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((cat: any) => (
                  <li key={cat.id}>
                    {(() => {
                      const slug = getField<string>(cat, "slug");
                      const name = getField<string>(cat, "name");
                      return (
                    <Link
                      href={`/products?category=${slug || cat.id}`}
                      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        categorySlug === (slug || String(cat.id))
                          ? "bg-[#0A3D62] text-white"
                          : "text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      {name || "Unnamed"}
                    </Link>
                      );
                    })()}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-zinc-500 mb-6 text-sm">
                  Showing <strong>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? "s" : ""}
                  {categorySlug ? ` in this category` : ""}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((product: any) => {
                    const name = getField<string>(product, "name");
                    const description = getField<string>(product, "description");
                    const slug = getField<string>(product, "slug");
                    const category = getField<any>(product, "category");
                    const categoryName = getField<string>(category, "name");
                    const images = getField<any>(product, "images");
                    const imageUrl = Array.isArray(images)
                      ? images?.[0]?.url
                      : images?.data?.[0]?.attributes?.url;

                    return (
                    <Link
                      href={`/products/${slug || product.id}`}
                      key={product.id}
                      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-100 flex flex-col"
                    >
                      <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                        {imageUrl ? (
                          <Image
                            src={getStrapiMedia(imageUrl) || ""}
                            alt={name || "Product"}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-zinc-400 text-sm">
                            No Image
                          </div>
                        )}
                        {categoryName && (
                          <span className="absolute top-3 left-3 bg-[#0A3D62]/80 text-white text-xs px-3 py-1 rounded-full">
                            {categoryName}
                          </span>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-zinc-900 group-hover:text-[#1E90FF] transition-colors mb-2">
                          {name || "Unnamed Product"}
                        </h3>
                        {description && (
                          <p className="text-zinc-500 line-clamp-2 text-sm mb-4 flex-grow">
                            {stripMarkdown(description)}
                          </p>
                        )}
                        <div className="text-[#00C897] font-semibold mt-auto flex items-center text-sm">
                          View Details
                          <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-zinc-100">
                <h3 className="text-2xl font-semibold text-zinc-400 mb-4">No Products Found</h3>
                <p className="text-zinc-500">
                  {categorySlug ? "No products in this category yet." : "No products have been added yet."}
                </p>
                <Link
                  href="/products"
                  className="mt-6 inline-block text-[#1E90FF] font-medium hover:underline"
                >
                  View all products
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
