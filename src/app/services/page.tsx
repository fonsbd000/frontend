import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | FONS Bangladesh Ltd.",
  description:
    "Explore FONS Bangladesh's services: Consultation, Installation, Maintenance, Network Tools Rental, and Training.",
};

const services = [
  {
    title: "Consultation",
    image: "https://images.unsplash.com/photo-1664575599736-c5197c684128?q=80&w=800&auto=format&fit=crop",
    description:
      "Our expert engineers assess your infrastructure needs and design custom fiber optic network solutions. We provide end-to-end technical consultation from network planning to capacity optimization for ISPs, telecom operators, and enterprises.",
    highlights: [
      "Network design & planning",
      "Feasibility studies",
      "Technology selection advisory",
      "Cost-benefit analysis",
    ],
  },
  {
    title: "Installation",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    description:
      "Professional installation of fiber optic cables, connectors, patch panels, and complete network infrastructure. Our certified technicians ensure precision splicing and termination for maximum signal integrity.",
    highlights: [
      "Fiber optic cable laying",
      "Splicing & termination",
      "Patch panel installation",
      "Network commissioning & testing",
    ],
  },
  {
    title: "Maintenance",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    description:
      "Keep your fiber optic network running at peak performance with our preventive and corrective maintenance services. We offer scheduled inspections, rapid fault diagnosis, and emergency response to minimize downtime.",
    highlights: [
      "Preventive maintenance schedules",
      "OTDR fault detection",
      "Emergency repair response",
      "Performance monitoring",
    ],
  },
  {
    title: "Network Tools Rental",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    description:
      "Access professional-grade fiber optic test equipment without the capital investment. Rent OTDR machines, fusion splicers, optical power meters, light sources, and more for your project duration.",
    highlights: [
      "OTDR & optical analyzers",
      "Fusion splicer rental",
      "Power meters & light sources",
      "Flexible rental periods",
    ],
  },
  {
    title: "Training",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
    description:
      "Empower your technical team with hands-on fiber optic training programs. From basic fiber handling to advanced OTDR analysis, our certified trainers deliver practical, industry-relevant courses.",
    highlights: [
      "Fiber splicing & termination",
      "OTDR operation & analysis",
      "Network troubleshooting",
      "Certified training programs",
    ],
  },
];



export default function ServicesPage() {
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
            Comprehensive Network Services
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            What We <span className="text-[#00C897]">Provide</span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
            From expert consultation to hands-on installation and certified training — FONS Bangladesh
            delivers end-to-end fiber optic network services across Bangladesh and beyond.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#0A3D62] mb-4">Our Services</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Expert support at every stage of your fiber optic network lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62]/70 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{service.title}</h3>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-zinc-500 leading-relaxed mb-6 flex-grow">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C897] shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-auto inline-flex items-center gap-2 text-[#0A3D62] font-semibold hover:text-[#00C897] transition-colors"
                  >
                    Request This Service
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-[#0A3D62] mb-4">Ready to Get Started?</h2>
          <p className="text-zinc-500 text-lg mb-10 max-w-2xl mx-auto">
            Contact our engineering team today to discuss your requirements and get a tailored service proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#0A3D62] hover:bg-[#1E90FF] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
            <Link
              href="/quote"
              className="bg-[#00C897] hover:bg-[#00b386] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
