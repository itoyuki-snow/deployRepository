import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyPage.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        alert("ログイン情報が無効です。再度ログインしてください。");
      });
  }, []);

  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate("/edit", { state: { customer: user } }); // customer情報をstateで渡す
  };

  if (!user) return <div className="loading">読み込み中...</div>;

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="mypage-wrapper">
        <h2 className="page-title">マイページ</h2>
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
        <button onClick={handleEditClick}>お客様情報を編集する</button>
        <button className="back-button" onClick={() => navigate("/top")}>
          トップに戻る
        </button>
      </div>
    </>
  );
};

export default MyPage;
