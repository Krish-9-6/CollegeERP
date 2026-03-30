import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Login from "./pages/Login";
import StudentDashboard from "./pages/DashUser";
import DashboardLayout from "./layouts/DashboardLayout";
import { Authprovider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Authprovider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Authprovider>
  );
}

export default App;
