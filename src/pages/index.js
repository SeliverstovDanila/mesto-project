import '../pages/index.css'
import {
  buttonEdit,
  buttonOpenModalAddNewCard,
  avatarButtonOpenModalForm,
  container,
  modalProfile,
  api,
  profileTitle,
  profileSubtitle,
  modalAddFormNewCard,
  popupAvatar,
  avatarNewPhoto,
} from '../components/utils.js'
<<<<<<< HEAD
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { Section } from '../components/Section.js'
import { Card } from '../components/card.js'
import { UserInfo } from '../components/UserInfo.js'

export let allUserId = null;

const cardItem = new Section({
  render: (data) => {
    const newCard = addCards(data);
    cardItem.tagItem(newCard)
  }
}, container);

const profileUserElement = api.profileUserInfo()
const cardUserElement = api.getUserCard()
Promise.all([profileUserElement, cardUserElement])
  .then(results => {
    const [profileData, cardsData] = results;
    allUserId = profileData._id;
    const user = new UserInfo()
    user.setUserInfo(profileData);
    addCards(cardsData);
  })
  .catch(error => {
    console.log(error);
  })

function addCards(cardUserElement, cardElement) {
  const fragmentUserCard = document.createDocumentFragment();
  cardUserElement.forEach(cardData => {
    const card = new Card(cardData, '#elements');
    cardElement = card.createCard();
    container.append(cardElement);
  })
  container.append(fragmentUserCard);
}
=======
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
import { addNewItem, loadPage } from '../components/card.js'
import { enableValidation } from '../components/validate.js'
>>>>>>> parent of 3a92dcc (card and validation functionality)

const setValidation = {
  modalForm: '.popup__form-container',
  inputFormLine: '.form__line',
  formButtonSubmit: '.popup__button-sumbit',
  modalForminactiveButtonSubmit: 'popup__button-sumbit_disabled',
  errorInputLineElement: 'form__line_type-error',
  addErrorText: 'form__line_text-error_active'
}
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
const validation = new FormValidator(setValidation);
validation.enableValidation();
=======
enableValidation(setValidation);
>>>>>>> parent of 3a92dcc (card and validation functionality)
=======
enableValidation(setValidation);
loadPage();
>>>>>>> parent of f9d04e3 (Исправления 1)
=======
enableValidation(setValidation);
loadPage();
>>>>>>> parent of f9d04e3 (Исправления 1)

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

<<<<<<< HEAD
const popupAvatarEdit = new PopupWithForm(popupAvatar, avatarButtonOpenModalForm, (values) => {
  api.refreshAvatar(Object.values(values)[0])
    .then(data => {
      avatarNewPhoto.style.backgroundImage = `url("${data.avatar}")`;
    }).finally(() => {
      popupAvatarEdit.saveLoading(false);
    });
})
popupAvatarEdit.setEventListeners();
=======
const zoomPhoto = new PopupWithImage(popupZoom)
zoomPhoto.setEventListeners();
export { setValidation }
>>>>>>> parent of 3a92dcc (card and validation functionality)
