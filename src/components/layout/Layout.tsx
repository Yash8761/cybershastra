import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:block">
        <Sidebar isCollapsed={isCollapsed} onCollapse={handleCollapse} />
      </div>
      <div className={`md:hidden ${isSidebarOpen ? "block" : "hidden"}`}>
        <Sidebar isCollapsed={false} onCollapse={() => {}} />
      </div>
      <div
        className={`flex-1 flex flex-col ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 p-6">{children}</main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
