const initialCards = [
  {
    name: 'Что это?',
    link: 'https://images.unsplash.com/photo-1598188306155-25e400eb5078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    alt: 'Страшное...'
  },
  {
    name: 'Скоро вернусь',
    link: 'https://images.unsplash.com/photo-1493406300581-484b937cdc41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'Скоро'
  },
  {
    name: 'Угадай где я?',
    link: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'А где ты?'
  },
  {
    name: 'Земля в иллюминаторе',
    link: 'https://images.unsplash.com/photo-1527150602-a98f7a6f2746?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    alt: 'Отпусти'
  },
  {
    name: 'Минимализм...',
    link: 'https://images.unsplash.com/photo-1617617495223-ed838eaa20e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=685&q=80',
    alt: 'это модно'
  },
  {
    name: 'End of journey...',
    link: 'https://images.unsplash.com/photo-1580668095433-a1ad0a985391?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    alt: 'Конец путешествия'
  }
];
//Редактировать профиль
const buttonEdit = document.querySelector('.profile__editbutton');
const modalProfile = document.querySelector('#modal-profile');
const modalForm = document.querySelector('.popup__form-container');
const nameInput = document.querySelector('#profile__name');
const jobInput = document.querySelector('#profile__info');
const profileClose = document.querySelector('#close-profile');
const profileContainer = document.querySelector('.profile__info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// Создать карточку
const container = document.querySelector('.element');
const template = document.querySelector('#elements').content;
// Модальное окно - добавить карточку
const profileModalAdd = document.querySelector('.profile__addbutton');
const modalAdd = document.querySelector('#modal-card');
const newCardName = document.querySelector("#card__addname");
const inputForm = document.querySelector('#add-form');
const newPhotoLink = document.querySelector("#card__url");
const addForm = document.querySelector('#button-create');
const addClose = document.querySelector('#close-modal');

//Увеличить фото
const modalZoom = document.querySelector('#photo-zoom');
const closeZoom = document.querySelector('#close-zoom');
const zoomImage = modalZoom.querySelector('.popup__image');
const zoomHeading = modalZoom.querySelector('.popup__heading');

function textDefault(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openModal(open) {
  open.classList.add('popup_open');
}

function closeModal(close) {
  close.classList.remove('popup_open');
}
// Новая карточка
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
// Редактировать профиль
function openModalProfile() {
  openModal(modalProfile);
  textDefault()
}

function closeModalProfile() {
  closeModal(modalProfile);
  modalForm.reset()
}

function handleProfile(e) {
  e.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closeModalProfile();
}
// Модальное окно - добавить карточку
function handleAddModal() {
  openModal(modalAdd);
}

function handleAddClose() {
  closeModal(modalAdd);
  inputForm.reset();
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
// Увеличить фото
function openZoom(evt) {
  const deliteCard = evt.target.closest('.element__cards');
  const modalImage = deliteCard.querySelector('.element__photo');
  const zoomImageName = deliteCard.querySelector('.element__title');
  openModal(modalZoom);
  zoomImage.src = modalImage.src;
  zoomImage.alt = modalImage.alt;
  zoomHeading.textContent = zoomImageName.textContent;
}

function closeModalZoom() {
  closeModal(modalZoom);
}

cardList();

// Модальное окно - профиль
buttonEdit.addEventListener('click', openModalProfile);
profileClose.addEventListener('click', closeModalProfile);
modalForm.addEventListener('submit', handleProfile);
// Модальное окно - сохранить карточку
profileModalAdd.addEventListener('click', handleAddModal);
addClose.addEventListener('click', handleAddClose);
inputForm.addEventListener('submit', handleAdd);
// Закрыть увеличение фото
closeZoom.addEventListener('click', closeModalZoom);