import Input from "@components/input/input";
import {createRef} from "@tiny-ui/ref";

import './contragent-add-panel.css'

const ContragentAddPanel = ({onContragentSave}) => {
    const nameRef = createRef();
    const innRef = createRef();
    const addressRef = createRef();
    const kppRef = createRef();

    const saveContragent = e => {
        e.preventDefault();
        onContragentSave({
            name: nameRef.htmlElement.value,
            inn: innRef.htmlElement.value,
            address: addressRef.htmlElement.value,
            kpp: kppRef.htmlElement.value
        });
        nameRef.htmlElement.value = "";
        innRef.htmlElement.value = "";
        addressRef.htmlElement.value = "";
        kppRef.htmlElement.value = "";
    }

    return (
        <form id="contragent-add-form" class="contragent-add-form" onSubmit={saveContragent}>
            <Input name="contragent-add-name" label="Наименование" required={true} ref={nameRef} form="contragent-add-form"/>
            <Input name="contragent-add-inn" label="ИНН" pattern="[0-9]{11}" title="Число, 11 знаков" required={true} ref={innRef} form="contragent-add-form"/>
            <Input name="contragent-add-address" label="Адрес" required={true} ref={addressRef} form="contragent-add-form"/>
            <Input name="contragent-add-kpp" label="КПП" pattern="[0-9]{9}" title="Число, 9 знаков" required={true} ref={kppRef} form="contragent-add-form"/>
            <button type="submit">Сохранить</button>
        </form>
    );
}

export default ContragentAddPanel;