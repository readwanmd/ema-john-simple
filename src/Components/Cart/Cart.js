import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, product) => total + product.price, 0)

    let total=0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total += product.price; 
    }

    let shipping = 0;
    if (total > 0){
        shipping = 12.99;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 35){
        shipping = 0;
    }

    const tax = total / 10;

    return (
        <div>
            <h4>Order summary:</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Product price: {(total).toFixed(2)}</p>
            <p><small>Shipping cost: {shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Grand total: {(total + shipping + tax).toFixed(2)}</p>
        </div>
    );
};

export default Cart;