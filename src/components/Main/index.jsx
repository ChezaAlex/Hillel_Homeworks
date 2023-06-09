  import React, { useEffect, useState, useContext } from 'react';
  import { CartContext } from '../Header/context'
  import './style.sass'

  const Index = () => {
    const [categoryProducts, setCategoryProducts] = useState({});
    const [buttonColors, setButtonColors] = useState({});
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

    useEffect(() => {
      const getProducts = async () => {
        let result = await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/products`, {
          method: 'GET',
          headers: {
            "Content-type": "application/json",
          }
        }).then(res => res.json());

        const groupedProducts = groupProductsByCategory(result);
        setCategoryProducts(groupedProducts);
      }

      getProducts();
    }, []);

    useEffect(() => {
      const user = localStorage.getItem('user');
      if (!user) {
        const initialButtonColors = {};
        Object.keys(categoryProducts).forEach(category => {
          categoryProducts[category].forEach(product => {
            initialButtonColors[product.id] = 'red';
          });
        });
        setButtonColors(initialButtonColors);
      }
    }, [categoryProducts]);

    const groupProductsByCategory = (products) => {
      const grouped = {};

      products.forEach(product => {
        const category = product.category;
        if (grouped[category]) {
          grouped[category].push(product);
        } else {
          grouped[category] = [product];
        }
      });

      return grouped;
    }

    const createCards = (title, image, price, sale, salePercent, productId) => {
      const buttonColor = buttonColors[productId] || 'green';
      const isButtonClickable = !!localStorage.getItem('user');

      const handleButtonClick = () => {
        if (isButtonClickable) {
          const newColor = buttonColors[productId] === 'red' ? 'green' : 'red';

          setButtonColors((prevState) => ({
            ...prevState,
            [productId]: newColor
          }));

          if (!cartItems.includes(productId)) {
            addToCart(productId);
            const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

            if (!selectedProducts.includes(productId)) {
              selectedProducts.push(productId);
              localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
            }
          } else {
            removeFromCart(productId);
            const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

            const index = selectedProducts.indexOf(productId);
            if (index !== -1) {
              selectedProducts.splice(index, 1);
              localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
            }
          }
        }
      };

      return (
        <div className="productCard">
          <img src={`./img/products/${image}.png`} style={{ width: '150px' }} />
          <p style={{ fontWeight: '500', margin: '0' }}>{title}</p>
          {!sale ? (
            <p className='standartPrice'>${price}</p>
          ) : (
            <div className='price'>
              <div className='salePrice'><p className='oldPrice'>${price}</p> <p className='salePercent'>{salePercent}%</p></div>
              <div className='newPrice'>${getNewPrice(price, salePercent)}</div>
            </div>
          )}
          <button
            className="buttonCart"
            style={{
              background: buttonColor,
              border: 'none',
              cursor: isButtonClickable ? 'pointer' : 'default',
              borderRadius: '3px'
            }}
            onClick={handleButtonClick}
          >
            <img src="img/shopping-cart.png" style={{ width: '20px', padding: '3px 4px 2px 2px' }} />
          </button>
        </div>

      );
    }

    const getNewPrice = (price, salePercent) => {
      let newPrice = Math.round(price * (1 - salePercent / 100));
      return newPrice;
    }

    return (
      <div style={{ marginLeft: '20px' }}>
        {Object.entries(categoryProducts).map(([category, products]) => (
          <div key={category}>
            <h2>{category}</h2>
            <div style={{ display: 'flex'}}>
              {products.map(product => createCards(product.title, product.img, product.price, product.sale, product.salePercent, product.id))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  export default Index;
