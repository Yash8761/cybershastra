// src/components/layout/Sidebar.tsx
import { useState, useEffect } from "react";
import { getUserProfile } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  HomeIcon,
  EnvelopeIcon,
  PhoneIcon,
  TruckIcon,
  UserIcon,
  UserCircleIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onCollapse }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState({ username: "" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !isCollapsed) {
        onCollapse(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onCollapse, isCollapsed]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        console.error(err);
        setUser({ username: "" });
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const menuItems = [
    { label: "Dashboard", path: "/", icon: HomeIcon },
    { label: "Email", path: "/email", icon: EnvelopeIcon },
    { label: "Phone Number", path: "/phone", icon: PhoneIcon },
    { label: "Vehicle", path: "/vehicle", icon: TruckIcon },
    { label: "Personal", path: "/personal", icon: UserIcon },
    // { label: "Domain", path: "/domain", icon: GlobeAltIcon },
    { label: "Profile", path: "/profile", icon: UserCircleIcon },
    { label: "Logs", path: "/logs", icon: ClockIcon },
  ];

  return (
    console.log(user),
    (
      <>
        {/* Overlay for mobile */}
        {!isCollapsed && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => onCollapse(true)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-screen bg-[#0F172A] transition-all duration-300 ease-in-out 
          ${isCollapsed ? (isMobile ? "-translate-x-full" : "w-20") : "w-64"} 
          z-30 flex flex-col`}
        >
          <div className="h-16 border-b border-gray-800 flex items-center px-4">
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center w-full" : "justify-between w-full"
              }`}
            >
              {!isCollapsed && (
                <h1 className="text-white text-xl font-semibold truncate">
                  CyberShastra
                </h1>
              )}
              <button
                onClick={() => onCollapse(!isCollapsed)}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                {isMobile ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : isCollapsed ? (
                  <ChevronRightIcon className="w-6 h-6" />
                ) : (
                  <ChevronLeftIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-4">
            {menuItems.map((item) => {
              const isActive = router.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors 
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => isMobile && onCollapse(true)}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 truncate">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              {isCollapsed ? (
                <span className="text-xl">→</span>
              ) : (
                <span>Logout</span>
              )}
            </button>
          </div>

          {/* <div className="p-4 border-t border-gray-800">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
            {!isCollapsed && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm text-gray-400">Welcome,</p>
                <p className="text-sm font-medium text-white truncate">
                  {user.username}
                </p>
              </div>
            )}
          </div>
        </div> */}
        </aside>
      </>
    )
  );
};

export default Sidebar;
