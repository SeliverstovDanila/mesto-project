import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, editButton, submitForm) {
        super(popup, editButton);
        this._popupForm = this._popup.querySelector('.popup__form-container')
        this._popupInput = this._popup.querySelectorAll('.form__line')
        this._saveButton = this._popup.querySelector('.popup__button-sumbit')
        this._saveTextButton = this._saveButton.textContent;
        this._submitForm = submitForm;
    }

    close() {
        super.close();
        this._popupForm.reset()
    }

    saveLoading(isLoading) {
        if (isLoading) {
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

    setInputValue(data) {
        this._popupInput.forEach((item) => {
            item.value = data[item.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            this.saveLoading(true);
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        })
    }
}