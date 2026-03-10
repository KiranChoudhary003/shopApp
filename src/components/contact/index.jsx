import React from "react";
import { Container, Card } from "../../ui/layout";
import Wrapper, {
  Title,
  Intro,
  ContactGrid,
  ContactCard,
  ContactLabel,
  ContactValue,
  ContactValuePlain,
  Body,
} from "./style";

const Contact = () => {
  return (
    <Wrapper>
      <Container>
        <Card style={{ padding: "40px 32px" }}>
          <Title>Contact us</Title>
          <Intro>
            Have questions about this project, want to extend it, or use it as part of your portfolio? Reach out
            using the details below.
          </Intro>

          <ContactGrid>
            <ContactCard>
              <ContactLabel>Email</ContactLabel>
              <ContactValue href="mailto:kiranchoudhary9180@gmail.com">kiranchoudhary9180@gmail.com</ContactValue>
            </ContactCard>
            <ContactCard>
              <ContactLabel>Phone</ContactLabel>
              <ContactValuePlain>+91-9351009087</ContactValuePlain>
            </ContactCard>
          </ContactGrid>

          <Body>
            You can also fork the code, add more features (payments, reviews, search suggestions), and treat it as a
            full interview‑level case study. Add your own contact details or links to GitHub/LinkedIn here.
          </Body>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default Contact;
