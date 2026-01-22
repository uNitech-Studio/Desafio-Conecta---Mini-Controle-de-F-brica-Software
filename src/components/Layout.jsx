import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 200, background: "#222", color: "#fff", padding: 20 }}>
        <h2>Fábrica</h2>
        <nav>
          <p><Link to="/">Dashboard</Link></p>
          <p><Link to="/clientes">Clientes</Link></p>
          <p><Link to="/projetos">Projetos</Link></p>
          <p><Link to="/lancamentos">Lançamentos</Link></p>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        {children}
      </main>
    </div>
  );
}
