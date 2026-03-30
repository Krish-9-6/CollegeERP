import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import "./DashboardLayout.css";
import Header from "@/components/header";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
