import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './modal';
import { ReactElement } from 'react';


const setup = (caption: string, children?: ReactElement) => {
   const handleClose = jest.fn();
   const utils = render(
      <Modal caption={caption} onClose={handleClose}>
         {children}
      </Modal>
   );

   return {
      handleClose,
      ...utils
   }
}

describe('Модальное окно', () => {
   test('Модальное окно отображает заголовок и потомков', () => {
      const {getByText} = setup('TestCaption', <div>Test content</div>)

      expect(getByText('Test content')).toBeTruthy();
      expect(getByText('TestCaption')).toBeTruthy();
   });

   test('Модальное окно вызывает обработчик закрытия при нажатии на крестик', () => {
      const {handleClose, container} = setup('', <></>)

      fireEvent.click(container.querySelector('#close-form-button'));

      expect(handleClose).toHaveBeenCalledTimes(1);
   });
});
