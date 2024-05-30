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

const initialRows = data.contragents.map((contragent, index) => [index, contragent.name, contragent.inn, contragent.address, contragent.kpp]);

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
                rows: state.rows.map(row => row[0] === agent.id ? [agent.id, agent.name, agent.inn, agent.address, agent.kpp] : row),
            });
        } else {
            setState({
                ...state,
                showModal: false,
                editingAgent: null,
                rows: [...state.rows, [agent.id, agent.name, agent.inn, agent.address, agent.kpp]],
            });
        }
    }

    const onAgentEdit = id => {
        const agent = state.rows.find(row => row[0] === id);
        setState({
            ...state,
            editingAgent: {id: agent[0], name: agent[1], inn: agent[2], address: agent[3], kpp: agent[4]},
            showModal: true,
        })
    }

    const onAgentRemove = id => {
        setState({
            ...state,
            rows: state.rows.filter(row => row[0] !== id),
        })
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
                        <ContragentAddPanel onContragentSave={onContragentSave} agent={state.editingAgent}/>
                    </Modal>
                : '' }
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}