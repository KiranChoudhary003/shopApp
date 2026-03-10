import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Container, Card } from "../ui/layout";
import { toast } from "react-toastify";
import { getMe, getAddresses, addAddress, removeAddress, setDefaultAddress, getWishlist, toggleWishlist } from "../api/me";
import { myOrders } from "../api/orders";
import { clearAuth } from "../auth/authStorage";
import { FiHeart, FiHome, FiLogOut, FiPackage, FiUser } from "react-icons/fi";
import { FiShield } from "react-icons/fi";

const Shell = styled.div`
  padding: 18px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled(Card)`
  padding: 12px;
  position: sticky;
  top: calc(${({ theme }) => theme.layout.headerHeight} + 12px);
  height: fit-content;

  @media (max-width: 950px) {
    position: static;
  }
`;

const Content = styled(Card)`
  padding: 16px;
`;

const UserBox = styled.div`
  display: grid;
  gap: 2px;
  padding: 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface2};
  margin-bottom: 10px;
`;

const Name = styled.div`
  font-weight: 900;
  font-size: 14px;
`;

const Muted = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
`;

const Menu = styled.div`
  display: grid;
  gap: 8px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme, $active }) => ($active ? "rgba(40, 116, 240, 0.35)" : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? "rgba(40, 116, 240, 0.10)" : theme.colors.surface)};
  font-weight: 800;
  font-size: 13px;
`;

const SectionTitle = styled.h1`
  margin: 0 0 12px;
  font-size: 16px;
`;

const Row = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  gap: 10px;

  &:last-child {
    border-bottom: 0;
  }
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface2};
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const Btn = styled.button`
  height: 38px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $primary }) => ($primary ? theme.colors.primary : theme.colors.surface)};
  color: ${({ $primary }) => ($primary ? "white" : "inherit")};
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: ${({ theme, $primary }) => ($primary ? theme.colors.primaryDark : theme.colors.surface2)};
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const Input = styled.input`
  height: 40px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
  background: ${({ theme }) => theme.colors.surface};

  &:focus {
    border-color: rgba(40, 116, 240, 0.55);
    box-shadow: 0 0 0 4px rgba(40, 116, 240, 0.14);
  }
`;

function Profile({ me }) {
  return (
    <>
      <SectionTitle>Profile</SectionTitle>
      <Row>
        <div>
          <div style={{ fontWeight: 900 }}>{me?.name}</div>
          <Muted>{me?.contact}</Muted>
        </div>
        <Pill>{me?.role === "admin" ? "Admin" : "Customer"}</Pill>
      </Row>
      <Row>
        <Muted>More profile settings can be added (email, avatar, etc.).</Muted>
      </Row>
    </>
  );
}

function Orders({ orders }) {
  return (
    <>
      <SectionTitle>My Orders</SectionTitle>
      {orders.length === 0 ? (
        <Muted>No orders yet. Place an order from Checkout.</Muted>
      ) : (
        orders.map((o) => (
          <Row key={o._id}>
            <div>
              <div style={{ fontWeight: 900 }}>Order #{String(o._id).slice(-6)}</div>
              <Muted>{new Date(o.createdAt).toLocaleString()}</Muted>
            </div>
            <div style={{ display: "grid", justifyItems: "end", gap: 6 }}>
              <Pill>{o.status}</Pill>
              <div style={{ fontWeight: 900 }}>₹{o?.totals?.total}</div>
              <Btn as={Link} to={`/orders/${o._id}`} $primary>
                View
              </Btn>
            </div>
          </Row>
        ))
      )}
    </>
  );
}

function Addresses({ addresses, onAdd, onRemove, onDefault }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  return (
    <>
      <SectionTitle>Manage Addresses</SectionTitle>
      {addresses.length === 0 ? <Muted>No saved addresses yet.</Muted> : null}
      {addresses.map((a) => (
        <Row key={a._id}>
          <div>
            <div style={{ fontWeight: 900 }}>
              {a.fullName} {a.isDefault ? <Pill style={{ marginLeft: 8 }}>Default</Pill> : null}
            </div>
            <Muted>
              {a.line1}
              {a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} - {a.pincode}
            </Muted>
            <Muted>{a.phone}</Muted>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {!a.isDefault ? (
              <Btn type="button" onClick={() => onDefault(a._id)}>
                Set default
              </Btn>
            ) : null}
            <Btn type="button" onClick={() => onRemove(a._id)}>
              Remove
            </Btn>
          </div>
        </Row>
      ))}

      <div style={{ marginTop: 14, fontWeight: 900 }}>Add new address</div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd(form);
          setForm({ fullName: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" });
        }}
      >
        <Field>
          <Label>Full name</Label>
          <Input value={form.fullName} onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))} required />
        </Field>
        <Field>
          <Label>Phone</Label>
          <Input value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} required />
        </Field>
        <Field style={{ gridColumn: "1 / -1" }}>
          <Label>Address line 1</Label>
          <Input value={form.line1} onChange={(e) => setForm((s) => ({ ...s, line1: e.target.value }))} required />
        </Field>
        <Field style={{ gridColumn: "1 / -1" }}>
          <Label>Address line 2 (optional)</Label>
          <Input value={form.line2} onChange={(e) => setForm((s) => ({ ...s, line2: e.target.value }))} />
        </Field>
        <Field>
          <Label>City</Label>
          <Input value={form.city} onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))} required />
        </Field>
        <Field>
          <Label>State</Label>
          <Input value={form.state} onChange={(e) => setForm((s) => ({ ...s, state: e.target.value }))} required />
        </Field>
        <Field>
          <Label>Pincode</Label>
          <Input value={form.pincode} onChange={(e) => setForm((s) => ({ ...s, pincode: e.target.value }))} required />
        </Field>
        <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end" }}>
          <Btn type="submit" $primary>
            Save address
          </Btn>
        </div>
      </Form>
    </>
  );
}

function Wishlist({ wishlist, onRemove }) {
  return (
    <>
      <SectionTitle>Wishlist</SectionTitle>
      {wishlist.length === 0 ? (
        <Muted>No items in wishlist yet.</Muted>
      ) : (
        wishlist.map((p) => (
          <Row key={p._id}>
            <div>
              <div style={{ fontWeight: 900 }}>{p.name}</div>
              <Muted>{p.category}</Muted>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Btn as={Link} to={`/products/${p._id}`} $primary>
                View
              </Btn>
              <Btn type="button" onClick={() => onRemove?.(p._id)}>
                Remove
              </Btn>
            </div>
          </Row>
        ))
      )}
    </>
  );
}

export default function UserPanel({ loggedInUser, setLoggedInUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [me, setMe] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const base = "/account";
  const current = location.pathname;

  const active = useMemo(() => {
    if (current.endsWith("/orders")) return "orders";
    if (current.endsWith("/addresses")) return "addresses";
    if (current.endsWith("/wishlist")) return "wishlist";
    return "profile";
  }, [current]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const meRes = await getMe();
        if (!mounted) return;
        setMe(meRes?.user || null);

        const [addrRes, ordersRes, wishRes] = await Promise.all([getAddresses(), myOrders(), getWishlist()]);
        if (!mounted) return;
        setAddresses(addrRes?.addresses || []);
        setOrders(Array.isArray(ordersRes) ? ordersRes : []);
        setWishlist(wishRes?.wishlist || []);
      } catch (e) {
        toast.error("Session expired. Please login again.");
        clearAuth();
        setLoggedInUser?.(null);
        navigate("/login");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigate, setLoggedInUser]);

  if (!loggedInUser) return <Navigate to="/login" replace />;

  const onLogout = () => {
    clearAuth();
    setLoggedInUser?.(null);
    navigate("/");
  };

  const onAddAddress = async (payload) => {
    try {
      const res = await addAddress(payload);
      setAddresses(res.addresses || []);
      toast.success("Address saved");
    } catch {
      toast.error("Failed to save address");
    }
  };

  const onRemoveAddress = async (id) => {
    try {
      const res = await removeAddress(id);
      setAddresses(res.addresses || []);
      toast.success("Address removed");
    } catch {
      toast.error("Failed to remove address");
    }
  };

  const onDefaultAddress = async (id) => {
    try {
      const res = await setDefaultAddress(id);
      setAddresses(res.addresses || []);
      toast.success("Default updated");
    } catch {
      toast.error("Failed to update default");
    }
  };

  const removeWish = async (productId) => {
    try {
      await toggleWishlist(productId);
      const res = await getWishlist();
      setWishlist(res?.wishlist || []);
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <Shell>
      <Container>
        <Grid>
          <Sidebar>
            <UserBox>
              <Name>{me?.name || loggedInUser?.name}</Name>
              <Muted>{me?.contact || loggedInUser?.contact}</Muted>
              <Muted style={{ marginTop: 6 }}>
                <Pill>{me?.role === "admin" ? "Admin" : "Customer"}</Pill>
              </Muted>
            </UserBox>

            <Menu>
              <MenuItem to={`${base}`} $active={active === "profile"}>
                <FiUser /> My Profile
              </MenuItem>
              <MenuItem to={`${base}/orders`} $active={active === "orders"}>
                <FiPackage /> Orders
              </MenuItem>
              <MenuItem to={`${base}/addresses`} $active={active === "addresses"}>
                <FiHome /> Addresses
              </MenuItem>
              <MenuItem to={`${base}/wishlist`} $active={active === "wishlist"}>
                <FiHeart /> Wishlist
              </MenuItem>
              {(me?.role || loggedInUser?.role) === "admin" ? (
                <MenuItem to={`/admin`} $active={location.pathname === "/admin"}>
                  <FiShield /> Admin Dashboard
                </MenuItem>
              ) : null}
              <Btn type="button" onClick={onLogout} style={{ marginTop: 8, width: "100%" }}>
                <FiLogOut style={{ marginRight: 8 }} /> Logout
              </Btn>
            </Menu>
          </Sidebar>

          <Content>
            {loading ? (
              <Muted>Loading…</Muted>
            ) : (
              <Routes>
                <Route path="/" element={<Profile me={me} />} />
                <Route path="/orders" element={<Orders orders={orders} />} />
                <Route
                  path="/addresses"
                  element={<Addresses addresses={addresses} onAdd={onAddAddress} onRemove={onRemoveAddress} onDefault={onDefaultAddress} />}
                />
                <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onRemove={removeWish} />} />
              </Routes>
            )}
          </Content>
        </Grid>
      </Container>
    </Shell>
  );
}

