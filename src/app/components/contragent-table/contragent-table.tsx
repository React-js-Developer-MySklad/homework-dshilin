import {useAppStore} from "../../hooks/useAppStore";
import React, {useEffect} from "react";
import {Contragent} from "../../../types";
import Table, {Column} from "../table";
import RemoveButton from "../remove-button/remove-button";
import {useModal} from "../../hooks/useModal";
import ContragentForm from "../contranget-form/contragent-form";

const ContragentTable = () => {
    const [{agents}, {loadAgents, saveAgent, removeAgent}] = useAppStore();
    const { open: openModal, close: closeModal } = useModal();

    useEffect(() => {
        loadAgents();
    }, []);

    const saveContragent = (agent: Contragent) => {
        saveAgent(agent);
        closeModal();
    }

    const openContragentFrom = (item: Contragent) => {
        openModal("Добавить контрагента", <ContragentForm agent={item} onSave={saveContragent}/>);
    }

    return (
        <Table items={agents} itemKeyGetter={agent => agent.id} onRowClick={openContragentFrom}>
            <Column title='Наименование' keyValue='name' render={(agent:Contragent) => agent.name} />
            <Column title='ИНН' keyValue='inn' render={(agent:Contragent) => agent.inn} />
            <Column title='Адрес' keyValue='address' render={(agent:Contragent) => agent.address} />
            <Column title='КПП' keyValue='kpp' render={(agent:Contragent) => agent.kpp} />
            <Column title='' keyValue='remove' render={(agent:Contragent) => <RemoveButton handleRemove={() => removeAgent(agent.id)} />} />
        </Table>
    )
}

export default ContragentTable;