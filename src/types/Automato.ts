import { Transition } from "./Transition";

export type Automato = {
  states: string[];
	alphabet: string[];
	transitions: Transition[],
	initialState: string;
	finalStates: string[];
	canBeEmpty: boolean;
}