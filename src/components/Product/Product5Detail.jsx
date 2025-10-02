import React from "react";
import "./Product1Detail.css";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";

const Product5Detail = () => {
  const { handleAddToCart } = useContext(CartContext);

  const product = {
    id: "product5",
    name: "雨空を彩る紫陽花",
    description: "水色 / イヤーカフ / ピアス / イヤリング",
    price: 2500,
    material: [
      "真鍮",
      "ステンレス",
      "レジン",
      "貴和クリスタル",
      "樹脂パール",
      "ガラスビーズ",
    ],
    size: [
      "イヤーカフ：縦30㎜×横25㎜",
      "ピアス：直径約15㎜",
      "イヤリング：縦25㎜×横15㎜",
    ],
    notes: [
      "紫陽花パーツ2種と雨垂れビーズは、一つひとつ色味の出方が異なるものを使っているので唯一無二の風合いとなっています。",
      "耳に直接触れる部分にコーティングのためレジンを使用しています。",
    ],
    tags: ["シンプル", "上品", "~3000円", "母の日"],
    product_url: "/product/product5",
    image_url: "/images/product5.jpg",
  };

  const handleClick = async () => {
    await handleAddToCartServer();
    handleAddToCart(product);
  };

  const handleAddToCartServer = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://portfolio-backend-nm0n.onrender.com/purchase/cart",
        {
          itemId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("カートに追加されました!");
      handleAddToCart(product);
    } catch (error) {
      console.error("追加失敗:", error);
      alert("カート追加に失敗しました");
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="detail-container">
        <div className="product-section">
          <img
            src={`${process.env.PUBLIC_URL}/images/product5.jpg`}
            alt={product.name}
          />
          <div className="text-section">
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="price">¥{product.price}</p>
            <button onClick={() => handleClick(product)}>カートに入れる</button>
            <div className="story">
              <p>
                まるで、雨に濡れた本物の紫陽花が耳元で揺れているような、
                <br />
                繊細で静謐な美しさのイヤーカフと、ピアスまたはイヤリングのセットです。
              </p>
              <p>
                メインは、雨に濡れることで美しさが際立つ花「紫陽花」。
                <br />
                雨に濡れた艶やかな紫陽花の花びら(本当はガク)、その中心にぽつんと佇む小さなつぼみ。
                <br />
                本物の紫陽花（ホンアジサイ）らしさにこだわって、細部まで丁寧に仕上げました。
              </p>
            </div>
          </div>

          <div className="recommend">
            <h3>【こんな方にピッタリです!】</h3>
            <h4>雨の日が憂鬱なあなた！</h4>
            <p>
              雨に濡れることで美しさが際立つ紫陽花。雨の日はこれを着けようと決めてみてください。憂鬱な気分が少し晴れて、雨の日がちょっと楽しくなりますよ。
            </p>
          </div>

          <div className="extra-info">
            <h3>サイズ</h3>
            <ul>
              {product.size.map((s, i) => (
                <li key={i} className="extra-info">
                  {s}
                </li>
              ))}
            </ul>
            <h3>注意事項</h3>
            <ul>
              {product.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
          <button onClick={handleClick}>カートに入れる</button>
        </div>
      </div>
    </>
  );
};

export default Product5Detail;
