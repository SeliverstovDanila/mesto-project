import {
    modalProfile,
    modalFormProfile,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
    modalAddFormNewCard,
    formAddNewCard,
    popupZoom,
    popupFullImage,
    popupZoomImageHeading,
    popupAvatar,
    popupAvatarIdForm,
    avatarNewPhoto,
    buttonAvatarSubmit,
    avatarInputId,
    buttonSubmitUserProfile,
    api
} from '../components/utils.js'

function refreshProfileUserInfo(userData) {
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    avatarNewPhoto.style.backgroundImage = `url("${userData.avatar}")`;
}

function textDefault() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}
// Функции открыть-закрыть
function openModal(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', escapeButtonClose);
    popup.addEventListener('click', overlayClickModalClose);
}

function closeModal(popup) {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', escapeButtonClose);
    popup.removeEventListener('click', overlayClickModalClose);
}

function escapeButtonClose(evt) {
    if (evt.key === 'Escape') {
        const popupOpenElement = document.querySelector('.popup_open');
        closeModal(popupOpenElement);
    }
}

function overlayClickModalClose(evt) {
    if (evt.target.classList.contains('popup_open')) {
        closeModal(evt.target);
    }
}
// Открыть-закрыть модальное окно "Редатктировать профиль"
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
// Открыть-закрыть модальное окно "Добавить карточку"
function handleAddModal() {
    openModal(modalAddFormNewCard);
}

function handleAddClose() {
    closeModal(modalAddFormNewCard);
    formAddNewCard.reset();
}
// Открыть-закрыть модальное окно "Увеличить фото"
// function openZoom(evt) {
//     const deliteCard = evt.target.closest('.element__cards');
//     const modalImage = deliteCard.querySelector('.element__photo');
//     const zoomImageName = deliteCard.querySelector('.element__title');
//     openModal(popupZoom);
//     popupFullImage.src = modalImage.src;
//     popupFullImage.alt = modalImage.alt;
//     popupZoomImageHeading.textContent = zoomImageName.textContent;
// }

function closeModalZoom() {
    closeModal(popupZoom);
}
// Открыть-закрыть модальное окно "Обновить аватар"
function avatarModalFormOpen() {
    openModal(popupAvatar);
}

function avatarModalFormClose() {
    closeModal(popupAvatar);
    popupAvatarIdForm.reset();
}
// Сохранение нового аватара
function handleSubmitAvatarUserProfile(evt) {
    evt.preventDefault();
    buttonAvatarSubmit.textContent = 'Сохранение...';
    const avatarLink = avatarInputId.value;
    api.refreshAvatar(avatarLink)
        .then((data) => {
            avatarNewPhoto.style.backgroundImage = `url("${data.avatar}")`;
            closeModal(popupAvatar);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            buttonAvatarSubmit.textContent = 'Сохранить';
        })
}
// Сохранения нового имени и информации пользователя
function handleSubmitUserProfile(evt) {
    evt.preventDefault();
    buttonSubmitUserProfile.textContent = 'Сохранение...';
    api.sendUserInfo(nameInput.value, jobInput.value)
        .then(data => {
            profileTitle.textContent = (data.name === '') ? profileTitle.textContent : data.name;
            profileSubtitle.textContent = (data.about === '') ? profileSubtitle.textContent : data.about;
            closeModal(modalProfile);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            buttonSubmitUserProfile.textContent = 'Сохранить';
        })
}

export {
    textDefault,
    openModal,
    closeModal,
    openModalProfile,
    closeModalProfile,
    handleProfile,
    handleAddClose,
    closeModalZoom,
    avatarModalFormOpen,
    avatarModalFormClose,
    handleAddModal,
    handleSubmitAvatarUserProfile,
    handleSubmitUserProfile,
    refreshProfileUserInfo
}