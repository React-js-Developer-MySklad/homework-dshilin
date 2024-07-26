import React, {FC} from 'react';
import {useModal} from "../../hooks/useModal";
import {useAppStore} from "../../hooks/useAppStore";
import ContragentForm from "../contranget-form/contragent-form";
import Button from '../button/button';
import {Contragent} from "../../../types";
import Logo from '@assets/logo.svg';
import IconFileAdd from '@assets/icon-file-add.svg';
import './header.css';

const Header: FC = () => {
    const [, {addAgent}] = useAppStore();
    const { open: openModal, close: closeModal } = useModal();

    const saveContragent = (agent: Contragent) => {
        addAgent(agent);
        closeModal();
    }

    const openContragentFrom = () => {
        openModal("Добавить контрагента", <ContragentForm onSave={saveContragent}/>);
    }

    return (
        <header>
            <img src={Logo} alt="МойСклад" className="logo" />
            <Button icon={IconFileAdd} iconAlt="+" text="Добавить" onClick={() => openContragentFrom()} />
        </header>
    )
}

export default Header;