import { products } from "@/data/products";

export default function ProductSection() {
  return (
    <section className="panel build-panel" id="sprzedaz">
      <div className="section-head">
        <p className="eyebrow">Sprzedaż konstrukcji</p>

        <h2>Złóż lodżę. Albo cały park.</h2>

        <p>
          Te same namioty safari, które stoją w Grabysówce, stawiamy na Twojej
          działce. Wybierz model, metraż, liczbę sztuk i dodatki — cena liczy
          się na żywo.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article
            key={product.id}
            className="product-card"
          >
            <img
              src={product.image}
              alt={product.name}
            />

            <div className="body">
              <h3>{product.name}</h3>

              <div className="meta">
                <span>{product.description}</span>
                <span className="price">{product.price}</span>
              </div>

              <div className="tags">
                {product.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}