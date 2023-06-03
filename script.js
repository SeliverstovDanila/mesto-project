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

let menu = document.querySelector('.menu');
let cardBlock = menu.querySelector('.elements');
let cardsContainer = menu.querySelector('.element'); //Место для карточек

let popup = document.querySelector('.popup');
const popupAdd = document.querySelector('#popup_card');
let profile = document.querySelector('.profile');
let buttonEdit = profile.querySelector('.profile__editbutton'); //Кнопка - редактировать профиль
let buttonAdd = profile.querySelector('.profile__addbutton'); //Кнопка - добавить карточку
const buttonClose = document.querySelector('.popup__button-close');

const formElement = document.querySelector('.popup__form-container'); // Модальное окно(редактировать профиль)


function openModal() {
  popup.classList.add('popup_open')
}

function closeModal() {
  popup.classList.remove('popup_open');
}

const profileTitle = document.querySelector('.profile__title'); // Имя пользователя(на странице)
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('#profile__name'); //Имя пользователя(input)
const jobInput = document.querySelector('#profile__info');

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

buttonEdit.addEventListener('click', openModal);
buttonClose.addEventListener('click', closeModal);
formElement.addEventListener('submit', handleFormSubmit); // Сохранить форму


const elementContainer = document.querySelector('.element');
const instalElements = document.querySelector('#elements').content;



function addCard(nameValue, linkValue) { /* Добавление карточки */
    const divContainer = document.createElement('div');  /* Добавляет див в контейнер */
    const hElement = document.createElement('h2'); /* Добавляет название места */
    const imgElement = document.createElement('img'); /* Добавляет задний фон */
    const cardButtonElement = document.createElement('button'); /* Добавляет кнопку лайка */
    const deliteCard = document.createElement('button');/* Добавляет кнопку удалить */

    divContainer.classList.add('element'); //Добавляет див в контейнер
    hElement.classList.add('element__title'); //Добавляет имя карточки
    hElement.textContent = nameValue; 
    imgElement.classList.add('element__photo'); //Добавляет фон
    imgElement.textContent = linkValue; 
    cardButtonElement.classList.add('element__like'); //Добавляет лайк в контейнер карточки
    deliteCard.classList.add('element__delite'); //Добавляет урну в контейнер карточки

    divContainer.appendChild(nameElement); //Добавляет место в контейнер
    divContainer.appendChild(linkElement); //Добавляет фон в контейнер
    divContainer.appendChild(cardButtonElement); //Добавляет лайк в контейнер
    divContainer.appendChild(deliteCard); //Добавляет кнопку удалить в контейнер

    return divContainer;
}

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

document.querySelectorAll('.element__like').forEach(
  el => el.addEventListener("click", function (e) {
    this.classList.toggle("element__like_active");
  })
);