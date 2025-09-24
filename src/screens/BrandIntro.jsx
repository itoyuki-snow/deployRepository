import React from "react";
import "./BrandIntro.css";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";

const BrandIntro = () => {
  return (
    <div className="brand-intro">
      <header>
        <Header />
      </header>

      <main className="main-content">
        <div className="visual_banner2">
          <img
            src={`${process.env.PUBLIC_URL}/images/visual02.jpg`}
            alt="天色の日の商品"
          />
        </div>
        <div className="description1">
          <p>
            晴れの日も曇りの日も雨の日も、
            <br />
            雲を抜けた先には青空が広がっています。
          </p>
          <p>ハレノヒと日常を地続きにするアクセサリーを作りたい。</p>
          <p>
            どのような空模様の日も雲の先に広がる青空のように、
            <br />
            特別な日と普段を繋いで共にあるブランドになりたい。
          </p>
          <p>
            澄んだ空の色を表す「天色」と、
            <br />
            すべての日にという意味で「日」を合わせて
          </p>
          <div className="logo">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="天色の日-AmaironoHi-"
            />
          </div>
          <p>に思いを込めました。</p>
        </div>

        <div className="description2">
          <p>
            結婚式や入学式・卒業式などのオケージョン、
            <br />
            推しのライブやイベントなどの特別な日と、
            <br />
            普段の日を繋ぐアクセサリーを届けたい。
          </p>
          <p>大切な思い出をいつでもそばに置いてほしい。</p>
          <p>このようなブランドを「天色の日」は目指します。</p>
          <p>
            あなたの大切な出来事に寄り添うことができるのなら
            <br />
            こんなに嬉しいことはありません。
          </p>
        </div>
        <div className="back-button-container">
          <Link to="/top" className="back-button">
            トップページに戻る
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BrandIntro;
