import { ButtonHTMLAttributes, HTMLProps } from "react"
import './styles.css'

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} />
}