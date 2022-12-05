import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Automato } from "../../types/Automato";
import "./styles.css";

type AutomatoDetailsProps = {
  automato: Automato;
};

export const AutomatoDetails = ({ automato }: AutomatoDetailsProps) => {
  return (
    <div className="automato-details-container">
      <ul>
        <li>
          <strong>Estados</strong>: [ {automato.states.join(", ")} ]
        </li>
        <li>
          <strong>Alfabeto</strong>: [ {automato.alphabet.join(", ")} ]
        </li>
        <li>
          <strong>Transições</strong>:
          <ul>
            {automato.transitions.map(({ from, read, to }, i) => (
              <li className="transition-container" key={i}>
                <span className="from-text"></span> {from} <ArrowRightIcon />
                <span className="to-text"></span> {to} (
                <span className="read-text">ler</span> {read})
              </li>
            ))}
          </ul>
        </li>
        <li>
          <strong>Estado inicial</strong>: {automato.initialState}
        </li>
        <li>
          <strong>Estados finais</strong>: [ {automato.finalStates.join(", ")} ]
        </li>
        <li>
          <strong> Pode ser vazio?</strong>{" "}
          {automato.canBeEmpty ? (
            <span className="read-text">Sim</span>
          ) : (
            <span className="to-text">Não</span>
          )}
        </li>
      </ul>
    </div>
  );
};
