import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './modal';
import { ReactElement } from 'react';
import {ModalProvider, useModal} from "../../hooks/useModal";


const setup = (caption: string, body: ReactElement) => {
    const open = jest.fn();
    const close = jest.fn();
    const onClose = jest.fn();
    const value = { display: true, content: { caption, body }, open, close, onClose }

    render(<ModalProvider value={value}><Modal /></ModalProvider>);

    return { onClose }
}

describe('Модальное окно', () => {
    it('Отображает заголовок и потомков', () => {
        setup('TestCaption', <div>Test content</div>)

        expect(screen.getByText('Test content')).toBeTruthy();
        expect(screen.getByText('TestCaption')).toBeTruthy();
    });

    it('Вызывает обработчик закрытия при нажатии на крестик', () => {
        const {onClose} = setup('', <></>)

        fireEvent.click(screen.getByTestId('form-close-button'));

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
