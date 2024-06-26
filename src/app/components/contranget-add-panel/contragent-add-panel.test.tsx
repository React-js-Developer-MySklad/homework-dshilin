import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContragentAddPanel, {Contragent} from './contragent-add-panel';

const setup = (agent: Contragent) => {
   const handleSave = jest.fn();

   const utils= render(
      <ContragentAddPanel onContragentSave={handleSave} agent={agent}/>
   );

   const form = utils.getByTestId('contragent-add-form') as HTMLFormElement;
   const nameInput = utils.getByLabelText('Наименование') as HTMLInputElement;
   const innInput = utils.getByLabelText('ИНН') as HTMLInputElement;
   const addressInput = utils.getByLabelText('Адрес') as HTMLInputElement;
   const kppInput = utils.getByLabelText('КПП') as HTMLInputElement;
   const submitButton = utils.getByText("Сохранить") as HTMLInputElement;

   return {
      form,
      inputs: {
         name: nameInput,
         inn: innInput,
         address: addressInput,
         kpp: kppInput,
      },
      submitButton,
      handleSave,
      ...utils,
   };
};

describe('Форма добавления/редактирования контрагента', () => {
   test('При открытие формы без переданного контрагента все поля пустые', () => {
      const { inputs } = setup(null);

      expect(inputs.name).toHaveValue('');
      expect(inputs.inn).toHaveValue('');
      expect(inputs.address).toHaveValue('');
      expect(inputs.kpp).toHaveValue('');
   });

   test('Нажатие кнопки Сохранить не вызывает обработчик если все поля пустые', () => {
      const { submitButton, handleSave } = setup(null);

      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(0);
   });

   test('Нажатие кнопки Сохранить не вызывает обработчик если ИНН содержит некорректное количество цифр', () => {
      const { inputs,  submitButton, handleSave } = setup(null);

      fireEvent.change(inputs.name, {target: {value: 'АО "Восторженное событие'}})
      fireEvent.change(inputs.inn, {target: {value: '123456'}})
      fireEvent.change(inputs.address, {target: {value: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64'}})
      fireEvent.change(inputs.kpp, {target: {value: '439518910'}})
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(0);
   });

   test('При нажатии кнопки Сохранить введенные значения передаются в обработчик', () => {
      const { inputs,  submitButton, handleSave } = setup(null);

      fireEvent.change(inputs.name, {target: {value: 'АО "Восторженное событие"'}});
      fireEvent.change(inputs.inn, {target: {value: '123456789012'}});
      fireEvent.change(inputs.address, {target: {value: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64'}});
      fireEvent.change(inputs.kpp, {target: {value: '123456789'}});
      fireEvent.click(submitButton);

      expect(handleSave).toHaveBeenNthCalledWith(1, expect.objectContaining({
         id: expect.any(Number),
         name: 'АО "Восторженное событие"',
         inn: '123456789012',
         address: '620315, г. Екатеринбург, ул. Лермонтова, 32, оф. 64',
         kpp: '123456789',
      }));
   });

   test('При открытие формы c переданным контрагентом поля формы заполняются соответствующими значениями', () => {
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

   test('При редактирование контрагента в обработчик передается объект с тем же идентификатором', () => {
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

