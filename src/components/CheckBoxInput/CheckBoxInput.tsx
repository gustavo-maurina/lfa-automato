import { useRef } from "react";
import "./styles.css";

type CheckBoxInputProps = {
  onCheck: (checked: boolean) => void;
};

export const CheckBoxInput = ({ onCheck }: CheckBoxInputProps) => {
  const yesRef = useRef<HTMLInputElement>(null);
  const noRef = useRef<HTMLInputElement>(null);

  const handleYesCheck = () => {
    if (!yesRef.current || !noRef.current) return;

    noRef.current.checked = false;
    onCheck(true);
  };

  const handleNoCheck = () => {
    if (!noRef.current || !yesRef.current) return;

    yesRef.current.checked = false;
    onCheck(false);
  };

  return (
    <div className="checkboxes-container">
      <label>Pode ser vazio?</label>

      <div className="options-container">
        <div className="checkbox-container">
          <input type="checkbox" onChange={handleYesCheck} ref={yesRef} />
          <label>Sim</label>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            onChange={handleNoCheck}
            ref={noRef}
            defaultChecked
          />
          <label>Não</label>
        </div>
      </div>
    </div>
  );
};
