import {MouseEventHandler, ReactElement} from "react";
import CloseIcon from '@assets/icon-cross.svg'
import './modal.css'

type ModalProps = {
    caption: string;
    onClose: MouseEventHandler<HTMLButtonElement>;
    children:  ReactElement;
}

const Modal = ({caption, onClose, children}: ModalProps) => (
    <section className="modal" aria-modal="true" role="dialog" tabIndex={1}>
        <div className="modal-wrapper">
            <div className="modal-body">
                <div className="modal-header">
                    <h3 className="modal-caption">{caption}</h3>
                    <button className="modal-close-button" id="close-form-button" type="button" onClick={onClose}>
                        <img src={CloseIcon} alt="Close" className="w-3 h-3"/>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    </section>
)

export default Modal;