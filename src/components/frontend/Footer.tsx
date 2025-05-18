import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white pt-12 shadow-inner">
      {/* 3‑column area */}
      <div className="container mx-auto px-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-base text-gray-700">
        {/* About */}
        <div>
          <h4 className="font-semibold mb-4 text-lg text-gray-900">About</h4>
          <p className="leading-relaxed">
            MyCompany connects talent with opportunity, offering curated jobs,
            events, and industry news to help you stay ahead in your career.
          </p>
        </div>

        {/* Quick Menus */}
        <div>
          <h4 className="font-semibold mb-4 text-lg text-gray-900">
            Quick Menus
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-green-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="hover:text-green-600 transition">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-green-600 transition">
                Events
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-green-600 transition">
                News
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-lg text-gray-900">Contact</h4>
          <p className="leading-relaxed">📍 123 Innovation St, Australia</p>
          <p className="leading-relaxed">📞 +977 1‑2345678</p>
          <p className="leading-relaxed">
            ✉️{" "}
            <a
              href="mailto:info@mycompany.com"
              className="hover:text-green-600 transition"
            >
              info@mycompany.com
            </a>
          </p>
        </div>
      </div>

      {/* copyright bar */}
      <div className="mt-12 border-t py-5 text-center text-sm sm:text-base text-gray-500">
        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_COMPANY_NAME} All rights reserved.
      </div>
    </footer>
  );
}
