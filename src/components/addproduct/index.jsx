import React, { useState } from "react";
import { toast } from "react-toastify";
import { addProduct } from "../../api/products";
import { Container, Card } from "../../ui/layout";
import Wrapper, { Actions, Field, Form, Input, Label, TextArea, Title } from "./style";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct({ loggedInUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      toast.info("Login to add products.");
      navigate("/login");
      return;
    }

    const payload = {
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      image: image.trim(),
      description: description.trim(),
      stock: stock === "" ? undefined : Number(stock),
    };

    if (!payload.name) {
      toast.error("Product name is required.");
      return;
    }
    if (!Number.isFinite(payload.price) || payload.price <= 0) {
      toast.error("Enter a valid price.");
      return;
    }

    setSaving(true);
    try {
      const res = await addProduct(payload);
      toast.success(res?.message || "Product added");
      navigate("/products");
    } catch (err) {
      toast.error("Failed to add product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Card style={{ padding: 16 }}>
          <Title>Add product</Title>
          {!loggedInUser ? (
            <p style={{ margin: 0, color: "rgba(71,85,105,0.95)" }}>
              You need to <Link to="/login">login</Link> to add products.
            </p>
          ) : (
            <Form onSubmit={submit}>
              <Field>
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. iPhone 15" />
              </Field>
              <Field>
                <Label>Price (INR)</Label>
                <Input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" placeholder="e.g. 49999" />
              </Field>
              <Field>
                <Label>Category</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Mobiles" />
              </Field>
              <Field>
                <Label>Image URL (optional)</Label>
                <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
              </Field>
              <Field style={{ gridColumn: "1 / -1" }}>
                <Label>Description (optional)</Label>
                <TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Key highlights, specs, etc." />
              </Field>
              <Field>
                <Label>Stock (optional)</Label>
                <Input value={stock} onChange={(e) => setStock(e.target.value)} inputMode="numeric" placeholder="e.g. 10" />
              </Field>
              <Actions>
                <button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Add product"}
                </button>
                <Link to="/products">Cancel</Link>
              </Actions>
            </Form>
          )}
        </Card>
      </Container>
    </Wrapper>
  );
}