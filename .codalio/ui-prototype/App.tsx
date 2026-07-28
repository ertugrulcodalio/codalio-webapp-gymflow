import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import TenantHome from "./pages/TenantHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MemberDashboard from "./pages/MemberDashboard";
import ClassSchedule from "./pages/ClassSchedule";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import MembershipPlans from "./pages/MembershipPlans";
import Trainers from "./pages/Trainers";
import AdminClasses from "./pages/AdminClasses";
import BookingsManagement from "./pages/BookingsManagement";

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/tenant/:gym_slug" element={<TenantHome />} />
            <Route path="/tenant/:gym_slug/login" element={<Login />} />
            <Route path="/tenant/:gym_slug/register" element={<Register />} />
            <Route path="/tenant/:gym_slug/dashboard" element={<MemberDashboard />} />
            <Route path="/tenant/:gym_slug/classes" element={<ClassSchedule />} />
            <Route path="/tenant/:gym_slug/bookings" element={<MyBookings />} />
            <Route path="/tenant/:gym_slug/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/tenant/:gym_slug/admin/plans" element={<MembershipPlans />} />
            <Route path="/tenant/:gym_slug/admin/trainers" element={<Trainers />} />
            <Route path="/tenant/:gym_slug/admin/classes" element={<AdminClasses />} />
            <Route path="/tenant/:gym_slug/admin/bookings" element={<BookingsManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
