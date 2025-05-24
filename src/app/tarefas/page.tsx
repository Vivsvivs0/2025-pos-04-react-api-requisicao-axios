"use client";

import type React from "react";
import { useEffect, useState } from "react";
import dados, { TarefaInterface } from "@/data";
import ModalTarefa from "@/componentes/ModalTarefas";
import Cabecalho from "@/componentes/Cabecalho";


interface TarefaProps {
	titulo: string;
	concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
	const [estaConcluido, setEstaConcluido] = useState(concluido);

	const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
		estaConcluido
			? "bg-pink-800 hover:border-pink-800"
			: "bg-pink-400 hover:border-pink-400"
	}`;

	const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

	const escutarClique = () => {
		console.log(`A tarefa '${titulo}' foi clicada!`);
		setEstaConcluido(!estaConcluido);
	};

	return (
		<div className={classeCard} onClick={() => escutarClique()}>
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{estaConcluido ? "Concluída" : "Pendente"}
			</p>
		</div>
	);
};

interface TareafasProps {
	dados: TarefaInterface[];
}

const Tarefas: React.FC<TareafasProps> = ({ dados }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{dados.map((tarefa) => (
				<Tarefa
					key={tarefa.id}
					titulo={tarefa.title}
					concluido={tarefa.completed}
				/>
			))}
		</div>
	);
};

export default function Home() {
	const [tarefas, setTarefas] = useState<TarefaInterface[]>(dados);
	const [mostrarModal, setMostrarModal] = useState(false);
  
	const adicionarTarefa = (titulo: string) => {
	  const novaTarefa: TarefaInterface = {
		id: tarefas.length + 1,
		title: titulo,
		completed: false,
	  };
	  setTarefas([...tarefas, novaTarefa]);
	};
  
	return (
	  <div className="container mx-auto p-4">
		<Cabecalho />
  
		<button
		  onClick={() => setMostrarModal(true)}
		  className="bg-pink-700 text-white px-4 py-2 rounded mb-4 hover:bg-pink-800 cursor-pointer"
		>
		  Nova Tarefa
		</button>
  
		<Tarefas dados={tarefas} />
  
		{mostrarModal && (
		  <ModalTarefa
			aoFechar={() => setMostrarModal(false)}
			aoAdicionar={adicionarTarefa}
		  />
		)}
	  </div>
	);
  }