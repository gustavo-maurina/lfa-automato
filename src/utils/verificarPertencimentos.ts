import { Automato } from "../types/Automato";
import { Transition } from "../types/Transition";


const automato = {
	states: ['q0', 'q1', 'q2', 'q3'],
	alphabet: ['0', '1'],
	transitions: [
		{from: 'q0', to: 'q1', read: '0'},
		{from: 'q0', to: 'q2', read: '1'},
		{from: 'q1', to: 'q2', read: '0'},
		{from: 'q1', to: 'q3', read: '1'},
		{from: 'q2', to: 'q1', read: '0'},
		{from: 'q2', to: 'q2', read: '1'},
		{from: 'q3', to: 'q2', read: '0'},
		{from: 'q3', to: 'q3', read: '0'},
		{from: 'q3', to: 'q3', read: '1'},
	],
	initialState: 'q0',
	finalStates: ['q3'],
	canBeEmpty: true,
};

const entrada = ['&', '1', '&', '1', '0', '1', '1', '0'];

export function verificarPertencimento(automato: Automato, entrada: string[]) {
	let estadoAtual = automato.initialState;
	let estadosFinais = automato.finalStates;

	console.log(automato, entrada);


	for (let i = 0; i < entrada.length; i++) {
		let transicaoAnterior = automato.transitions.find(t => t.to === estadoAtual && t.read === entrada[i - 1]);
		let transicao = automato.transitions.find(t => t.from === estadoAtual && t.read === entrada[i]);
		let transicoes = automato.transitions
			.map(t => {
				if (t.from === estadoAtual && t.read === entrada[i]) {
					return t;
				}
			})
			.filter(t => t !== undefined) as Transition[];

		if (automato.canBeEmpty && entrada.length == 1 && entrada[i] == '&') {
			return true;
		} else if (!automato.canBeEmpty && entrada.length == 1 && entrada[i] == '&') {
			return false;
		} else if (entrada[i] == '&' && i == entrada.length - 1) {
			if (!estadosFinais.includes(transicaoAnterior?.to)) {
				return false;
			}
			return true;
		}
		if (automato.alphabet.includes(entrada[i]) || entrada[i] == '&') {
			if (entrada[i] == '&') continue;
			if (transicoes.length > 1) {
				let res = transicoes.map(nt => {
					return estadosFinais.includes(nt.to)
						? true
						: verificarPertencimento({...automato, initialState: nt.from}, entrada.slice(i + 1));
				});
				if (res.some(r => r == true)) {
					return true;
				} else {
					return false;
				}
			} else {
				if (estadosFinais.includes(transicao?.to)) {
					if (i < entrada.length - 1 && entrada.length > 1) {
						estadoAtual = transicao?.to;
						continue;
					}
					return true;
				} else if (transicao) {
					estadoAtual = transicao.to;
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	}
}

