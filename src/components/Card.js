export class Card {
    constructor(data, selector, handleCardClick, userId, deleteCard, addLikeCard, removeLikeCard) {
        this._selector = selector;
        this._title = data.name;
        this._photo = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._addLikeCard = addLikeCard;
        this._removeLikeCard = removeLikeCard;
        this._deleteCard = deleteCard;
    }

    _getElement() {
        const cardTemplateElement = document.querySelector(this._selector)
            .content
            .querySelector('.element__cards')
            .cloneNode(true);

        return cardTemplateElement
    }

    generateCard() {
        this._element = this._getElement();

        this._photoElement = this._element.querySelector('.element__photo');
        this._titleElement = this._element.querySelector('.element__title');
        this._photoElement.src = this._photo;
        this._photoElement.alt = this._photoTitle;
        this._titleElement.textContent = this._title;
        this._likeButtonElement = this._element.querySelector('.element__like');
        this._likesAmountElement = this._element.querySelector('.element__like-counter');
        this._trashButton = this._element.querySelector('.element__delite');
        this._showLikeActive();
        this._showDeleteButton();
        this._setEventListeners();
        this.setlikeInfo(this._likes);

        return this._element
    }

    addLikeCard() {
        this._likeButtonElement.classList.add("element__like_active");
    }

    removeLikeCard() {
        this._likeButtonElement.classList.remove("element__like_active");
    }

    _showLikeActive() {
        this._likes.forEach((user) => {
            if (user._id === this._userId) {
                this.addLikeCard();
            } else {
                this.removeLikeCard();
            }
        });
    }

    setlikeInfo(likesAmount) { 
        if (likesAmount.length > 0) {
            this._likesAmountElement.classList.add("element__like-counter_active");
        } else {
            this._likesAmountElement.classList.remove("element__like-counter_active");
        }
        this._likesAmountElement.textContent = `${likesAmount.length}`;
    }

    _showDeleteButton() {
        if (this._userId !== this._ownerId) {
            this._trashButton.remove();
        }
    }

    handleDeleteCard() {
        this._element.remove()
        this._element = null;
    }

    _setEventListeners() {
        this._photoElement.addEventListener('click', () => {
            this._handleCardClick(this._title, this._photo);
        });
        this._likeButtonElement.addEventListener('click', () => {
            if (this._likeButtonElement.classList.contains('element__like_active')) {
                this._removeLikeCard();
            } else {
                this._addLikeCard();
            }
        });
        this._trashButton.addEventListener('click', () => {
            this._deleteCard(this._id);
        });
    }

}
