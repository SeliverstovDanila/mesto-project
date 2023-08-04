import '../pages/index.css'
import {
  buttonEdit,
  buttonOpenModalAddNewCard,
  avatarButtonOpenModalForm,
  container,
  modalProfile,
  profileTitle,
  profileSubtitle,
  modalAddFormNewCard,
  popupAvatar,
  avatarNewPhoto,
} from '../utils/utils.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { Section } from '../components/Section.js'
import { Card } from '../components/Card.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { profileElement } from '../utils/utils.js'
import { Api } from '../components/Api.js'

export let userId = null;

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: 'c647b017-72a1-4b0d-aa7e-3955d3146485',
    'Content-Type': 'application/json'
  }
});

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
    userId = profileData._id;
    const user = new UserInfo(profileElement)
    user.setUserInfo(profileData);
    addCards(cardsData);
  })
  .catch(error => {
    console.log(error);
  })

function addCards(cardUserElement, cardElement) {
  const fragmentUserCard = document.createDocumentFragment();
  cardUserElement.forEach(cardData => {
    const card = new Card(cardData, '#elements', PopupWithImage, api, userId);
    cardElement = card.createCard();
    container.append(cardElement);
  })
  container.append(fragmentUserCard);
}

const setValidation = {
  modalForm: '.popup__form-container',
  inputFormLine: '.form__line',
  formButtonSubmit: '.popup__button-sumbit',
  modalForminactiveButtonSubmit: 'popup__button-sumbit_disabled',
  errorInputLineElement: 'form__line_type-error',
  addErrorText: 'form__line_text-error_active'
}

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
      const card = new Card(data, '#elements', PopupWithImage, api, userId);
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
