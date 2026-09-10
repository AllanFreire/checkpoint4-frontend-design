import { useState } from "react";
import { PRIORIDADES } from "../prioridades";

function formatarData(iso) {
    if (!iso) return "";
    const [ano, mes, dia] = iso.split("-");
    return `${ano}/${mes}/${dia}`;
}

function corPrioridade(valor) {
    const p = PRIORIDADES.find((p) => p.valor === valor);
    return p ? p.cor : "#78716c";
}

let proximoId = 1;

export default function CadastroTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [erro, setErro] = useState("");
    const [filtro, setFiltro] = useState("TODAS");
    const [form, setForm] = useState({
        nome: "",
        data: "",
        descricao: "",
        prioridade: "BAIXA",
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.nome) {
            setErro("Informe um nome para a tarefa.");
            return;
        }
        if (!form.data) {
            setErro("Informe uma data para a tarefa.");
            return;
        }

        setTarefas((prev) => [...prev, { id: proximoId++, concluida: false, ...form }]);
        setForm({ nome: "", data: "", descricao: "", prioridade: "BAIXA" });
        setErro("");
    }

    function alternarConcluida(id) {
        setTarefas((prev) =>
            prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
        );
    }

    function excluirTarefa(id) {
        setTarefas((prev) => prev.filter((t) => t.id !== id));
    }

    const tarefasFiltradas = tarefas.filter((tarefa) => {
        if (filtro === "PENDENTES") return !tarefa.concluida;
        if (filtro === "CONCLUIDAS") return tarefa.concluida;
        return true;
    });

    return (
        <div className="min-h-screen bg-stone-50 px-5 py-12 text-stone-800">
            <div className="mx-auto max-w-2xl">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Cadastro de tarefas
                    </h1>
                    <p className="mt-1.5 text-sm text-stone-500">
                        Adicione suas tarefas com prioridade.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-stone-200 bg-white p-6">
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-stone-500">
                                Nome
                            </label>
                            <input
                                type="text"
                                value={form.nome}
                                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                placeholder="Ex: Revisar relatório"
                                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-stone-500">
                                Data
                            </label>
                            <input
                                type="date"
                                value={form.data}
                                onChange={(e) => setForm({ ...form, data: e.target.value })}
                                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-1.5 block text-xs font-semibold text-stone-500">
                            Descrição
                        </label>
                        <textarea
                            value={form.descricao}
                            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                            placeholder="Detalhes da tarefa (opcional)"
                            rows={3}
                            className="w-full resize-y rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
                        />
                    </div>

                    <div className={erro ? "mb-3" : "mb-5"}>
                        <label className="mb-1.5 block text-xs font-semibold text-stone-500">
                            Nível de prioridade
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {PRIORIDADES.map((p) => {
                                const ativo = form.prioridade === p.valor;
                                return (
                                    <button
                                        type="button"
                                        key={p.valor}
                                        onClick={() => setForm({ ...form, prioridade: p.valor })}
                                        style={
                                            ativo
                                                ? { borderColor: p.cor, color: p.cor, backgroundColor: `${p.cor}14` }
                                                : undefined
                                        }
                                        className={
                                            ativo
                                                ? "rounded-lg border px-3.5 py-2 text-sm font-semibold"
                                                : "rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-sm font-semibold text-stone-500"
                                        }
                                    >
                                        {p.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {erro && <p className="mb-4 text-sm text-red-600">{erro}</p>}

                    <button
                        type="submit"
                        className="flex items-center gap-1.5 rounded-lg bg-stone-800 px-4 py-2.5 text-sm font-semibold text-stone-50"
                    >
                        + Adicionar tarefa
                    </button>
                </form>

                <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-sm font-semibold text-stone-500">Mostrar:</span>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { valor: "TODAS", label: "Todas" },
                            { valor: "PENDENTES", label: "Pendentes" },
                            { valor: "CONCLUIDAS", label: "Conclu\u00eddas" },
                        ].map(({ valor, label }) => (
                            <button
                                type="button"
                                key={valor}
                                onClick={() => setFiltro(valor)}
                                aria-pressed={filtro === valor}
                                className={
                                    filtro === valor
                                        ? "rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-semibold text-stone-50"
                                        : "rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm font-semibold text-stone-500 hover:border-stone-400"
                                }
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {tarefasFiltradas.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-stone-300 py-10 text-center text-stone-400">
                        {tarefas.length === 0 ? "Nenhuma tarefa cadastrada ainda." : "Nenhuma tarefa encontrada para este filtro."}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2.5">
                        {tarefasFiltradas.map((t) => {
                            const cor = corPrioridade(t.prioridade);
                            const label = PRIORIDADES.find((p) => p.valor === t.prioridade)?.label ?? t.prioridade;
                            return (
                                <div
                                    key={t.id}
                                    style={{ borderLeftColor: cor }}
                                    className={
                                        t.concluida
                                            ? "flex items-start justify-between gap-3 rounded-lg border border-stone-200 border-l-4 bg-white p-4 opacity-60"
                                            : "flex items-start justify-between gap-3 rounded-lg border border-stone-200 border-l-4 bg-white p-4"
                                    }
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center gap-2.5">
                                            <span
                                                className={
                                                    t.concluida
                                                        ? "text-[15px] font-semibold line-through decoration-stone-400"
                                                        : "text-[15px] font-semibold"
                                                }
                                            >
                                                {t.nome}
                                            </span>
                                            <span
                                                style={{ backgroundColor: `${cor}1f`, color: cor }}
                                                className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                                            >
                                                {label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[13px] text-stone-400">
                                            {formatarData(t.data)}
                                        </div>
                                        {t.descricao && (
                                            <p className="mt-1.5 text-[13.5px] leading-relaxed text-stone-600">
                                                {t.descricao}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex shrink-0 items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => alternarConcluida(t.id)}
                                            title={t.concluida ? "Marcar como pendente" : "Marcar como concluída"}
                                            className={
                                                t.concluida
                                                    ? "flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600"
                                                    : "flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 transition-colors hover:border-emerald-300 hover:text-emerald-600"
                                            }
                                        >
                                            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                                                <path
                                                    d="M4 10.5l3.5 3.5L16 6"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => excluirTarefa(t.id)}
                                            title="Excluir tarefa"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 transition-colors hover:border-red-300 hover:text-red-600"
                                        >
                                            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                                                <path
                                                    d="M5 6h10M8 6V4.5A1.5 1.5 0 019.5 3h1A1.5 1.5 0 0112 4.5V6m-6 0v9a1.5 1.5 0 001.5 1.5h5A1.5 1.5 0 0014 15V6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
