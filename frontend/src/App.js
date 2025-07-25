import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage.js';
import ProductListing from './pages/ProductListing/ProductListing.js'
import ProductDetails from './pages/ProductDetails/ProductDetails.js';
import Profile from './pages/Profile/Profile.js'
import Messages from './pages/Messages/Messages.js'
import Orders from './pages/Orders/Orders.js'
import Cart from './pages/Cart/Cart.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/products" element={<ProductListing />}></Route>
        <Route path="/product-details" element={<ProductDetails />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;