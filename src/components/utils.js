// Модальное окно "Редактировать профиль"
export const buttonEdit = document.querySelector('.profile__editbutton');
export const modalProfile = document.querySelector('#modal-profile');
export const modalFormProfile = modalProfile.querySelector('.popup__form-container');
export const nameInput = modalProfile.querySelector('#profile__name');
export const jobInput = modalProfile.querySelector('#profile__info');
export const profileClose = modalProfile.querySelector('.popup__button-close_profile');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const buttonSubmitUserProfile = modalProfile.querySelector('.popup__button-sumbit');
// Карточки
export const container = document.querySelector('.element');
export const template = document.querySelector('#elements').content;
// Модальное окно "Добавить карточку"
export const modalAddFormNewCard = document.querySelector('#modal-card');
export const buttonOpenModalAddNewCard = document.querySelector('.profile__addbutton');
export const newCardName = modalAddFormNewCard.querySelector("#card__addname");
export const formAddNewCard = modalAddFormNewCard.querySelector('#add-form');
export const newPhotoLink = modalAddFormNewCard.querySelector("#card__url");
export const buttonCloseFormAddNewCard = modalAddFormNewCard.querySelector('.popup__button-close_addform');
export const buttonSubmitAddForm = modalAddFormNewCard.querySelector('.popup__button-sumbit');
// Модальное окно "Увеличить фото"
export const popupZoom = document.querySelector('#photo-zoom');
export const buttonCloseFormPhotoZoom = popupZoom.querySelector('.popup__button-close_zoomform');
export const popupFullImage = popupZoom.querySelector('.popup__image');
export const popupZoomImageHeading = popupZoom.querySelector('.popup__image-name');
// Модальное окно "Обновить аватар"
export const popupAvatar = document.querySelector('#modal-avatar');
export const popupAvatarIdForm = popupAvatar.querySelector('#avatar-form');
export const buttonAvatarSubmit = popupAvatar.querySelector('.popup__button-sumbit');
export const avatarButtonOpenModalForm = document.querySelector('.profile__avatar');
export const avatarNewPhoto = document.querySelector('.profile__avatar-photo');
export const avatarButtonCloseModalForm = popupAvatar.querySelector('.popup__button-close_avatar');
export const avatarInputId = popupAvatar.querySelector('#user__avatar');
import {Api} from '../components/OOPapi.js'
export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'c647b017-72a1-4b0d-aa7e-3955d3146485',
        'Content-Type': 'application/json'
    }
  });