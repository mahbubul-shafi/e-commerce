import './Navbar.css'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../assets/nav_dropdown.png'

const Navbar = () => {
  const {getTotalCartItems} = useContext(ShopContext)
  const [menu,setMenu] = useState("shop");
  const menuRef = useRef();
  const dropdown_toggle = (e)=>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src= {logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link> {menu==="shop" &&  <hr/>}</li>
        <li onClick={()=>{setMenu("men")}}><Link to='/men'>Men</Link> {menu==="men" &&  <hr/>}</li>
        <li onClick={()=>{setMenu("women")}}><Link to='/women'>Women</Link> {menu==="women" &&  <hr/>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link> {menu==="kids" &&  <hr/>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/');}}>Logout</button>
        :<Link to='/login'><button>Login</button></Link>}
        <Link to='/cart'><img src= {cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
