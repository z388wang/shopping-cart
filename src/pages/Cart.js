import React from "react";
import "../index.css";

export default function Cart(props) {
  const { cart } = props;
  const totalPrice = cart.reduce((total, item) => {
    total += item.price * item.quantity;
    return total;
  }, 0);
  
  return (<div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
        {!cart.length > 0 && <p>You have not added any product to your cart yet.</p>}
        {cart.length > 0 && <table className="table table-cart">
  <thead>
    <tr>
      <th width="25%" className="th-product">Product</th>
      <th width="20%">Unit price</th>
      <th width="10%">Quanity</th>
      <th width="25%">Total</th>
    </tr>
  </thead>
  {cart.map((product) => 
  <tbody key={product.id}>
    <tr>
      <td>
        <img width="30" height="30" alt="" scr={product.image} />
        {product.name}
      </td>
      <td>${product.price}</td>
      <td>{product.quantity}</td>
      <td>
        <strong>${product.price * product.quantity}</strong>
      </td>
    </tr>
  </tbody>)}
    <tfoot>
      <tr>
        <th colSpan="2"></th>
        <th className="cart-highlight">Total</th>
        <th className="cart-highlight">${totalPrice}</th>
      </tr>
    </tfoot>
    </table>}
      </div>
    </div>);
}