import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getStrapiMedia } from "@/lib/api";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const revalidate = 60;

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) return {};

  const name = getField<string>(product, "name");
  const description = getField<string>(product, "description");
  const images = getField<any>(product, "images");
  const imageUrl = Array.isArray(images)
    ? images?.[0]?.url
    : images?.data?.[0]?.attributes?.url;

  return {
    title: name,
    description: description ? stripMarkdown(description).substring(0, 160) : undefined,
    openGraph: {
      title: name,
      description: description ? stripMarkdown(description) : undefined,
      images: imageUrl
        ? [{ url: getStrapiMedia(imageUrl) || "" }]
        : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) {
    notFound();
  }

  const name = getField<string>(product, "name");
  const description = getField<string>(product, "description");
  const specs = getField<any>(product, "specs");
  const imagesField = getField<any>(product, "images");
  const images: any[] = Array.isArray(imagesField) ? imagesField : imagesField?.data || [];
  const mainImage = images[0]?.url
    ? getStrapiMedia(images[0].url)
    : images[0]?.attributes?.url
      ? getStrapiMedia(images[0].attributes.url)
      : null;
  const brochure = getField<any>(product, "brochure");
  const brochureUrl = brochure?.url
    ? getStrapiMedia(brochure.url)
    : brochure?.data?.attributes?.url
      ? getStrapiMedia(brochure.data.attributes.url)
      : null;
  const category = getField<any>(product, "category");
  const categoryName = getField<string>(category, "name");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": mainImage,
    "brand": {
      "@type": "Brand",
      "name": "FONS"
    },
    "category": categoryName
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-zinc-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-[#0A3D62] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#0A3D62] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">{name || "Product Detail"}</span>
        </div>
      </nav>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square relative rounded-3xl overflow-hidden bg-white border border-zinc-100 shadow-md">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={name || "Product"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    No Image Available
                  </div>
                )}
              </div>
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {images.map((img: any, i: number) => {
                    const thumbRawUrl = img?.url ?? img?.attributes?.url;
                    const thumbUrl = thumbRawUrl ? getStrapiMedia(thumbRawUrl) : null;
                    return thumbUrl ? (
                      <div key={i} className="w-20 h-20 shrink-0 relative rounded-xl overflow-hidden border border-zinc-200">
                        <Image src={thumbUrl} alt={`${name} view ${i + 1}`} fill sizes="80px" className="object-cover" />
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              {categoryName && (
                <span className="inline-block bg-blue-50 text-[#1E90FF] text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {categoryName}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-[#0A3D62] mb-4">
                {name || "Product Name"}
              </h1>

              {description && (
                <div className="mb-8 rounded-2xl bg-white border border-zinc-100 p-6 prose-lg max-w-none">
                  {Array.isArray(description) ? (
                    <BlocksRenderer 
                      content={description} 
                      blocks={{
                        paragraph: ({ children }) => <p className="text-lg text-zinc-600 leading-relaxed mb-4">{children}</p>,
                        heading: ({ children, level }) => {
                          switch (level) {
                            case 1: return <h1 className="text-2xl font-bold text-zinc-900 mb-4">{children}</h1>;
                            case 2: return <h2 className="text-xl font-semibold text-zinc-900 mb-3">{children}</h2>;
                            case 3: return <h3 className="text-lg font-semibold text-zinc-900 mb-3">{children}</h3>;
                            default: return <h4 className="text-base font-semibold text-zinc-900 mb-2">{children}</h4>;
                          }
                        },
                        list: ({ children, format }) => {
                          if (format === "ordered") return <ol className="list-decimal pl-6 text-zinc-600 space-y-2 mb-4">{children}</ol>;
                          return <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-4">{children}</ul>;
                        },
                        link: ({ children, url }) => (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1E90FF] hover:text-[#0A3D62] underline"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    />
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        h1: ({ children }) => <h1 className="text-2xl font-bold text-zinc-900 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-semibold text-zinc-900 mb-3">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-semibold text-zinc-900 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="text-lg text-zinc-600 leading-relaxed mb-4">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-6 text-zinc-600 space-y-2 mb-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-6 text-zinc-600 space-y-2 mb-4">{children}</ol>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-zinc-800">{children}</strong>,
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1E90FF] hover:text-[#0A3D62] underline"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {description as string}
                    </ReactMarkdown>
                  )}
                </div>
              )}

              {/* Specifications */}
              {specs && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-zinc-900 mb-4">Specifications</h2>
                  <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                    {typeof specs === "object"
                      ? Object.entries(specs).map(([key, val], i) => (
                          <div
                            key={i}
                            className={`flex flex-col sm:flex-row px-6 py-3 sm:py-3 gap-1 sm:gap-0 ${i % 2 === 0 ? "bg-zinc-50" : "bg-white"}`}
                          >
                            <span className="w-full sm:w-1/2 text-sm font-semibold text-zinc-600 capitalize">
                              {key.replace(/_/g, " ")}
                            </span>
                            <span className="w-full sm:w-1/2 text-sm text-zinc-900">{String(val)}</span>
                          </div>
                        ))
                      : (
                        <div className="px-6 py-4 text-zinc-600 text-sm whitespace-pre-wrap">
                          {String(specs)}
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/contact?product=${encodeURIComponent(name || "")}`}
                  className="flex-1 text-center bg-[#0A3D62] hover:bg-[#1E90FF] text-white font-semibold py-4 px-6 rounded-full transition-colors"
                >
                  Request a Quote
                </Link>
                {brochureUrl && (
                  <a
                    href={brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border-2 border-[#0A3D62] text-[#0A3D62] hover:bg-[#0A3D62] hover:text-white font-semibold py-4 px-6 rounded-full transition-colors"
                  >
                    Download Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <div className="py-8 px-6 text-center">
        <Link href="/products" className="text-[#1E90FF] font-medium hover:text-[#0A3D62] transition-colors">
          ← Back to All Products
        </Link>
      </div>
    </div>
  );
}
