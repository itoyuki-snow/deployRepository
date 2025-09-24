import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Product1Detail from "../Product/Product1Detail";
import Product2Detail from "../Product/Product2Detail";
import Product3Detail from "../Product/Product3Detail";
import Product4Detail from "../Product/Product4Detail";
import Product5Detail from "../Product/Product5Detail";
import Product6Detail from "../Product/Product6Detail";
import CartPage from "./CartPage";

const Shop = () => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);

  // 商品追加処理
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // 商品削除処理
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 数量変更処理
  const handleUpdateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  // 商品詳細の切り替え
  let ProductDetailComponent;
  if (id === "product1") {
    ProductDetailComponent = <Product1Detail onAddToCart={handleAddToCart} />;
  } else if (id === "product2") {
    ProductDetailComponent = <Product2Detail onAddToCart={handleAddToCart} />;
  } else if (id === "product3") {
    ProductDetailComponent = <Product3Detail onAddToCart={handleAddToCart} />;
  } else if (id === "product4") {
    ProductDetailComponent = <Product4Detail onAddToCart={handleAddToCart} />;
  } else if (id === "product5") {
    ProductDetailComponent = <Product5Detail onAddToCart={handleAddToCart} />;
  } else if (id === "product6") {
    ProductDetailComponent = <Product6Detail onAddToCart={handleAddToCart} />;
  } else {
    ProductDetailComponent = <p>商品が見つかりません</p>;
  }

  return (
    <>
      {ProductDetailComponent}
      <CartPage
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  );
};

export default Shop;
