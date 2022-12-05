import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Automato } from "../../types/Automato";
import { Button } from "../Button";
import { StringAdderInput } from "../StringAdderInput";
import { Select } from "../Select/Select";
import { TransitionsInput } from "../TransitionsInput";
import { Transition } from "../../types/Transition";
import { FinalStatesInput } from "../FinalStatesInput";
import "./styles.css";
import { CheckBoxInput } from "../CheckBoxInput/CheckBoxInput";
import { AutomatoDetails } from "../AutomatoDetails";
import { isEmpty } from "../../utils/isEmpty";

interface AutomatoFormProps {
  setAutomato: Dispatch<SetStateAction<Automato | undefined>>;
}

export const AutomatoForm = ({ setAutomato }: AutomatoFormProps) => {
  const [automatoConfig, setAutomatoConfig] = useState<Automato>({
    states: [],
    alphabet: [],
    transitions: [],
    finalStates: [],
    initialState: "",
    canBeEmpty: false,
  });

  const shouldShowTransitions = !!(
    automatoConfig.states.length && automatoConfig.alphabet.length
  );

  const possibleFinalStates = automatoConfig.states.filter(
    (state) => !automatoConfig.finalStates.includes(state)
  );



  const handleAddEstado = (value: string) => {
    setAutomatoConfig((curr) => ({
      ...curr,
      states: [...new Set([...curr.states, value])],
      initialState: isEmpty(curr.initialState) ? value : curr.initialState
    }));
  };

  const handleAddAlfabeto = (value: string) => {
    setAutomatoConfig((curr) => ({
      ...curr,
      alphabet: [...new Set([...curr.alphabet, value])],
    }));
  };

  const handleAddTransition = (transition: Transition) => {
    setAutomatoConfig((curr) => ({
      ...curr,
      transitions: [...curr.transitions, transition],
    }));
  };

  const handleAddFinalStates = (state: string) => {
    setAutomatoConfig((curr) => ({
      ...curr,
      finalStates: [...curr.finalStates, state],
    }));
  };

  const handleCanBeEmptyCheck = (checked: boolean) => {
    setAutomatoConfig((curr) => ({
      ...curr,
      canBeEmpty: checked,
    }));
  };

  const handleSubmit = () => {
    if (
      isEmpty(automatoConfig.alphabet) ||
      isEmpty(automatoConfig.states) ||
      isEmpty(automatoConfig.initialState) ||
      isEmpty(automatoConfig.finalStates) ||
      isEmpty(automatoConfig.transitions)
    ) {
      return alert("Configuraçao inválida, verifique novamente os campos");
    }

    console.log(automatoConfig);
    setAutomato(automatoConfig);

  };

  return (
    <div className="automato-container">
      <h2>Configuração do automato</h2>
      <div className="form-and-details-container">
        <form onSubmit={handleSubmit}>
          <StringAdderInput
            label="Estados"
            onAddString={handleAddEstado}
            placeholder='Digite um estado (ex: "q1")'
          />

          <StringAdderInput
            label="Alfabeto"
            onAddString={handleAddAlfabeto}
            placeholder='Digite um caracter do alfabeto (ex: "1")'
          />

          {shouldShowTransitions && (
            <>
              <TransitionsInput
                states={automatoConfig.states}
                alphabet={automatoConfig.alphabet}
                handleAdd={handleAddTransition}
              />

              <div className="initial-state-wrapper">
                <label>Estado inicial</label>
                <Select
                  onChange={(e) =>
                    setAutomatoConfig((curr) => ({
                      ...curr,
                      initialState: e.target.value,
                    }))
                  }
                >
                  {automatoConfig.states.map((state, i) => (
                    <option key={i} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </div>

              <FinalStatesInput
                states={possibleFinalStates}
                handleAddFinalStates={handleAddFinalStates}
              />

              <CheckBoxInput onCheck={handleCanBeEmptyCheck} />
            </>
          )}
        </form>

        <AutomatoDetails automato={automatoConfig} />
      </div>

      <Button
        className="submit-automato-button"
        type="submit"
        onClick={handleSubmit}
      >
        Confirmar automato
      </Button>
    </div>
  );
};
