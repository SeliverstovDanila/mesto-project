import {
  container,
  template,
  newCardName,
  newPhotoLink,
  buttonSubmitAddForm,
  modalAddFormNewCard,
  api
} from '../components/utils.js'

import { openZoom, closeModal, refreshProfileUserInfo } from '../components/modal.js'
import {Card} from '../components/OOP_Card.js'

export let allUserId = null;

// Загрузка страницы с карточками
  const profileUserElement = api.profileUserInfo()
  const cardUserElement = api.getUserCard()
  Promise.all([profileUserElement, cardUserElement])
    .then(results => {
      const [profileData, cardsData] = results;
      allUserId = profileData._id;
      refreshProfileUserInfo(profileData);
      addCards(cardsData);
    })
    .catch(error => {
      console.log(error);
    })

// Добавить новую карточку
export function addCard(cardsUserInfo, userID) {
  const cardElement = template.querySelector('.element__cards').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.element__photo');
  const cardName = cardElement.querySelector('.element__title');
  const deliteCardElement = cardElement.querySelector('.element__delite');
  const likeButton = cardElement.querySelector('.element__like');
  cardElement.setAttribute('data-id', cardsUserInfo._id);
  cardPhoto.src = cardsUserInfo.link;
  cardName.textContent = cardsUserInfo.name;
  likeUserInfo(cardElement, cardsUserInfo, userID);
  displayLike(cardElement, cardsUserInfo);
  displayDeliteElement(cardElement, cardsUserInfo, userID);
  deliteCardElement.addEventListener('click', removeCard)
  cardPhoto.addEventListener('click', openZoom)
  likeButton.addEventListener('click', siftLike)
  return cardElement
}

export function addCards(cardUserElement, cardElement) {
  const fragmentUserCard = document.createDocumentFragment();
  cardUserElement.forEach(cardData => {
    // const cardElement = addCard(card, allUserId);
    const card = new Card(cardData, '#elements');
    cardElement = card.createCard();
    container.append(cardElement);
  })
  container.append(fragmentUserCard);
}

function findUsersCard(evt) {
  const cardElement = evt.target.closest('.element__cards');
  return cardElement.dataset.id;
}
// Реализация функций счетчика лайков и поставить лайк на карточку
function likeUserInfo(cardElement, cardsUserInfo, userID) {
  const likeCardElement = cardElement.querySelector('.element__like');
  if (likeCardElement) {
    const likeElement = cardsUserInfo.likes.some(user => user._id === userID)
    if (likeElement) {
      likeCardElement.classList.add('element__like_active')
    }
  }
}

function displayLike(cardUserSubject, cardsUserInfo) {
  let cardElement = document.querySelector(`[data-id="${cardsUserInfo._id}"]`);
  if (!cardElement) {
    cardElement = cardUserSubject;
  }
  const likeCounterElement = cardElement.querySelector('.element__like-counter');
  if (cardsUserInfo.likes.length > 0) {
    likeCounterElement.classList.add('element__like-counter_active');
    likeCounterElement.textContent = cardsUserInfo.likes.length;
  } else {
    likeCounterElement.classList.remove('element__like-counter_active');
  }
}

function displayCounterLike(userCardId, likeNumber) {
  const cardElement = document.querySelector(`[data-id="${userCardId}"]`);
  const likeCounter = cardElement.querySelector('.element__like-counter');
  likeCounter.textContent = likeNumber;
}

function showLike(cardsUserInfo) {
  displayCounterLike(cardsUserInfo._id, cardsUserInfo.likes.length);
  displayLike(null, cardsUserInfo);
}

function siftLike(evt) {
  if (evt.target.classList.contains('element__like_active')) {
    const userCardId = findUsersCard(evt);
    evt.target.classList.toggle('element__like_active');
    return api.deleteLikeCard(userCardId)
      .then(data => showLike(data))
      .catch(err => console.log(err));
  } if (evt.target.classList.contains('element__like')) {
    const userCardId = findUsersCard(evt);
    evt.target.classList.toggle('element__like_active');
    return api.putLikeCard(userCardId)
      .then(data => showLike(data))
      .catch(error => {
        console.log(error);
      })
  }
}
// Функции скрыть кнопку "удалить" и удаление карточки
function displayDeliteElement(cardElement, cardsUserInfo, allUserId) {
  if (cardsUserInfo.owner._id === allUserId) {
    const deliteIconUserCard = cardElement.querySelector('.element__delite');
    deliteIconUserCard.classList.add('element__delite_active');
  }
}

function removeCard(evt) {
  const userCard = evt.target.closest('.element__cards');
  const userCardId = userCard.dataset.id;
  api.deleteCard(userCardId)
    .then(() => { userCard.remove(); })
    .catch(error => {
      console.log(error);
    })
}
// Сохранение новой карточки
export function addNewItem(evt) {
  evt.preventDefault();
  const firstButtonText = buttonSubmitAddForm.textContent;
  buttonSubmitAddForm.textContent = 'Сохранение...';
  api.sendCard(newCardName.value, newPhotoLink.value)
    .then(data => {
      const newCard = addCard(data, allUserId)
      container.prepend(newCard);
      evt.target.reset();
      buttonSubmitAddForm.disabled = true;
      closeModal(modalAddFormNewCard);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      buttonSubmitAddForm.textContent = firstButtonText;
    });
};

