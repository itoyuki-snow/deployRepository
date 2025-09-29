import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";

const Container = styled.div`
  background-color: #eaf9ff;
  min-height: 100vh;
  padding: 40px;
  font-family: "Zen Kaku Gothic New", "Arial", sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-family: "Zen Kaku Gothic New", "Cursive", sans-serif;
  color: #3d3d3d;
`;

const Form = styled.form`
  max-width: 500px;
  margin: auto;
`;

const Label = styled.label`
  display: block;
  margin-top: 20px;
  color: #0086cc;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 12px;
  background-color: #0086cc;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => props.$bgColor};

  &:hover {
    background-color: #0086cc;
  }
`;

function RegisterScreen() {
  const [formData, setFormData] = useState({
    username: "",
    birthdate: "",
    email: "",
    address: "",
    password: "",
  });

  // 入力エラーを管理する状態
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // 入力が変更されたときに実行される関数
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // フォームが送信されたときに実行される関数
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("送信開始");

    // 入力チェックを行い、エラーを記録

    const newErrors = {};
    if (!formData.username) newErrors.username = "氏名を入力してください。";
    if (!formData.birthdate)
      newErrors.birthdate = "生年月日を入力してください。";
    if (!formData.email) newErrors.email = "メールアドレスを入力してください。";
    if (!formData.address) newErrors.address = "配送先住所を入力してください。";
    if (!formData.password)
      newErrors.password = "パスワードを入力してください。";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formattedData = {
      ...formData,
      birthdate: new Date(formData.birthdate).toISOString().slice(0, 10),
    };

    console.log("送信データ:", formattedData);

    try {
      await apiClient.post("/auth/signup", formattedData);
      alert("ユーザー登録が完了しました!");
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.detail) {
        setErrors({ general: err.response.data.detail });
      } else {
        setErrors({
          general: "アカウント作成に失敗しました。入力内容を確認してください。",
        });
      }
    }
  };

  return (
    <Container>
      <header>
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt="天色の日"
          style={{ width: "160px" }}
        />
      </header>
      <Title> 新規会員登録</Title>
      <Form>
        <Label>＊お名前</Label>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}

        <Label>＊生年月日</Label>
        <Input
          name="birthdate"
          type="date"
          value={formData.birthdate}
          onChange={handleChange}
          placeholder="年/月/日"
        />
        {errors.dob && <p>{errors.dob}</p>}

        <Label>＊メールアドレス</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}

        <Label>＊配送先住所</Label>
        <Input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p>{errors.address}</p>}

        <Label>＊パスワード</Label>
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}

        {errors.general && <p>{errors.general}</p>}

        <Button type="button" $bgColor="#ff5eb1" onClick={handleSubmit}>
          登録する
        </Button>

        <Button type="button" onClick={() => navigate("/login")}>
          ログイン画面に戻る
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterScreen;
