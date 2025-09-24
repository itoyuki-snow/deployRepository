import React from "react";
import "./Product1.css";

const Product1 = () => {
  return (
    <div className="crystal-Heart">
      <div className="picture">
        <img
          src={`${process.env.PUBLIC_URL}/images/product1.jpg`}
          alt="クリスタルハートと水色のビジューを使ったピアス"
          style={{ width: "160px" }}
        />
      </div>
      <div className="text">
        <h3 className="product-name">
          『澄み切ったスカイブルーとクリスタルハート』
        </h3>
        <p className="product-detail">水色 / ピアス / イヤリング</p>
        <p className="price">¥3,300</p>
      </div>
    </div>
  );
};

export default Product1;
