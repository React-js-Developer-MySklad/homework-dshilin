import './modal.css'
import CloseIcon from '@assets/icon-cross.svg'

const Modal = props => (
    <section ref={props.ref}
             id="modal" class="modal hidden" aria-modal="true" role="dialog"
             tabIndex="-1" aria-hidden="true"
    >
        <div class="modal-wrapper">
            <div class="modal-body">
                <div class="modal-header">
                    <h3 class="modal-caption">{props.caption}</h3>
                    <button class="modal-close-button" id="close-form-button" type="button" onClick={props.onCloseModal}>
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