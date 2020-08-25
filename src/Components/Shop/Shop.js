import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    
    const firft10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(firft10);
    const [cart, setCart] = useState([])

    const handelAddProduct = (product) => {
        console.log('Product added',product)
        const newCart = [...cart, product];
        setCart(newCart)
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product product={pd} handelAddProduct = {handelAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;