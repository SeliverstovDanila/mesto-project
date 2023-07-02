export const buttonEdit = document.querySelector('.profile__editbutton');
export const modalProfile = document.querySelector('.popup');
export const modalFormProfile = modalProfile.querySelector('.popup__form-container');
export const nameInput = modalProfile.querySelector('#profile__name');
export const jobInput = modalProfile.querySelector('#profile__info');
export const profileClose = modalProfile.querySelector('.popup__button-close_profile');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

export const container = document.querySelector('.element');
export const template = document.querySelector('#elements').content;

export const modalAddFormNewCards = document.querySelector('#modal-card');
export const buttonOpenModalAddNewCard = document.querySelector('.profile__addbutton');
export const newCardName = modalAddFormNewCards.querySelector("#card__addname");
export const formAddNewCard = modalAddFormNewCards.querySelector('#add-form');
export const newPhotoLink = modalAddFormNewCards.querySelector("#card__url");
export const buttonCloseFormAddNewCard = modalAddFormNewCards.querySelector('.popup__button-close_addform');

export const popupZoom = document.querySelector('#photo-zoom');
export const buttonCloseFormPhotoZoom = popupZoom.querySelector('.popup__button-close_zoomform');
export const popupFullImage = popupZoom.querySelector('.popup__image');
export const popupZoomImageHeading = popupZoom.querySelector('.popup__image-name');

export const initialCards = [
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