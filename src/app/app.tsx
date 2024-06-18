import {useState} from 'react';
import DataTable from './components/data-table/data-table';
import Button from './components/button/button';
import Modal from './components/modal/modal';
import ContragentAddPanel from './components/contranget-add-panel/contragent-add-panel';
import Footer from './components/footer/footer';
import Logo from '@assets/logo.svg';
import IconFileAdd from '@assets/icon-file-add.svg';
import './app.css';

import data from '../data/contragents.json';

const columns = [
    {name: 'Наименование'},
    {name: 'ИНН'},
    {name: 'Адрес'},
    {name: 'КПП'}
];

const initialRows = data.contragents.map(contragent => [contragent.name, contragent.inn, contragent.address, contragent.kpp]);

const App = () => {
    const [state, setState] = useState({
        showModal: false,
        editingAgent: null,
        rows: initialRows,
    });

    const setShowModal = (newValue: boolean) => {
        setState({
            ...state,
            editingAgent: null,
            showModal: newValue,
        })
    }

    const onContragentSave = (agent : Contragent) => {
        if (state.editingAgent) {
            setState({
                ...state,
                showModal: false,
                editingAgent: null,
                rows: state.rows.map((row, i) => i === state.editingAgent ? [agent.name, agent.inn, agent.address, agent.kpp] : row),
            });
        } else {
            setState({
                ...state,
                showModal: false,
                editingAgent: null,
                rows: [[agent.name, agent.inn, agent.address, agent.kpp], ...state.rows],
            });
        }
    }

    const onAgentEdit = (n: number) => {
        setState({
            ...state,
            editingAgent: n,
            showModal: true,
        })
    }

    const onAgentRemove = (n: number) => {
        setState({
            ...state,
            rows: state.rows.filter((row, i) => i !== n),
        })
    }

    const getAgentToEdit = () => {
        if (state.editingAgent != null) {
            const agent = state.rows[state.editingAgent];

            console.log(`find agent ${state.editingAgent}`, agent)
            return {name: agent[0], inn: agent[1], address: agent[2], kpp: agent[3]}
        } else {
            return null
        }
    }

    return (
        <div>
            <header>
                <img src={Logo} alt="МойСклад" className="logo" />
                <Button icon={IconFileAdd} iconAlt="+" text="Добавить" onClick={() => setShowModal(true)}/>
            </header>
            <main>
                <section className="content">
                    <DataTable columns={columns} rows={state.rows} onEdit={onAgentEdit} onRemove={onAgentRemove}/>
                </section>
                { state.showModal ?
                    <Modal caption="Контрагент" onClose={() => setShowModal(false)}>
                        <ContragentAddPanel onContragentSave={onContragentSave} agent={getAgentToEdit()}/>
                    </Modal>
                : '' }
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

type Contragent = {
   id?: string;
   name?: string;
   inn?: string;
   address?: string;
   kpp?: string;
}

export default App;