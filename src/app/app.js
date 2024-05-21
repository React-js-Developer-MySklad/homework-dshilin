import DataTable, {Row} from "./components/data-table/data-table";
import Button from "./components/button/button";
import Modal from "./components/modal/modal";
import ContragentAddPanel from "./components/contranget-add-panel/contragent-add-panel";
import Footer from "./components/footer/footer";

import Logo from '@assets/logo.svg'
import IconFileAdd from '@assets/icon-file-add.svg'

import {createRef} from "@core/ref";

import './app.css'

import data from '../data/contragents.json'

window.addEventListener('load', function () {
    console.log(<App/>);
    document.getElementById('root').appendChild(<App/>);
});

const App = () => {
    const tableBodyRef = createRef();
    const columns = [
        {name: 'Наименование'},
        {name: 'ИНН'},
        {name: 'Адрес'},
        {name: 'КПП'}
    ];
    const rows = data.contragents.map(contragent => [contragent.name, contragent.inn, contragent.address, contragent.kpp]);

    const modalRef = createRef();
    const toggleModal = showModal => {
        modalRef.tabIndex = showModal ? 1 : -1;
        modal.classList.toggle('hidden', !showModal);
        modal.ariaHidden = !showModal;
    }

    const onContragentSave = data => {
        tableBodyRef.htmlElement.prepend(<Row values={[data.name, data.inn, data.address, data.kpp]}/>)
        toggleModal(false);
    }

    return (
        <>
            <header>
                <img src={Logo} alt="МойСклад" class="logo" />
                <Button icon={IconFileAdd} iconAlt="+" text="Добавить" onClick={() => toggleModal(true)}/>
            </header>
            <main>
                <section class="content">
                    <DataTable columns={columns} rows={rows} bodyRef={tableBodyRef}/>
                </section>
                <Modal caption="Контрагент" ref={modalRef} onCloseModal={() => toggleModal(false)}>
                    <ContragentAddPanel onContragentSave={onContragentSave}/>
                </Modal>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}