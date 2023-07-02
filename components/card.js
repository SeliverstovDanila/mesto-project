import {
    container,
    template,
    newCardName,
    newPhotoLink,
    initialCards
  } from './../components/utils.js'

  import {openZoom, handleAddClose} from './../components/modal.js'

function addCard(userText) {
    const newCard = template.querySelector('.element__cards').cloneNode(true);
    newCard.querySelector('.element__photo').src = userText.link;
    newCard.querySelector('.element__photo').alt = userText.alt;
    newCard.querySelector('.element__title').textContent = userText.name;
    newCard.querySelector('.element__like').addEventListener('click', activeLike);
    newCard.querySelector('.element__delite').addEventListener('click', removeCard);
    newCard.querySelector('.element__photo').addEventListener('click', openZoom);
    return newCard
  }
  
  function createCards(create) {
    const addContent = document.createDocumentFragment();
  
    create.forEach(el => {
      const newCard = addCard(el);
      addContent.append(newCard);
    })
    return addContent
  }
  
  function likeContent(e) {
    e.classList.toggle('element__like_active');
  }

  function handleAdd(e) {
    e.preventDefault();
  
    const cardDefault = {
      link: newPhotoLink.value,
      name: newCardName.value,
      alt: newCardName.value
    }
  
    const formCard = addCard(cardDefault);
    container.prepend(formCard);
  
    handleAddClose();
  }

  function cardList() {
    const form = createCards(initialCards);
    container.append(form);
  }
  
  function removeCard(evt) {
    const deliteCard = evt.target.closest('.element__cards');
    deliteCard.remove();
  }
  
  function activeLike(evt) {
    const toogleLike = evt.target;
    likeContent(toogleLike);
  }

  cardList();

  export { handleAdd }