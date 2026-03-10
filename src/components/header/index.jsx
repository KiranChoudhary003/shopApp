import React, { useMemo, useState } from "react";
import Wrapper, {
  Badge,
  Brand,
  BrandSub,
  BrandWrap,
  Center,
  CenterWrap,
  CloseBtn,
  HamburgerBtn,
  IconBtn,
  IconWrap,
  MobileDrawer,
  MobileDrawerHeader,
  MobileNavButton,
  MobileNavLink,
  MobileNavList,
  MobileOverlay,
  NavDesktopWrap,
  Right,
  RightDivider,
  RightWrap,
  SearchForm,
  SearchInput,
  UserName,
} from "./style";
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import Nav from "./nav";
import { FiLogOut, FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { useCart } from "../../cart/CartContext";

const Header = ({ loggedInUser, setLoggedInUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { totals } = useCart();

  const displayName = useMemo(() => {
    if (!loggedInUser) return null;
    return loggedInUser.name || loggedInUser.contact || "Account";
  }, [loggedInUser]);

  const submitSearch = (e) => {
    e.preventDefault();
    const query = q.trim();
    navigate({
      pathname: "/products",
      search: query ? `?${createSearchParams({ q: query })}` : "",
    });
  };

  const logout = () => {
    window.localStorage.removeItem("auth");
    setLoggedInUser?.(null);
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Wrapper>
        <BrandWrap>
          <Link to="/" aria-label="ShopApp home">
            <Brand>
              Shop<span>App</span>
              <BrandSub>smart shopping</BrandSub>
            </Brand>
          </Link>
        </BrandWrap>

        <CenterWrap as={Center}>
          <SearchForm onSubmit={submitSearch}>
            <SearchInput
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for products, brands and more"
              aria-label="Search products"
            />
            <IconBtn type="submit" aria-label="Search">
              <FiSearch />
            </IconBtn>
          </SearchForm>
        </CenterWrap>

        <RightWrap as={Right}>
          <NavDesktopWrap>
            <Nav loggedInUser={loggedInUser} />
          </NavDesktopWrap>

          <IconBtn as={Link} to="/cart" aria-label="Cart">
            <IconWrap>
              <FiShoppingCart />
              {totals.itemsCount ? <Badge>{totals.itemsCount}</Badge> : null}
            </IconWrap>
          </IconBtn>
          <RightDivider />

          {loggedInUser ? (
            <>
              <IconBtn as={Link} to="/account" aria-label="Account">
                <FiUser />
              </IconBtn>
              <UserName>{displayName}</UserName>
              <IconBtn type="button" onClick={logout} aria-label="Logout">
                <FiLogOut />
              </IconBtn>
            </>
          ) : (
            <IconBtn as={Link} to="/login" aria-label="Login">
              <FiUser />
            </IconBtn>
          )}

          <HamburgerBtn
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </HamburgerBtn>
        </RightWrap>
      </Wrapper>

      <MobileOverlay $open={menuOpen} onClick={closeMenu} aria-hidden={!menuOpen} />
      <MobileDrawer style={{ display: menuOpen ? "flex" : "none" }}>
        <MobileDrawerHeader>
          <h3>Menu</h3>
          <CloseBtn type="button" onClick={closeMenu} aria-label="Close menu">
            <FiX size={20} />
          </CloseBtn>
        </MobileDrawerHeader>
        <MobileNavList>
          <li>
            <MobileNavLink to="/products" onClick={closeMenu} data-active={location.pathname === "/products"}>
              Products
            </MobileNavLink>
          </li>
          <li>
            <MobileNavLink to="/about" onClick={closeMenu} data-active={location.pathname === "/about"}>
              About
            </MobileNavLink>
          </li>
          <li>
            <MobileNavLink to="/contact" onClick={closeMenu} data-active={location.pathname === "/contact"}>
              Contact
            </MobileNavLink>
          </li>
          {loggedInUser?.role === "admin" && (
            <li>
              <MobileNavLink to="/admin" onClick={closeMenu} data-active={location.pathname.startsWith("/admin")}>
                Admin
              </MobileNavLink>
            </li>
          )}
          <li>
            <MobileNavLink to="/cart" onClick={closeMenu} data-active={location.pathname === "/cart"}>
              Cart {totals.itemsCount ? `(${totals.itemsCount})` : ""}
            </MobileNavLink>
          </li>
          {loggedInUser ? (
            <>
              <li>
                <MobileNavLink to="/account" onClick={closeMenu} data-active={location.pathname.startsWith("/account")}>
                  Account
                </MobileNavLink>
              </li>
              <li>
                <MobileNavButton type="button" onClick={logout}>
                  Logout
                </MobileNavButton>
              </li>
            </>
          ) : (
            <li>
              <MobileNavLink to="/login" onClick={closeMenu} data-active={location.pathname === "/login"}>
                Login
              </MobileNavLink>
            </li>
          )}
        </MobileNavList>
      </MobileDrawer>
    </>
  )
}

export default Header
