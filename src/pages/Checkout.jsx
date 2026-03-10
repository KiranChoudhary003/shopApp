import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Card } from "../ui/layout";
import { useCart } from "../cart/CartContext";
import { toast } from "react-toastify";
import { getAddresses, addAddress, setDefaultAddress } from "../api/me";
import { placeOrder } from "../api/orders";
import { getAuth } from "../auth/authStorage";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 16px;
  padding: 18px 0;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled(Card)`
  padding: 16px;
`;

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 18px;
`;

const Muted = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;
`;

const AddressCard = styled.button`
  width: 100%;
  text-align: left;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $active }) => ($active ? "rgba(40, 116, 240, 0.45)" : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? "rgba(40, 116, 240, 0.08)" : theme.colors.surface)};
  padding: 12px;
  cursor: pointer;
  display: grid;
  gap: 6px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;

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
`;

const Btn = styled.button`
  height: 42px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const formatINR = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);
};

export default function Checkout({ loggedInUser }) {
  const auth = getAuth();
  const cart = useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getAddresses();
        const list = res?.addresses || [];
        setAddresses(list);
        const def = list.find((a) => a.isDefault) || list[0];
        setSelectedId(def?._id || null);
      } catch {
        // ignore (handled by Navigate to login)
      }
    })();
  }, []);

  const selected = useMemo(() => addresses.find((a) => a._id === selectedId) || null, [addresses, selectedId]);

  if (!loggedInUser || !auth?.accessToken) return <Navigate to="/login" replace />;
  if (cart.items.length === 0) return <Navigate to="/cart" replace />;

  const submitAddress = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await addAddress({ ...form, isDefault: addresses.length === 0 });
      const list = res?.addresses || [];
      setAddresses(list);
      const latest = list[list.length - 1];
      setSelectedId(latest?._id || null);
      toast.success("Address saved");
      setForm({ fullName: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" });
    } catch {
      toast.error("Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const makeDefault = async (id) => {
    try {
      const res = await setDefaultAddress(id);
      setAddresses(res?.addresses || []);
      setSelectedId(id);
      toast.success("Default updated");
    } catch {
      toast.error("Failed to update default");
    }
  };

  const place = async () => {
    if (!selected) {
      toast.info("Select an address");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        items: cart.items.map((i) => ({ productId: i.id, qty: i.qty })),
        shippingAddress: {
          fullName: selected.fullName,
          phone: selected.phone,
          line1: selected.line1,
          line2: selected.line2,
          city: selected.city,
          state: selected.state,
          pincode: selected.pincode,
        },
      };
      const res = await placeOrder(payload);
      toast.success(res?.message || "Order placed");
      cart.clear();
      navigate("/account/orders");
    } catch {
      toast.error("Failed to place order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <Layout>
        <Panel>
          <Title>Select delivery address</Title>
          {addresses.length === 0 ? <Muted>No saved addresses. Add one below.</Muted> : null}
          <div style={{ display: "grid", gap: 10 }}>
            {addresses.map((a) => (
              <AddressCard key={a._id} type="button" $active={a._id === selectedId} onClick={() => setSelectedId(a._id)}>
                <div style={{ fontWeight: 900 }}>
                  {a.fullName}{" "}
                  {a.isDefault ? <span style={{ marginLeft: 8, fontSize: 12, color: "rgba(71,85,105,0.95)" }}>(Default)</span> : null}
                </div>
                <Muted>
                  {a.line1}
                  {a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} - {a.pincode}
                </Muted>
                <Muted>{a.phone}</Muted>
                {!a.isDefault ? (
                  <div style={{ marginTop: 6 }}>
                    <Btn type="button" onClick={() => makeDefault(a._id)} disabled={saving}>
                      Set as default
                    </Btn>
                  </div>
                ) : null}
              </AddressCard>
            ))}
          </div>

          <div style={{ marginTop: 14, fontWeight: 900 }}>Add new address</div>
          <Form onSubmit={submitAddress}>
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
              <Btn type="submit" disabled={saving}>
                Save address
              </Btn>
            </div>
          </Form>
        </Panel>

        <Panel>
          <Title>Order summary</Title>
          <Muted>Payment method: Cash on Delivery (demo)</Muted>
          <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(71,85,105,0.95)" }}>
              <span>Items</span>
              <strong>{cart.totals.itemsCount}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(71,85,105,0.95)" }}>
              <span>Subtotal</span>
              <strong>{formatINR(cart.totals.subtotal)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(71,85,105,0.95)" }}>
              <span>Delivery</span>
              <strong>Free</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 900 }}>Total</span>
              <strong>{formatINR(cart.totals.subtotal)}</strong>
            </div>
          </div>

          <Btn type="button" onClick={place} disabled={saving} style={{ width: "100%", marginTop: 12 }}>
            Place order
          </Btn>
        </Panel>
      </Layout>
    </Container>
  );
}

