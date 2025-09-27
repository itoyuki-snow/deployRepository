import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TopPage from "./TopPage/TopPage";
import ProductList from "./components/Product/ProductList";
import CartPage from "./components/Purchase/CartPage";
import Shop from "./components/Purchase/Shop";
import BrandIntro from "./screens/BrandIntro";
import LogoutPage from "./screens/LogoutPage";
import GiftNavigator from "./components/Gift/GiftNavigator";
import ErrorBoundary from "./screens/ErrorBoundary";
import MyPage from "./components/MyPage/MyPage";
import CustomerEditWrapper from "./components/MyPage/CustomerEditWrapper";
import OrderCheckout from "./components/Purchase/OrderCheckout";
import OrderComplete from "./components/Purchase/OrderComplete";

function App() {
  const handleLogin = (email) => {
    console.log(`いらっしゃいませ`);
  };
  <LoginScreen onLogin={handleLogin} />;

  const handleLogout = () => {
    console.log("ログアウトしました");
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route index element={<Navigate to="/login" />} />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/top" element={<TopPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit" element={<CustomerEditWrapper />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/product/:id" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<OrderCheckout />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/about" element={<BrandIntro />} />

          <Route
            path="/giftnavigator"
            element={
              <ErrorBoundary>
                <GiftNavigator />
              </ErrorBoundary>
            }
          />

          <Route
            path="/logout"
            element={<LogoutPage onLogout={handleLogout} />}
          />
          {/* デフォルトはログイン画面へ */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
