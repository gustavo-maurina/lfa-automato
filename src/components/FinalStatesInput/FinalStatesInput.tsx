import { useRef } from "react";
import { Button } from "../Button";
import { Select } from "../Select";
import "./styles.css";

type FinalStatesInputProps = {
  states: string[];
  handleAddFinalStates: (state: string) => void;
};

export const FinalStatesInput = ({
  states,
  handleAddFinalStates,
}: FinalStatesInputProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const onAdd = () => {
    if (!selectRef.current || !selectRef.current.value) return;

    handleAddFinalStates(selectRef.current.value);
  };

  return (
    <div className="final-states-container">
      <label>Estados finais</label>

      <div className="final-states-input-container">
        Estado
        <Select ref={selectRef}>
          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </Select>

        <Button type="button" onClick={onAdd}>
          + Adicionar estado final
        </Button>
      </div>
    </div>
  );
};
