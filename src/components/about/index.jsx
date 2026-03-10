import React from "react";
import { Container, Card } from "../../ui/layout";
import Wrapper, { Title, Subtitle, Section, SectionTitle, Body } from "./style";

const About = () => {
  return (
    <Wrapper>
      <Container>
        <Card style={{ padding: "40px 32px" }}>
          <Title>About ShopApp</Title>
          <Subtitle>
            ShopApp is a demo e‑commerce experience inspired by marketplaces like Flipkart and Amazon. It showcases a
            complete MERN‑stack implementation with modern UI patterns.
          </Subtitle>

          <Section>
            <SectionTitle>What we offer</SectionTitle>
            <Body>
              Product discovery, cart & checkout, order history, wishlist, and an admin dashboard—all built with
              clean React architecture, reusable styled‑components, JWT‑based authentication, and MongoDB‑backed APIs.
            </Body>
          </Section>

          <Section>
            <SectionTitle>Built for learning</SectionTitle>
            <Body>
              This project demonstrates real-world features: addresses, orders, and role‑based admin controls. You can
              browse products, add them to your cart or wishlist, place Cash‑on‑Delivery orders, and manage everything
              from your account panel—very similar to a production marketplace.
            </Body>
          </Section>

          <Section>
            <SectionTitle>Tech stack</SectionTitle>
            <Body>
              MERN (MongoDB, Express, React, Node.js) with modern tooling. Perfect for interviews and portfolio
              projects. Extend it with payments, reviews, or search suggestions to make it your own.
            </Body>
          </Section>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default About;
