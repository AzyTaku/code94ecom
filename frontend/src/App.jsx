import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from "./pages/Favorites";
import MainPage from "./pages/MainPage";
import SearchProducts from "./pages/SearchProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";


function App() {

  return (
    <Router>
      <div className="bg-white w-full overflow-hidden">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/Search" element={<SearchProducts />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/EditProduct/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
