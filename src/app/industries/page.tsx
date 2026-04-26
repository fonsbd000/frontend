import Link from "next/link";

export default function IndustriesPage() {
  const industries = [
    { name: 'Manufacturing', icon: '🏭', description: 'Heavy and light machinery for large-scale production facilities.' },
    { name: 'Construction', icon: '🏗️', description: 'Equipment for infrastructure and commercial development.' },
    { name: 'Energy', icon: '⚡', description: 'Power generation and distribution equipment.' },
    { name: 'Agriculture', icon: '🌾', description: 'Modern agricultural processing machinery.' },
    { name: 'Automotive', icon: '🚗', description: 'Assembly line and testing equipment.' },
    { name: 'Textile', icon: '🧶', description: 'Advanced weaving, spinning, and dyeing machines.' },
    { name: 'Pharmaceuticals', icon: '💊', description: 'Precision equipment for safe and compliant drug manufacturing.' },
    { name: 'Logistics', icon: '🚢', description: 'Material handling and warehousing solutions.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <section className="bg-[#0A3D62] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Industries We Serve</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tailored industrial solutions for diverse sectors across Bangladesh.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:-translate-y-1 transition-transform">
                <div className="text-5xl mb-6">{industry.icon}</div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{industry.name}</h3>
                <p className="text-zinc-600 mb-6">{industry.description}</p>
                <Link href={`/products?industry=${industry.name.toLowerCase()}`} className="text-[#1E90FF] font-medium hover:text-[#0A3D62]">
                  View Equipment →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
