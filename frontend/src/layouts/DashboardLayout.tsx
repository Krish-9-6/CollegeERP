import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
