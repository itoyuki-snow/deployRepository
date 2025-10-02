import React from "react";
import "./Product1Detail.css";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";

const Product1Detail = ({ onAddToCart }) => {
  const { handleAddToCart } = useContext(CartContext);

  const product = {
    id: "product1",
    name: "澄み切ったスカイブルーとクリスタルハート",
    description: "水色 / ピアス / イヤリング",
    price: 3300,
    material: ["真鍮", "ステンレス", "レジン", "貴和クリスタル"],
    size: ["ハートと3種のビジュー部分：縦17mm×横19mm", "全長：約47mm"],
    notes: [
      "ハートと3種のビジューの部分(アクセサリー上部)・雫型ビーズを繋ぐ金属のパーツ部分は特に繊細な作りとなっています。強い力を加えることは破損に繋がりますのでご注意ください。",
      "耳に直接触れる部分にコーティングのためレジンを使用しています。",
    ],
    tags: ["クール", "シンプル", "上品", "~4000円"],
    product_url: "/product/product1",
    image_url: "/images/product1.jpg",
  };

  const handleClick = async (product) => {
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
      alert(`${product.name} がカートに追加されました!`);
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
            src={`${process.env.PUBLIC_URL}/images/product1.jpg`}
            alt={product.name}
          />
          <div className="text-section">
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="price">¥{product.price}</p>
            <button onClick={() => handleClick(product)}>カートに入れる</button>
            <div className="story">
              <p>
                とろけるクリスタルカラーのハートビジューをメインに、
                <br />
                サファイア・ターコイズ・アクアマリンの3種をイメージした水色のビジューを添えた異なる水色を楽しめる組み合わせです。
              </p>
              <p>
                そこに、雨垂れ型の雫クリスタルを使用した透明感あふれるデザインに作り上げました。
                <br />
                揺れる雫型クリスタルはお好みで付け外しが可能な2way仕様です。
              </p>
              <p>
                光を受けてきらきら反射するビジューたちと、揺れるたびに光り方が変わるクリスタルビーズの繊細な輝きをお楽しみください。
              </p>
            </div>
          </div>

          <div className="recommend">
            <h3>【こんな方にピッタリです!】</h3>
            <h4>ハートはかわいすぎると思っているけれど、挑戦してみたい方！</h4>
            <p>
              とろけるハート型を使用しハートのシルエットを内側に入れ、白と水色を基調としたなので、甘すぎずさりげなくハートを楽しむことができます
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
          <button onClick={() => handleClick(product)}>カートに入れる</button>
        </div>
      </div>
    </>
  );
};

export default Product1Detail;
