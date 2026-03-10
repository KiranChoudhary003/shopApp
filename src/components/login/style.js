import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 36px 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const Sub = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  height: 48px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 15px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(40, 116, 240, 0.15);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SubmitBtn = styled.button`
  height: 48px;
  margin-top: 8px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(40, 116, 240, 0.35);

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const FooterLink = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 800;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default Wrapper;
