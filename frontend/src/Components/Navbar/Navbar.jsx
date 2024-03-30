import React, {useContext, useRef, useState} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import drop_down from '../Assets/dropdown_icon.png'

const Navbar = () => {
    const {getTotalCartItems} = useContext(ShopContext);
    const [menu,setMenu] = useState("shop")
    const menuRef=useRef();

    const drop_down_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open');
    }


  return (
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPNOW</p>
        </div>
        <img className="drop-down" onClick={drop_down_toggle} src={drop_down} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to="/">Shop</Link>{menu==="shop"?<hr />:<></>}</li>
            <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration: 'none'}} to="/men">Men</Link>{menu==="men"?<hr />:<></>}</li>
            <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration: 'none'}} to="/women">Women</Link>{menu==="women"?<hr />:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to="/kids">Kids</Link>{menu==="kids"?<hr />:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
            <Link style={{textDecoration: 'none'}} to="/login"><button>Login</button></Link>
            }
            <Link style={{textDecoration: 'none'}} to="/cart"><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar
