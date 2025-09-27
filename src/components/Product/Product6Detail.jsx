import React from "react";
import "./Product1Detail.css";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";

const Product6Detail = () => {
  const { handleAddToCart } = useContext(CartContext);

  const product = {
    id: "product6",
    name: "季節を運ぶ桜リング-雪月花の冬桜-",
    description: "水色 / リング",
    price: 2200,
    material: ["真鍮", "ステンレス", "亜鉛合金", "貴和クリスタル"],
    size: ["リング部分：フリー11号", "全長：約30mm"],
    notes: [
      "リングの号数はフリー11号です。切り込みがあるリングのため多少のサイズ調整が可能です。",
      "雫部分に強い力を与えますと破損の原因になりますのでご注意ください。",
    ],
    tags: ["クール", "シンプル", "上品", "~3000円", "友人"],
    product_url: "/product/product6",
    image_url: "/images/product6.jpg",
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
            src={`${process.env.PUBLIC_URL}${product.image_url}`}
            alt={product.name}
          />
          <div className="text-section">
            <h2>{product.name}</h2>
            <p className="description">{product.description}</p>
            <p className="price">¥{product.price}</p>
            <button onClick={() => handleClick(product)}>カートに入れる</button>
            <div className="story">
              <p>
                ハート型の花びらが5枚合わさった桜の花と、
                <br />
                雫型の細かな多面カットクリスタルビーズを合わせた、色合いから冬が感じられるリングです。
                <br />
                花びらは水色とクリアの2色から作られています。
              </p>
              <p>
                光を受けてきらきら反射するビジューたちと、揺れるたびに光り方が変わるクリスタルビーズの繊細な輝きをお楽しみください。
              </p>
            </div>
          </div>

          <div className="recommend">
            <h3>【こんな方にピッタリです!】</h3>
            <h4>桜の花が好きで、年中楽しみたいと思っている方！</h4>
            <p>
              切れ込みの入った5枚の花びらは桜の特徴ですが、ハート型が5枚合わさっているようにも見えるため、季節を問わずお使いいただけます。
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

export default Product6Detail;
