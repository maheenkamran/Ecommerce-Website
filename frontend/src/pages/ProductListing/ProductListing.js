import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js"
import FilterPanel from "../../components/FilterPanel/FilterPanel.js";
import './ProductListing.css'

function ProductListing() {

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); //value of caetgory key -> key value pair in search params
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const condition = searchParams.get('condition');
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "";
        if (min && max)
          url = `http://localhost:3000/api/products/price?category=${category}&min=${min}&max=${max}`;
        else if ((condition !== 'Any') && (condition))
          url = `http://localhost:3000/api/products/condition?category=${category}&condition=${condition}`;
        else if (condition === 'Any')
          url = `http://localhost:3000/api/products?category=${category}`;
        else
          url = `http://localhost:3000/api/products?category=${category}`;

        const result = await fetch(url);
        const data = await result.json();

        setProducts(data); //populates Products array
      }
      catch (err) {
        console.log({ err: err.message });
      }
    }
    fetchProducts();
  }, [category, min, max, condition]); //dependency array

  const navigate = useNavigate();

  const handleproductclick = (id) => {
    navigate(`/product-details?id=${id}`);
  }

  return (
    <>
      <Header />
      <div className="page-setup">
        <div className="filterpanel-container"><FilterPanel />
        </div>

        {
          Products.length === 0 ?
            (
              <h3>NO products available</h3>
            ) :
            (
              <div className="products-container">
                {Products.map((p) => (
                  <div className="product-item" onClick={() => { handleproductclick(p._id) }}>
                    <div className="product-image">
                      <img src={p.image} alt="product"></img>
                    </div>
                    <div className="product-price">Rs.{p.price}</div>
                    <div className="product-name">{p.name}</div>
                  </div>
                ))
                }
              </div>
            )
        }
      </div>
      <Footer />
    </>
  );
}

export default ProductListing;