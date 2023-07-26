export class FormValidator {
    constructor(validationParametrs) {
        this._modalForm = validationParametrs.modalForm;
        this._inputFormLine = validationParametrs.inputFormLine;
        this._formButtonSubmit = validationParametrs.formButtonSubmit;
        this._modalForminactiveButtonSubmit = validationParametrs.modalForminactiveButtonSubmit;
        this._errorInputLineElement = validationParametrs.errorInputLineElement;
        this._addErrorText = validationParametrs.addErrorText;
    }

    _displayInputError = (formElement, inputElement, errorMessage, errorInputLineElement, addErrorText) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(errorInputLineElement);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(addErrorText);
    };

    _hideInputError = (formElement, inputElement, errorInputLineElement, addErrorText) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(errorInputLineElement);
        errorElement.classList.remove(addErrorText);
        errorElement.textContent = '';
    };

    _checkValidity = (formElement, inputElement, errorInputLineElement, addErrorText) => {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._displayInputError(formElement, inputElement, inputElement.validationMessage, errorInputLineElement, addErrorText);
        } else {
            this._hideInputError(formElement, inputElement, errorInputLineElement, addErrorText);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };
    _disableButton(buttomSubmitElement, modalForminactiveButtonSubmit) {
        buttomSubmitElement.disabled = true;
        buttomSubmitElement.classList.add(modalForminactiveButtonSubmit);
    }

    _enableButton(buttomSubmitElement, modalForminactiveButtonSubmit) {
        buttomSubmitElement.disabled = false;
        buttomSubmitElement.classList.remove(modalForminactiveButtonSubmit);
    }

    _toggleButtonState = (inputList, buttomSubmitElement, modalForminactiveButtonSubmit) => {
        if (this._hasInvalidInput(inputList)) {
            this._disableButton(buttomSubmitElement, modalForminactiveButtonSubmit);
        } else {
            this._enableButton(buttomSubmitElement, modalForminactiveButtonSubmit);
        }
    };

    _setEventListeners = (formElement, modalForm, inputFormLine, formButtonSubmit, modalForminactiveButtonSubmit, errorInputLineElement, addErrorText) => {
        const inputList = Array.from(formElement.querySelectorAll(inputFormLine));
        const buttomSubmitElement = formElement.querySelector(formButtonSubmit);

        formElement.addEventListener('reset', () => {
            this._disableButton(buttomSubmitElement, modalForminactiveButtonSubmit);
        });

        inputList.forEach((inputElement) => {
            this._toggleButtonState(inputList, buttomSubmitElement, modalForminactiveButtonSubmit);
            inputElement.addEventListener('input', () => {
                this._checkValidity(formElement, inputElement, errorInputLineElement, addErrorText)
                this._toggleButtonState(inputList, buttomSubmitElement, modalForminactiveButtonSubmit);
            });
        });
    };

    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(this._modalForm));

        formList.forEach((formElement) => {
            this._setEventListeners(
                formElement,
                this._modalForm,
                this._inputFormLine,
                this._formButtonSubmit,
                this._modalForminactiveButtonSubmit,
                this._errorInputLineElement,
                this._addErrorText
            );
        });
    };
}