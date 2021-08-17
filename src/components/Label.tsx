import { FC } from 'react'

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const Label: FC<LabelProps> = ({ children, className, ...props }) => (
  <label
    className={`${className} block font-medium text-sm text-gray-700`}
    {...props}>
    {children}
  </label>
)

export default Label
