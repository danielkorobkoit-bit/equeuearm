import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Привет, GitHub Pages!</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Главная страница</div>} />
        <Route path="/about" element={<div>О проекте</div>} />
      </Routes>
    </div>
  );
}
