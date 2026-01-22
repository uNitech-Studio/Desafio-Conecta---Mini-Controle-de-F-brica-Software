import { useEffect, useState } from "react";
import api from "../services/api";

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    cliente_id: "",
    nome: "",
    descricao: "",
    data_inicio: "",
    data_fim: "",
    valor_contrato: "",
    custo_hora_base: "",
    status: "planejado"
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregar();
  }, []);

  function carregar() {
    api.get("/projetos").then(r => setProjetos(r.data));
    api.get("/clientes").then(r => setClientes(r.data));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editandoId) {
      api.put(`/projetos/${editandoId}`, form).then(() => {
        setEditandoId(null);
        limpar();
        carregar();
      });
    } else {
      api.post("/projetos", form).then(() => {
        limpar();
        carregar();
      });
    }
  }

  function editar(p) {
    setEditandoId(p.id);
    setForm(p);
  }

  function excluir(id) {
    if (confirm("Excluir projeto?")) {
      api.delete(`/projetos/${id}`).then(carregar);
    }
  }

  function limpar() {
    setForm({
      cliente_id: "",
      nome: "",
      descricao: "",
      data_inicio: "",
      data_fim: "",
      valor_contrato: "",
      custo_hora_base: "",
      status: "planejado"
    });
  }

  return (
    <div>
      <h1>Projetos</h1>

      <form onSubmit={handleSubmit}>
        <select required value={form.cliente_id}
          onChange={e => setForm({ ...form, cliente_id: e.target.value })}>
          <option value="">Selecione o cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>

        <input placeholder="Nome" required value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })} />

        <input placeholder="Descrição" value={form.descricao}
          onChange={e => setForm({ ...form, descricao: e.target.value })} />

        <input type="date" required value={form.data_inicio}
          onChange={e => setForm({ ...form, data_inicio: e.target.value })} />

        <input type="date" value={form.data_fim}
          onChange={e => setForm({ ...form, data_fim: e.target.value })} />

        <input type="number" step="0.01" required placeholder="Valor contrato"
          value={form.valor_contrato}
          onChange={e => setForm({ ...form, valor_contrato: e.target.value })} />

        <input type="number" step="0.01" required placeholder="Custo hora base"
          value={form.custo_hora_base}
          onChange={e => setForm({ ...form, custo_hora_base: e.target.value })} />

        <select value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}>
          <option value="planejado">Planejado</option>
          <option value="em_andamento">Em andamento</option>
          <option value="pausado">Pausado</option>
          <option value="finalizado">Finalizado</option>
        </select>

        <button type="submit">
          {editandoId ? "Atualizar" : "Salvar"}
        </button>
      </form>

      <ul>
        {projetos.map(p => (
          <li key={p.id}>
            {p.nome} - {p.status}
            <button onClick={() => editar(p)}>Editar</button>
            <button onClick={() => excluir(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
