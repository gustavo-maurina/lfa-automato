import { Dispatch, SetStateAction, useRef } from "react";
import { Automato } from "../../types/Automato";
import { Button } from "../Button";
import { Input } from "../Input";
import "./styles.css";

type StringAdderInputProps = {
  onAddString: (estado: string) => void;
  label: string;
  placeholder?: string;
};

export const StringAdderInput = ({
  onAddString,
  label,
  placeholder,
}: StringAdderInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onAdd = () => {
    if (!inputRef.current) return;

    if (inputRef.current.value.length > 0) {
      onAddString(inputRef.current.value);
      inputRef.current.value = "";
      inputRef.current.focus()
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <Input ref={inputRef} label={label} placeholder={placeholder} />
      </div>
      <Button type="button" className="plus-button" onClick={onAdd}>
        +
      </Button>
    </div>
  );
};
