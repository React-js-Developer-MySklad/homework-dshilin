import React, {FC, ReactElement, useCallback, useState} from "react";
import {ModalContext} from "./modal.context";
import {ModalType} from "./modal.type";

type ModalProviderProps = {
    children: ReactElement;
    value?: ModalType;
}

export const ModalProvider: FC<ModalProviderProps> = ({value, children }) => {
    const context = useCreateModalContext(value);
    return <ModalContext.Provider value={context}>{children}</ModalContext.Provider>;
};

const defaultValue = {
    display: false,
    content: {
        caption: null as string,
        body: null as ReactElement,
    },
    onClose: null as () => void,
};

export const useCreateModalContext = (initialValue?: ModalType) => {
    const [state, setState] = useState(initialValue || defaultValue);

    const open = useCallback((caption: string, content: ReactElement, onClose?: () => void) => {
        setState(prev => ({
            ...prev,
            display: true,
            content: {
                caption,
                body: content
            },
            onClose: onClose
        }));
    }, []);

    const close = useCallback(() => {
        setState(prev => {
            prev.onClose && prev.onClose();
            return defaultValue
        });
    }, []);

    return {
        ...state,
        open,
        close,
    }
}