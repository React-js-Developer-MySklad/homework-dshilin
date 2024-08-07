import { FC, FormEvent, useState } from 'react';
import Input from '../input/input';
import {Contragent} from "../../../types";
import './contragent-form.css'

type ContragentFormProps = {
    agent?: Contragent;
    onSave: (agent: Contragent) => void;
}

const ContragentForm: FC<ContragentFormProps> = ({agent, onSave}) => {
    const [name, setName] = useState(agent?.name || '');
    const [inn, setInn] = useState(agent?.inn || '');
    const [address, setAddress] = useState(agent?.address || '');
    const [kpp, setKpp] = useState(agent?.kpp || '');

    const saveContragent = (e: FormEvent) => {
        e.preventDefault();
        onSave({
            id: agent?.id,
            name, inn, address, kpp
        })
    }

    return (
        <form id="contragent-add-form" className="contragent-add-form" onSubmit={saveContragent} data-testid="contragent-add-form">
            <Input label="Наименование" required={true}
                   name="contragent-add-name" form="contragent-add-form"
                   value={name} onChange={setName}/>
            <Input label="ИНН" pattern="^\d{10}$|^\d{12}$" title="Число, 10 или 12 знаков" required={true}
                   name="contragent-add-inn" form="contragent-add-form"
                   value={inn} onChange={setInn}/>
            <Input label="Адрес" required={true}
                   name="contragent-add-address" form="contragent-add-form"
                   value={address} onChange={setAddress}/>
            <Input label="КПП" pattern="^\d{9}" title="Число, 9 знаков" required={true}
                   name="contragent-add-kpp" form="contragent-add-form"
                   value={kpp} onChange={setKpp}/>
            <button type="submit">Сохранить</button>
        </form>
    );
}

export default ContragentForm;