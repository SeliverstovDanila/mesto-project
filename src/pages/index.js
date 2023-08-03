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
  popupZoom,
  container,
  modalProfile,
  api,
  profileTitle,
  profileSubtitle,
  modalAddFormNewCard,
  popupAvatar,
  avatarNewPhoto,
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
import { PopupWithForm } from '../components/PopupWithForm.js'
// import { enableValidation } from '../components/validate.js'

import { PopupWithImage } from '../components/OOP_PopupWithImage.js'
import { Section } from '../components/Section.js'
import { Card } from '../components/OOP_Card.js'

const cardItem = new Section({
  render: (data) => {
    const card = createCard(data);
    cardItem.tagItem(card)
  }
}, container);

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


const popupProfile = new PopupWithForm(modalProfile, buttonEdit, (values) => {
  api.sendUserInfo(Object.values(values)[0], Object.values(values)[1])
    .then(data => {
      profileTitle.textContent = data.name;
      profileSubtitle.textContent = data.about;
    }).finally(() => {
      popupProfile.saveLoading(false);
    });
})
popupProfile.setEventListeners();


const popupCardAdd = new PopupWithForm(modalAddFormNewCard, buttonOpenModalAddNewCard, (values) => {
  api.sendCard(Object.values(values)[0], Object.values(values)[1])
    .then(data => {
      const card = new Card(data, '#elements');
      const cardElement = card.createCard();
      container.prepend(cardElement);
    }).finally(() => {
      popupCardAdd.saveLoading(false);
    });
})
popupCardAdd.setEventListeners();


const popupAvatarEdit = new PopupWithForm(popupAvatar, avatarButtonOpenModalForm, (values) => {
  api.refreshAvatar(Object.values(values)[0])
    .then(data => {
      avatarNewPhoto.style.backgroundImage = `url("${data.avatar}")`;
    }).finally(() => {
      popupAvatarEdit.saveLoading(false);
    });
})
popupAvatarEdit.setEventListeners();


// Модальное окно - профиль
// buttonEdit.addEventListener('click', openModalProfile);
// profileClose.addEventListener('click', closeModalProfile);
// modalFormProfile.addEventListener('submit', handleSubmitUserProfile);
// Модальное окно - сохранить карточку
// buttonOpenModalAddNewCard.addEventListener('click', handleAddModal);
// buttonCloseFormAddNewCard.addEventListener('click', handleAddClose);
// formAddNewCard.addEventListener('submit', addNewItem);
// Закрыть увеличение фото
// buttonCloseFormPhotoZoom.addEventListener('click', closeModalZoom);
// Модальное окно - обновить аватар
// avatarButtonOpenModalForm.addEventListener('click', avatarModalFormOpen);
// avatarButtonCloseModalForm.addEventListener('click', avatarModalFormClose);
// popupAvatarIdForm.addEventListener('submit', handleSubmitAvatarUserProfile);

// export function openPhoto(title, src) {
//   zoomPhoto.open(title, src)
// }

// const zoomPhoto = new PopupWithImage(popupZoom)
// zoomPhoto.setEventListeners();
