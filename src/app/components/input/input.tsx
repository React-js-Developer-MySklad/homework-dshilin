import './input.css'
import React, { FC, InputHTMLAttributes, RefAttributes, useState } from 'react';

type InputProps = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>

const Input: FC<InputProps & RefAttributes<HTMLInputElement>> = React.forwardRef<HTMLInputElement, InputProps>(
   ({name, label, value: defaultValue , ...otherProps}, ref) => {
      const [value, setValue] = useState(defaultValue)
      return (
         <div className="input">
            <label htmlFor={name}>{label}</label>
            <input
               type="text"
               name={name}
               value={value}
               onChange={e => setValue(e.target.value)}
               {...otherProps}
               ref={ref}
            />
         </div>
      )
   }
);

export default Input;