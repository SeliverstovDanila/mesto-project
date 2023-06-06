const initialCards = [
  {
    name: 'End of journey...',
    link: 'https://images.unsplash.com/photo-1580668095433-a1ad0a985391?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Скоро вернусь',
    link: 'https://images.unsplash.com/photo-1493406300581-484b937cdc41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Угадай где я?',
    link: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Земля в иллюминаторе',
    link: 'https://images.unsplash.com/photo-1527150602-a98f7a6f2746?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80'
  },
  {
    name: 'Минимализм...',
    link: 'https://images.unsplash.com/photo-1617617495223-ed838eaa20e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=685&q=80'
  },
  {
    name: 'Что это?',
    link: 'https://images.unsplash.com/photo-1598188306155-25e400eb5078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  }
];

const menu = document.querySelector('.menu');
const cardBlock = menu.querySelector('.elements');
const cardsContainer = menu.querySelector('.element'); //Место для карточек

const profile = document.querySelector('.profile');


const popupEdit = document.querySelector('#modal-profile'); // Модальное окно - редактировать профиль
const popupAdd = document.querySelector('#modal-card'); // Модальное окно - добавить карточку
const popupZoom = document.querySelector('#photo-zoom'); // Модальное окно - увеличить фото
const buttonPhoto = document.querySelector('.element__photo');
const buttonEdit = document.querySelector('.profile__editbutton'); //Кнопка - редактировать профиль
const buttonAdd = document.querySelector('.profile__addbutton'); //Кнопка - добавить карточку
const buttonClose = document.querySelector('.popup__button-close'); //Кнопка - закрыть редактирование профиля
const buttonAddFormClose = document.querySelector('#close-modal'); //Кнопка - закрыть форму добавления карточки
const buttonZoomClose = document.querySelector('#close-zoom'); //Кнопка - закрыть форму увеличения фото

//функция открытия попапа
function popupOpen(modal) {
  modal.classList.add('popup_open');
}

//функция закрытия попапа
function closeModal(modal) {
  modal.classList.remove('popup_open');
}

//открытие попапа редактировать профиль
function openModal(modal) {
  popupOpen(modal);
}

const modalImage = document.querySelector('.popup__image');
const modalTitle = document.querySelector('.popup__heading');
//функция открытия попапа добавления фото
function openModalAddCard(modal) {
  popupOpen(modal);
}

function openZoom(modal) {
  popupOpen(modal);
}

buttonEdit.addEventListener('click', () => { openModal(popupEdit) });
buttonAdd.addEventListener('click', () => { openModalAddCard(popupAdd) });
popupZoom.addEventListener('click', () => { openZoom(popupZoom) });
buttonClose.addEventListener('click', () => { closeModal(popupEdit) });
buttonAddFormClose.addEventListener('click', () => { closeModal(popupAdd) });

const formElement = document.querySelector('.popup__form-container'); // Модальное окно(редактировать профиль)
const profileTitle = document.querySelector('.profile__title'); // Имя пользователя(на странице)
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('#profile__name'); //Имя пользователя(input)
const jobInput = document.querySelector('#profile__info');

//Редактирвание профиля пользователя
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeModal(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit); // Сохранить форму

const cardAddName = document.querySelector('#card__addname');
const inputUrl = document.querySelector('#card__url');
//Редактирвание профиля пользователя
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = cardAddName.value;
  profileSubtitle.textContent = inputUrl.value;
  closeModal(popupAdd);
}

// formElement.addEventListener('submit', handleAddFormSubmit); // Сохранить форму добавления карточки

const elementContainer = document.querySelector('.element');
const instalElements = document.querySelector('#elements').content;


 const cardName = initialCards.map(item => item.name);
 const cardLink = initialCards.map(item => item.link);

 const userInfo = initialCards.map(function (item) {
   return {
     name: item.name,
     link: item.link
   };
 });

 function render() {
   userInfo.forEach(renderCard);
 }

function renderCard({ name, link }) {
  const infoElement = instalElements
    .querySelector('.element__cards')
    .cloneNode(true);
  infoElement.querySelector('.element__title').textContent = name;
  infoElement.querySelector('.element__photo').src = link;

  elementContainer.prepend(infoElement);
}

render();

// like card
document.querySelectorAll('.element__like').forEach(
  el => el.addEventListener("click", function (e) {
    this.classList.toggle("element__like_active");
  })
);

// delite card
  const deleteButton = document.querySelector('#remove');

  deleteButton.addEventListener('click', function () {
    const cardItem = deleteButton.closest('.element__cards');
    cardItem.remove();
  })

  const cardDelete = function(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
        const eventTarget = event.target;
        const deleteCard = eventTarget.closest('.place-card');
        deleteCard.parentNode.removeChild(deleteCard);
    }
};
