import React, { useState } from "react";
import axios from "axios";
import "./GiftNavigator.css";
import Header from "../Header/Header";

function GiftNavigator() {
  const [form, setForm] = useState({
    occasion: "",
    relationship: "",
    age_group: "",
    style: "",
    recipient_name: "",
    price: "",
  });
  const [gifts, setGifts] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const selectedTags = Object.values(form)
      .filter((v, key) => key !== "recipient_name" && v !== "")
      .flatMap((tag) => tag.split("・"));

    if (selectedTags.length === 0) {
      alert("タグを1つ以上選択してください");
      return;
    }

    try {
      const res = await axios.post(
        "https://portfolio-backend-nm0n.onrender.com/gift/recommend",
        {
          tags: selectedTags,
        }
      );
      setGifts(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error(error);
      alert("おすすめ商品が見つかりませんでした");
    }
  };

  return (
    <div className="gift-container">
      <header>
        <Header />
      </header>
      <h2>贈り日和</h2>
      <p>
        プレゼントしたい人を思い浮かべて選択していくと、おすすめ商品がセレクトされます。
      </p>

      <div className="select-group">
        <label>＊いつ渡すプレゼントですか？</label>
        <select name="occasion" onChange={handleChange}>
          <option value="">選択してください</option>
          <option value="誕生日・記念日">誕生日・記念日</option>
          <option value="ホワイトデー">ホワイトデー</option>
          <option value="母の日">母の日</option>
          <option value="クリスマス">クリスマス</option>
          <option value="お礼">お礼</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div className="select-group">
        <label>＊どなたに贈るプレゼントですか？</label>
        <select name="relationship" onChange={handleChange}>
          <option value="">選択してください</option>
          <option value="友人">友人</option>
          <option value="恋人・夫婦">恋人・夫婦</option>
          <option value="家族">家族</option>
          <option value="職場の人">職場の人</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div className="select-group">
        <label>＊その方のご年齢は？</label>
        <select name="age_group" onChange={handleChange}>
          <option value="">選択してください</option>
          <option value="10代">10代</option>
          <option value="20代">20代</option>
          <option value="30代">30代</option>
          <option value="40代">40代</option>
          <option value="50代以上">50代以上</option>
        </select>
      </div>

      <div className="select-group">
        <label>＊その方の雰囲気や好みに近いものはどれですか？</label>
        <select name="style" onChange={handleChange}>
          <option value="">選択してください</option>
          <option value="シンプル・上品">シンプル・上品</option>
          <option value="かわいい">かわいい</option>
          <option value="華やか">華やか</option>
          <option value="ナチュラル">ナチュラル</option>
          <option value="クール">クール</option>
        </select>
      </div>

      <div className="select-group">
        <label>＊ご予算はどのくらいですか？</label>
        <select name="price" onChange={handleChange}>
          <option value="">選択してください</option>
          <option value="~3000円">~3000円</option>
          <option value="~4000円">~4000円</option>
        </select>
      </div>

      <div className="select-group">
        <label>＊贈る相手のお名前（ニックネームでもOK）</label>
        <input type="text" name="recipient_name" onChange={handleChange} />
      </div>

      <button className="search-button" onClick={handleSearch}>
        検索する
      </button>

      {/* おすすめギフト表示 */}
      {gifts.length > 0 && (
        <div className="recommendation">
          <h3>
            {form.recipient_name || "贈る相手"} さんへのおすすめはこちら！
          </h3>
          {gifts.map((gift) => (
            <div key={gift.id} className="gift-card">
              <h4>『{gift.name}』</h4>
              <p>{gift.description}</p>
              <p>￥{gift.price}</p>
              <img src={gift.image_url} alt={gift.name} />
              <a
                href={gift.product_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                商品を見る
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GiftNavigator;
