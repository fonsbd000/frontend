import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | FONS Bangladesh Ltd.",
  description:
    "FONS Bangladesh serves Telecom operators, NTTN, ISP, ICX, IIG, IGW, Banks, TV Channels, Government, Military, and Education sectors with fiber optic solutions.",
};

const industriesPrimary = [
  {
    name: "Telecom Mobile Operators",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    description:
      "Backbone and access network infrastructure for 2G/3G/4G/5G mobile operators requiring high-density fiber connectivity.",
  },
  {
    name: "Complete Backhaul Solutions",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800&auto=format&fit=crop",
    description:
      "End-to-end backhaul connectivity linking base stations to core networks with maximum reliability and throughput.",
  },
  {
    name: "NTTN Operators",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    description:
      "Nationwide Telecommunications Transmission Network operators needing scalable, carrier-grade fiber infrastructure.",
  },
  {
    name: "ICX",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    description:
      "Interconnection Exchange operators requiring high-capacity, low-latency fiber optic interconnect solutions.",
  },
  {
    name: "IIG",
    image: "https://images.unsplash.com/photo-1520869562399-e772f042f422?q=80&w=800&auto=format&fit=crop",
    description:
      "International Internet Gateway providers demanding ultra-high-capacity undersea and terrestrial fiber connectivity.",
  },
  {
    name: "IGW",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    description:
      "International Gateway operators managing voice and data traffic with resilient fiber optic transport networks.",
  },
  {
    name: "ISP",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=800&auto=format&fit=crop",
    description:
      "Internet Service Providers deploying last-mile FTTH/FTTB and metro fiber optic access networks.",
  },
];

const industriesOther = [
  {
    name: "Banks & Financial",
    image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?q=80&w=800&auto=format&fit=crop",
    description: "Secure, high-availability fiber networks for core banking and financial data centers.",
  },
  {
    name: "TV Channels",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
    description: "Broadcast-grade fiber connectivity for live production, playout, and media distribution.",
  },
  {
    name: "Enterprises",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop",
    description: "Campus and WAN fiber solutions for large enterprises requiring scalable internal networks.",
  },
  {
    name: "Hotels",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    description: "High-speed in-building fiber networks delivering seamless guest and operational connectivity.",
  },
  {
    name: "Military & Defense",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=800&auto=format&fit=crop",
    description: "Ruggedized, secure fiber optic systems for strategic communications and defense installations.",
  },
  {
    name: "Government Institutions",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop",
    description: "Mission-critical fiber infrastructure connecting government offices, data centers, and public services.",
  },
  {
    name: "Education Centers",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    description: "High-speed campus fiber networks supporting universities, schools, and research institutions.",
  },
  {
    name: "Large Enterprises",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop",
    description: "Enterprise-grade fiber backbone solutions for manufacturing plants and large commercial complexes.",
  },
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-[#0A3D62] text-white py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C897] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1E90FF] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#00C897] animate-pulse" />
            Sector Expertise
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Industries We <span className="text-[#00C897]">Serve</span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
            Trusted by telecom operators, ISPs, government bodies, financial institutions, and more — delivering fiber optic excellence across every sector in Bangladesh.
          </p>
        </div>
      </section>

      {/* Telecom & ISP Sectors */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-[#0A3D62] mb-3">Telecom &amp; Network Operators</h2>
            <p className="text-zinc-500 max-w-2xl">
              Core infrastructure solutions for Bangladesh&apos;s telecom ecosystem — from mobile backhaul to international gateways.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industriesPrimary.map((industry, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{industry.name}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 mb-0">
        <div className="h-px bg-zinc-200 w-full" />
      </div>

      {/* Other Sectors */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-[#0A3D62] mb-3">Enterprise &amp; Public Sectors</h2>
            <p className="text-zinc-500 max-w-2xl">
              Delivering secure, reliable fiber optic connectivity for businesses, institutions, and public organizations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industriesOther.map((industry, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{industry.name}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-[#0A3D62] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Don&apos;t see your sector? <span className="text-[#00C897]">Let&apos;s talk.</span>
          </h2>
          <p className="text-blue-100/70 text-lg mb-10 max-w-2xl mx-auto">
            FONS Bangladesh has 18+ years of experience adapting fiber optic solutions for any sector. Reach out and we will tailor a solution for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#00C897] hover:bg-[#00b386] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg transition-all"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
