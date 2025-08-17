import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CompanyTable from "./pages/CompanyTable";
import Billing from "./pages/Billing";
import WorkOrders from "./pages/WorkOrders";
import Services from "./pages/Services";

import Coupen from "./pages/Coupon";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Dashboard from "./components/ui/Dashboard";
import Products from "./pages/Products";



import { ToastContainer } from 'react-toastify';
import CreateCustomer from "./pages/CreateCustomer";
import CreateVehicle from "./pages/CreateVehicle";




const App = () => {
  return (
    <div>
      {/* <Header/> */}
   <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/orders" element={<WorkOrders />} />
        
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<CompanyTable />} />
        <Route path="/services" element={<Services />} />
        
        <Route path="/bill" element={<Billing/>}/>
        <Route path="/coupen" element={<Coupen/>}/>
        <Route path="/employees" element={<Employees/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/create-customer" element={<CreateCustomer/>}/>
        <Route path="/create-vehicle" element={<CreateVehicle/>}/>

        
      </Routes>
    </div>
  );
};

export default App;





// import { Route, Routes } from "react-router-dom";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import CompanyTable from "./pages/admin/CompanyTable";
// import ProtectedRoute from "./routes/ProtectRoute";
// import { SidebarProvider } from "./context/SidebarContext";

// const App = () => {
//   return (
//     <Routes>
//       {/* Auth Routes */}
//       <Route path="/signup" element={<Register />} />
//       <Route path="/login" element={<Login />} />

//       {/* Protected Routes */}
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <SidebarProvider>
//               <CompanyTable />
//             </SidebarProvider>
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// };

// export default App;