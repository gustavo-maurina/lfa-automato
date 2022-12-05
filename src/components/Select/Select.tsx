import { SelectHTMLAttributes, forwardRef } from "react";
import "./styles.css";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>((props, ref) => {
  return <select {...props} ref={ref} />;
});
