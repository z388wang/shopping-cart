import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Products from "./pages/Products.js";
import ProductDetails from "./components/ProductDetails.js";
import Cart from "./pages/Cart.js";
import "./index.css";

function App() {
  const [cart, setCart] = useState([]);

  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/products" element={ <Products
              cart={cart}
              onProductAdd={handleProductAdd}
              onProductDelete={handleProductDelete}
            />} />
          <Route path="/products/:id" element={<ProductDetails onProductAdd={handleProductAdd} />} />
          <Route exact path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

render(<App />, document.querySelector("#react-root"));