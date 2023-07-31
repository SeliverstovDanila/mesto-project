import { Popup } from "./OOP_Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup) {
        super(popup); // Переносим родительскую функцию popup в конструктор PopupWithForm
        this._popupForm = this._popup.querySelector('.popup__form-container') // Форма модального окна
        this._popupInput = this._popup.querySelectorAll('.form__line') // Инпуты модального окна
        this._saveButton = this._popup.querySelector('.popup__button-sumbit') // Кнопка сохранить
    }
}