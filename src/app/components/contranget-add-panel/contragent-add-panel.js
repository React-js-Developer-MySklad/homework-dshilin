import Input from "@components/input/input";
import {createRef} from "@tiny-ui/ref";

import './contragent-add-panel.css'

const ContragentAddPanel = ({onContragentSave, agent}) => {
    const nameRef = createRef();
    const innRef = createRef();
    const addressRef = createRef();
    const kppRef = createRef();

    const saveContragent = e => {
        e.preventDefault();
        onContragentSave({
            id: agent?.id || Math.floor(Math.random() * 1000),
            name: nameRef.htmlElement.value,
            inn: innRef.htmlElement.value,
            address: addressRef.htmlElement.value,
            kpp: kppRef.htmlElement.value
        });
    }

    return (
        <form id="contragent-add-form" class="contragent-add-form" onSubmit={saveContragent}>
            <Input name="contragent-add-name" label="Наименование" value={agent?.name} required={true} ref={nameRef} form="contragent-add-form"/>
            <Input name="contragent-add-inn" label="ИНН" value={agent?.inn} pattern="^\d{10}$|^\d{12}$" title="Число, 10 или 12 знаков" required={true} ref={innRef} form="contragent-add-form"/>
            <Input name="contragent-add-address" label="Адрес" value={agent?.address} required={true} ref={addressRef} form="contragent-add-form"/>
            <Input name="contragent-add-kpp" label="КПП" value={agent?.kpp} pattern="^\d{9}" title="Число, 9 знаков" required={true} ref={kppRef} form="contragent-add-form"/>
            <button type="submit">Сохранить</button>
        </form>
    );
}

export default ContragentAddPanel;