import { useRef } from "react";
import { Transition } from "../../types/Transition";
import { Button } from "../Button";
import { Input } from "../Input";
import { Select } from "../Select";
import "./styles.css";

type TransitionInputProps = {
  states: string[];
  alphabet: string[];
  handleAdd: (transition: Transition) => void;
};

export const TransitionsInput = ({
  states,
  alphabet,
  handleAdd,
}: TransitionInputProps) => {
  const currentTransitionRef = useRef<Transition>();
  const fromRef = useRef<HTMLSelectElement>(null);
  const toRef = useRef<HTMLSelectElement>(null);
  const readRef = useRef<HTMLSelectElement>(null);

  const handleAddTransition = () => {
    if (!(fromRef.current && toRef.current && readRef.current)) return;

    currentTransitionRef.current = {
      from: fromRef.current.value,
      to: toRef.current.value,
      read: readRef.current.value,
    };

    handleAdd(currentTransitionRef.current);
  };

  return (
    <div className="transitions-container">
      <div>
        <label htmlFor="transitions">Transições</label>
      </div>

      <div className="trans-input-wrapper">
        De
        <Select name="transitions" ref={fromRef}>
          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </Select>

        Para
        <Select name="transitions" ref={toRef}>
          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </Select>

        Ler
        <Select name="transitions" ref={readRef}>
          {alphabet.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </Select>

        <Button
          type="button"
          onClick={handleAddTransition}
          className="trans-button"
        >
          +
        </Button>
      </div>
    </div>
  );
};
