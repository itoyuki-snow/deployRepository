import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderCheckout.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

export default function OrderCheckout() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingFee] = useState(185);
  const [subtotal, setSubtotal] = useState(0);

  const onUpdateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(
        `https://portfolio-backend-nm0n.onrender.com/purchase/cart/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (err) {
      console.error("削除エラー:", err);
    }
  };

  useEffect(() => {
    axios
      .get("https://portfolio-backend-nm0n.onrender.com/auth/me", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setAddress(res.data.address);
      });

    axios
      .get("https://portfolio-backend-nm0n.onrender.com/purchase/cart", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCart(res.data.items);
        const totalPrice = res.data.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setSubtotal(totalPrice);
        setTotal(totalPrice + shippingFee);
      })
      .catch((err) => {
        console.error("カート取得エラー:", err);
      });
  }, []);

  useEffect(() => {
    const newSubtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + shippingFee);
  }, [cart]);

  const navigate = useNavigate();

  const handlePurchase = async () => {
    try {
      await axios.post(
        "http://localhost:8000/purchase/purchase",
        {
          payment_method: paymentMethod,
          address: address,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // カートを空にする
      setCart([]);
      // 完了画面へ遷移
      navigate("/order-complete");
    } catch (error) {
      console.error("注文確定エラー:", error);
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="background-color">
        <div className="checkout-container">
          <h2>ご注文手続き</h2>
          <section>
            <div className="mypage-card">
              <h3 className="info">お客様情報</h3>
              <div className="info-block">
                <label>＊お名前</label>
                <p>{user.username}</p>
              </div>
              <div className="info-block">
                <label>＊生年月日</label>
                <p>{user.birthdate}</p>
              </div>
              <div className="info-block">
                <label>＊メールアドレス</label>
                <p>{user.email}</p>
              </div>
              <div className="info-block">
                <label>＊配送先住所</label>
                <p>{user.address}</p>
              </div>
            </div>
          </section>

          <section>
            <h3>お支払方法</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="credit">クレジットカード</option>
              <option value="delivery">代金引換</option>
            </select>
          </section>

          <section>
            <h3>ご注文内容</h3>
            <div className="total-items">
              {cart.map((item, index) => (
                <div className="cart-item" key={`${item.id}-${index}`}>
                  <h2>{item.name}</h2>
                  <p>¥{item.price.toLocaleString()}</p>

                  <div className="quantity-controls">
                    <p>数量: {item.quantity}</p>
                    <button onClick={() => onUpdateQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)}>削除</button>
                </div>
              ))}
              <div className="summary">
                <p>小計: ¥{subtotal.toLocaleString()}</p>
                <p>送料: ¥{shippingFee}</p>
                <p className="total">合計: ¥{total.toLocaleString()}</p>
              </div>
            </div>
          </section>

          <button className="confirm-button" onClick={handlePurchase}>
            注文を確定する
          </button>
        </div>
      </div>
    </>
  );
}
