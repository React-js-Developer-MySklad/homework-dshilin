import TinyUI, {createState} from "@tiny-ui/ui";
import DataTable from "./components/data-table/data-table";
import Button from "./components/button/button";
import Modal from "./components/modal/modal";
import ContragentAddPanel from "./components/contranget-add-panel/contragent-add-panel";
import Footer from "./components/footer/footer";

import Logo from '@assets/logo.svg'
import IconFileAdd from '@assets/icon-file-add.svg'

import './app.css';

import data from '../data/contragents.json';


window.addEventListener('load', function () {
    const root = document.getElementById('root')
    TinyUI.bind(root, <App/>);
});

const columns = [
    {name: 'Наименование'},
    {name: 'ИНН'},
    {name: 'Адрес'},
    {name: 'КПП'}
];

const initialRows = data.contragents.map(contragent => [contragent.name, contragent.inn, contragent.address, contragent.kpp]);

const App = () => {
    const [state, setState] = createState({
        showModal: false,
        editingAgent: null,
        rows: initialRows,
    });

    const setShowModal = newValue => {
        setState({
            ...state,
            editingAgent: null,
            showModal: newValue,
        })
    }

    const onContragentSave = agent => {
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

    const onAgentEdit = n => {
        setState({
            ...state,
            editingAgent: n,
            showModal: true,
        })
    }

    const onAgentRemove = n => {
        setState({
            ...state,
            rows: state.rows.filter((row, i) => i !== n),
        })
    }

    const getAgentToEdit = () => {
        const agent = state.rows[state.editingAgent];
        return {name: agent[0], inn: agent[1], address: agent[2], kpp: agent[3]}
    }

    return (
        <div>
            <header>
                <img src={Logo} alt="МойСклад" class="logo" />
                <Button icon={IconFileAdd} iconAlt="+" text="Добавить" onClick={() => setShowModal(true)}/>
            </header>
            <main>
                <section class="content">
                    <DataTable columns={columns} rows={state.rows} onEdit={onAgentEdit} onRemove={onAgentRemove}/>
                </section>
                { state.showModal ?
                    <Modal caption="Контрагент" onClose={() => setShowModal(false)}>
                        <ContragentAddPanel onContragentSave={onContragentSave} agent={state.editingAgent ? getAgentToEdit() : null}/>
                    </Modal>
                : '' }
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}