import React from 'react';
import './SearchTab.scss';
const { faker } = require('@faker-js/faker');

interface Product {
  id: number;
  name: string;
  price: string;
  isWishlisted: boolean;
}

const SearchTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    // Generate fake product data using faker API
    const fakeProducts: Product[] = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      isWishlisted: false,
    }));
    setProducts(fakeProducts);
  }, []);

  const handleSearch = () => {
    // Filter products based on the search term
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleWishlistToggle = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, isWishlisted: !product.isWishlisted }
          : product
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      <button onClick={handleSearch}>Search</button>

      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <button
            style={{ color: product.isWishlisted ? 'red' : 'black' }}
            onClick={() => handleWishlistToggle(product.id)}
          >
            Wishlist
          </button>
          <div className="view-product-btn">View Product</div>
        </div>
      ))}
    </div>
  );
};

export default SearchTab;
