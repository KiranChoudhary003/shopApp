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

export const Subtitle = styled.p`
  margin: 0 0 32px;
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const Body = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

export default Wrapper;
