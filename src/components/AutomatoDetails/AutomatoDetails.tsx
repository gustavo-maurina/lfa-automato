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
        <li>Estados: [ {automato.states.join(", ")} ]</li>
        <li>Alfabeto: [ {automato.alphabet.join(", ")} ]</li>
        <li>
          Transições:
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
        <li>Estado inicial: {automato.initialState}</li>
        <li>Estados finais: [ {automato.finalStates.join(", ")} ]</li>
        <li>
          Pode ser vazio?{" "}
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
