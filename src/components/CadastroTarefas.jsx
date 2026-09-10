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

        setTarefas((prev) => [...prev, { id: proximoId++, ...form }]);
        setForm({ nome: "", data: "", descricao: "", prioridade: "BAIXA" });
        setErro("");
    }

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

                {tarefas.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-stone-300 py-10 text-center text-stone-400">
                        Nenhuma tarefa cadastrada ainda.
                    </div>
                ) : (
                    <div className="flex flex-col gap-2.5">
                        {tarefas.map((t) => {
                            const cor = corPrioridade(t.prioridade);
                            const label = PRIORIDADES.find((p) => p.valor === t.prioridade)?.label ?? t.prioridade;
                            return (
                                <div
                                    key={t.id}
                                    style={{ borderLeftColor: cor }}
                                    className="rounded-lg border border-stone-200 border-l-4 bg-white p-4"
                                >
                                    <div className="mb-1 flex items-center gap-2.5">
                                        <span className="text-[15px] font-semibold">{t.nome}</span>
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
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
