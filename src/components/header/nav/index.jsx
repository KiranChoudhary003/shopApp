import React from "react";
import Wrapper, { NavLinkPill } from "./style";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ loggedInUser }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Wrapper>
      <ul>
        <li>
          <NavLinkPill as={Link} to="/products" $active={isActive("/products")}>
            Products
          </NavLinkPill>
        </li>
        <li>
          <NavLinkPill as={Link} to="/about" $active={isActive("/about")}>
            About
          </NavLinkPill>
        </li>
        <li>
          <NavLinkPill as={Link} to="/contact" $active={isActive("/contact")}>
            Contact
          </NavLinkPill>
        </li>
        {loggedInUser?.role === "admin" ? (
          <li>
            <NavLinkPill as={Link} to="/admin" $active={location.pathname.startsWith("/admin")}>
              Admin
            </NavLinkPill>
          </li>
        ) : null}
      </ul>
    </Wrapper>
  )
}

export default Nav
