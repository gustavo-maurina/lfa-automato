import { Automato } from "../types/Automato";

// exemplo de automato finito deterministico
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
		{from: 'q3', to: 'q3', read: '0'},
		{from: 'q3', to: 'q3', read: '1'},
	],
	initialState: 'q0',
	finalStates: ['q3'],
	canBeEmpty: true,
};

const entrada = ['1', '&', '0', '1'];

export function verificarPertencimento(automato: Automato, entrada: string[]) {
	let estadoAtual = automato.initialState;
	let estadosFinais = automato.finalStates;

	for (let i = 0; i < entrada.length; i++) {
		if (automato.canBeEmpty && entrada.length == 1 && entrada[i] == '&') {
			return true;
		} else if (!automato.canBeEmpty && entrada.length == 1 && entrada[i] == '&') {
			return false;
		}
		if (automato.alphabet.includes(entrada[i]) || entrada[i] == '&') {
			if (entrada[i] == '&') continue;
			let transicao = automato.transitions.find(t => t.from === estadoAtual && t.read === entrada[i]);

      if(!transicao) {
        throw new Error('transicao nao encontrada')
      }

			if (estadosFinais.includes(transicao.to)) {
				return true;
			} else if (transicao) {
				estadoAtual = transicao.to;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
