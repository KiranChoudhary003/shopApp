import React from "react";
import Wrapper from "./style";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-grid">
        <div className="col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/products">Products</Link>
        </div>
        <div className="col">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="col">
          <h4>Policy</h4>
          <span>Returns & Refunds</span>
          <span>Shipping Policy</span>
          <span>Privacy Policy</span>
        </div>
        <div className="col">
          <h4>Stay connected</h4>
          <span>support@shopapp.com</span>
          <span>+91 90000 00000</span>
        </div>
      </div>
      <div className="copyright">
        <p>© 2024-2025 ShopApp. All rights reserved.</p>
      </div>
    </Wrapper>
  );
};

export default Footer;
