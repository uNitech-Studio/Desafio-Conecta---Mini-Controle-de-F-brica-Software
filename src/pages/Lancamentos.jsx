import { useEffect, useState } from "react";
import api from "../services/api";

export default function Lancamentos() {
  const [lancamentos, setLancamentos] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [filtroProjeto, setFiltroProjeto] = useState("");
  const [filtroInicio, setFiltroInicio] = useState("");
  const [filtroFim, setFiltroFim] = useState("");

  const [form, setForm] = useState({
    projeto_id: "",
    colaborador: "",
    data: "",
    horas: "",
    tipo: "corretiva",
    descricao: ""
  });

  useEffect(() => {
    carregar();
  }, []);

  function carregar() {
    api.get("/lancamentos", {
      params: {
        projeto_id: filtroProjeto,
        inicio: filtroInicio,
        fim: filtroFim
      }
    }).then(r => setLancamentos(r.data));

    api.get("/projetos").then(r => setProjetos(r.data));
  }

  function handleSubmit(e) {
    e.preventDefault();
    api.post("/lancamentos", form).then(() => {
      setForm({
        projeto_id: "",
        colaborador: "",
        data: "",
        horas: "",
        tipo: "corretiva",
        descricao: ""
      });
      carregar();
    });
  }

  return (
    <div>
      <h1>Lançamentos</h1>

      <h3>Filtros</h3>
      <select value={filtroProjeto} onChange={e => setFiltroProjeto(e.target.value)}>
        <option value="">Todos os projetos</option>
        {projetos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
      </select>

      <input type="date" value={filtroInicio} onChange={e => setFiltroInicio(e.target.value)} />
      <input type="date" value={filtroFim} onChange={e => setFiltroFim(e.target.value)} />
      <button onClick={carregar}>Filtrar</button>

      <hr />

      <form onSubmit={handleSubmit}>
        <select required value={form.projeto_id}
          onChange={e => setForm({ ...form, projeto_id: e.target.value })}>
          <option value="">Selecione projeto</option>
          {projetos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>

        <input placeholder="Colaborador" required
          value={form.colaborador}
          onChange={e => setForm({ ...form, colaborador: e.target.value })} />

        <input type="date" required
          value={form.data}
          onChange={e => setForm({ ...form, data: e.target.value })} />

        <input type="number" step="0.1" required placeholder="Horas"
          value={form.horas}
          onChange={e => setForm({ ...form, horas: e.target.value })} />

        <select value={form.tipo}
          onChange={e => setForm({ ...form, tipo: e.target.value })}>
          <option value="corretiva">Corretiva</option>
          <option value="evolutiva">Evolutiva</option>
          <option value="implantacao">Implantação</option>
          <option value="legislativa">Legislativa</option>
        </select>

        <input placeholder="Descrição"
          value={form.descricao}
          onChange={e => setForm({ ...form, descricao: e.target.value })} />

        <button type="submit">Salvar</button>
      </form>

      <ul>
        {lancamentos.map(l => (
          <li key={l.id}>
            {l.colaborador} - {l.horas}h ({l.tipo})
          </li>
        ))}
      </ul>
    </div>
  );
}
