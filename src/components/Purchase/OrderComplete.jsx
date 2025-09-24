import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderComplete.css";
import Header from "../Header/Header";

function OrderComplete() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="order-complete-container">
        <div className="checkmark-circle">✓</div>
        <h1 className="title">注文完了</h1>
        <p className="thank-you">Thank you!</p>
        <p className="message">
          ご購入ありがとうございます。ご注文が完了しました。
          <br />
          商品が発送されるまで今しばらくお待ちください。
        </p>
        <button className="back-button" onClick={() => navigate("/top")}>
          トップに戻る
        </button>
      </div>
    </>
  );
}

export default OrderComplete;
