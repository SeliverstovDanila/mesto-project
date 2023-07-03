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
import {  openModalProfile, closeModalProfile, handleProfile, handleAddModal, handleAddClose, closeModalZoom } from '../components/modal.js'
import { handleAdd } from '../components/card.js'
import { turnOnValidation } from '../components/validate.js'

turnOnValidation({
  errorInputLineElement: 'form__line_type-error',
  addErrorText: 'form__line_text-error_active',
  inputList: '.form__line',
  formButtonSubmit: '.popup__button-sumbit',
  formList: '.popup__form-container',
  fieldsetModalFormList: '.form',
});

// Модальное окно - профиль
buttonEdit.addEventListener('click', openModalProfile);
profileClose.addEventListener('click', closeModalProfile);
modalFormProfile.addEventListener('submit', handleProfile);
// Модальное окно - сохранить карточку
buttonOpenModalAddNewCard.addEventListener('click', handleAddModal);
buttonCloseFormAddNewCard.addEventListener('click', handleAddClose);
formAddNewCard.addEventListener('submit', handleAdd);
// Закрыть увеличение фото
buttonCloseFormPhotoZoom.addEventListener('click', closeModalZoom);

// Закрытие модального окна при клике на оверлей
modalProfile.addEventListener('mousedown', (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModalProfile(modalProfile)
  }
});

modalAddFormNewCards.addEventListener('mousedown', (evt) => {
  if (evt.currentTarget === evt.target) {
    handleAddClose(modalAddFormNewCards)
  }
});

popupZoom.addEventListener('mousedown', (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModalZoom(popupZoom)
  }
});

// Закрытие модального окна на кнопку esc
document.addEventListener('keydown', (evt) => {
  const addOpenClassProfileForm = document.querySelector('#modal-profile.popup_open');
  const addOpenClassNewCardForm = document.querySelector('#modal-card.popup_open');
  const addOpenClassZoomPhoto = document.querySelector('#photo-zoom.popup_open');
  if (evt.key === 'Escape' && addOpenClassProfileForm !== null) {
    closeModalProfile()
  }
  if (evt.key === 'Escape' && addOpenClassNewCardForm !== null) {
    handleAddClose()
  }
  if (evt.key === 'Escape' && addOpenClassZoomPhoto !== null) {
    closeModalZoom()
  }
});