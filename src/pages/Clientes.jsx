import { useEffect, useState } from "react";
import api from "../services/api";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregarClientes();
  }, []);

  function carregarClientes() {
    api.get("/clientes", { params: { busca } })
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editandoId) {
      api.put(`/clientes/${editandoId}`, form).then(() => {
        setEditandoId(null);
        setForm({ nome: "", email: "", telefone: "" });
        carregarClientes();
      });
    } else {
      api.post("/clientes", form).then(() => {
        setForm({ nome: "", email: "", telefone: "" });
        carregarClientes();
      });
    }
  }

  function editar(cliente) {
    setEditandoId(cliente.id);
    setForm(cliente);
  }

  function excluir(id) {
    if (confirm("Deseja excluir?")) {
      api.delete(`/clientes/${id}`).then(carregarClientes);
    }
  }

  return (
    <div>
      <h1>Clientes</h1>

      <input
        placeholder="Buscar por nome/email"
        value={busca}
        onChange={e => setBusca(e.target.value)}
        onKeyUp={carregarClientes}
      />

      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })} required />

        <input placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} required />

        <input placeholder="Telefone" value={form.telefone}
          onChange={e => setForm({ ...form, telefone: e.target.value })} />

        <button type="submit">{editandoId ? "Atualizar" : "Salvar"}</button>
      </form>

      <ul>
        {clientes.map(c => (
          <li key={c.id}>
            {c.nome} - {c.email}
            <button onClick={() => editar(c)}>Editar</button>
            <button onClick={() => excluir(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
