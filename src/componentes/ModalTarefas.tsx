import { useState } from "react";

interface ModalTarefaProps {
  aoFechar: () => void;
  aoAdicionar: (descricao: string) => void;
}

export default function ModalTarefa({ aoFechar, aoAdicionar }: ModalTarefaProps) {
  const [descricao, setDescricao] = useState("");

  function adicionarTarefa() {
    if (descricao.trim() !== "") {
      aoAdicionar(descricao);
      aoFechar(); 
    }
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md">
        <input
          type="text"
          placeholder="Adicionar Tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-2 w-full mb-2 placeholder-black text-black"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={aoFechar} className="bg-pink-300 px-4 py-2 rounded cursor-pointer">Cancelar</button>
          <button onClick={adicionarTarefa} className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer">Adicionar</button>
        </div>
      </div>
    </div>
  );
}
