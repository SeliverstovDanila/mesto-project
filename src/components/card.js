<<<<<<< HEAD
import { api, popupZoom } from './utils.js'
import { PopupWithImage } from './PopupWithImage.js'
import { allUserId } from '../pages/index.js'

export class Card {
    constructor(data, selector, openPhoto) {
        this._selector = selector;
        this._title = data.name;
        this._photo = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._id = data._id
        this._openPhoto = openPhoto;
    }
=======
import {
  container,
  template,
  newCardName,
  newPhotoLink,
  buttonSubmitAddForm,
  modalAddFormNewCards,
} from '../components/utils.js'

import { deleteCard, putLikeCard, deliteLikeCard, sendCard, profileUserInfo, getUserCards } from '../components/api.js'
>>>>>>> parent of f9d04e3 (Исправления 1)

    _getElement() {
        const cardTemplateElement = document.querySelector(this._selector)
            .content
            .querySelector('.element__cards')
            .cloneNode(true);

        this._likeButtonElement = cardTemplateElement.querySelector('.element__like');
        this._trashButtonElement = cardTemplateElement.querySelector('.element__delite');

<<<<<<< HEAD
        return cardTemplateElement
    }

    createCard() {
        this._element = this._getElement();

<<<<<<< HEAD
        this._photoElement = this._element.querySelector('.element__photo');
        this._titleElement = this._element.querySelector('.element__title');
        this._photoElement.src = this._photo;
        this._photoElement.link = this._photoTitle;
        this._titleElement.textContent = this._title;
=======
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
  const cardPhoto = cardParts.querySelector('.element__photo');
  const cardName = cardParts.querySelector('.element__title');
  const deliteCardElement = cardParts.querySelector('.element__delite');
  const likeButton = cardParts.querySelector('.element__like');
  cardParts.setAttribute('data-id', cardsUserInfo._id);
  cardPhoto.src = cardsUserInfo.link;
  cardName.textContent = cardsUserInfo.name;
  likeUsersInfo(cardParts, cardsUserInfo, usersID);
  displayLike(cardParts, cardsUserInfo);
  displayDeliteElement(cardParts, cardsUserInfo, usersID);
  deliteCardElement.addEventListener('click', removeCard)
  cardPhoto.addEventListener('click', openZoom)
  likeButton.addEventListener('click', siftLike)
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
>>>>>>> parent of f9d04e3 (Исправления 1)

        this._setlikeInfo();
        this._showLikeActive();
        this._showDeleteButton();
        this._setEventListeners();
        this._openZoomPhoto();
        return this._element
    }

    _setEventListeners() {
        this._setTrashButtonEventListeners();
        this._handleLikeListener();
    }

    _openZoomPhoto() {
        this._photoElement.addEventListener('click', () => {
            const zoomPhoto = new PopupWithImage(popupZoom);
            zoomPhoto.openZoom(this._title, this._photo);
            const cross = document.querySelector('.popup__zoom .popup__button-close');
            cross.addEventListener('click', zoomPhoto.close.bind(zoomPhoto))
        })


    }
=======
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
<<<<<<< HEAD
    return api.deleteLikeCard(userCardId)
      .then(data => showLike(data))
=======
    return deliteLikeCard(userCardsId)
      .then(data => displayLikes(data))
>>>>>>> parent of f9d04e3 (Исправления 1)
      .catch(err => console.log(err));
  } if (evt.target.classList.contains('element__like')) {
    const userCardsId = findUsersCard(evt);
    evt.target.classList.toggle('element__like_active');
<<<<<<< HEAD
    return api.putLikeCard(userCardId)
      .then(data => showLike(data))
=======
    return putLikeCard(userCardsId)
      .then(data => displayLikes(data))
>>>>>>> parent of f9d04e3 (Исправления 1)
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
<<<<<<< HEAD
  const userCard = evt.target.closest('.element__cards');
  const userCardId = userCard.dataset.id;
  api.deleteCard(userCardId)
    .then(() => { userCard.remove(); })
=======
  const removeUserCards = evt.target.closest('.element__cards');
  const userCardsId = removeUserCards.dataset.id;
  deleteCard(userCardsId)
    .then(() => { removeUserCards.remove(); })
>>>>>>> parent of f9d04e3 (Исправления 1)
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
      closeModal(modalAddFormNewCards);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      buttonSubmitAddForm.textContent = firstButtonText;
    });
};
>>>>>>> parent of 3a92dcc (card and validation functionality)

    _setTrashButtonEventListeners() {
        this._trashButtonElement.addEventListener('click', () => {
            this._removeCard();
        })
    }

    _setlikeInfo() {
        const likesAmountElement = this._element.querySelector('.element__like-counter');
        if (this._likes.length > 0) {
            likesAmountElement.classList.add('element__like-counter_active');
            likesAmountElement.textContent = `${this._likes.length}`;
        } else {
            likesAmountElement.classList.remove('element__like-counter_active');
        }
    }

    _showLikeActive() {
        const isLiked = this._likes.some(likeData => likeData._id = this._ownerId);
        if (isLiked) {
            this._likeButtonElement.classList.add('element__like_active');
        } else {
            this._likeButtonElement.classList.remove('element__like_active');
        }
    }

    _handleLikeListener() {
        this._likeButtonElement.addEventListener('click', () => {
            if (this._likeButtonElement.classList.contains('element__like_active')) {
                this._likeButtonElement.classList.toggle('element__like_active');
                api.deleteLikeCard(this._id).then(res => {
                    this._likes = res.likes;
                    this._setlikeInfo();
                });

            } else {
                this._likeButtonElement.classList.toggle('element__like_active');
                api.putLikeCard(this._id).then(res => {
                    this._likes = res.likes;
                    this._setlikeInfo();
                });
            }
        })
    }

    _removeCard(_element) {
        api.deleteCard(this._id);
        this._element.remove();
        this._element = null;
    }

    _showDeleteButton() {
        const trashButton = this._element.querySelector('.element__delite')
        if (this._ownerId !== allUserId) {
            trashButton.remove();
        }
    }
}