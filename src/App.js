import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/User/Home';
import AdminHome from './Pages/Admin/Home';
import Product from './Pages/User/Product';
import Checkout from './Pages/User/Checkout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
