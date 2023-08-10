import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popup, submitForm) {
        super(popup);
        this._popupForm = this._popup.querySelector('.popup__form-container')
        this._popupInput = this._popup.querySelectorAll('.form__line')
        this._saveButton = this._popup.querySelector('.popup__button-sumbit')
        this._submitForm = submitForm;
    }

    close() {
        super.close();
        this._popupForm.reset()
    }

    saveLoading(isLoading) {
        if (isLoading) {
            this._saveButton.textContent = "Сохранить...";
        } else {
            this._saveButton.textContent = "Сохранить";
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
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        })
    }
}