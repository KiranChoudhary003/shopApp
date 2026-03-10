import React from "react";
import styled from "styled-components";
import { Container, Card } from "../ui/layout";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { toast } from "react-toastify";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

const Empty = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
  display: grid;
  gap: 10px;
`;

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 800;
  width: fit-content;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr auto;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 0;
  }
`;

const Thumb = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface2};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Name = styled.div`
  font-weight: 800;
  font-size: 14px;
`;

const Muted = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
  margin-top: 4px;
`;

const Qty = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const IconBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

const QtyInput = styled.input`
  width: 56px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  outline: none;
`;

const Price = styled.div`
  font-weight: 900;
  white-space: nowrap;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CheckoutBtn = styled.button`
  width: 100%;
  height: 44px;
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

const ClearBtn = styled.button`
  width: 100%;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 900;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

const formatINR = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);
};

export default function Cart() {
  const cart = useCart();
  const navigate = useNavigate();

  const checkout = () => {
    if (cart.items.length === 0) return;
    navigate("/checkout");
  };

  return (
    <Container>
      <Layout>
        <Panel>
          <Title>Your cart</Title>
          {cart.items.length === 0 ? (
            <Empty>
              <div>Your cart is empty.</div>
              <PrimaryLink to="/products">Continue shopping</PrimaryLink>
            </Empty>
          ) : (
            cart.items.map((item) => (
              <Row key={item.id}>
                <Thumb>{item.image ? <img src={item.image} alt={item.name} /> : null}</Thumb>
                <div>
                  <Name>{item.name}</Name>
                  <Muted>{item.category ? item.category : "General"}</Muted>
                  <Qty>
                    <IconBtn type="button" aria-label="Decrease quantity" onClick={() => cart.setQty(item.id, item.qty - 1)}>
                      <FiMinus />
                    </IconBtn>
                    <QtyInput
                      value={item.qty}
                      onChange={(e) => cart.setQty(item.id, e.target.value)}
                      inputMode="numeric"
                      aria-label="Quantity"
                    />
                    <IconBtn type="button" aria-label="Increase quantity" onClick={() => cart.setQty(item.id, item.qty + 1)}>
                      <FiPlus />
                    </IconBtn>
                  </Qty>
                </div>
                <div style={{ display: "grid", justifyItems: "end", gap: 8 }}>
                  <Price>{formatINR((Number(item.price) || 0) * (Number(item.qty) || 0))}</Price>
                  <IconBtn type="button" aria-label="Remove item" onClick={() => cart.remove(item.id)}>
                    <FiTrash2 />
                  </IconBtn>
                </div>
              </Row>
            ))
          )}
        </Panel>

        <Panel>
          <Title>Order summary</Title>
          <SummaryRow>
            <span>Items</span>
            <strong>{cart.totals.itemsCount}</strong>
          </SummaryRow>
          <SummaryRow>
            <span>Subtotal</span>
            <strong>{formatINR(cart.totals.subtotal)}</strong>
          </SummaryRow>
          <SummaryRow>
            <span>Delivery</span>
            <strong>Free</strong>
          </SummaryRow>
          <SummaryRow>
            <span>Total</span>
            <strong>{formatINR(cart.totals.subtotal)}</strong>
          </SummaryRow>

          <CheckoutBtn type="button" disabled={cart.items.length === 0} onClick={checkout}>
            Proceed to checkout
          </CheckoutBtn>
          <ClearBtn type="button" disabled={cart.items.length === 0} onClick={cart.clear}>
            Clear cart
          </ClearBtn>

          <div style={{ marginTop: 10, fontSize: 12, color: "rgba(71,85,105,0.95)" }}>
            Tip: add multiple items from the Products page to see totals update.
          </div>
        </Panel>
      </Layout>
    </Container>
  );
}

