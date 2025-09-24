import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TopPage.css";
import Header from "../components/Header/Header";
import Product1 from "../components/Product/Product1";

const TopPage = () => {
  const navigate = useNavigate();

  const goToProductList = () => {
    navigate("/ProductList");
  };

  const goToGiftnavigator = () => {
    navigate("/giftnavigator");
  };

  return (
    <div className="top-page">
      <header>
        <Header />
      </header>

      <main>
        <section className="intro">
          <div className="visual_banner">
            <br />
            <img
              src={`${process.env.PUBLIC_URL}/images/visual.png`}
              alt="特別な日と日常を繋ぐアクセサリー/天色の日"
            />
            <br />
          </div>
          <div>
            <p>
              晴れの日も曇りの日も雨の日も、
              <br />
              雲を抜けた先には青空が広がっています。
            </p>
            <p>
              ハレノヒと日常を地続きにする
              <br />
              アクセサリーを作りたい。 どのような空模様の日も
              <br />
              雲の先に広がる青空のように、
              <br />
              特別な日と普段を繋いで
              <br />
              共にあるブランドになりたい。
            </p>
            <div className="origin">
              <p>
                澄んだ空の色を表す「天色」と、
                <br />
                すべての日に
                <br />
                という意味で「日」を合わせて
              </p>
              <p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo.png`}
                  alt="天色の日"
                  style={{ width: "160px" }}
                />
              </p>
              <p>に思いを込めました。</p>
            </div>
          </div>
        </section>

        <section className="new-product">
          <h3>新着商品</h3>
          <Product1 />
          <button onClick={goToProductList}>商品一覧</button>
        </section>

        <section className="gift-search">
          <h3>贈り日和</h3>
          <p>
            プレゼントしたい人(自分でもOK)の雰囲気や
            <br />
            好みを選択すると、その人におすすめの
            <br />
            アイテムをセレクトします。
          </p>
          <button onClick={goToGiftnavigator}>使用する</button>
        </section>
      </main>

      <footer>
        <nav>
          <ul>
            <li>
              <Link to="/mypage">マイページ</Link>
            </li>
            <li>
              <Link to="/ProductList">商品一覧</Link>
            </li>
            <li>
              <Link to="/giftnavigator">贈り日和</Link>
            </li>
            <li>
              <Link to="/cart">カート</Link>
            </li>
            <li>
              <Link to="/about">天色の日について</Link>
            </li>
            <li>
              <Link to="/logout">ログアウト</Link>
            </li>
          </ul>
        </nav>
        <p>SNSリンク | お問い合わせはこちらから</p>
      </footer>
    </div>
  );
};

export default TopPage;
