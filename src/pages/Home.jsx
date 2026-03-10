import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, Card } from "../ui/layout";
import { readProducts } from "../api/products";

const Banner = styled(Card)`
  overflow: hidden;
  background: linear-gradient(135deg, #2874f0, #0039a6);
  color: white;
  border: 0;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const BannerInner = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.1fr;
  gap: 18px;
  padding: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BannerTitle = styled.h1`
  margin: 0 0 8px;
  font-size: 30px;
  letter-spacing: -0.02em;
`;

const BannerSub = styled.p`
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
`;

const CategoryStrip = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 18px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const CategoryItem = styled(Link)`
  display: grid;
  place-items: center;
  min-width: 90px;
  text-align: center;
  color: white;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
`;

const CategoryAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 6px;
  font-weight: 800;
`;

const DealsRow = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 2.3fr 1.1fr;
  gap: 16px;

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

const DealsSection = styled(Card)`
  padding: 12px;
`;

const DealsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DealsTitle = styled.h2`
  margin: 0;
  font-size: 16px;
`;

const ViewAll = styled(Link)`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const DealsGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(140px, 1fr);
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const DealCard = styled(Link)`
  display: grid;
  gap: 6px;
  padding: 10px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface2};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  min-width: 140px;
`;

const DealImage = styled.div`
  height: 110px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: linear-gradient(135deg, rgba(40, 116, 240, 0.18), rgba(255, 176, 32, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const DealName = styled.div`
  font-size: 13px;
  font-weight: 600;
  min-height: 32px;
`;

const DealPriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
`;

const DealPrice = styled.span`
  font-weight: 900;
`;

const DealStrike = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const DealTag = styled.span`
  color: #1a9f3b;
  font-weight: 800;
  font-size: 12px;
`;

function formatINR(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "₹0";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);
}

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await readProducts({ limit: 60, page: 1 });
        setProducts(Array.isArray(list) ? list : []);
      } catch {
        setProducts([]);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    for (const p of products) if (p?.category) set.add(String(p.category));
    return Array.from(set);
  }, [products]);

  const topDeals = useMemo(
    () => products.filter((p) => Number(p.discountPercent) >= 20).slice(0, 12),
    [products]
  );

  const bestOfElectronics = useMemo(
    () => products.filter((p) => /mobile|laptop|electronic/i.test(p.category || "")).slice(0, 8),
    [products]
  );

  return (
    <Container>
      <Banner>
        <BannerInner>
          <div>
            <BannerTitle>Big deals on top brands</BannerTitle>
            <BannerSub>Mobiles, electronics, fashion, home & more</BannerSub>
            <CategoryStrip>
              {categories.slice(0, 8).map((c) => (
                <CategoryItem key={c} to={`/products?category=${encodeURIComponent(c)}`}>
                  <CategoryAvatar>{c.charAt(0).toUpperCase()}</CategoryAvatar>
                  {c}
                </CategoryItem>
              ))}
            </CategoryStrip>
          </div>
          <div style={{ alignSelf: "stretch" }}>
            {/* Right side can be used for static promo/banner image later */}
          </div>
        </BannerInner>
      </Banner>

      <DealsRow>
        <DealsSection>
          <DealsHeader>
            <DealsTitle>Top Deals for You</DealsTitle>
            <ViewAll to="/products">VIEW ALL</ViewAll>
          </DealsHeader>
          <DealsGrid>
            {topDeals.map((p) => (
              <DealCard key={p._id || p.id} to={`/products/${p._id || p.id}`}>
                <DealImage>
                  {p.image ? <img src={p.image} alt={p.name} /> : <span>{p.name?.charAt(0)}</span>}
                </DealImage>
                <DealName>{p.name}</DealName>
                <DealPriceRow>
                  <DealPrice>{formatINR(p.price)}</DealPrice>
                  {p.mrp && p.mrp > p.price ? <DealStrike>{formatINR(p.mrp)}</DealStrike> : null}
                  {p.discountPercent ? <DealTag>{p.discountPercent}% off</DealTag> : null}
                </DealPriceRow>
              </DealCard>
            ))}
          </DealsGrid>
        </DealsSection>

        <DealsSection>
          <DealsHeader>
            <DealsTitle>Best of Electronics</DealsTitle>
          </DealsHeader>
          <DealsGrid>
            {bestOfElectronics.map((p) => (
              <DealCard key={p._id || p.id} to={`/products/${p._id || p.id}`}>
                <DealImage>
                  {p.image ? <img src={p.image} alt={p.name} /> : <span>{p.name?.charAt(0)}</span>}
                </DealImage>
                <DealName>{p.name}</DealName>
                <DealPriceRow>
                  <DealPrice>{formatINR(p.price)}</DealPrice>
                  {p.mrp && p.mrp > p.price ? <DealStrike>{formatINR(p.mrp)}</DealStrike> : null}
                </DealPriceRow>
              </DealCard>
            ))}
          </DealsGrid>
        </DealsSection>
      </DealsRow>
    </Container>
  );
}

