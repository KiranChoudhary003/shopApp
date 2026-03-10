import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  min-height: ${({ theme }) => theme.layout.headerHeight};
  display: grid;
  grid-template-columns: 180px 1fr auto;
  grid-template-rows: auto;
  gap: 20px 24px;
  align-items: center;
  padding: 12px 20px 14px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.primary} 0%, #1b5fd1 100%);
  color: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);

  /* Desktop: single row */
  @media (min-width: 901px) {
    grid-template-areas: "brand search right";
    grid-template-columns: 180px 1fr auto;
  }

  /* Tablet & mobile: 2 rows - brand+right on row1, search full width on row2 */
  @media (max-width: 900px) {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "brand actions"
      "search search";
    padding: 10px 16px 12px;
    gap: 12px 16px;
  }
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  font-weight: 900;
  letter-spacing: -0.02em;
  font-size: 24px;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const BrandSub = styled.span`
  font-size: 10px;
  font-weight: 700;
  opacity: 0.9;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-top: 2px;

  @media (max-width: 600px) {
    font-size: 9px;
  }
`;

export const Center = styled.div`
  width: 100%;
  max-width: 560px;
  justify-self: center;

  @media (max-width: 900px) {
    grid-column: 1 / -1;
    max-width: none;
  }
`;

export const SearchForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  border-radius: 6px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 12px 18px;
  background: white;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 500;

  &::placeholder {
    color: #64748b;
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    gap: 4px;
  }
`;

export const RightDivider = styled.span`
  width: 1px;
  height: 22px;
  background: rgba(255, 255, 255, 0.35);
  margin: 0 4px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavDesktopWrap = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  color: #1a1a1a;
  font-weight: 900;
  font-size: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const IconWrap = styled.span`
  position: relative;
  display: inline-flex;
`;

export const UserName = styled.span`
  font-size: 13px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.98);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 4px;

  @media (max-width: 600px) {
    display: none;
  }
`;

/* Desktop: assign grid areas */
export const BrandWrap = styled.div`
  grid-area: brand;
`;

export const CenterWrap = styled.div`
  grid-area: search;
`;

export const RightWrap = styled.div`
  grid-area: right;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    grid-area: actions;
    gap: 4px;
  }
`;

export const HamburgerBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  padding: 0;

  @media (max-width: 900px) {
    display: inline-flex;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;

export const MobileOverlay = styled.div`
  display: none;
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 900px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
  }
`;

export const MobileDrawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 85vw);
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.2);
  z-index: 201;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: slideIn 0.25s ease;

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

export const MobileDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const MobileNavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MobileNavLink = styled(Link)`
  display: block;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }

  &[data-active="true"] {
    background: rgba(40, 116, 240, 0.12);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MobileNavButton = styled.button`
  display: block;
  width: 100%;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

export const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

export default Wrapper;
