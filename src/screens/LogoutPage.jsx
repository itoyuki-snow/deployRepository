// LogoutPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutPage.css";

export default function LogoutPage({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout(); // ログアウト処理を実行
    navigate("/login"); // ログイン画面にリダイレクト
  }, [onLogout, navigate]);

  return <div>ログアウト中です...</div>;
}
