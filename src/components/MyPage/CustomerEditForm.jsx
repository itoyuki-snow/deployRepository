import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import "./CustomerEditForm.css";

const CustomerEditForm = ({ customer }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    birthdate: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        username: customer.username,
        birthdate: customer.birthdate,
        email: customer.email,
        address: customer.address,
      });
    }
  }, [customer]);

  if (!customer) {
    return <p>読み込み中です...</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("ログイン情報が見つかりません。再度ログインしてください。");
      return;
    }

    try {
      await axios.put(
        "https://portfolio-backend-nm0n.onrender.com/auth/me",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("変更を登録しました");
    } catch (error) {
      console.error("更新エラー:", error.response?.data || error.message);
      alert("変更に失敗しました");
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <form className="customer-form" onSubmit={handleSubmit}>
        <h2>お客様情報の変更</h2>
        <label>＊お名前</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label>＊生年月日</label>
        <input
          name="birthdate"
          type="date"
          value={formData.birthdate}
          onChange={handleChange}
        />

        <label>＊メールアドレス</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>＊配送先住所</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <button className="register" type="submit">
          変更を登録する
        </button>
        <button className="back-button" onClick={() => navigate("/top")}>
          トップに戻る
        </button>
      </form>
    </>
  );
};

export default CustomerEditForm;
