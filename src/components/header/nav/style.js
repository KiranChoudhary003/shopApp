import styled from "styled-components";

const Wrapper = styled.nav`
  ul {
    display: flex;
    align-items: center;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

export const NavLinkPill = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 700;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.92);
  border: 1px solid ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.35)" : "transparent")};
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.14)" : "transparent")};
  transition: background 120ms ease, border 120ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.22);
  }
`;

export default Wrapper;