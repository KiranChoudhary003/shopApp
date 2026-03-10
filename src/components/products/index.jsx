import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import Wrapper, {
  Btn,
  Badge,
  CardActions,
  CardBody,
  ClearBtn,
  Controls,
  Field,
  FilterDrawerBtn,
  FilterDrawerClose,
  FilterDrawerHeader,
  FilterDrawerOverlay,
  FilterDrawerPanel,
  FilterGroup,
  FilterLabel,
  FilterSection,
  FilterTitle,
  Filters,
  Grid,
  IconBtn,
  Input,
  MetaRow,
  Name,
  PageGrid,
  PageHeader,
  Pager,
  PageBtn,
  PageInfo,
  Price,
  ProductCard,
  RangeRow,
  CheckRow,
  RatingPill,
  Strike,
  Select,
  Tag,
  Thumb,
  TitleBlock,
  Toolbar,
} from "./style";
import { Container } from "../../ui/layout";
import { readProductsPaged, removeProduct } from "../../api/products";
import { FiFilter, FiImage, FiX } from "react-icons/fi";
import { useCart } from "../../cart/CartContext";
import { getWishlist, toggleWishlist } from "../../api/me";
import { FiHeart } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { getAuth, clearAuth } from "../../auth/authStorage";

const Products = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cart = useCart();
  const authed = Boolean(getAuth()?.accessToken);

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [sort, setSort] = useState("relevance");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [meta, setMeta] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [wished, setWished] = useState(() => {
    const raw = window.localStorage.getItem("wishlist");
    try {
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!authed) {
        const raw = window.localStorage.getItem("wishlist");
        try {
          const list = raw ? JSON.parse(raw) : [];
          if (mounted) setWished(new Set(Array.isArray(list) ? list : []));
        } catch {
          if (mounted) setWished(new Set());
        }
        return;
      }
      try {
        const res = await getWishlist();
        const ids = (res?.wishlist || []).map((p) => String(p?._id || p?.id)).filter(Boolean);
        if (mounted) setWished(new Set(ids));
      } catch {
        // If wishlist fetch fails, don't block the page; toggles will still show errors.
      }
    })();
    return () => {
      mounted = false;
    };
  }, [authed]);

  const loadProducts = async (opts) => {
    setStatus("loading");
    setError(null);
    try {
      const params = opts?.params || {};
      const data = await readProductsPaged(params);
      const items = Array.isArray(data) ? data : data?.items || [];
      setProducts(items);
      if (!Array.isArray(data) && data?.meta) setMeta(data.meta);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const categories = useMemo(() => {
    const set = new Set();
    for (const p of products) {
      if (p?.category) set.add(String(p.category));
    }
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [products]);

  const filtered = products; // server-filtered (Flipkart-style sidebar)

  const remove = async (product) => {
    if (!loggedInUser) {
      toast.info("Login to remove products.");
      navigate("/login");
      return;
    }
    try {
      const pid = product?._id || product?.id;
      const res = await removeProduct(pid);
      toast.success(res?.message || "Removed");
      await applyFilters();
    } catch (e) {
      toast.error("Failed to remove product.");
    }
  };

  const view = (product) => {
    const pid = product?._id || product?.id;
    navigate(`/products/${encodeURIComponent(pid)}`);
  };

  const addToCart = (product) => {
    cart.add(product, 1);
    toast.success("Added to cart");
  };

  const formatINR = (value) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return "—";
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);
  };

  const persistWishlist = (set) => {
    window.localStorage.setItem("wishlist", JSON.stringify(Array.from(set)));
  };

  const onToggleWish = async (product) => {
    const pid = product?._id || product?.id;
    if (!pid) return;

    // Guests: store wishlist in localStorage only
    if (!authed) {
      // If UI thinks user is logged in but token is missing/expired, force re-login.
      if (loggedInUser) {
        toast.error("Session expired. Please login again.");
        clearAuth();
        navigate("/login");
        return;
      }
      const next = new Set(wished);
      if (next.has(pid)) next.delete(pid);
      else next.add(pid);
      setWished(next);
      persistWishlist(next);
      toast.success(next.has(pid) ? "Saved to wishlist" : "Removed from wishlist");
      return;
    }

    try {
      const res = await toggleWishlist(pid);
      const next = new Set(wished);
      if (res?.wished) next.add(pid);
      else next.delete(pid);
      setWished(next);
      toast.success(res?.wished ? "Saved to wishlist" : "Removed from wishlist");
    } catch (e) {
      const code = e?.response?.status;
      if (code === 401) {
        toast.error("Session expired. Please login again.");
        clearAuth();
        navigate("/login");
        return;
      }
      toast.error("Wishlist update failed");
    }
  };

  const applyFilters = async () => {
    const params = {
      q: query?.trim() ? query.trim() : undefined,
      category: category !== "all" ? category : undefined,
      minPrice: minPrice !== "" ? minPrice : undefined,
      maxPrice: maxPrice !== "" ? maxPrice : undefined,
      inStock: inStock ? "true" : undefined,
      sort: sort === "relevance" ? undefined : sort,
      page,
      limit,
    };
    await loadProducts({ params });
  };

  useEffect(() => {
    // Apply on changes (like Flipkart sidebar)
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, minPrice, maxPrice, inStock, sort, page]);

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setInStock(false);
    setSort("relevance");
    setPage(1);
  };

  const closeFilterDrawer = () => setFilterDrawerOpen(false);

  return (
    <Wrapper>
      <Container>
        <PageHeader>
        <Toolbar>
          <TitleBlock>
            <h1>Products</h1>
            {status === "loading" ? (
              <p>Loading products…</p>
            ) : status === "error" ? (
              <p style={{ color: "#dc2626" }}>Couldn’t load products. Is the backend running?</p>
            ) : (
              <p>
                {meta.total > 0 ? (
                  <>Page <strong>{meta.page}</strong> · <strong>{meta.total}</strong> items</>
                ) : (
                  <>No products match your filters.</>
                )}
              </p>
            )}
          </TitleBlock>

          <Controls>
            <FilterDrawerBtn type="button" onClick={() => setFilterDrawerOpen(true)} aria-label="Open filters">
              <FiFilter size={18} /> Filters
            </FilterDrawerBtn>
            <Field>
              <label>Category</label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "all" ? "All categories" : c}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              <label>Sort</label>
              <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="newest">Newest</option>
              </Select>
            </Field>
          </Controls>
        </Toolbar>
        </PageHeader>

        <PageGrid>
          <Filters $hideOnMobile>
            <FilterTitle>Filters</FilterTitle>

            <FilterGroup>
              <h3>Search</h3>
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Product name, category..."
              />
            </FilterGroup>

            <FilterGroup>
              <h3>Price</h3>
              <RangeRow>
                <Input
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setPage(1);
                  }}
                  inputMode="numeric"
                  placeholder="Min"
                />
                <Input
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setPage(1);
                  }}
                  inputMode="numeric"
                  placeholder="Max"
                />
              </RangeRow>
              <CheckRow>
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => {
                    setInStock(e.target.checked);
                    setPage(1);
                  }}
                />
                In stock
              </CheckRow>
            </FilterGroup>

            <FilterGroup>
              <ClearBtn type="button" onClick={clearFilters}>
                Clear all
              </ClearBtn>
            </FilterGroup>
          </Filters>

          <FilterDrawerOverlay $open={filterDrawerOpen} onClick={closeFilterDrawer} aria-hidden={!filterDrawerOpen} />
          <FilterDrawerPanel $open={filterDrawerOpen} onClick={(e) => e.stopPropagation()}>
            <FilterDrawerHeader>
              <FilterTitle as="h3" style={{ margin: 0 }}>Filters</FilterTitle>
              <FilterDrawerClose type="button" onClick={closeFilterDrawer} aria-label="Close">
                <FiX size={20} />
              </FilterDrawerClose>
            </FilterDrawerHeader>
            <FilterSection>
              <FilterLabel>Search</FilterLabel>
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Product name or category..."
              />
            </FilterSection>
            <FilterSection>
              <FilterLabel>Price range (₹)</FilterLabel>
              <RangeRow>
                <Input
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setPage(1);
                  }}
                  inputMode="numeric"
                  placeholder="Min"
                />
                <Input
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setPage(1);
                  }}
                  inputMode="numeric"
                  placeholder="Max"
                />
              </RangeRow>
            </FilterSection>
            <FilterSection>
              <CheckRow>
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => {
                    setInStock(e.target.checked);
                    setPage(1);
                  }}
                />
                In stock only
              </CheckRow>
            </FilterSection>
            <FilterSection>
              <ClearBtn type="button" onClick={clearFilters}>
                Clear all filters
              </ClearBtn>
              <Btn type="button" onClick={closeFilterDrawer} $primary style={{ marginTop: 12, width: "100%" }}>
                Apply & close
              </Btn>
            </FilterSection>
          </FilterDrawerPanel>

          <Grid>
            {status === "loading"
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <ProductCard key={idx}>
                    <Thumb>
                      <Skeleton height={170} width="100%" />
                    </Thumb>
                    <CardBody>
                      <Skeleton height={18} />
                      <Skeleton height={14} width="60%" />
                      <Skeleton height={38} />
                    </CardBody>
                  </ProductCard>
                ))
              : filtered.map((product) => {
                  const pid = product?._id || product?.id;
                  const heartOn = wished.has(pid);
                  const discount = Number(product?.discountPercent) || 0;
                  const mrp = Number(product?.mrp) || 0;
                  const rating = Number(product?.rating) || 0;
                  const ratingsCount = Number(product?.ratingsCount) || 0;
                  return (
                    <ProductCard key={pid}>
                      <Thumb>
                        {discount ? <Badge>{discount}% OFF</Badge> : null}
                        {product.image ? (
                          // eslint-disable-next-line jsx-a11y/img-redundant-alt
                          <img src={product.image} alt={product.name ? `${product.name} image` : "Product image"} />
                        ) : (
                          <FiImage size={36} color="rgba(15,23,42,0.45)" />
                        )}
                      </Thumb>

                      <CardBody>
                        <Name title={product.name}>{product.name || "Untitled product"}</Name>
                        <MetaRow>
                          <div style={{ display: "grid", gap: 2 }}>
                            <Price>{formatINR(product.price)}</Price>
                            {mrp && mrp > Number(product.price) ? <Strike>{formatINR(mrp)}</Strike> : null}
                          </div>
                          {product.category ? <Tag>{product.category}</Tag> : <Tag>General</Tag>}
                        </MetaRow>
                        {rating ? (
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <RatingPill>
                              {rating.toFixed(1)} <FiStar size={14} />
                            </RatingPill>
                            {ratingsCount ? (
                              <div style={{ fontSize: 12, fontWeight: 800, color: "rgba(71,85,105,0.95)" }}>
                                {ratingsCount} ratings
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        <CardActions>
                          <Btn type="button" onClick={() => view(product)} $primary>
                            View
                          </Btn>
                          {loggedInUser ? (
                            <Btn type="button" onClick={() => remove(product)}>
                              Remove
                            </Btn>
                          ) : (
                            <Btn type="button" onClick={() => addToCart(product)}>
                              Add
                            </Btn>
                          )}
                          <IconBtn type="button" aria-label="Wishlist" onClick={() => onToggleWish(product)} title="Wishlist">
                            {heartOn ? <FaHeart color="#dc2626" /> : <FiHeart color="rgba(15,23,42,0.65)" />}
                          </IconBtn>
                        </CardActions>
                      </CardBody>
                    </ProductCard>
                  );
                })}
          </Grid>

          <Pager>
            <PageInfo>
              Page <strong>{meta.page}</strong> of <strong>{meta.totalPages}</strong>
            </PageInfo>
            <PageBtn type="button" disabled={meta.page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Prev
            </PageBtn>
            <PageBtn type="button" disabled={meta.page >= meta.totalPages} onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}>
              Next
            </PageBtn>
          </Pager>
        </PageGrid>

        {status === "error" && error ? (
          <p style={{ color: "rgba(71,85,105,0.95)", fontSize: 13 }}>
            Tip: start backend in `shopping-backend` using <code>npm start</code> (port 8000).
          </p>
        ) : null}
      </Container>
    </Wrapper>
  )
}

export default Products