import '../pages/index.css';

//Редактировать профиль
const buttonEdit = document.querySelector('.profile__editbutton');
const modalProfile = document.querySelector('#modal-profile');
const modalFormProfile = modalProfile.querySelector('.popup__form-container');
const nameInput = modalProfile.querySelector('#profile__name');
const jobInput = modalProfile.querySelector('#profile__info');
const profileClose = modalProfile.querySelector('.popup__button-close_profile');
const profileContainer = document.querySelector('.profile__info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//Валидация окна "Редактировать профиль"

// Создать карточку
const container = document.querySelector('.element');
const template = document.querySelector('#elements').content;
// Модальное окно - добавить карточку
const modalAddFormNewCards = document.querySelector('#modal-card');
const buttonOpenModalAddNewCard = document.querySelector('.profile__addbutton');
const newCardName = modalAddFormNewCards.querySelector("#card__addname");
const formAddNewCard = modalAddFormNewCards.querySelector('#add-form');
const newPhotoLink = modalAddFormNewCards.querySelector("#card__url");
const buttonSubmitFormAddNewCard = modalAddFormNewCards.querySelector('.popup__button-sumbit_card');
const buttonCloseFormAddNewCard = modalAddFormNewCards.querySelector('.popup__button-close_addform');

//Увеличить фото
const popupZoom = document.querySelector('#photo-zoom');
const buttonCloseFormPhotoZoom = popupZoom.querySelector('.popup__button-close_zoomform');
const popupFullImage = popupZoom.querySelector('.popup__image');
const popupZoomImageHeading = popupZoom.querySelector('.popup__image-name');

function textDefault() {
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
  modalFormProfile.reset()
}
//Валидация окна "Редактировать профиль"
 const inputFormProfile = modalProfile.querySelector('.popup__line');
 const inputTextErrorFormProfile = modalProfile.querySelector('.popup__line_text-error');   //`.${inputFormProfile.id}-error`

 const displayError = (formElement, inputElement, errorMessage) => {
  const inputTextErrorFormProfile = formElement.querySelector('.popup__line_text-error');
  inputElement.classList.add('popup__line_type-error');
  inputTextErrorFormProfile.textContent = errorMessage;
  inputTextErrorFormProfile.classList.add('popup__line_text-error_active');
 };

 const hideError = (formElement, inputElement) => {
  const inputTextErrorFormProfile = formElement.querySelector('.popup__line_text-error');
  inputElement.classList.remove('popup__line_type-error');
  inputTextErrorFormProfile.classList.remove('popup__line_text-error_active');
  inputTextErrorFormProfile.textContent = ''
 };

 const checkValidityProfileForm = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    displayError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
 };

 const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__line'));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkValidityProfileForm(formElement, inputElement)
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form-container'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation(); 

// -------------------------------------------------------
function handleProfile(e) {
  e.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closeModalProfile();
}
// Модальное окно - добавить карточку
function handleAddModal() {
  openModal(modalAddFormNewCards);
}

function handleAddClose() {
  closeModal(modalAddFormNewCards);
  formAddNewCard.reset();
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
  openModal(popupZoom);
  popupFullImage.src = modalImage.src;
  popupFullImage.alt = modalImage.alt;
  popupZoomImageHeading.textContent = zoomImageName.textContent;
}

function closeModalZoom() {
  closeModal(popupZoom);
}

cardList();

// Модальное окно - профиль
buttonEdit.addEventListener('click', openModalProfile);
profileClose.addEventListener('click', closeModalProfile);
modalFormProfile.addEventListener('submit', handleProfile);
// Модальное окно - сохранить карточку
buttonOpenModalAddNewCard.addEventListener('click', handleAddModal);
buttonCloseFormAddNewCard.addEventListener('click', handleAddClose);
formAddNewCard.addEventListener('submit', handleAdd);
// Закрыть увеличение фото
buttonCloseFormPhotoZoom.addEventListener('click', closeModalZoom);

// Закрытие модального окна при клике на оверлей
modalProfile.addEventListener('mousedown', (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModalProfile(modalProfile)
  }
});

modalAddFormNewCards.addEventListener('mousedown', (evt) => {
  if (evt.currentTarget === evt.target) {
    handleAddClose(modalAddFormNewCards)
  }
});

popupZoom.addEventListener('mousedown', (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModalZoom(popupZoom)
  }
});

// Закрытие модального окна на кнопку esc
document.addEventListener('keydown', (evt) => {
  const addOpenClassProfileForm = document.querySelector('#modal-profile.popup_open');
  const addOpenClassNewCardForm = document.querySelector('#modal-card.popup_open');
  const addOpenClassZoomPhoto = document.querySelector('#photo-zoom.popup_open');
  if (evt.key === 'Escape' && addOpenClassProfileForm !== null) {
    closeModalProfile()
  }
  if (evt.key === 'Escape' && addOpenClassNewCardForm !== null) {
    handleAddClose()
  }
  if (evt.key === 'Escape' && addOpenClassZoomPhoto !== null) {
    closeModalZoom()
  }
});