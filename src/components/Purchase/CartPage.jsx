import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import Header from "../../components/Header/Header";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";

const CartPage = () => {
  const { cartItems, handleUpdateQuantity, handleRemoveItem } =
    useContext(CartContext);

  const navigate = useNavigate();

  const shippingFee = 185;
  const subtotal = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    navigate("/checkout"); // ← 注文画面へ遷移
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="background-color">
        <div className="cart-container">
          <h1>ショッピングカート</h1>
          {cartItems.length === 0 ? (
            <p>カートに商品がありません</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={item.id}>
                  <h2>{item.name}</h2>
                  <img
                    className="item-image"
                    src={`${process.env.PUBLIC_URL}${item.image_url}`}
                    alt={item.name}
                  />
                  <p>{item.description}</p>
                  <p>¥{item.price.toLocaleString()} (税込)</p>

                  <div className="quantity-controls">
                    <p>数量: {item.quantity}</p>
                    <button onClick={() => handleUpdateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>

                  <button onClick={() => handleRemoveItem(item.id)}>
                    削除
                  </button>
                </div>
              ))}
              <div className="summary">
                <p>小計: ¥{subtotal.toLocaleString()}</p>
                <p>送料: ¥{shippingFee}</p>
                <p className="total">合計: ¥{total.toLocaleString()}</p>
                <div className="button-group">
                  <button className="checkout-button" onClick={handleCheckout}>
                    ご注文手続きに進む
                  </button>
                  <button
                    className="continue-button"
                    onClick={() => navigate("/ProductList")}
                  >
                    ショッピングを続ける
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
