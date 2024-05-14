import html from "./app.html";
import './app.css'

window.addEventListener('load', function () {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = html;

    document.getElementById('add-data-button').onclick = toggleModal;
    document.getElementById('close-form-button').onclick = toggleModal;
});

const toggleModal = () => {
    const modal = document.getElementById('modal');
    modal.tabIndex = modal.tabIndex * -1;
    modal.classList.toggle('hidden');
    modal.ariaHidden = !(modal.ariaHidden === 'true');
}