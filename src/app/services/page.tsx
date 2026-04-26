import { getServices } from "@/lib/api";
import Link from "next/link";

export const revalidate = 60;

export default async function ServicesPage() {
  const servicesRes = await getServices().catch(() => ({ data: [] }));
  const services = servicesRes?.data || [];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <section className="bg-[#0A3D62] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Comprehensive support and engineering solutions to keep your operations running seamlessly.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => (
                <div key={service.id} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-blue-50 text-[#1E90FF] rounded-2xl flex items-center justify-center mb-6 text-3xl">
                    🔧
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">{service.attributes?.Name || 'Service'}</h2>
                  <p className="text-zinc-600 leading-relaxed mb-6">
                    {service.attributes?.Description || 'Detailed service description will be available here.'}
                  </p>
                  <Link href="/contact" className="text-[#0A3D62] font-semibold hover:text-[#1E90FF] flex items-center">
                    Request Service
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-zinc-400 mb-4">No Services Listed</h3>
              <p className="text-zinc-500">Check back later or contact us for more information about our offerings.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
