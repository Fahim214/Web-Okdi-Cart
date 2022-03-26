import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddress from "./screens/ShippingAddress";
import PlaceOrder from "./screens/PlaceOrder"
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SidebarScreen from "./screens/SidebarScreen";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<HomeScreen />}
          />

          <Route path="/dashboard" element={<SidebarScreen />} />

          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>

          <Route path="/shipping" element={<ProtectedRoute />}>
            <Route path="/shipping" element={<ShippingAddress />} />
          </Route>

          <Route path="/payment" element={<ProtectedRoute />} >
            <Route path="/payment" element={<PaymentScreen />} />
          </Route>

          <Route path="/placeorder" element={<ProtectedRoute />}>
            <Route path="/placeorder" element={<PlaceOrder />} />
          </Route>

          <Route path="/order/:id" element={<ProtectedRoute />}>
            <Route path="/order/:id" element={<OrderScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
