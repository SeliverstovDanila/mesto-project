import { Popup } from "./OOP_Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, editButton, submitForm) {
        super(popup, editButton); // Переносим родительскую функцию popup в конструктор PopupWithForm
        this._popupForm = this._popup.querySelector('.popup__form-container') // Форма модального окна
        this._popupInput = this._popup.querySelectorAll('.form__line') // Инпуты модального окна
        this._saveButton = this._popup.querySelector('.popup__button-sumbit') // Кнопка сохранить
        this._saveTextButton = this._saveButton.textContent;
        this._submitForm = submitForm;
    }

    close(){
        super.close();
        this._popupForm.reset()
    }

    saveLoading(isLoading) { //Нужно использовать эту функцию при обращение к серверу
        if(isLoading) {
            this._saveButton.textContent = "Сохранение...";
        } else {
            this._saveButton.textContent = "Сохранить"
        }
    }

    _getInputValues() {
        this._inputFormElement = {};
        this._popupInput.forEach((inputElement) => {
            this._inputFormElement[inputElement.name] = inputElement.value;
        })
        return this._inputFormElement
    }

    setEventListeners() {
        super.setEventListeners(); //из родительского popup
        this._popupForm.addEventListener('submit', (evt) => {
            this.saveLoading(true);
            evt.preventDefault();
            this._submitForm(this._getInputValues()); // исполняет функцию сохранения, взяв данные, которые ввели в инпуты формы
        })
    }
}