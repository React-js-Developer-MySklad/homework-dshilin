import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContragentForm from './contragent-form';
import { Contragent } from '../../../types';

const setup = (agent: Contragent) => {
   const handleSave = jest.fn();

   render(<ContragentForm onContragentSave={handleSave} agent={agent}/>);

   const form = screen.getByTestId('contragent-add-form') as HTMLFormElement;
   const nameInput = screen.getByLabelText('Наименование') as HTMLInputElement;
   const innInput = screen.getByLabelText('ИНН') as HTMLInputElement;
   const addressInput = screen.getByLabelText('Адрес') as HTMLInputElement;
   const kppInput = screen.getByLabelText('КПП') as HTMLInputElement;
   const submitButton = screen.getByText("Сохранить") as HTMLInputElement;

   return {
      form,
      inputs: {
         name: nameInput,
         inn: innInput,
         address: addressInput,
         kpp: kppInput,
      },
      submitButton,
      handleSave
   };
};

describe('Форма добавления/редактирования контрагента', () => {
   it('открывается с пустыми полями без переданного контрагента', () => {
      const { inputs } = setup(null);

      expect(inputs.name).toHaveValue('');
      expect(inputs.inn).toHaveValue('');
      expect(inputs.address).toHaveValue('');
      expect(inputs.kpp).toHaveValue('');
   });

   it('не сохраняет контрагента если все если все поля пустые', () => {
      const { submitButton, handleSave } = setup(null);

      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(0);
   });

   it('не сохраняет контрагента если не заполнено поле Наименование', () => {
      const { inputs, submitButton, handleSave } = setup(null);

      fireEvent.change(inputs.inn, {target: {value: '123456789012'}});
      fireEvent.change(inputs.address, {target: {value: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64'}});
      fireEvent.change(inputs.kpp, {target: {value: '123456789'}});
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(0);
   });

   it('не сохраняет контрагента если не заполнено поле ИНН', () => {
      const { inputs, submitButton, handleSave } = setup(null);

      fireEvent.change(inputs.name, {target: {value: 'АО "Восторженное событие'}})
      fireEvent.change(inputs.address, {target: {value: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64'}});
      fireEvent.change(inputs.kpp, {target: {value: '123456789'}});
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(0);
   });

   it('нажатие кнопки Сохранить не вызывает обработчик если ИНН содержит некорректное количество цифр', () => {
      const { inputs,  submitButton, handleSave } = setup(null);

      fireEvent.change(inputs.name, {target: {value: 'АО "Восторженное событие'}})
      fireEvent.change(inputs.inn, {target: {value: '123456'}})
      fireEvent.change(inputs.address, {target: {value: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64'}})
      fireEvent.change(inputs.kpp, {target: {value: '439518910'}})
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(0);
   });

   it('не сохраняет контрагента если не заполнено поле Адрес', () => {
      const { inputs, submitButton, handleSave } = setup(null);

      fireEvent.change(inputs.name, {target: {value: 'АО "Восторженное событие'}})
      fireEvent.change(inputs.inn, {target: {value: '123456789012'}});
      fireEvent.change(inputs.kpp, {target: {value: '123456789'}});
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(0);
   });


   it('не сохраняет контрагента если не заполнено поле КПП', () => {
      const { inputs, submitButton, handleSave } = setup(null);

      fireEvent.change(inputs.name, {target: {value: 'АО "Восторженное событие'}})
      fireEvent.change(inputs.inn, {target: {value: '123456789012'}});
      fireEvent.change(inputs.address, {target: {value: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64'}});
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(0);
   });

   it('не сохраняет контрагента с невалидным КПП', () => {
      const { inputs,  submitButton, handleSave } = setup(null);

      fireEvent.change(inputs.name, {target: {value: 'АО "Восторженное событие'}})
      fireEvent.change(inputs.inn, {target: {value: '123456789012'}});
      fireEvent.change(inputs.address, {target: {value: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64'}})
      fireEvent.change(inputs.kpp, {target: {value: '1'}})
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(0);
   });


   it('сохраняет контрагента с параметрами заполненными из полей', () => {
      const { inputs,  submitButton, handleSave } = setup(null);

      fireEvent.change(inputs.name, {target: {value: 'АО "Восторженное событие"'}});
      fireEvent.change(inputs.inn, {target: {value: '123456789012'}});
      fireEvent.change(inputs.address, {target: {value: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64'}});
      fireEvent.change(inputs.kpp, {target: {value: '123456789'}});
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenNthCalledWith(1, expect.objectContaining({
         id: expect.stringMatching(RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)),
         name: 'АО "Восторженное событие"',
         inn: '123456789012',
         address: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64',
         kpp: '123456789',
      }));
   });

   it('открывается с полями заполненными значениями согласно переданному контрагенту', () => {
      const agent: Contragent = {
         id: '1',
         name: 'АО "Восторженное событие"',
         inn: '5262075637',
         address: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64',
         kpp: '439518910',
      }

      const { form } = setup(agent);

      expect(form).toHaveFormValues({
         'contragent-add-name': 'АО "Восторженное событие"',
         'contragent-add-inn': '5262075637',
         'contragent-add-address': '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64',
         'contragent-add-kpp': '439518910',
      });
   });

   it('сохраняет контрагента с тем же идентификатором который был передан при открытии', () => {
      const agent: Contragent = {
         id: '657',
         name: 'ООО "Стальной образец"',
         inn: '5262075637',
         address: '450287, г. Уфа, ул. Почтовая, 24, оф. 9',
         kpp: '439518910',
      }
      const { inputs,  submitButton, handleSave } = setup(agent);

      fireEvent.change(inputs.name, {target: {value: 'НКО "Бездомные"'}});
      fireEvent.change(inputs.address, {target: {value: 'мой адрес не дом и не улица'}});
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenNthCalledWith(1, expect.objectContaining({
         id: '657',
         name: 'НКО "Бездомные"',
         inn: '5262075637',
         address: 'мой адрес не дом и не улица',
         kpp: '439518910',
      }));
   });

})

