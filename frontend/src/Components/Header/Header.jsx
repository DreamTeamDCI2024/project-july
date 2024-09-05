import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping, faUser, faHeart, } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [menu, setMenu] = useState("shop");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (selectedMenu) => {
    setMenu(selectedMenu);
    setMenuOpen(false);
  }
  
  return (
    <div className="header">
      <div className="menu">
        <input id="menu_toggle" type="checkbox" checked={menuOpen} onChange={handleMenuToggle} />
        <label className="menu_btn" htmlFor="menu_toggle">
          <span></span>
        </label>
        <ul className="sidebar">
          <li onClick={() => handleMenuItemClick("about")}><Link to='/about'>About</Link>{menu === "about" ? <hr /> : <></>}</li>
          <li onClick={() => handleMenuItemClick("products")}><Link to='/products'>Products</Link>{menu === "products" ? <hr /> : <></>}</li>
          <li onClick={() => handleMenuItemClick("contact")}><Link to='/contact'>Contact</Link>{menu === "contact" ? <hr /> : <></>}</li>
        </ul>
      </div>

      <div className="nav-logo">
        <Link to='/'><button>
          <p>logo</p>
        </button></Link>
      </div>

      <div className="nav-login-cart">
        <Link to='/wishlist'>
          <button>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </Link>

        <Link to='/login'>
          <button>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </Link>

        <Link to='/cart'>
          <button>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </Link>

        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Header;
