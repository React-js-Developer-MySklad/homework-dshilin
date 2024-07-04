import React, { useEffect, useReducer } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Modal from './components/modal/modal';
import ContragentForm from './components/contranget-form/contragent-form';
import Table, { Column } from './components/table';
import RemoveButton from './components/remove-button/remove-button';
import reducer, { initialValue } from './reducers/contragent-reducer';
import { getContragents } from '../api/api';
import { Contragent } from '../types';
import './app.css';

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    useEffect(() => {
        getContragents().then(agents => dispatch({type: 'setAgents', payload: agents}))
    }, [])

    const onContragentSave = (newAgent : Contragent) => {
        dispatch({type: 'saveContragent', payload: newAgent});
    }

    const openModal = (item?: Contragent) => {
        dispatch({type: 'openModal', payload: item});
    }

    const removeAgent = (agentToRemove: Contragent) => {
        dispatch({type: 'removeAgent', payload: agentToRemove});
    }

    return (
        <div>
            <Header mainButtonHandler={() => openModal()}/>
            <main>
                <section className="content">
                    <Table items={state.agents} itemKeyGetter={agent => agent.id} onRowClick={openModal}>
                        <Column title='Наименование' key='name' render={(agent:Contragent) => agent.name} />
                        <Column title='ИНН' key='inn' render={(agent:Contragent) => agent.inn} />
                        <Column title='Адрес' key='address' render={(agent:Contragent) => agent.address} />
                        <Column title='КПП' key='kpp' render={(agent:Contragent) => agent.kpp} />
                        <Column title='' key='remove' render={(agent:Contragent) => <RemoveButton handleRemove={() => removeAgent(agent)} />} />
                    </Table>
                </section>
                { state.showModal &&
                    <Modal caption="Контрагент" onClose={() => dispatch({type: 'closeModal'})}>
                        <ContragentForm onContragentSave={onContragentSave} agent={state.editingAgent}/>
                    </Modal> }
            </main>
            <Footer/>
        </div>
    )
}

export default App;