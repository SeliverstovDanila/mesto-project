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
import { Api } from '../components/Api.js'

let userId;

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: 'c647b017-72a1-4b0d-aa7e-3955d3146485',
    'Content-Type': 'application/json'
  }
});

const cardItem = new Section({
  render: (data, userId) => {
    const newCard = addCard(data, userId);
    cardItem.tagItem(newCard)
  }
}, container);

const profileUserElement = api.getUserInfo();
const cardUserElement = api.getUserCard();

Promise.all([profileUserElement, cardUserElement])
  .then(([profileData, cardsData]) => {
    userId = profileData._id;
    userInfo.setUserInfo(profileData);
    cardItem.createItems(cardsData.reverse(), userId);
  })
  .catch(error => {
    console.log(error);
  })


function addCard(data, userId) {
  const card = new Card(data, '#elements', handleCardClick, userId,
    () => {
      api.deleteCard(data._id)
        .then((result) => card.handleDeleteCard(result));
    },
    () => {
      api.putLikeCard(data._id)
        .then((result) => {
          card.addLikeCard();
          card.setlikeInfo(result.likes);
        })
    },
    () => {
      api.deleteLikeCard(data._id)
        .then((result) => {
          card.removeLikeCard();
          card.setlikeInfo(result.likes);
        })
    }
  )
  return card.generateCard();
}

// Добавить карточку
const popupCardAdd = new PopupWithForm(modalAddFormNewCard, submitModalAddFormNewCard)
popupCardAdd.setEventListeners();


function submitModalAddFormNewCard(data) {
  popupCardAdd.saveLoading(true);
  api.sendCard(data.name, data.link)
    .then(result => {
      const card = addCard(result, userId);
      cardItem.tagItem(card);
      popupCardAdd.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      popupCardAdd.saveLoading(false);
    })
}

buttonOpenModalAddNewCard.addEventListener('click', () => {
  popupCardAdd.open();
});

const addCardFormValidation = new FormValidator(formAddNewCard, validation);
addCardFormValidation.enableValidation();

// Обновить информацию профиля
const popupProfile = new PopupWithForm(modalProfile, submitPopupProfile)
popupProfile.setEventListeners();

const userInfo = new UserInfo({
  profileName: '.profile__title',
  profileAbout: '.profile__subtitle',
  profileAvatar: '.profile__avatar-photo'
})


function submitPopupProfile(data) {
  popupProfile.saveLoading(true);
  api.sendUserInfo(data.usersname, data.usersinfo)
    .then(result => {
      userInfo.setUserInfo(result);
      popupProfile.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      popupProfile.saveLoading(false);
    })
}


buttonEdit.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupProfile.setInputValue(info);
  popupProfile.open();
  renderProfileInput();
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

function submitNewAvatar(data) {
  addNewAvatar.saveLoading(true);
  api.refreshAvatar(data.usersavatar)
    .then(result => {
      userInfo.setUserAvatar(result);
      addNewAvatar.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      addNewAvatar.saveLoading(false);
    })
}

avatarButtonOpenModalForm.addEventListener('click', () => {
  addNewAvatar.open();
})

const avatarFormValidation = new FormValidator(popupAvatarIdForm, validation);
avatarFormValidation.enableValidation();

// Увеличить фото
const zoomPhoto = new PopupWithImage(zoomPhotoCard);
zoomPhoto.setEventListeners();

function handleCardClick(title, photo) {
  zoomPhoto.open(title, photo);
}
