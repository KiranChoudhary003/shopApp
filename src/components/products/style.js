import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  padding: 0 0 48px;
  min-height: 60vh;
`;

export const PageHeader = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px 0;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 16px 0;
    margin-bottom: 16px;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const TitleBlock = styled.div`
  display: grid;
  gap: 4px;

  h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mutedText};
  }

  @media (max-width: 768px) {
    h1 { font-size: 20px; }
    p { font-size: 12px; }
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
  }
`;

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

export const Filters = styled.aside`
  position: sticky;
  top: calc(${({ theme }) => theme.layout.headerHeight} + 16px);
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 20px;
  min-width: 240px;

  @media (max-width: 950px) {
    position: static;
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? "none" : "block")};
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const FilterLabel = styled.h3`
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.mutedText};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const FilterDrawerBtn = styled.button`
  display: none;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 18px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.sm};

  @media (max-width: 950px) {
    display: inline-flex;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

export const FilterDrawerOverlay = styled.div`
  display: none;
  position: fixed;
  inset: 0;
  z-index: 150;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);

  @media (max-width: 950px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
  }
`;

export const FilterDrawer = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: min(320px, 90vw);
  height: 100vh;
  z-index: 151;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  padding: 24px 20px;
  overflow-y: auto;
  animation: filterSlideIn 0.25s ease;

  @keyframes filterSlideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @media (max-width: 950px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
  }
`;

export const FilterDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FilterDrawerClose = styled.button`
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

export const FilterTitle = styled.h2`
  font-weight: 900;
  font-size: 16px;
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const FilterGroup = styled.div`
  margin-bottom: 18px;
  display: grid;
  gap: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 11px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.mutedText};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const RangeRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;

export const CheckRow = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  user-select: none;

  input {
    width: 18px;
    height: 18px;
  }
`;

export const ClearBtn = styled.button`
  height: 44px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;
  min-width: 180px;

  label {
    font-size: 12px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.mutedText};
  }

  @media (max-width: 600px) {
    min-width: 140px;
  }
`;

export const Input = styled.input`
  height: 44px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 14px;
  outline: none;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(40, 116, 240, 0.15);
  }
`;

export const Select = styled.select`
  height: 44px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 14px;
  font-weight: 600;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(40, 116, 240, 0.15);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  padding-bottom: 32px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding-bottom: 24px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ProductCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: flex;
  flex-direction: column;
  min-height: 0;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    border-color: rgba(40, 116, 240, 0.2);
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Thumb = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 1;
  max-height: 220px;
  background: linear-gradient(135deg, rgba(40, 116, 240, 0.08), rgba(255, 176, 32, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    max-height: 180px;
  }
  @media (max-width: 480px) {
    aspect-ratio: 1;
    max-height: none;
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(17, 24, 39, 0.82);
  color: white;
  font-weight: 900;
  font-size: 12px;
  backdrop-filter: blur(8px);
`;

export const RatingPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(22, 163, 74, 0.10);
  border: 1px solid rgba(22, 163, 74, 0.25);
  color: ${({ theme }) => theme.colors.text};
  font-weight: 900;
  font-size: 12px;
`;

export const Strike = styled.span`
  color: ${({ theme }) => theme.colors.mutedText};
  text-decoration: line-through;
  font-weight: 800;
  font-size: 12px;
`;

export const CardBody = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const Name = styled.h2`
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Price = styled.div`
  font-weight: 900;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Tag = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mutedText};
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  white-space: nowrap;
`;

export const CardActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
  margin-top: auto;
  align-items: center;
`;

export const Btn = styled.button`
  height: 40px;
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $primary, theme }) => ($primary ? theme.colors.primary : theme.colors.surface)};
  color: ${({ $primary }) => ($primary ? "white" : "inherit")};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ $primary, theme }) => ($primary ? theme.colors.primaryDark : theme.colors.surface2)};
  }
`;

export const IconBtn = styled.button`
  height: 40px;
  width: 40px;
  min-width: 40px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

export const Pager = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px 0 24px;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

export const PageBtn = styled.button`
  height: 44px;
  min-width: 100px;
  padding: 0 20px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.15s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 420px) {
    min-width: 86px;
    padding: 0 14px;
    font-size: 13px;
  }
`;

export const PageInfo = styled.div`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 14px;
  font-weight: 800;
  @media (max-width: 420px) {
    font-size: 13px;
  }
`;

export const FilterDrawerPanel = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: min(320px, 90vw);
  height: 100vh;
  z-index: 151;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  padding: 24px 20px;
  overflow-y: auto;
  animation: filterSlideIn 0.25s ease;

  @keyframes filterSlideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @media (max-width: 950px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
  }
`;

export const FiltersMobileOnly = styled.div`
  display: none;

  @media (max-width: 950px) {
    display: block;
  }
`;

export const FiltersDesktopOnly = styled.div`
  display: block;

  @media (max-width: 950px) {
    display: none;
  }
`;

export default Wrapper