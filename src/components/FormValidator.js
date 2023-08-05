// Перенести const setValidation из index.js в utils.js ?????????

export class FormValidator { // Экспортируем в index.js
    constructor(formElement, data) {
        this._modalForm = formElement;
        this._inputClass = data.inputFormLine; // inputFormLine(инпут формы) из index.js (const setValidation)
        this._arrayInput = Array.from(this._modalForm.querySelectorAll(this._inputClass));
        this._inputErrorText = data.addErrorText; // addErrorText(текст ошибки) из index.js (const setValidation)
        this._errorLine = data.errorInputLineElement; // errorInputLineElement(красная линия) из index.js (const setValidation)
        this._saveButton = data.formButtonSubmit; // formButtonSubmit(кнопка сохранить) из index.js (const setValidation)
        this._button = this._modalForm.querySelector(this._saveButton);
        this._disableButton = data.modalForminactiveButtonSubmit; // modalForminactiveButtonSubmit(отключить кнопку) из index.js (const setValidation)
    }
    
    maskInputError() {
        this._toggleButtonState(this._button)
        this._arrayInput.forEach((input) => {
            this._errorElement = this._form.querySelector(`.${input.id}-error`);
            _hideInputError(input);
        })
    }

    _displayInputError(inputElement) {
        inputElement.classList.add(this._inputErrorText);
        this._errorElement.classList.add(this._errorLine);
        this._errorElement.textContent = inputElement.errorMessage;
    };

    _hideInputError(inputElement) {
        if (!this._errorElement) return;
        inputElement.classList.remove(this._inputErrorText);
        this._errorElement.classList.remove(this._errorLine);
        this._errorElement.textContent = '';
    };

    _checkValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._displayInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };
// Отключение кнопки если форма не проходит валидацию

    _disableButton() { // Добавить в скобки валидацию инпутов ( _validation() )?????
        this._button.classList.add(this._disableButton);
        this._button.setAttribute('disabled', true);
    }
    
    _enableButton() {
        this._button.classList.remove(this._disableButton);
        this._button.removeAttribute('disabled', true);
    }

    _validation() {
        return _arrayInput.some((input) => !input.validity.valid);
    }

    _toggleButtonState() {
        if (this._validation()) { // Добавить в скобки валидацию инпутов(выполненно)
            this._disableButton()
        } else {
            this._enableButton()
        }
    };
//___________________________________________________________________________________________

    _setEventListeners() { //Дописать
        this._toggleButtonState()
        // ????? Прода
    }

    enableValidation() {
        this._modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }
}

console.log(FormValidator)