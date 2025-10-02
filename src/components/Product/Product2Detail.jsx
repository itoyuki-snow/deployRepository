import React from "react";
import "./Product1Detail.css";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";

const Product2Detail = ({ onAddToCart }) => {
  const { handleAddToCart } = useContext(CartContext);

  const product = {
    id: "product2",
    name: "気品を纏うラベンダーハート",
    description: "紫 / ピアス / イヤリング",
    price: 3300,
    material: ["真鍮", "ステンレス", "レジン", "貴和クリスタル"],
    size: ["ハートと3種のビジュー部分：縦17mm×横19mm", "全長：約47mm"],
    notes: [
      "ハートと3種のビジューの部分(アクセサリー上部)・雫型ビーズを繋ぐ金属のパーツ部分は特に繊細な作りとなっています。強い力を加えることは破損に繋がりますのでご注意ください。",
      "耳に直接触れる部分にコーティングのためレジンを使用しています。",
    ],
    tags: ["華やか", "~4000円"],
    product_url: "/product/product2",
    image_url: "/images/product2.jpg",
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
      if (onAddToCart) {
        handleAddToCart(product);
      }
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
            src={`${process.env.PUBLIC_URL}/images/product2.jpg`}
            alt={product.name}
          />
          <div className="text-section">
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="price">¥{product.price}</p>
            <button onClick={() => handleClick(product)}>カートに入れる</button>
            <div className="story">
              <p>
                とろけるラベンダーカラーのハートビジューをメインに、
                <br />
                葡萄色と藤色の2種の紫と、ダークローズピンクのクリスタルビジューを添えた全て異なる紫を楽しめる上品な組み合わせです。
              </p>
              <p>
                そこに、雨垂れ型の雫クリスタルを使用した気品あふれるデザインに作り上げました。
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
            <h4>
              ピンクやハートは自分にはかわいすぎるけれど挑戦してみたいと思っている方！
            </h4>
            <p>
              とろけるハート型と、ハートのシルエットを内側に入れたデザインなので、甘すぎずさりげなくハートを楽しむことができます。
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

export default Product2Detail;
