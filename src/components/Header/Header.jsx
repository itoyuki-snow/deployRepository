import React from "react";
import "./Header.css";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt="天色の日"
          style={{ width: "160px" }}
        />
      </div>
      <div className="header-right">
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
