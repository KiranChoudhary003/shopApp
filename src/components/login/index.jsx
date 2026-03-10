import React, { useState } from "react";
import Wrapper, { Card, Title, Sub, Form, Field, Label, Input, SubmitBtn, FooterLink } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../api/auth";

const Login = ({ setLoggedInUser }) => {
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login({ contact, password });
      if (data?.bSuccess) {
        window.localStorage.setItem("auth", JSON.stringify({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
        setLoggedInUser(data.user);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error(data?.message || "Login failed");
      }
    } catch {
      toast.error("Login failed. Check your connection.");
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Login</Title>
        <Sub>Enter your mobile number and password to continue</Sub>
        <Form onSubmit={onLogin}>
          <Field>
            <Label htmlFor="login-contact">Mobile Number</Label>
            <Input
              id="login-contact"
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
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          <SubmitBtn type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </SubmitBtn>
        </Form>
        <FooterLink>
          New to ShopApp? <Link to="/signup">Create an account</Link>
        </FooterLink>
      </Card>
    </Wrapper>
  );
};

export default Login;
