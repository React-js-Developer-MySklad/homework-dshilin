import { FC } from 'react';
import { Form, Field } from 'react-final-form'
import Input from '../input/input';
import {Contragent} from "../../../types";
import './contragent-form.css'

type ContragentFormProps = {
    agent?: Contragent;
    onSave: (agent: Contragent) => void;
}

type FormValues = Omit<Contragent, 'id'>;

const ContragentForm: FC<ContragentFormProps> = ({agent, onSave}) => {

    const saveContragent = (values: FormValues) => {
        onSave({
            id: agent?.id,
            ...values
        })
    }

    return (
        <Form onSubmit={saveContragent}  subscription={{submitting: true}} initialValues={agent as FormValues}>{({handleSubmit, submitting}) => (
            <form id="contragent-add-form" className="contragent-add-form" onSubmit={handleSubmit} data-testid="contragent-add-form">
                <Field name="name" validate={required}>{({input, meta}) => (
                    <Input label="Наименование" error={meta?.error} {...input} />
                )}</Field>
                <Field name="inn" format={onlyNums} validate={validateInn}>{({input, meta}) => (
                    <Input label="ИНН" error={meta?.error} {...input} />
                )}</Field>
                <Field name="address" validate={required}>{({input, meta}) => (
                    <Input label="Адрес" error={meta?.error} {...input} />
                )}</Field>
                <Field name="kpp" format={onlyNums} validate={validateKpp}>{({input, meta}) => (
                    <Input label="КПП" error={meta?.error} {...input} />
                )}</Field>
                <button type="submit" disabled={submitting}>Сохранить</button>
            </form>
        )}</Form>
    );
}

const required = (value: string) => {
    if (!value || value.length < 1) {
        return 'Поле обязательно для заполнения';
    }
}

const validateInn = (value: string) => {
    if (!/^\d{10}$|^\d{12}$/.test(value)) {
        return 'Введите число, 10 или 12 знаков';
    }
}

const validateKpp = (value: string) => {
    if (!/^\d{9}/.test(value)) {
        return 'Введите число, 9 знаков';
    }
}

const onlyNums = (value: string) => {
    if (!value) return '';
    return value.replace(/[^\d]/g, "");
};

export default ContragentForm;