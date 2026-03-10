import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  padding: 18px 0;
`;

export const Title = styled.h1`
  margin: 0 0 14px;
  font-size: 18px;
  letter-spacing: -0.01em;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const Input = styled.input`
  height: 42px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  outline: none;

  &:focus {
    border-color: rgba(40, 116, 240, 0.55);
    box-shadow: 0 0 0 4px rgba(40, 116, 240, 0.14);
  }
`;

export const TextArea = styled.textarea`
  min-height: 110px;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  outline: none;
  resize: vertical;

  &:focus {
    border-color: rgba(40, 116, 240, 0.55);
    box-shadow: 0 0 0 4px rgba(40, 116, 240, 0.14);
  }
`;

export const Actions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;

  button {
    height: 42px;
    padding: 0 14px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    font-weight: 900;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  a {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.mutedText};
  }
`;

export default Wrapper;