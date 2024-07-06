import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './modal';
import { ReactElement } from 'react';


const setup = (caption: string, children?: ReactElement) => {
   const handleClose = jest.fn();
   render(
      <Modal caption={caption} onClose={handleClose}>
         {children}
      </Modal>
   );

   return {
      handleClose
   }
}

describe('Модальное окно', () => {
   it('Отображает заголовок и потомков', () => {
      setup('TestCaption', <div>Test content</div>)

      expect(screen.getByText('Test content')).toBeTruthy();
      expect(screen.getByText('TestCaption')).toBeTruthy();
   });

   it('Вызывает обработчик закрытия при нажатии на крестик', () => {
      const {handleClose} = setup('', <></>)

      fireEvent.click(screen.getByTestId('form-close-button'));

      expect(handleClose).toHaveBeenCalledTimes(1);
   });
});
