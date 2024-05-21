import './button.css'


const Button = ({icon, iconAlt, text, onClick}) => (
    <button class="button" type="button" onClick={onClick}>
        <img src={icon} alt={iconAlt}/>
        {text}
    </button>
)

export default Button;