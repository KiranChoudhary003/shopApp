import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import { findProduct } from "../api/products";
import { Card, Container } from "../ui/layout";
import { FiArrowLeft, FiImage, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../cart/CartContext";
import { getWishlist, toggleWishlist } from "../api/me";
import { FiHeart } from "react-icons/fi";
import { clearAuth, getAuth } from "../auth/authStorage";
import { FaHeart } from "react-icons/fa";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 16px;
  padding: 18px 0;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

const Media = styled(Card)`
  overflow: hidden;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(40, 116, 240, 0.18), rgba(255, 176, 32, 0.20));

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Panel = styled(Card)`
  padding: 16px;
  display: grid;
  gap: 10px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.01em;
`;

const Muted = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;
`;

const Price = styled.div`
  font-size: 22px;
  font-weight: 900;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 6px;
`;

const Btn = styled.button`
  height: 42px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.surface)};
  color: ${({ $primary, theme }) => ($primary ? "white" : theme.colors.text)};
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: ${({ $primary, theme }) => ($primary ? theme.colors.primaryDark : theme.colors.surface2)};
  }
`;

const formatINR = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useCart();
  const auth = getAuth();
  const authed = Boolean(auth?.accessToken);

  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [guestWished, setGuestWished] = useState(() => {
    const raw = window.localStorage.getItem("wishlist");
    try {
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list.includes(id) : false;
    } catch {
      return false;
    }
  });
  const [serverWished, setServerWished] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setStatus("loading");
      try {
        const data = await findProduct(id);
        if (!mounted) return;
        setProduct(data || null);
        setStatus("success");
      } catch (e) {
        if (!mounted) return;
        setStatus("error");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!authed) {
        setServerWished(false);
        return;
      }
      try {
        const res = await getWishlist();
        const ids = new Set((res?.wishlist || []).map((p) => String(p?._id || p?.id)).filter(Boolean));
        if (mounted) setServerWished(ids.has(String(id)));
      } catch {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, [authed, id]);

  const addToCart = () => {
    cart.add(product, 1);
    toast.success("Added to cart");
    navigate("/cart");
  };

  const persistGuestWish = (next) => {
    const raw = window.localStorage.getItem("wishlist");
    let list = [];
    try {
      list = raw ? JSON.parse(raw) : [];
    } catch {
      list = [];
    }
    const set = new Set(Array.isArray(list) ? list : []);
    if (next) set.add(id);
    else set.delete(id);
    window.localStorage.setItem("wishlist", JSON.stringify(Array.from(set)));
  };

  const wish = async () => {
    if (!authed) {
      const next = !guestWished;
      setGuestWished(next);
      persistGuestWish(next);
      toast.success(next ? "Saved to wishlist" : "Removed from wishlist");
      return;
    }
    try {
      const res = await toggleWishlist(id);
      setServerWished(Boolean(res?.wished));
      toast.success(res?.wished ? "Saved to wishlist" : "Removed from wishlist");
    } catch (e) {
      const code = e?.response?.status;
      if (code === 401) {
        toast.error("Session expired. Please login again.");
        clearAuth();
        navigate("/login");
        return;
      }
      toast.error("Wishlist update failed");
    }
  };

  const wished = authed ? serverWished : guestWished;

  return (
    <Container>
      <Layout>
        <Media>
          {status === "loading" ? (
            <Skeleton height={420} width="100%" />
          ) : product?.image ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={product.image} alt={product.name ? `${product.name} image` : "Product image"} />
          ) : (
            <FiImage size={48} color="rgba(15,23,42,0.45)" />
          )}
        </Media>

        <Panel>
          <Btn type="button" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Back
          </Btn>

          {status === "loading" ? (
            <>
              <Skeleton height={26} />
              <Skeleton height={18} width="40%" />
              <Skeleton height={80} />
              <Skeleton height={42} />
            </>
          ) : status === "error" ? (
            <>
              <Title>Couldn’t load product</Title>
              <Muted>Is your backend running on port 8000?</Muted>
            </>
          ) : (
            <>
              <Title>{product?.name || "Untitled product"}</Title>
              <Muted>
                {product?.category ? `Category: ${product.category}` : "Category: General"}{" "}
                {product?.brand ? ` • Brand: ${product.brand}` : ""}
              </Muted>
              <Price>{formatINR(product?.price)}</Price>
              <Muted>{product?.description || "No description provided yet."}</Muted>
              <Actions>
                <Btn type="button" $primary onClick={addToCart}>
                  <FiShoppingCart /> Add to cart
                </Btn>
                <Btn type="button" onClick={wish} style={{ borderColor: wished ? "rgba(220,38,38,0.55)" : undefined }}>
                  {wished ? <FaHeart color="#dc2626" /> : <FiHeart />} {wished ? "Wishlisted" : "Wishlist"}
                </Btn>
                <Btn type="button" onClick={() => navigate("/products")}>More products</Btn>
              </Actions>
            </>
          )}
        </Panel>
      </Layout>
    </Container>
  );
}

