import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

import './product.css'
const Product = (props) => {
    const {img, name, seller, price, stock} = props.product;
    
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                <button onClick={() => props.handelAddProduct(props.product)}><FontAwesomeIcon icon={faCartPlus} />  
Add to cart</button>
            </div>
        </div>
    );
};

export default Product;