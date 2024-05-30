import './modal.css'
import CloseIcon from '@assets/icon-cross.svg'

const Modal = props => (
    <section id="modal" class="modal" aria-modal="true" role="dialog" tabIndex="1">
        <div class="modal-wrapper">
            <div class="modal-body">
                <div class="modal-header">
                    <h3 class="modal-caption">{props.caption}</h3>
                    <button class="modal-close-button" id="close-form-button" type="button" onClick={props.onClose}>
                        <img src={CloseIcon} alt="Close" class="w-3 h-3"/>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="modal-content">{props.children}</div>
            </div>
        </div>
    </section>
)

export default Modal;