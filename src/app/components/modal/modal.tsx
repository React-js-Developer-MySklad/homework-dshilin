import CloseIcon from '@assets/icon-cross.svg';
import './modal.css';
import {useModal} from "../../hooks/useModal";
import {createPortal} from "react-dom";

const Modal = () => {
    const {display, content, close} = useModal();

    return (
        <> {display && createPortal(
            <section className="modal" aria-modal="true" role="dialog" tabIndex={1}>
                <div className="modal-wrapper">
                    <div className="modal-body">
                        <div className="modal-header">
                            <h3 className="modal-caption">{content.caption}</h3>
                            <button className="modal-close-button" type="button" onClick={close}
                                    data-testid="form-close-button">
                                <img src={CloseIcon} alt="Close" className="w-3 h-3"/>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="modal-content">{content.body}</div>
                    </div>
                </div>
            </section>
            , document.body)}
        </>
    )
}

export default Modal;