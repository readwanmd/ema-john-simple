import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price, img} = props.product;

    const reviewItemStyle={
        borderBottom: '1px solid lightgray',
        marginBottom: '1px',
        marginLeft: '100px',
        paddingBottom: '5px'
    }

    return (
      <div style={reviewItemStyle} className="review-item product">
        <div>
          <img src={img} alt=""/>
        </div>
        <div>
          <h4 className="product-name">{name}</h4>
          <p>Quantity: {quantity}</p>
          <small>price: {price}</small>
          <br/>
          <br/>
          <button className="main-button" onClick={() => props.removeProduct(key)}>Remove Item</button>
        </div>
      </div>
    );
};

export default ReviewItem;