import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./ui/GlobalStyle";
import { theme } from "./ui/theme";
import { CartProvider } from "./cart/CartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CartProvider>
      <GlobalStyle />
      <App />
      <ToastContainer position="bottom-right" autoClose={2200} theme="light" />
    </CartProvider>
  </ThemeProvider>
)
