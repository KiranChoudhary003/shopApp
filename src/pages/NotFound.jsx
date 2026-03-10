import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, Card } from "../ui/layout";

const Box = styled(Card)`
  padding: 18px;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 18px;
`;

const Sub = styled.p`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const Btn = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 700;
`;

export default function NotFound() {
  return (
    <Container>
      <Box>
        <Title>Page not found</Title>
        <Sub>The page you’re looking for doesn’t exist.</Sub>
        <Btn to="/">Go home</Btn>
      </Box>
    </Container>
  );
}

