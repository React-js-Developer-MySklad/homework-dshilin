import { FormEvent, useRef } from 'react';
import Input from '../input/input';
import './contragent-add-panel.css'


export type Contragent = {
    id?: string;
    name?: string;
    inn?: string;
    address?: string;
    kpp?: string;
}

export type ContragentAddPanelProps = {
    onContragentSave: Function;
    agent: Contragent;
}

const ContragentAddPanel = ({onContragentSave, agent}: ContragentAddPanelProps) => {
    const nameRef = useRef<HTMLInputElement>();
    const innRef = useRef<HTMLInputElement>();
    const addressRef = useRef<HTMLInputElement>();
    const kppRef = useRef<HTMLInputElement>();

    const saveContragent = (e: FormEvent) => {
        e.preventDefault();
        onContragentSave({
            id: agent?.id || Math.floor(Math.random() * 1000),
            name: nameRef.current?.value,
            inn: innRef.current?.value,
            address: addressRef.current?.value,
            kpp: kppRef.current?.value
        });
    }

    return (
        <form id="contragent-add-form" className="contragent-add-form" onSubmit={saveContragent}>
            <Input label="Наименование" required={true}
                   name="contragent-add-name" form="contragent-add-form"
                   value={agent?.name} ref={nameRef}/>
            <Input label="ИНН" pattern="^\d{10}$|^\d{12}$" title="Число, 10 или 12 знаков" required={true}
                   name="contragent-add-inn" form="contragent-add-form"
                   value={agent?.inn} ref={innRef}/>
            <Input label="Адрес" required={true}
                   name="contragent-add-address" form="contragent-add-form"
                   value={agent?.address} ref={addressRef}/>
            <Input label="КПП" pattern="^\d{9}" title="Число, 9 знаков" required={true}
                   name="contragent-add-kpp" form="contragent-add-form"
                   value={agent?.kpp} ref={kppRef}/>
            <button type="submit">Сохранить</button>
        </form>
    );
}

export default ContragentAddPanel;