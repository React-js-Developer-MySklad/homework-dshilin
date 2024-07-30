import {useContext} from 'react';
import {ModalContext} from "./modal.context";

export function useModal() {
    const context = useContext(ModalContext);
    if (context === null) {
        throw Error('useModal hook outside ModalProvider')
    }
    return context;
}
