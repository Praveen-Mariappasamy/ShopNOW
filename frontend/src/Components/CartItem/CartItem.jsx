import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from'../Assets/cart_cross_icon.png'
const CartItem = () => {

    const {getUserData,userdata,getTotalCartAmount,all_product,cartItem,removeFromCart} = useContext(ShopContext)
    const amount = getTotalCartAmount();
    const handleCheckOut = async (e) => {
      e.preventDefault();
      
      await getUserData();

      var options = {
        key:"rzp_test_eVRjxDvlNepsfq",
        key_secret:"jaS8Bv5tzdHIulmc495tnEQc",
        amount: amount*100,
        currency : "INR",
        name:"shopnow",
        description:"e-commerce testing",
        handler: function(res){
          alert("Payment Successful :) Happy Shopping");
        },
        prefill:{
          name:userdata.name,
          email:userdata.email,
        },
        notes:{
          address:"Razorpay Corporate Office",
        },
        theme:{
          color: "#3399cc",
        }
      };
      var pay=new window.Razorpay(options);
      pay.open();

    }

  return (
    <div className='cartitem'>
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantinty</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItem[e.id]>0){
           return <div>
                <div className="cartitem-format cartitem-format-main">
                    <img src={e.image} alt="" className='carticon-product-icon' />
                    <p>{e.name}</p>
                    <p>Rs {e.new_price}</p>
                    <button className="cartitem-quantity">{cartItem[e.id]}</button>
                    <p>{e.new_price*cartItem[e.id]}</p>
                    <img className="remove" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                </div>
                <hr />
            </div>
        }
        return null;
      })}
      <div className="down">
        <div className="total">
            <h1>Cart Total</h1>
            <div className="totalitem">
                <p>Subtotal</p>
                <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="totalitem">
                <p>Shipping Fee</p>
                <p>Free</p>
            </div>
            <hr />
            <div className="totalitem">
                <h3>Total</h3>
                <h3>Rs {amount}</h3>
            </div>
            <button onClick={(e)=>{handleCheckOut(e)}}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="promocode">
            <p>If you have a promocode , Enter it here</p>
            <div className="promobox">
                <input placeholder="Promo Code" />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
