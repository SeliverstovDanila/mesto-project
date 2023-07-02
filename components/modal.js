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
} from './../components/utils.js'
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