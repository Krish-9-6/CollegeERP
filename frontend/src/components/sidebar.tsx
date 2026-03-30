import {
  LayoutDashboard,
  ShoppingCart,
  BookOpen,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import logo from "../assets/bits_logo.png";
import '../styles/sidebar.css'
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Registration", icon: ShoppingCart },
  { label: "Academics", icon: BookOpen },
  { label: "Student Management", icon: Users },
  { label: "Courses", icon: BookOpen },
  { label: "Cart", icon: ShoppingCart, badge: 3 },
  { label: "Finance", icon: Settings },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={toggleSidebar}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="toggle-icon" />
        ) : (
          <ChevronLeft className="toggle-icon" />
        )}
      </button>
      {/* Header */}
      <div className="pheader">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo-img" />
          <h1 className="title">College ERP</h1>
        </div>
        <p className="subtitle">Educational System</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map(({ label, icon: Icon, badge }, idx) => (
            <li key={idx} className="nav-item">
              <button type="button" className="nav-btn">
                <Icon className="nav-icon" />
                <span className="nav-label">{label}</span>
                {badge ? <span className="nav-badge">{badge}</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer / User Profile */}
      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-avatar" />
          <div className="profile-info">
            <div className="profile-name">{user?.full_name}</div>
            <div className="profile-role">{user?.role}</div>
          </div>
          <button type="button" className="profile-logout" onClick={logout}>
            <LogOut style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
      </div>
    </aside>
  );
}
