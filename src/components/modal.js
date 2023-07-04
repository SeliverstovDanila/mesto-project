import {
    modalProfile,
    modalFormProfile,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
    modalAddFormNewCards,
    formAddNewCard,
    popupZoom,
    popupFullImage,
    popupZoomImageHeading,
} from '../components/utils.js'
// import { toggleButtonState, checkValidity } from '../components/validate.js'
// import {setValidation} from '../pages/index.js'

function textDefault() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}
function openModal(open) {
    open.classList.add('popup_open');
    document.addEventListener('keydown', escapeButtonClose);
    open.addEventListener('click', overlayClickModalClose);
}

function closeModal(close) {
    close.classList.remove('popup_open');
    document.removeEventListener('keydown', escapeButtonClose);
    close.removeEventListener('click', overlayClickModalClose);
}

function escapeButtonClose(evt) {
    if (evt.key === 'Escape') {
        const close = document.querySelector('.popup_open');
        closeModal(close);
    }
}

function overlayClickModalClose(evt) {
    if (evt.target.classList.contains('popup_open')) {
        closeModal(evt.target);
    }
}

function openModalProfile() {
    openModal(modalProfile);
    textDefault()
}

function closeModalProfile() {
    closeModal(modalProfile);
    modalFormProfile.reset()
}

function handleProfile(e) {
    e.preventDefault();
  
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
  
    closeModalProfile();
  }

function handleAddModal() {
    openModal(modalAddFormNewCards);
}

function handleAddClose() {
    closeModal(modalAddFormNewCards);
    formAddNewCard.reset();
}

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

export { textDefault, openModal, closeModal, openModalProfile, closeModalProfile, handleProfile,handleAddModal, handleAddClose, openZoom, closeModalZoom }