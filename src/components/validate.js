const displayInputError = (formElement, inputElement, errorMessage, errorInputLineElement, addErrorText) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(errorInputLineElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(addErrorText);
};

const hideInputError = (formElement, inputElement, errorInputLineElement, addErrorText) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(errorInputLineElement);
    errorElement.classList.remove(addErrorText);
    errorElement.textContent = '';
};

const checkValidity = (formElement, inputElement, errorInputLineElement, addErrorText) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        displayInputError(formElement, inputElement, inputElement.validationMessage, errorInputLineElement, addErrorText);
    } else {
        hideInputError(formElement, inputElement, errorInputLineElement, addErrorText);
    }
};

const setEventListeners = (formElement,modalForm,inputFormLine,formButtonSubmit,modalForminactiveButtonSubmit,errorInputLineElement,addErrorText) => {
    const inputList = Array.from(formElement.querySelectorAll(inputFormLine));
    const buttomSubmitElement = formElement.querySelector(formButtonSubmit);

    formElement.addEventListener('reset', () => {
        disableButton(buttomSubmitElement, modalForminactiveButtonSubmit);
    });

    inputList.forEach((inputElement) => {
        toggleButtonState(inputList, buttomSubmitElement, modalForminactiveButtonSubmit);
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, errorInputLineElement, addErrorText)
            toggleButtonState(inputList, buttomSubmitElement, modalForminactiveButtonSubmit);
        });
    });
};


const enableValidation = (setModalElements) => {
    const formList = Array.from(document.querySelectorAll(setModalElements.modalForm));

    formList.forEach((formElement) => {
        setEventListeners(
            formElement,
            setModalElements.modalForm,
            setModalElements.inputFormLine,
            setModalElements.formButtonSubmit,
            setModalElements.modalForminactiveButtonSubmit,
            setModalElements.errorInputLineElement,
            setModalElements.addErrorText
        );
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
function disableButton(buttomSubmitElement, modalForminactiveButtonSubmit) {
    buttomSubmitElement.disabled = true;
    buttomSubmitElement.classList.add(modalForminactiveButtonSubmit);
}

function enableButton(buttomSubmitElement, modalForminactiveButtonSubmit) {
    buttomSubmitElement.disabled = false;
    buttomSubmitElement.classList.remove(modalForminactiveButtonSubmit);
}

const toggleButtonState = (inputList, buttomSubmitElement, modalForminactiveButtonSubmit) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttomSubmitElement, modalForminactiveButtonSubmit);
    } else {
        enableButton(buttomSubmitElement, modalForminactiveButtonSubmit);
    }
};

export { enableValidation, toggleButtonState, checkValidity }