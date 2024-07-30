import {ReactElement} from "react";

export type ModalType = {
    display: boolean;
    content: {
        caption: string;
        body: ReactElement | null;
    };
    open: (caption: string, content: ReactElement, onClose?: () => void) => void;
    close: () => void;
    onClose?: () => void;
};
