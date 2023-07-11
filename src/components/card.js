import {
  container,
  template,
  newCardName,
  newPhotoLink,
  buttonSubmitAddForm,
  modalAddFormNewCards,
} from '../components/utils.js'

import { deleteCard, putLikeCard, deliteLikeCard, sendCard, profileUserInfo, getUserCards } from '../components/api.js'

import { openZoom, closeModal, refreshProfileUserInfo } from '../components/modal.js'

let allUserId = null;

// Загрузка страницы с карточками
export function loadPage() {
  const profileUserElements = profileUserInfo()
  const cardsUserGetElements = getUserCards()
  Promise.all([profileUserElements, cardsUserGetElements])
    .then(results => {
      const [profileData, cardsData] = results;
      allUserId = profileData._id;
      refreshProfileUserInfo(profileData);
      addCards(cardsData);
    })
    .catch(error => {
      console.log(error);
    })
}
// Добавить новую карточку
export function addCard(cardsUserInfo, usersID) {
  const cardParts = template.querySelector('.element__cards').cloneNode(true);
  const cardImage = cardParts.querySelector('.element__photo');
  const cardTitle = cardParts.querySelector('.element__title');
  const trashIcon = cardParts.querySelector('.element__delite');
  const heartIcon = cardParts.querySelector('.element__like');
  cardParts.setAttribute('data-id', cardsUserInfo._id);
  cardImage.src = cardsUserInfo.link;
  cardTitle.textContent = cardsUserInfo.name;
  likeUsersInfo(cardParts, cardsUserInfo, usersID);
  displayLike(cardParts, cardsUserInfo);
  displayDeliteElement(cardParts, cardsUserInfo, usersID);
  trashIcon.addEventListener('click', removeCard)
  cardImage.addEventListener('click', openZoom)
  heartIcon.addEventListener('click', siftLike)
  return cardParts
}

export function addCards(cardsUserGetElements) {
  const fragmentUserCards = document.createDocumentFragment();
  cardsUserGetElements.forEach(card => {
    const cardParts = addCard(card, allUserId);
    fragmentUserCards.append(cardParts);
  })
  container.append(fragmentUserCards);
}

function findUsersCard(evt) {
  const cardParts = evt.target.closest('.element__cards');
  return cardParts.dataset.id;
}
// Реализация функций счетчика лайков и поставить лайк на карточку
function displayLike(getCardsUserSubject, cardsUserInfo) {
  let cardParts = document.querySelector(`[data-id="${cardsUserInfo._id}"]`);
  if (!cardParts) {
    cardParts = getCardsUserSubject;
  }
  const likePartsCounter = cardParts.querySelector('.element__like-counter');
  if (cardsUserInfo.likes.length > 0) {
    likePartsCounter.classList.add('element__like-counter_active');
    likePartsCounter.textContent = cardsUserInfo.likes.length;
  } else {
    likePartsCounter.classList.remove('element__like-counter_active');
  }
}

function likeUsersInfo(cardParts, cardsUserInfo, usersID) {
  const likeCardParts = cardParts.querySelector('.element__like');
  if (likeCardParts) {
    const likes = cardsUserInfo.likes.some(user => user._id === usersID)
    if (likes) {
      likeCardParts.classList.add('element__like_active')
    }
  }
}

function displayCounterLikes(userCardsId, userLikesNumber) {
  const cardParts = document.querySelector(`[data-id="${userCardsId}"]`);
  const likeCounter = cardParts.querySelector('.element__like-counter');
  likeCounter.textContent = userLikesNumber;
}

function displayLikes(cardsUserInfo) {
  displayCounterLikes(cardsUserInfo._id, cardsUserInfo.likes.length);
  displayLike(null, cardsUserInfo);
}

function siftLike(evt) {
  if (evt.target.classList.contains('element__like_active')) {
    const userCardsId = findUsersCard(evt);
    evt.target.classList.toggle('element__like_active');
    return deliteLikeCard(userCardsId)
      .then(data => displayLikes(data))
      .catch(err => console.log(err));
  } if (evt.target.classList.contains('element__like')) {
    const userCardsId = findUsersCard(evt);
    evt.target.classList.toggle('element__like_active');
    return putLikeCard(userCardsId)
      .then(data => displayLikes(data))
      .catch(error => {
        console.log(error);
      })
  }
}
// Функции скрыть кнопку "удалить" и удаление карточки
function displayDeliteElement(cardParts, cardsUserInfo, allUserId) {
  if (cardsUserInfo.owner._id === allUserId) {
    const deliteIconUserCard = cardParts.querySelector('.element__delite');
    deliteIconUserCard.classList.add('element__delite_active');
  }
}

function removeCard(evt) {
  const removeUserCards = evt.target.closest('.element__cards');
  const userCardsId = removeUserCards.dataset.id;
  deleteCard(userCardsId)
    .then(() => { removeUserCards.remove(); })
    .catch(error => {
      console.log(error);
    })
}
// Сохранение новой карточки
export function addNewItem(evt) {
  evt.preventDefault();
  const firstButtonText = buttonSubmitAddForm.textContent;
  buttonSubmitAddForm.textContent = 'Сохранение...';
  sendCard(newCardName.value, newPhotoLink.value)
    .then(data => {
      const newCard = addCard(data, allUserId)
      container.prepend(newCard);
      evt.target.reset();
      buttonSubmitAddForm.disabled = true;
      closeModal(modalAddFormNewCards);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      buttonSubmitAddForm.textContent = firstButtonText;
    });
};

