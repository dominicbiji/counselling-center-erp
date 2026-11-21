import RegisterPage from "./pages/auth/RegisterPage"
import LoginPage from "./pages/auth/LoginPage"
import ProfilePage from "./pages/auth/ProfilePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/public/LandingPage"
import ForgotPassword from "./pages/auth/ForgotPassword"


import AdminDashboard from "./pages/admin/AdminDashboard"
import ClientPage from "./pages/admin/ClientPage"
import CounsellorPage from "./pages/admin/CounsellorPage"
import ReceptionistPage from "./pages/admin/ReceptionistPage"
import AppointmentPage from "./pages/admin/AppointmentPage"
import ServiceManagement from "./pages/admin/ServiceManagement"
import CounterPayments from "./pages/admin/CounterPayments"
import Revenue from "./pages/admin/Revenue"

import CounsellorDashboard from "./pages/counsellor/CounsellorDashboard"
import ViewApp from "./pages/counsellor/ViewApp"
import AppHistory from "./pages/counsellor/AppHistory"
import CounsellorCl from "./pages/counsellor/CounsellorCl"


import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard"
import RecepClient from "./pages/receptionist/RecepClient"
import RecepApp from "./pages/receptionist/RecepApp"
import RecepCouns from "./pages/receptionist/RecepCouns"

import ClientDashboard from "./pages/client/ClientDashboard"
import ClientApp from "./pages/client/ClientApp"
import ClientHistory from "./pages/client/ClientHistory"
import ClientCl from "./pages/client/ClientCl"


import Notification from "./pages/shared/Notification"
import ResetPassword from "./pages/auth/ResetPassword"





export default function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/admin" element={<AdminDashboard/>}/>
            <Route path="/counsellors" element={<CounsellorPage/>}/>
            <Route path="/clients" element={<ClientPage/>}/>
            <Route path="/receptionists" element={<ReceptionistPage/>}/>
            <Route path="/receptionistDb" element={<ReceptionistDashboard/>}/>
            <Route path="/appointments" element={<AppointmentPage/>}/>
            <Route path="/counsellorDb" element={<CounsellorDashboard/>}/>
            <Route path="/counsellor/appointment/:id" element={<ViewApp/>}/>
            <Route path="/counsellor/history" element={<AppHistory/>}/>
            <Route path="/counsellor/clients" element={<CounsellorCl/>}/>
            <Route path="/receptionist/clients" element={<RecepClient/>}/>
            <Route path="/receptionist/appointments" element={<RecepApp/>}/>
            <Route path="/receptionist/counsellors" element={<RecepCouns/>}/>
            <Route path="/client/appointments" element={<ClientApp/>}/>
            <Route path="/client/dashboard" element={<ClientDashboard/>}/>
            <Route path="/client/history" element={<ClientHistory/>}/>
            <Route path="/client/profile" element={<ClientCl/>}/>
            <Route path="/admin/services" element={<ServiceManagement/>}/>
            <Route path="/notifications" element={<Notification />} />
            <Route path="/counterPay" element={<CounterPayments />} />
            <Route path="/admin/revenue" element={<Revenue />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />}/>



            
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}