import React, { useState } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Modal from './components/modal/modal';
import ContragentForm from './components/contranget-form/contragent-form';
import Table, { Column } from './components/table';
import RemoveButton from './components/remove-button/remove-button';
import { Contragent } from '../types';
import './app.css';

import data from '../data/contragents.json';

const initialAgents: Array<Contragent> = data.contragents;

const App = () => {
    const [state, setState] = useState({
        showModal: false,
        editingAgent: null,
        agents: initialAgents,
    });

    const setShowModal = (newValue: boolean) => {
        setState({
            ...state,
            editingAgent: null,
            showModal: newValue,
        })
    }

    const onContragentSave = (newAgent : Contragent) => {
        if (state.editingAgent) {
            setState({
                ...state,
                showModal: false,
                editingAgent: null,
                agents: state.agents.map(agent => agent.id === state.editingAgent.id ? newAgent : agent),
            });
        } else {
            setState({
                ...state,
                showModal: false,
                editingAgent: null,
                agents: [newAgent, ...state.agents],
            });
        }
    }

    const onAgentEdit = (item: Contragent) => {
        setState({
            ...state,
            editingAgent: item,
            showModal: true,
        })
    }

    const removeAgent = (agentToRemove: Contragent) => {
        setState({
            ...state,
            agents: state.agents.filter((agent) => agent.id !== agentToRemove.id),
        })
    }

    return (
        <div>
            <Header mainButtonHandler={() => setShowModal(true)}/>
            <main>
                <section className="content">
                    <Table items={state.agents} itemKeyGetter={agent => agent.id} onRowClick={onAgentEdit}>
                        <Column title='Наименование' key='name' render={(agent:Contragent) => agent.name} />
                        <Column title='ИНН' key='inn' render={(agent:Contragent) => agent.inn} />
                        <Column title='Адрес' key='address' render={(agent:Contragent) => agent.address} />
                        <Column title='КПП' key='kpp' render={(agent:Contragent) => agent.kpp} />
                        <Column title='' key='remove' render={(agent:Contragent) => <RemoveButton handleRemove={() => removeAgent(agent)} />} />
                    </Table>
                </section>
                { state.showModal &&
                    <Modal caption="Контрагент" onClose={() => setShowModal(false)}>
                        <ContragentForm onContragentSave={onContragentSave} agent={state.editingAgent}/>
                    </Modal> }
            </main>
            <Footer/>
        </div>
    )
}

export default App;