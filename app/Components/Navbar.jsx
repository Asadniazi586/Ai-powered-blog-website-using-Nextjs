'use client';
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { assets } from "../Assets/assets";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <header className="py-5 px-5 md:px-12 lg:px-28 border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4 md:gap-0">
        {/* Logo */}
        <Link href="/">
          <Image
            src={assets.logo}
            width={180}
            height={40}
            alt="Website Logo"
            className="w-[130px] sm:w-auto"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 md:gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative group font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-4">
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm font-medium hover:text-indigo-600 transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 font-medium py-2 px-4 border border-gray-300 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="flex items-center gap-2 font-medium py-2 px-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;