import React from 'react';
import {ModalProvider} from "./hooks/useModal";
import {AppStoreProvider} from "./hooks/useAppStore";
import Header from './components/header/header';
import ContragentTable from "./components/contragent-table/contragent-table";
import Modal from './components/modal/modal';
import Footer from './components/footer/footer';
import './app.css';

const App = () => {
    return (
        <AppStoreProvider>
            <ModalProvider>
                <div>
                    <Header/>
                    <main>
                        <section className="content">
                            <ContragentTable/>
                        </section>
                    </main>
                    <Footer/>
                    <Modal/>
                </div>
            </ModalProvider>
        </AppStoreProvider>
    )
}

export default App;