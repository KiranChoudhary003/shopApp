import styled from "styled-components";

const Wrapper = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.text};
  color: rgba(255, 255, 255, 0.9);
  padding: 40px 24px 20px;

  .footer-grid {
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);

    @media (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  .col {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h4 {
      margin: 0 0 4px;
      font-size: 14px;
      font-weight: 900;
      color: white;
      letter-spacing: 0.02em;
    }

    a, span {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.78);
      text-decoration: none;
      font-weight: 600;
    }

    a:hover {
      color: white;
    }

    span {
      cursor: default;
    }
  }

  .copyright {
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    padding-top: 20px;
    text-align: center;

    p {
      margin: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

export default Wrapper;
