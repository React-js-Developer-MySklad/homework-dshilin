import './input.css'
import React, { FC, InputHTMLAttributes } from 'react';

type InputProps = {
   label?: string;
   onChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const Input: FC<InputProps> = ({name, label, onChange, ...otherProps}) => (
   <div className="input">
      <label htmlFor={name}>{label}</label>
      <input
         type="text"
         name={name}
         id={name}
         onChange={e => onChange(e.target.value)}
         {...otherProps}
      />
   </div>
);

export default Input;