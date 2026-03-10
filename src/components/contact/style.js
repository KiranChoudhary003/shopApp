import styled from "styled-components";

const Wrapper = styled.section`
  padding: 40px 0 60px;
`;

export const Title = styled.h1`
  margin: 0 0 24px;
  font-size: 28px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

export const Intro = styled.p`
  margin: 0 0 32px;
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const ContactGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-top: 24px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ContactCard = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const ContactLabel = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.mutedText};
  margin-bottom: 8px;
`;

export const ContactValue = styled.a`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ContactValuePlain = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Body = styled.p`
  margin: 24px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export default Wrapper;
