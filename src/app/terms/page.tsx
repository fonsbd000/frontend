import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - FONS Bangladesh Ltd.',
  description: 'Terms of Service of Fiber Optic Network Solutions (FONS) Bangladesh Ltd.',
};

export default function TermsOfService() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">
        <h1 className="text-4xl font-bold text-[#0A3D62] mb-8">Terms of Service</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-500">Effective Date: April 30, 2026</p>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and Fiber Optic Network Solutions (FONS) Bangladesh Ltd. Us concerning your access to and use of the fonsbangladesh.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">3. User Representations</h2>
            <p>
              By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">4. Products and Services</h2>
            <p>
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">5. Modifications and Interruptions</h2>
            <p>
              We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">6. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>
            <address className="mt-4 not-italic pl-4 border-l-4 border-[#00C897]">
              FONS Bangladesh Ltd.<br />
              143/1 New Baily Road<br />
              Dhaka-1000, Bangladesh<br />
              Email: info@fonsbangladesh.com
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
