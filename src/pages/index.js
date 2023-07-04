import '../pages/index.css'
import {
  buttonEdit,
  modalProfile,
  modalFormProfile,
  profileClose,
  modalAddFormNewCards,
  buttonOpenModalAddNewCard,
  formAddNewCard,
  buttonCloseFormAddNewCard,
  popupZoom,
  buttonCloseFormPhotoZoom,
} from '../components/utils.js'
import { openModalProfile, closeModalProfile, handleProfile, handleAddModal, handleAddClose, closeModalZoom } from '../components/modal.js'
import { handleSubmitFormNewCard } from '../components/card.js'
import { enableValidation } from '../components/validate.js'

const setValidation = {
  modalForm: '.popup__form-container',
  inputFormLine: '.form__line',
  formButtonSubmit: '.popup__button-sumbit',
  modalForminactiveButtonSubmit: 'popup__button-sumbit_disabled',
  errorInputLineElement: 'form__line_type-error',
  addErrorText: 'form__line_text-error_active'
}
enableValidation(setValidation);

// Модальное окно - профиль
buttonEdit.addEventListener('click', openModalProfile);
profileClose.addEventListener('click', closeModalProfile);
modalFormProfile.addEventListener('submit', handleProfile);
// Модальное окно - сохранить карточку
buttonOpenModalAddNewCard.addEventListener('click', handleAddModal);
buttonCloseFormAddNewCard.addEventListener('click', handleAddClose);
formAddNewCard.addEventListener('submit', handleSubmitFormNewCard);
// Закрыть увеличение фото
buttonCloseFormPhotoZoom.addEventListener('click', closeModalZoom);

export {setValidation}