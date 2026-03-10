import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Card } from "../ui/layout";
import { toast } from "react-toastify";
import { api } from "../api/client";
import { getAuth } from "../auth/authStorage";

const Shell = styled.div`
  padding: 18px 0;
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 0;
  }
`;

export default function OrderDetails({ loggedInUser }) {
  const { id } = useParams();
  const auth = getAuth();

  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setStatus("loading");
        const { data } = await api.get(`/api/orders/${encodeURIComponent(id)}`);
        if (!mounted) return;
        setOrder(data);
        setStatus("success");
      } catch (e) {
        if (!mounted) return;
        setStatus("error");
        toast.error("Failed to load order");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!loggedInUser || !auth?.accessToken) return <Navigate to="/login" replace />;

  return (
    <Shell>
      <Container>
        <Panel>
          <Title>Order details</Title>
          {status === "loading" ? (
            <Muted>Loading…</Muted>
          ) : status === "error" ? (
            <Muted>Couldn’t load this order.</Muted>
          ) : (
            <>
              <Row>
                <div style={{ fontWeight: 900 }}>Order ID</div>
                <div>{order?._id}</div>
              </Row>
              <Row>
                <div style={{ fontWeight: 900 }}>Status</div>
                <div>{order?.status}</div>
              </Row>
              <Row>
                <div style={{ fontWeight: 900 }}>Total</div>
                <div>₹{order?.totals?.total}</div>
              </Row>
              <Row>
                <div style={{ fontWeight: 900 }}>Shipping</div>
                <div style={{ textAlign: "right" }}>
                  <div>{order?.shippingAddress?.fullName}</div>
                  <Muted>
                    {order?.shippingAddress?.line1}
                    {order?.shippingAddress?.line2 ? `, ${order.shippingAddress.line2}` : ""}
                    , {order?.shippingAddress?.city}, {order?.shippingAddress?.state} - {order?.shippingAddress?.pincode}
                  </Muted>
                  <Muted>{order?.shippingAddress?.phone}</Muted>
                </div>
              </Row>
              <div style={{ marginTop: 12, fontWeight: 900 }}>Items</div>
              {order?.items?.map((it, idx) => (
                <Row key={idx}>
                  <div>
                    <div style={{ fontWeight: 900 }}>{it.name}</div>
                    <Muted>Qty: {it.qty}</Muted>
                  </div>
                  <div style={{ fontWeight: 900 }}>₹{it.price * it.qty}</div>
                </Row>
              ))}
            </>
          )}
        </Panel>
      </Container>
    </Shell>
  );
}

