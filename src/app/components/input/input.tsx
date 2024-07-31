import './input.css'
import React, { FC, InputHTMLAttributes } from 'react';

type InputProps = {
   label?: string;
   onChange?: (value: string) => void;
   error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const Input: FC<InputProps> = ({name, label, error, onChange, ...otherProps}) => (
   <div className={'input' + (error ? ' error' : '')}>
      <label htmlFor={name}>{label}</label>
      <input
         type="text"
         name={name}
         id={name}
         onChange={e => onChange(e.target.value)}
         {...otherProps}
      />
       {error && <span>{error}</span>}
   </div>
);

export default Input;