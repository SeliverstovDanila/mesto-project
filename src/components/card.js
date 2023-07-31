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

export function addNewItem(evt) {
  evt.preventDefault();
  const firstButtonText = buttonSubmitAddForm.textContent;
  buttonSubmitAddForm.textContent = 'Сохранение...';
  api.sendCard(newCardName.value, newPhotoLink.value)
    .then(data => {
      const newCard = addCards(data, allUserId) //err выводит карточку после обновления страницы. AddCard измененно на addCards, в случае addCard не находит функцию
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

