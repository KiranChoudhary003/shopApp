import React, { useState } from "react";
import Wrapper, { Card, Title, Sub, Form, Field, Label, Input, SubmitBtn, FooterLink } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../../api/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signup({ name, contact, password });
      if (data?.bSuccess) {
        toast.success("Account created. Please login.");
        navigate("/login");
      } else {
        toast.error(data?.message || "Sign up failed");
      }
    } catch {
      toast.error("Sign up failed. Try again.");
    } finally {
      setLoading(false);
      setName("");
      setContact("");
      setPassword("");
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Sign Up</Title>
        <Sub>Create your ShopApp account</Sub>
        <Form onSubmit={handleSignUp}>
          <Field>
            <Label htmlFor="signup-name">Full Name</Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>
          <Field>
            <Label htmlFor="signup-contact">Mobile Number</Label>
            <Input
              id="signup-contact"
              type="text"
              placeholder="10-digit mobile number"
              inputMode="numeric"
              maxLength={10}
              value={contact}
              onChange={(e) => setContact(e.target.value.replace(/\D/g, ""))}
              required
            />
          </Field>
          <Field>
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </SubmitBtn>
        </Form>
        <FooterLink>
          Already have an account? <Link to="/login">Login</Link>
        </FooterLink>
      </Card>
    </Wrapper>
  );
};

export default SignUp;
