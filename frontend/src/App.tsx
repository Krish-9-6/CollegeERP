import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import StudentDashboard from "./pages/DashUser";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          {/* Add more protected pages here - they'll automatically get the sidebar */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
