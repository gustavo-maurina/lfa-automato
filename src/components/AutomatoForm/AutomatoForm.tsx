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
  setHasPendingChanges: Dispatch<SetStateAction<boolean>>;
}

export const AutomatoForm = ({
  setAutomato,
  setHasPendingChanges,
}: AutomatoFormProps) => {
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
    setHasPendingChanges(true);
    setAutomatoConfig((curr) => ({
      ...curr,
      states: [...new Set([...curr.states, value])],
      initialState: isEmpty(curr.initialState) ? value : curr.initialState,
    }));
  };

  const handleAddAlfabeto = (value: string) => {
    setHasPendingChanges(true);
    setAutomatoConfig((curr) => ({
      ...curr,
      alphabet: [...new Set([...curr.alphabet, value])],
    }));
  };

  const handleAddTransition = (transition: Transition) => {
    if (
      automatoConfig.transitions.find(
        (t) =>
          t.from === transition.from &&
          t.to === transition.to &&
          t.read === transition.read
      )
    ) {
      return;
    }

    setHasPendingChanges(true);
    setAutomatoConfig((curr) => ({
      ...curr,
      transitions: [...curr.transitions, transition],
    }));
  };

  const handleAddFinalStates = (state: string) => {
    setHasPendingChanges(true);
    setAutomatoConfig((curr) => ({
      ...curr,
      finalStates: [...curr.finalStates, state],
    }));
  };

  const handleCanBeEmptyCheck = (checked: boolean) => {
    setHasPendingChanges(true);
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
      return alert("Configura??ao inv??lida, verifique novamente os campos");
    }

    setHasPendingChanges(false);
    setAutomato(automatoConfig);
  };

  return (
    <div className="automato-container">
      <h2>Configura????o do automato</h2>
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
                  onChange={(e) => {
                    setHasPendingChanges(true);
                    setAutomatoConfig((curr) => ({
                      ...curr,
                      initialState: e.target.value,
                    }));
                  }}
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

      <div>
        <Button
          className="submit-automato-button"
          type="submit"
          onClick={handleSubmit}
        >
          Confirmar automato
        </Button>
        <p style={{ lineHeight: 0, fontSize: 14, color: "gray" }}>
          Obs: confirmar automato sempre que houver uma mudan??a
        </p>
      </div>
    </div>
  );
};
