import '../pages/index.css'
import {
  buttonEdit,
  modalFormProfile,
  profileClose,
  buttonOpenModalAddNewCard,
  formAddNewCard,
  buttonCloseFormAddNewCard,
  buttonCloseFormPhotoZoom,
  avatarButtonOpenModalForm,
  avatarButtonCloseModalForm,
  popupAvatarIdForm,
  popupZoom
} from '../components/utils.js'
import {
  openModalProfile,
  closeModalProfile,
  handleAddClose,
  closeModalZoom,
  avatarModalFormOpen,
  avatarModalFormClose,
  handleAddModal,
  handleSubmitAvatarUserProfile,
  handleSubmitUserProfile
} from '../components/modal.js'
import { addNewItem } from '../components/card.js'
import { FormValidator } from '../components/FormValidator.js'
// import { enableValidation } from '../components/validate.js'

import {PopupWithImage} from '../components/OOP_PopupWithImage.js'
const setValidation = {
  modalForm: '.popup__form-container',
  inputFormLine: '.form__line',
  formButtonSubmit: '.popup__button-sumbit',
  modalForminactiveButtonSubmit: 'popup__button-sumbit_disabled',
  errorInputLineElement: 'form__line_type-error',
  addErrorText: 'form__line_text-error_active'
}

// enableValidation(setValidation);
const validation = new FormValidator(setValidation);
validation.enableValidation();

// Модальное окно - профиль
buttonEdit.addEventListener('click', openModalProfile);
profileClose.addEventListener('click', closeModalProfile);
modalFormProfile.addEventListener('submit', handleSubmitUserProfile);
// Модальное окно - сохранить карточку
buttonOpenModalAddNewCard.addEventListener('click', handleAddModal);
buttonCloseFormAddNewCard.addEventListener('click', handleAddClose);
formAddNewCard.addEventListener('submit', addNewItem);
// Закрыть увеличение фото
buttonCloseFormPhotoZoom.addEventListener('click', closeModalZoom);
// Модальное окно - обновить аватар
avatarButtonOpenModalForm.addEventListener('click', avatarModalFormOpen);
avatarButtonCloseModalForm.addEventListener('click', avatarModalFormClose);
popupAvatarIdForm.addEventListener('submit', handleSubmitAvatarUserProfile);


const zoomPhoto = new PopupWithImage(popupZoom)
zoomPhoto.setEventListeners();
