import '../pages/index.css'
import {
  buttonOpenModalAddNewCard,
  avatarButtonOpenModalForm,
  buttonEdit,
  container,
  modalProfile,
  profileTitle,
  profileSubtitle,
  modalAddFormNewCard,
  popupAvatar,
  avatarNewPhoto,
  validation,
  zoomPhotoCard,
  modalFormProfile,
  nameInput,
  jobInput,
  popupAvatarIdForm,
  formAddNewCard
} from '../utils/utils.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { Section } from '../components/Section.js'
import { Card } from '../components/Card.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
// import { profileElement } from '../utils/utils.js'
import { Api } from '../components/Api.js'

let userId;

// Добавить карточку
const popupCardAdd = new PopupWithForm(modalAddFormNewCard, submitModalAddFormNewCard)
popupCardAdd.setEventListeners();

async function submitModalAddFormNewCard(data) {
  popupCardAdd.saveLoading(true, 'Сохранение...');
  try {
    const result = await api.sendCard(data);
    const card = addCard(result);
    cardItem.tagItem(card);
    popupCardAdd.close();
  } catch (error) {
    console.log(error)
  } finally {
    popupCardAdd.saveLoading(false);
  }
}

buttonOpenModalAddNewCard.addEventListener('click', () => {
  popupCardAdd.open();
  // addFormValidation.hideAllErrors();
});

const addCardFormValidation = new FormValidator(formAddNewCard, validation);
addCardFormValidation.enableValidation();

// Обновить информацию профиля
const popupProfile = new PopupWithForm(modalProfile, submitPopupProfile)
popupProfile.setEventListeners();

const profileElement = new UserInfo({
  profileName: '.profile__title',
  profileAbout: '.profile__subtitle',
  profileAvatar: '.profile__avatar-photo'
})

async function submitPopupProfile(data) {
  popupProfile.saveLoading(true, 'Сохранение...')
  try {
    console.log(data)
    const result = await api.sendUserInfo(data);
    profileElement.setUserInfo(result);
    popupProfile.close();
  } catch (error) {
    console.log(error)
  } finally {
    popupProfile.saveLoading(false);
  }
}

buttonEdit.addEventListener('click', () => {
  const info = profileElement.getUserInfo();
  popupProfile.setInputValue(info);
  popupProfile.open();
  renderProfileInput();
  // editFormValidation.enableValidation();
});

function renderProfileInput() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

const editFormValidation = new FormValidator(modalFormProfile, validation);
editFormValidation.enableValidation();

// Обновить аватар
const addNewAvatar = new PopupWithForm(popupAvatar, submitNewAvatar)
addNewAvatar.setEventListeners();

async function submitNewAvatar(data) {
  addNewAvatar.saveLoading(true, 'Сохранение...')
  try {
    const result = await api.refreshAvatar(data);
    profileElement.setUserInfo(result);
    addNewAvatar.close();
  } catch (error) {
    console.log(error)
  } finally {
    addNewAvatar.saveLoading(false);
  }
}


avatarButtonOpenModalForm.addEventListener('click', () => {
  addNewAvatar.open();
  // avatarFormValidation.hideAllErrors();
})

const avatarFormValidation = new FormValidator(popupAvatarIdForm, validation);
avatarFormValidation.enableValidation();

// Увеличить фото
const zoomPhoto = new PopupWithImage(zoomPhotoCard);

function handleCardClick(title, photo) {
  zoomPhoto.open(title, photo)
}

// Добавить карточку, поставить лайк, убрать лайк
function addCard(data) {
  const card = new Card({
    userId,
    ownerId: data.owner._id,
    id: data._id,
    name: data.name,
    link: data.link,
    likes: data.likes
  },
    '#elements',
    handleCardClick,
    async () => {
      try {
        const result = await api.putLikeCard(data._id);
        card.addLikeCard();
        card._setlikeInfo(result);
      } catch (error) {
        console.log(error)
      }
    },
    async () => {
      try {
        const result = await api.deleteLikeCard(data._id);
        card.removeLikeCard();
        card._setlikeInfo(result);
      } catch (error) {
        console.log(error)
      }
    },
    async () => {
      try {
        const result = await api.deleteCard(data._id)
        card.handleDeleteCard(result);
      } catch (error) {
        console.log(error)
      }
    }
  )
  return card.generateCard();
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: 'c647b017-72a1-4b0d-aa7e-3955d3146485',
    'Content-Type': 'application/json'
  }
});

const cardItem = new Section({
  render: (data) => {
    const newCard = addCard(data);
    cardItem.tagItem(newCard)
  }
}, container);

const profileUserElement = api.getUserInfo();
const cardUserElement = api.getUserCard();

  Promise.all([profileUserElement, cardUserElement])
    .then(([profileData, cardsData]) => {
        userId = profileData._id;
        profileElement.setUserInfo(profileData);
        cardItem.createItems(cardsData.reverse());
    })
    .catch(error => {
      console.log(error);
    })