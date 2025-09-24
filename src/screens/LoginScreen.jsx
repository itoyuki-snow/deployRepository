import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";

const Container = styled.div`
  background-color: #eaf9ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Zen Kaku Gothic New", "Arial", sans-serif;
`;

const Heading = styled.h2`
  margin-top: 30px;
  color: #3d3d3d;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #0086cc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 300px;
  padding: 10px;
  background-color: #0086cc;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0086cc;
  }
`;

const RegisterButton = styled(Button)`
  background-color: #ff5eb1;
  margin-top: 15px;

  &:hover {
    background-color: #ff5eb1;
  }
`;

const LinkText = styled.p`
  margin-top: 0px;
  font-size: 14px;
  color: #3d3d3d;

  a {
    color: #ff5eb1;
    text-decoration: none;
  }
`;

const ErrorMessage = styled.p`
  color: #ff2c2cff; // 赤色
  font-size: 14px;
  margin-top: 10px;
`;

function LoginScreen({ onLogin = () => {} }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/login", { email, password }); // ログインリクエスト
      const { token } = response.data; // トークンを取得
      localStorage.setItem("token", token); // トークンをローカルストレージに保存
      onLogin(email); // 親コンポーネントにログインイベントを伝達
      navigate("/top"); // ホーム画面に遷移
    } catch {
      setError(
        "ログインに失敗しました。メールアドレスまたはパスワードを確認してください。"
      );
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <Container>
      <img
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        alt="天色の日"
        style={{ width: "160px" }}
      />

      <Heading>ログイン</Heading>

      <Input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button onClick={handleSubmit}>ログイン</Button>

      <LinkText>
        パスワードを忘れた方は <a href="#">こちら</a>
      </LinkText>

      <RegisterButton onClick={goToRegister}>新規会員登録</RegisterButton>
    </Container>
  );
}

export default LoginScreen;
