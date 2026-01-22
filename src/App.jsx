import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clientes from "./pages/Clientes";
import Projetos from "./pages/Projetos";
import Lancamentos from "./pages/Lancamentos";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/lancamentos" element={<Lancamentos />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
