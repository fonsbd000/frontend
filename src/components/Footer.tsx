import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/p/Fiber-Optic-Network-Solutions-Bangladesh-Ltd-100079983740244/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8.01 9.8V15H8v-3h2.01V9.43c0-1.98 1.17-3.08 2.99-3.08.87 0 1.78.16 1.78.16v1.96h-1c-.98 0-1.29.61-1.29 1.23V12h2.21l-.35 3h-1.86v6.8c4.57-.93 8.01-4.96 8.01-9.8z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/originalfonsbd',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'DevelopmentAid',
    href: 'https://www.developmentaid.org/organizations/view/35557/fiber-optic-network-solutions-fons-bangladesh-ltd',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ), // Placeholder icon for DevelopmentAid, using a play/network style icon
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A3D62] text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#0A3D62] font-bold text-lg">
                F
              </div>
              <span className="text-2xl font-bold tracking-tight">
                FONS<span className="text-[#00C897]">.</span>
              </span>
            </Link>
            <p className="text-blue-100/80 leading-relaxed">
              Fiber Optic Network Solutions (FONS) Bangladesh Ltd. is a leading provider of industrial machinery, fiber optic solutions, and comprehensive engineering services.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00C897] transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Products', 'Services', 'Industries', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-blue-100/70 hover:text-[#00C897] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-blue-100/70">
              <li className="flex gap-3 items-start">
                <svg className="w-6 h-6 text-[#00C897] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="pt-0.5">143/1 New Baily Road ,Dhaka-1000, Bangladesh</span>
              </li>
              <li className="flex gap-3 items-start">
                <svg className="w-6 h-6 text-[#00C897] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col gap-1 pt-0.5">
                  <span>01922114811, 01922114809</span>
                  <span>01922114831, 01922114835</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <svg className="w-6 h-6 text-[#00C897] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="pt-0.5">info@fonsbangladesh.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Certification */}
          <div>
            <h4 className="text-lg font-bold mb-6">Accreditations</h4>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full text-center">
                <p className="text-sm font-medium text-blue-100/60 mb-2">ISO 9001:2015 Certified</p>
                <div className="h-1 bg-[#00C897] w-full rounded-full opacity-50"></div>
              </div>
              <p className="text-sm text-blue-100/50 italic">
                Leading the way in fiber optic network solutions and industrial excellence across South Asia.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100/50">
          <p>© {new Date().getFullYear()} FONS Bangladesh Ltd. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
