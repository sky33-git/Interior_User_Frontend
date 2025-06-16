import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feature from "./Feature";
import Home from "./Home";
// in main.jsx or App.jsx
import "./index.css"; // or wherever your tailwind directives are
import Gallery from "./Gallery";
import Navbar from "./Navbar";
import Resources from "./Resources";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* <Route path="/" element={<Feature />} /> */}
        <Route path="/feature" element={<Feature />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
}

export default App;
