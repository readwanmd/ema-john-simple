import React, {useState} from 'react';
import {useEffect} from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImmage from '../../images/giphy.gif'
import {useHistory} from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);
    
    const history = useHistory();
    const handleProceedCheckout = () => {
      history.push('/shipment');
    };

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);

    let thankyou;
    if(orderPlaced){
      thankyou = <img src={happyImmage} alt=""/>
    } 
    return (
      <div className="twin-container">
        <div className="product-container">
          {cart.map((pd) => (
          <ReviewItem key={pd.key} product={pd} removeProduct={removeProduct}></ReviewItem>
          ))}
        
        {
          thankyou 
        }
        </div>
        <div className="cart-container">
          <Cart cart={cart}>
            <button className="main-button" onClick={handleProceedCheckout}>Proceed Checkout</button>
          </Cart>
        </div>
      </div>
    );
};

export default Review;