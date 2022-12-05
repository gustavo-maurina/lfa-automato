import { InputHTMLAttributes, forwardRef } from "react";
import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div className="input-wrapper">
        <label htmlFor={rest.name}>{label}</label>
        <input {...rest} ref={ref} className="custom-input"/>
      </div>
    );
  }
);
