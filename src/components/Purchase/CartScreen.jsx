import React, { useEffect, useState } from "react";
import axios from "axios";
import CartPage from "./CartPage";

function CartScreen({ token }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCartItems(response.data.items);
      })
      .catch((error) => {
        console.error("カート取得失敗:", error);
      });
  }, [token]);

  const handleRemoveItem = (itemId) => {
    // 削除ロジック例（必要ならaxiosでサーバーに通知）
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  };

  return (
    <CartPage
      cartItems={cartItems}
      onRemoveItem={handleRemoveItem}
      onUpdateQuantity={handleUpdateQuantity}
    />
  );
}

export default CartScreen;
