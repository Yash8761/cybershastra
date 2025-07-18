// src/components/layout/Header.tsx
import { useEffect, useState } from "react";
import RazorpayWallet from "@/components/common/RazorpayWallet";
import { getUserProfile } from "@/lib/api-client";
import { FaWhatsapp, FaUserCircle, FaBars } from "react-icons/fa";

interface HeaderProps {
  onMenuClick: () => void;
}

interface User {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [user, setUser] = useState<User>({ username: "" });
  const [error, setError] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative bg-white">
      {/* Main header content */}
      <div className="flex flex-col w-full px-4 py-3 md:flex-row md:items-center md:justify-between md:space-x-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            <FaBars className="text-xl" />
          </button>
          <h1 className="text-lg font-semibold md:text-xl truncate max-w-[200px] md:max-w-none">
            Welcome, {user.username}
          </h1>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            aria-label="Toggle actions menu"
          >
            <FaUserCircle className="text-xl" />
          </button>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <div className="credits-display">
            {error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <RazorpayWallet />
            )}
          </div>

          <a
            href="https://wa.me/+917499413908"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
            aria-label="Contact on WhatsApp"
          >
            <FaWhatsapp className="text-xl" />
          </a>
          {/*eslint-disable-next-line @next/next/no-html-link-for-pages*/}
          <a
            href="/profile"
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="View profile"
          >
            <FaUserCircle className="text-xl" />
          </a>
        </div>
      </div>

      {/* Mobile actions menu */}
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 md:hidden">
          <div className="px-4 py-2">
            {error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <RazorpayWallet />
            )}
          </div>
          <a
            href="https://wa.me/+919324078256"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaWhatsapp className="mr-2" />
            Contact Support
          </a>
          {/*eslint-disable-next-line @next/next/no-html-link-for-pages*/}
          <a
            href="/profile"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaUserCircle className="mr-2" />
            View Profile
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
