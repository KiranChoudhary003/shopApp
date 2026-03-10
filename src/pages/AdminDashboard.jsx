import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container, Card } from "../ui/layout";
import { toast } from "react-toastify";
import { addProduct, readProducts, removeProduct, updateProduct } from "../api/products";
import { adminOrders, adminUpdateOrderStatus } from "../api/orders";
import { getMe } from "../api/me";
import { FiPackage, FiShoppingBag, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { clearAuth, getAuth } from "../auth/authStorage";

const Shell = styled.div`
  min-height: 80vh;
  padding: 24px 0;
  background: ${({ theme }) => theme.colors.bg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled(Card)`
  padding: 0;
  overflow: hidden;
  position: sticky;
  top: calc(${({ theme }) => theme.layout.headerHeight} + 16px);

  @media (max-width: 960px) {
    position: static;
  }
`;

const SidebarTitle = styled.div`
  padding: 16px;
  font-size: 18px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TabBtn = styled.button`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: none;
  background: ${({ theme, $active }) => ($active ? "rgba(40, 116, 240, 0.12)" : "transparent")};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 3px solid ${({ theme, $active }) => ($active ? theme.colors.primary : "transparent")};

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

const Content = styled(Card)`
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  color: white;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  opacity: 0.9;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin-top: 4px;
`;

const SectionTitle = styled.h1`
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

const FormCard = styled.div`
  padding: 20px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface2};
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  gap: 6px;

  &[data-full] {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.mutedText};
`;

const Input = styled.input`
  height: 44px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  font-size: 14px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(40, 116, 240, 0.15);
  }
`;

const Btn = styled.button`
  height: 44px;
  padding: 0 20px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 900;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BtnSecondary = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
  }
`;

const BtnDanger = styled.button`
  height: 36px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  background: transparent;
  color: ${({ theme }) => theme.colors.danger};
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(220, 38, 38, 0.08);
  }
`;

const Table = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 16px;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const TableHead = styled(TableRow)`
  background: ${({ theme }) => theme.colors.surface2};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Muted = styled.span`
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 13px;
`;

const Select = styled.select`
  height: 40px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 700;
  font-size: 13px;
  min-width: 120px;
`;

const Empty = styled.p`
  color: ${({ theme }) => theme.colors.mutedText};
  padding: 24px;
  text-align: center;
  margin: 0;
`;

export default function AdminDashboard({ loggedInUser }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("products");
  const [meRole, setMeRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    mrp: "",
    discountPercent: "",
    rating: "",
    ratingsCount: "",
  });

  const isAdmin = useMemo(() => (loggedInUser?.role || meRole) === "admin", [loggedInUser, meRole]);
  const authed = Boolean(getAuth()?.accessToken);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        if (!authed) return;
        const me = await getMe();
        if (!mounted) return;
        setMeRole(me?.user?.role || null);
      } catch {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const loadProducts = async () => {
    try {
      const list = await readProducts({ sort: "newest" });
      setProducts(Array.isArray(list) ? list : []);
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        toast.error("Session expired. Please login again.");
        clearAuth();
        navigate("/login");
        return;
      }
      toast.error("Failed to load products");
    }
  };

  const loadOrders = async () => {
    try {
      const list = await adminOrders();
      setOrders(Array.isArray(list) ? list : []);
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        toast.error("Session expired. Please login again.");
        clearAuth();
        navigate("/login");
        return;
      }
      if (status === 403) {
        toast.error("Admin only");
        navigate("/account");
        return;
      }
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    if (!authed) return;
    if (!isAdmin) return;
    if (tab === "products") loadProducts();
    if (tab === "orders") loadOrders();
  }, [tab, isAdmin, authed]);

  if (!loggedInUser) return <Navigate to="/login" replace />;
  if (!authed) return <Navigate to="/login" replace />;
  if (!loading && !isAdmin) return <Navigate to="/account" replace />;

  const create = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        name: form.name.trim(),
        price: Number(form.price),
        mrp: form.mrp === "" ? undefined : Number(form.mrp),
        discountPercent: form.discountPercent === "" ? undefined : Number(form.discountPercent),
        rating: form.rating === "" ? undefined : Number(form.rating),
        ratingsCount: form.ratingsCount === "" ? undefined : Number(form.ratingsCount),
        category: form.category.trim() || "General",
        image: form.image.trim(),
        stock: form.stock === "" ? 0 : Number(form.stock),
      });
      toast.success("Product created");
      setForm({ name: "", price: "", category: "", image: "", stock: "", mrp: "", discountPercent: "", rating: "", ratingsCount: "" });
      await loadProducts();
    } catch {
      toast.error("Create failed");
    }
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({
      name: p?.name || "",
      price: p?.price ?? "",
      category: p?.category || "",
      image: p?.image || "",
      stock: p?.stock ?? "",
      mrp: p?.mrp ?? "",
      discountPercent: p?.discountPercent ?? "",
      rating: p?.rating ?? "",
      ratingsCount: p?.ratingsCount ?? "",
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: "", price: "", category: "", image: "", stock: "", mrp: "", discountPercent: "", rating: "", ratingsCount: "" });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    try {
      const id = editing?._id || editing?.id;
      await updateProduct(id, {
        name: form.name.trim(),
        price: Number(form.price),
        category: form.category.trim() || "General",
        image: form.image.trim(),
        stock: form.stock === "" ? 0 : Number(form.stock),
        mrp: form.mrp === "" ? 0 : Number(form.mrp),
        discountPercent: form.discountPercent === "" ? 0 : Number(form.discountPercent),
        rating: form.rating === "" ? 0 : Number(form.rating),
        ratingsCount: form.ratingsCount === "" ? 0 : Number(form.ratingsCount),
      });
      toast.success("Product updated");
      cancelEdit();
      await loadProducts();
    } catch {
      toast.error("Update failed");
    }
  };

  const del = async (p) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await removeProduct(p?._id || p?.id);
      toast.success("Removed");
      await loadProducts();
    } catch {
      toast.error("Remove failed");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await adminUpdateOrderStatus(orderId, status);
      toast.success("Status updated");
      await loadOrders();
    } catch (e) {
      const code = e?.response?.status;
      if (code === 401) {
        toast.error("Session expired. Please login again.");
        clearAuth();
        navigate("/login");
        return;
      }
      toast.error("Update failed");
    }
  };

  return (
    <Shell>
      <Container>
        <Grid>
          <Sidebar>
            <SidebarTitle>
              <FiShoppingBag size={22} /> Admin Panel
            </SidebarTitle>
            <TabBtn type="button" $active={tab === "products"} onClick={() => setTab("products")}>
              <FiPackage size={18} /> Products
            </TabBtn>
            <TabBtn type="button" $active={tab === "orders"} onClick={() => setTab("orders")}>
              <FiShoppingBag size={18} /> Orders
            </TabBtn>
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(15,23,42,0.08)" }}>
              <Link to="/" style={{ fontSize: 13, fontWeight: 800, color: "inherit" }}>← Back to store</Link>
            </div>
          </Sidebar>

          <Content>
            {tab === "products" ? (
              <>
                <StatsRow>
                  <StatCard>
                    <StatLabel>Total Products</StatLabel>
                    <StatValue>{products.length}</StatValue>
                  </StatCard>
                </StatsRow>
                <SectionTitle>{editing ? "Edit Product" : "Add New Product"}</SectionTitle>
                <FormCard>
                  <Form onSubmit={editing ? saveEdit : create}>
                    <Field>
                      <Label>Product Name *</Label>
                      <Input value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} required placeholder="e.g. Wireless Earbuds" />
                    </Field>
                    <Field>
                      <Label>Price (₹) *</Label>
                      <Input type="number" value={form.price} onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))} required placeholder="999" />
                    </Field>
                    <Field>
                      <Label>MRP (₹)</Label>
                      <Input type="number" value={form.mrp} onChange={(e) => setForm((s) => ({ ...s, mrp: e.target.value }))} placeholder="1299" />
                    </Field>
                    <Field>
                      <Label>Discount %</Label>
                      <Input type="number" value={form.discountPercent} onChange={(e) => setForm((s) => ({ ...s, discountPercent: e.target.value }))} placeholder="23" />
                    </Field>
                    <Field>
                      <Label>Category</Label>
                      <Input value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} placeholder="Electronics" />
                    </Field>
                    <Field>
                      <Label>Stock</Label>
                      <Input type="number" value={form.stock} onChange={(e) => setForm((s) => ({ ...s, stock: e.target.value }))} placeholder="50" />
                    </Field>
                    <Field>
                      <Label>Rating (0-5)</Label>
                      <Input type="number" step="0.1" value={form.rating} onChange={(e) => setForm((s) => ({ ...s, rating: e.target.value }))} placeholder="4.2" />
                    </Field>
                    <Field>
                      <Label>Ratings Count</Label>
                      <Input type="number" value={form.ratingsCount} onChange={(e) => setForm((s) => ({ ...s, ratingsCount: e.target.value }))} placeholder="120" />
                    </Field>
                    <Field data-full>
                      <Label>Image URL</Label>
                      <Input value={form.image} onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))} placeholder="https://..." />
                    </Field>
                    <Field data-full style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {editing ? (
                        <>
                          <Btn type="submit"><FiEdit2 /> Save Changes</Btn>
                          <BtnSecondary type="button" onClick={cancelEdit}>Cancel</BtnSecondary>
                        </>
                      ) : (
                        <Btn type="submit"><FiPlus /> Create Product</Btn>
                      )}
                    </Field>
                  </Form>
                </FormCard>

                <SectionTitle>All Products</SectionTitle>
                <Table>
                  <TableHead>
                    <div>Product</div>
                    <div>Actions</div>
                    <div></div>
                  </TableHead>
                  {products.length === 0 && <Empty>No products yet. Add one above.</Empty>}
                  {products.map((p) => (
                    <TableRow key={p._id || p.id}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{p.name}</div>
                        <Muted>{p.category} • ₹{p.price} • Stock: {p.stock ?? 0}</Muted>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <BtnSecondary type="button" onClick={() => startEdit(p)}><FiEdit2 /> Edit</BtnSecondary>
                        <BtnDanger type="button" onClick={() => del(p)}><FiTrash2 /> Delete</BtnDanger>
                      </div>
                      <div></div>
                    </TableRow>
                  ))}
                </Table>
              </>
            ) : (
              <>
                <StatsRow>
                  <StatCard>
                    <StatLabel>Total Orders</StatLabel>
                    <StatValue>{orders.length}</StatValue>
                  </StatCard>
                </StatsRow>
                <SectionTitle>Manage Orders</SectionTitle>
                <Table>
                  <TableHead>
                    <div>Order</div>
                    <div>Status</div>
                    <div></div>
                  </TableHead>
                  {orders.length === 0 && <Empty>No orders yet.</Empty>}
                  {orders.map((o) => (
                    <TableRow key={o._id}>
                      <div>
                        <div style={{ fontWeight: 800 }}>#{String(o._id).slice(-8)}</div>
                        <Muted>{new Date(o.createdAt).toLocaleString()} • {o.items?.length || 0} items • ₹{o?.totals?.total}</Muted>
                      </div>
                      <Select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}>
                        <option value="placed">Placed</option>
                        <option value="packed">Packed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </Select>
                      <div></div>
                    </TableRow>
                  ))}
                </Table>
              </>
            )}
          </Content>
        </Grid>
      </Container>
    </Shell>
  );
}
