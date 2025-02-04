import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="MahsuratShop" className="h-8" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/category/men" className="text-gray-700 hover:text-gray-900">
              Men
            </Link>
            <Link href="/category/women" className="text-gray-700 hover:text-gray-900">
              Women
            </Link>
            <Link href="/category/kids" className="text-gray-700 hover:text-gray-900">
              Kids
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute bg-white w-full left-0 right-0 shadow-lg">
            <nav className="px-4 py-2 space-y-2">
              <Link href="/category/men" className="block py-2 text-gray-700 hover:text-gray-900">
                Men
              </Link>
              <Link href="/category/women" className="block py-2 text-gray-700 hover:text-gray-900">
                Women
              </Link>
              <Link href="/category/kids" className="block py-2 text-gray-700 hover:text-gray-900">
                Kids
              </Link>
              <div className="border-t pt-2">
                <Link href="/cart" className="block py-2 text-gray-700 hover:text-gray-900">
                  Cart
                </Link>
                <Link href="/account" className="block py-2 text-gray-700 hover:text-gray-900">
                  Account
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 