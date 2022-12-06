import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Automato } from "../../types/Automato";
import { isEmpty } from "../../utils/isEmpty";
import { verificarPertencimento } from "../../utils/verificarPertencimentos";
import { Button } from "../Button";
import { Input } from "../Input";
import "./styles.css";

type EntradaFormProps = {
  automato: Automato;
};

export const EntradaForm = ({ automato }: EntradaFormProps) => {
  const [isValid, setIsValid] = useState<boolean>();
  const inputArray = useRef<string[]>();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    inputArray.current = e.target.value.split("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputArray.current) return;

    const entrada = isEmpty(inputArray.current) ? ['&'] : inputArray.current

    if (verificarPertencimento(automato, entrada)) {
      setIsValid(true);
      return;
    }

    setIsValid(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Validar entrada</h2>
        <Input label="Entrada" onChange={handleInput}/>

        <Button type="submit">Testar entrada</Button>
      </form>

     {isValid !== undefined && <h2 style={{ lineHeight: 0, marginTop: 55 }}>
        A entrada é{" "}
        {isValid ? (
          <span className="success-text">válida</span>
        ) : (
          <span className="error-text">inválida</span>
        )}
      </h2>}
    </div>
  );
};
