import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      {/* Header */}
      <section className="bg-[#0A3D62] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About FONS Bangladesh Ltd</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your Trusted Partner in Industrial Excellence since 2010.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-zinc-100">
          <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">Our Mission</h2>
          <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
            To provide comprehensive, high-quality industrial machinery and solutions that empower local businesses to operate at global standards. We strive to be the bridge that connects the world's best engineering technologies to the heart of Bangladesh's manufacturing sector.
          </p>

          <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">Our Vision</h2>
          <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
            To be the undisputed leader in industrial equipment supply and consultancy in South Asia, recognized for our unwavering commitment to quality, integrity, and customer satisfaction.
          </p>

          <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">Why Choose Us?</h2>
          <ul className="space-y-4 text-lg text-zinc-600 mb-10">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-[#00C897] mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Global Partnerships:</strong> We collaborate with renowned manufacturers worldwide to bring you the best machinery.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-[#00C897] mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Expert Team:</strong> Our engineers are highly trained to provide unparalleled technical support and consultancy.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-[#00C897] mr-3 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>After-Sales Service:</strong> We believe our relationship begins after the sale. We offer comprehensive maintenance and spare parts support.</span>
            </li>
          </ul>

          <div className="text-center mt-12">
            <Link href="/contact" className="inline-block bg-[#00C897] hover:bg-[#00b386] text-white font-semibold py-4 px-8 rounded-full transition-colors text-lg">
              Get in Touch with Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
