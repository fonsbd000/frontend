import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - FONS Bangladesh Ltd.',
  description: 'Privacy Policy of Fiber Optic Network Solutions (FONS) Bangladesh Ltd.',
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">
        <h1 className="text-4xl font-bold text-[#0A3D62] mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-500">Effective Date: April 30, 2026</p>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">1. Introduction</h2>
            <p>
              Welcome to Fiber Optic Network Solutions (FONS) Bangladesh Ltd. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at info@fonsbangladesh.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Personal Information Provided by You:</strong> We collect names; phone numbers; email addresses; mailing addresses; job titles; contact preferences; and other similar information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To send administrative information to you.</li>
              <li>To fulfill and manage your orders.</li>
              <li>To deliver and facilitate delivery of services to the user.</li>
              <li>To respond to user inquiries/offer support to users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">4. Sharing Your Information</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0A3D62] mb-4">5. Contact Us</h2>
            <p>
              If you have questions or comments about this notice, you may email us at info@fonsbangladesh.com or by post to:
            </p>
            <address className="mt-4 not-italic pl-4 border-l-4 border-[#00C897]">
              FONS Bangladesh Ltd.<br />
              143/1 New Baily Road<br />
              Dhaka-1000, Bangladesh
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
