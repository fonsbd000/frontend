import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts, getStrapiMedia } from "@/lib/api";

export const revalidate = 60; // Revalidate every 60 seconds

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

const partnerLogos = [
  { name: "Partner One", src: "/partners/partner-1.svg" },
  { name: "Partner Two", src: "/partners/partner-2.svg" },
  { name: "Partner Three", src: "/partners/partner-3.svg" },
  { name: "Partner Four", src: "/partners/partner-4.svg" },
  { name: "Partner Five", src: "/partners/partner-5.svg" },
  { name: "Partner Six", src: "/partners/partner-6.svg" },
  { name: "Partner Seven", src: "/partners/partner-7.svg" },
  { name: "Partner Eight", src: "/partners/partner-8.svg" },
  { name: "Partner Nine", src: "/partners/partner-9.svg" },
  { name: "Partner Ten", src: "/partners/partner-10.svg" },
  { name: "Partner Eleven", src: "/partners/partner-11.svg" },
  { name: "Partner Twelve", src: "/partners/partner-12.svg" },
];

export default async function Home() {
  // Fetch data in parallel
  const [categoriesRes, productsRes] = await Promise.all([
    getCategories().catch(() => ({ data: [] })),
    getProducts({
      pagination: { limit: 4 },
      // Optional: Add a featured flag to your Strapi model and filter by it
      // filters: { featured: { $eq: true } }
    }).catch(() => ({ data: [] }))
  ]);

  const categories = categoriesRes?.data || [];
  const featuredProducts = productsRes?.data || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FONS Bangladesh Ltd.",
    "url": "https://fonsbangladesh.com",
    "logo": "https://fonsbangladesh.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+880 2 XXXX-XXXX",
      "contactType": "customer service",
      "areaServed": "BD",
      "availableLanguage": "Bengali, English"
    },
    "sameAs": [
      "https://www.facebook.com/fonsbangladesh",
      "https://www.linkedin.com/company/fonsbangladesh"
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative bg-[#0A3D62] text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
            alt="Industrial Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A3D62] to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 max-w-3xl leading-tight">
            Innovative Engineering Solutions for Tomorrow
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl text-blue-100">
            FONS Bangladesh Ltd delivers world-class industrial equipment and comprehensive services tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/products" className="bg-[#00C897] hover:bg-[#00b386] text-white font-semibold py-4 px-8 rounded-full transition-colors text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200 text-center">
              Explore Products
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0A3D62] text-white font-semibold py-4 px-8 rounded-full transition-colors text-lg text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">Our Product Categories</h2>
            <div className="w-24 h-1 bg-[#00C897] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.length > 0 ? categories.map((category: any) => (
              <Link 
                href={`/products?category=${getField<string>(category, "slug") || category.id}`} 
                key={category.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-100 transform hover:-translate-y-1"
              >
                <div className="h-48 bg-zinc-200 relative overflow-hidden">
                  {(() => {
                    const icon = getField<any>(category, "icon");
                    const iconUrl = icon?.url ?? icon?.data?.attributes?.url;
                    return iconUrl ? (
                    <Image 
                      src={getStrapiMedia(iconUrl) || ''}
                      alt={getField<string>(category, "name") || ''}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1E90FF] to-[#0A3D62] opacity-80">
                      <span className="text-4xl">🏭</span>
                    </div>
                    );
                  })()}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-[#1E90FF] transition-colors">
                    {getField<string>(category, "name") || 'Unnamed Category'}
                  </h3>
                  {getField<string>(category, "description") && (
                    <p className="text-zinc-500 mt-2 line-clamp-2">
                      {getField<string>(category, "description")}
                    </p>
                  )}
                </div>
              </Link>
            )) : (
              // Skeletons / Placeholders
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden animate-pulse">
                  <div className="h-48 bg-zinc-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-zinc-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-zinc-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products" className="inline-flex items-center text-[#1E90FF] font-medium hover:text-[#0A3D62] transition-colors text-lg">
              View All Products <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Summary Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden relative shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
                alt="FONS Team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-[#00C897] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl max-w-[200px] sm:max-w-xs">
              <h4 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">15+</h4>
              <p className="font-medium text-sm sm:text-lg text-emerald-50">Years of Industrial Excellence</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[#0A3D62] mb-6">Empowering Industries Across Bangladesh</h2>
            <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
              At FONS Bangladesh Ltd, we are committed to providing top-tier industrial machinery, reliable services, and expert consultancy. We bridge the gap between global manufacturers and local industries.
            </p>
            <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
              Our dedicated team of engineers and professionals work tirelessly to ensure that your operations run smoothly, efficiently, and profitably.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {['Premium Quality Equipment', 'Expert Technical Support', 'Nationwide Delivery', 'Comprehensive Warranty'].map((item, i) => (
                <li key={i} className="flex items-center text-zinc-800 font-medium">
                  <svg className="w-6 h-6 text-[#00C897] mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/about" className="inline-block bg-[#0A3D62] hover:bg-[#1E90FF] text-white font-semibold py-4 px-8 rounded-full transition-colors text-lg">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 px-6 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-[#0A3D62] mb-4">Featured Equipment</h2>
              <div className="w-24 h-1 bg-[#1E90FF] rounded-full"></div>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center text-[#1E90FF] font-medium hover:text-[#0A3D62] transition-colors text-lg">
              Browse Catalog <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? featuredProducts.map((product: any) => (
              <Link 
                href={`/products/${getField<string>(product, "slug") || product.id}`} 
                key={product.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-100 flex flex-col h-full"
              >
                <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                  {(() => {
                    const images = getField<any>(product, "images");
                    const imageUrl = Array.isArray(images)
                      ? images?.[0]?.url
                      : images?.data?.[0]?.attributes?.url;
                    return imageUrl ? (
                    <Image 
                      src={getStrapiMedia(imageUrl) || ''}
                      alt={getField<string>(product, "name") || ''}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                      No Image
                    </div>
                    );
                  })()}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-zinc-900 group-hover:text-[#1E90FF] transition-colors mb-2">
                    {getField<string>(product, "name") || 'Unnamed Product'}
                  </h3>
                  {getField<string>(product, "description") && (
                    <p className="text-zinc-500 line-clamp-2 mb-4 flex-grow">
                      {stripMarkdown(getField<string>(product, "description") || "")}
                    </p>
                  )}
                  <div className="text-[#00C897] font-medium mt-auto flex items-center">
                    View Details
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )) : (
              // Skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden animate-pulse h-96">
                  <div className="h-48 bg-zinc-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-zinc-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-zinc-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <Link href="/products" className="mt-10 md:hidden inline-flex items-center text-[#1E90FF] font-medium hover:text-[#0A3D62] transition-colors text-lg">
            Browse Catalog <span className="ml-2">→</span>
          </Link>
        </div>
      </section>


      {/* Clients/Partners (Static logo slider simulation) */}
      <section className="py-20 px-6 bg-white overflow-hidden border-t border-zinc-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold text-zinc-400 tracking-widest uppercase mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
            {partnerLogos.map((logo) => (
              <div
                key={logo.name}
                className="h-16 w-36 md:h-20 md:w-44 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-center p-3"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={64}
                  className="max-h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
