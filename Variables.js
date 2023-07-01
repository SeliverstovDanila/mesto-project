export const buttonEdit = document.querySelector('.profile__editbutton');
export const modalProfile = document.querySelector('.popup');
export const modalFormProfile = modalProfile.querySelector('.popup__form-container');
export const nameInput = modalProfile.querySelector('#profile__name');
export const jobInput = modalProfile.querySelector('#profile__info');
export const profileClose = modalProfile.querySelector('.popup__button-close_profile');
export const profileContainer = document.querySelector('.profile__info');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

// Создать карточку
export const container = document.querySelector('.element');
export const template = document.querySelector('#elements').content;
// Модальное окно - добавить карточку
export const modalAddFormNewCards = document.querySelector('#modal-card');
export const buttonOpenModalAddNewCard = document.querySelector('.profile__addbutton');
export const newCardName = modalAddFormNewCards.querySelector("#card__addname");
export const formAddNewCard = modalAddFormNewCards.querySelector('#add-form');
export const newPhotoLink = modalAddFormNewCards.querySelector("#card__url");
export const buttonSubmitFormAddNewCard = modalAddFormNewCards.querySelector('.popup__button-sumbit_card');
export const buttonCloseFormAddNewCard = modalAddFormNewCards.querySelector('.popup__button-close_addform');

//Увеличить фото
export const popupZoom = document.querySelector('#photo-zoom');
export const buttonCloseFormPhotoZoom = popupZoom.querySelector('.popup__button-close_zoomform');
export const popupFullImage = popupZoom.querySelector('.popup__image');
export const popupZoomImageHeading = popupZoom.querySelector('.popup__image-name');