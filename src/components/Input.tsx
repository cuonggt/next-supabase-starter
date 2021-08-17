import { FC } from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input: FC<InputProps> = ({ disabled = false, className, ...props }) => (
  <input
    disabled={disabled}
    className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
    {...props}
  />
)

export default Input
