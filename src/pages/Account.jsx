import React from "react";
import styled from "styled-components";
import { Container, Card } from "../ui/layout";

const Box = styled(Card)`
  padding: 18px;
`;

export default function Account({ loggedInUser }) {
  return (
    <Container>
      <Box>
        <h1 style={{ margin: 0, fontSize: 18 }}>Account</h1>
        <p style={{ margin: "10px 0 0", color: "rgba(71, 85, 105, 0.95)" }}>
          {loggedInUser ? (
            <>
              Signed in as <strong>{loggedInUser.name || loggedInUser.contact}</strong>
            </>
          ) : (
            <>You’re not logged in.</>
          )}
        </p>
      </Box>
    </Container>
  );
}

