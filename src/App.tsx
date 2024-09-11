import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OtpVerify from "./pages/auth/OtpVerify";
import ServiceList from "./pages/dashboard/services/ServiceList";
import UserProfile from "./pages/dashboard/profile/UserProfile";
import WinnerList from "./pages/dashboard/WinnerList";
import NewProduct from "./pages/dashboard/product/NewProduct";
import ProductList from "./pages/dashboard/product/ProductList";
import EditProduct from "./pages/dashboard/product/EditProduct";
import NewPassword from "./pages/auth/NewPassword";
import AddWarehouse from "./pages/dashboard/warehouse/AddWarehouse";
import AuthGuard from "./AuthGuard";
import RootRedirect from "./AuthGuard/RootDirector";
import InventoryList from "./pages/dashboard/inventory/InventoryList";
import SampleProduct from "./pages/dashboard/product/SampleProduct";
import NewProducts from "./pages/dashboard/product/NewProducts";
import GovSchemes from "./pages/dashboard/scheme/GovSchemes";
import ViewGovScheme from "./pages/dashboard/scheme/ViewGovScheme";
import Farmer from "./pages/dashboard/farmer/Farmer";
import AddFarmer from "./pages/dashboard/farmer/AddFarmer";
import SaleList from "./pages/dashboard/sale/SaleList";
import AddSale from "./pages/dashboard/sale/AddSale";
import CustomerList from "./pages/dashboard/CustomerList";
import PurchaseList from "./pages/dashboard/PurchaseList";
import SupplierList from "./pages/dashboard/SupplierList";
import ShopEdit from "./pages/dashboard/profile/ShopEdit";
import ChangePassword from "./pages/auth/ChangePassword";
import EditFarmer from "./pages/dashboard/farmer/EditFarmer";
import { AnimatedWrapper } from "./hooks/useForceUpdate";
import Layout from "./layout";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AnimatedWrapper>
          <Routes>
            {/* Root Route */}
            <Route path="/" element={<RootRedirect />} />

            {/* Auth Routes (No Layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/NewPassword/:email" element={<NewPassword />} />
            <Route path="/otpVerify/:email" element={<OtpVerify />} />
            <Route path="/changePassword" element={<ChangePassword />} />

            {/* Protected Routes (With Layout) */}
            <Route element={<AuthGuard />}>
              <Route
                path="/dashboard/*"
                element={
                  <Layout>
                    <Routes>
                      <Route path="home" element={<Dashboard />} />
                      <Route path="userProfile" element={<UserProfile />} />
                      <Route path="winners" element={<WinnerList />} />
                      <Route path="serviceList" element={<ServiceList />} />
                      <Route path="CustomerList" element={<CustomerList />} />
                      <Route path="PurchaseList" element={<PurchaseList />} />
                      <Route path="SupplierList" element={<SupplierList />} />
                      <Route path="ShopEdit" element={<ShopEdit />} />

                      <Route path="newProduct" element={<NewProduct />} />
                      <Route path="newProducts/:id" element={<NewProducts />} />
                      <Route path="productList" element={<ProductList />} />
                      <Route path="productEdit/:id" element={<EditProduct />} />
                      <Route path="newWarehouse" element={<AddWarehouse />} />
                      <Route path="inventoryList" element={<InventoryList />} />
                      <Route path="SamplePRoducts" element={<SampleProduct />} />

                      <Route path="governmentSchemes" element={<GovSchemes />} />
                      <Route
                        path="governmentSchemes/:id"
                        element={<ViewGovScheme />}
                      />

                      <Route path="farmer" element={<Farmer />} />
                      <Route path="addFarmer" element={<AddFarmer />} />
                      <Route path="editFarmer/:id" element={<EditFarmer />} />

                      <Route path="sale" element={<SaleList />} />
                      <Route path="addSale" element={<AddSale />} />
                    </Routes>
                  </Layout>
                }
              />
            </Route>
          </Routes>
        </AnimatedWrapper>
      </Router>
    </>
  );
}

export default App;
