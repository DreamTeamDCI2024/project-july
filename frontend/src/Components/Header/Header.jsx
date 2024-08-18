import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping, faUser, faHeart, faBars,} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="header">
      <div className="menu">
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul className="sidebar">
          <li onClick={() => {setMenu("about");}}>About{menu === "about" ? <hr /> : <></>}</li>
          <li onClick={() => {setMenu("products");}}>Products{menu === "products" ? <hr /> : <></>}</li>
          <li onClick={() => {setMenu("contact");}}>Contact{menu === "contact" ? <hr /> : <></>}</li>
        </ul>
      </div>

      <div className="nav-logo">
        <button>
          <p>logo</p>
        </button>
      </div>

      <div className="nav-login-cart">
        <button>
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button>
          <FontAwesomeIcon icon={faUser} />
        </button>
        <button>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>

        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Header;
