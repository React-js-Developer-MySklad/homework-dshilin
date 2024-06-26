import './input.css'

const Input = ({name, label, pattern, title, value, placeholder, required, ref, form}) => (
    <div class="input">
        <label htmlFor={name}>{label}</label>
        <input
            type="text"
            ref={ref}
            name={name}
            pattern={pattern}
            title={title}
            value={value}
            placeholder={placeholder}
            required={required}
            form={form}
        />
    </div>
);

export default Input;