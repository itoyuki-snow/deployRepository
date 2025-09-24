import React, { useContext } from "react";
import "./ProductList.css";
import { products } from "./products";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext.jsx";

const ProductList = () => {
  const { handleAddToCart } = useContext(CartContext);

  const handleClick = async (product) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8000/purchase/cart",
        {
          itemId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`${product.name} がカートに追加されました!`);
      handleAddToCart(product);
    } catch (error) {
      console.error("追加失敗:", error);
      alert("カート追加に失敗しました");
    }
  };

  return (
    <div className="product-list">
      <header>
        <Header />
      </header>
      <h1>商品一覧</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
            </Link>
            <p>{product.description}</p>
            <p className="price">¥{product.price.toLocaleString()} </p>
            <div className="button-wrapper">
              <button onClick={() => handleClick(product)}>
                カートに入れる
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
