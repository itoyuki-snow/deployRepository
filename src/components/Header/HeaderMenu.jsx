import React, { useState } from "react";
import "./HeaderMenu.css";
import { Link } from "react-router-dom";

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header-fixed">
      <div className="header-left">
        {/*<img src={logo} alt="天色の日" style={{ width: "160px" }} />*/}
      </div>

      <div className="header-right">
        <div className="menu-icons">
          <Link to="/cart" className="icon-button">
            <img
              src={`${process.env.PUBLIC_URL}/images/cart.svg`}
              alt="カート"
            />
          </Link>
          <span
            className="icon-hamburger"
            onClick={toggleMenu}
            aria-label="メニューを開く/閉じる"
          >
            {isOpen ? "×" : "☰"}
          </span>
        </div>

        <nav className={`menu ${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/top">トップページ</Link>
            </li>
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMenu;
