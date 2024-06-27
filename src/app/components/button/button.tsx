import './button.css';
import {MouseEventHandler} from 'react';

type ButtonProps = {
    icon: string;
    iconAlt: string;
    text?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({icon, iconAlt, text, onClick} : ButtonProps) => (
    <button className="button" type="button" onClick={onClick}>
        <img src={icon} alt={iconAlt}/>
        {text}
    </button>
);

export default Button;
