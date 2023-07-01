export class formValidation {
    constructor() {

        const displayInputError = (modalFormProfile, errorInputLineElement, errorMessage) => {
            const addErrorText = modalFormProfile.querySelector(`.${errorInputLineElement.id}-error`);
            errorInputLineElement.classList.add('form__line_type-error');
            addErrorText.textContent = errorMessage;
            addErrorText.classList.add('form__line_text-error_active');
        };

        const hideInputError = (modalFormProfile, errorInputLineElement) => {
            const addErrorText = modalFormProfile.querySelector(`.${errorInputLineElement.id}-error`);
            errorInputLineElement.classList.remove('form__line_type-error');
            addErrorText.classList.remove('form__line_text-error_active');
            addErrorText.textContent = '';
        };

        const checkValidity = (modalFormProfile, errorInputLineElement) => {
            if (errorInputLineElement.validity.patternMismatch) {
                errorInputLineElement.setCustomValidity("Разрешены только латинские буквы.");
            } else {
                errorInputLineElement.setCustomValidity("");
            }
            if (!errorInputLineElement.validity.valid) {
                displayInputError(modalFormProfile, errorInputLineElement, errorInputLineElement.validationMessage);
            } else {
                hideInputError(modalFormProfile, errorInputLineElement);
            }
        };

        const setEventListeners = (modalFormProfile) => {
            const inputList = Array.from(modalFormProfile.querySelectorAll('.form__line'));
            const formButtonSubmit = modalFormProfile.querySelector('.popup__button-sumbit');
            toggleButtonState(inputList, formButtonSubmit);
            inputList.forEach((errorInputLineElement) => {
                errorInputLineElement.addEventListener('input', function () {
                    checkValidity(modalFormProfile, errorInputLineElement);
                    toggleButtonState(inputList, formButtonSubmit);
                });
            });
        };

        const turnOnValidation = () => {
            const formList = Array.from(document.querySelectorAll('.popup__form-container'));
            formList.forEach((modalFormProfile) => {
                modalFormProfile.addEventListener('submit', function (evt) {
                    evt.preventDefault();
                });
                const fieldsetModalFormList = Array.from(modalFormProfile.querySelectorAll('.form'));
                fieldsetModalFormList.forEach((fieldSet) => {
                    setEventListeners(fieldSet);
                })
            });
        };

        const hasInvalidInput = (inputList) => {
            return inputList.some((errorInputLineElement) => {
                return !errorInputLineElement.validity.valid;
            })
        };

        const toggleButtonState = (inputList, formButtonSubmit) => {
            if (hasInvalidInput(inputList)) {
                formButtonSubmit.setAttribute('disabled', true);
                formButtonSubmit.classList.add('popup__button-sumbit_disabled');
            } else {
                formButtonSubmit.removeAttribute('disabled', true);
                formButtonSubmit.classList.remove('popup__button-sumbit_disabled');
            }
        };

        turnOnValidation();
    }
} 