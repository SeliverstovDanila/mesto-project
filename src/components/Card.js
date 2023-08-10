export class Card {
    constructor(data, selector, handleCardClick, removeLikeCard, addLikeCard, deleteCard) {
        this._selector = selector;
        this._title = data.name;
        this._photo = data.link;
        this._likes = data.likes;
        this._ownerId = data.ownerId;
        this._id = data.id
        this._handleCardClick = handleCardClick;
        this._userId = data.userId;
        this._addLikeCard = addLikeCard;
        this._removeLikeCard = removeLikeCard;
        this._deleteCard = deleteCard; // Взято из Api.js
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
        this._likesAmountElement.textContent = `${this._likes.length}`;
        this._trashButton = this._element.querySelector('.element__delite');
        this._showLikeActive()
        this._showDeleteButton()
        this._setEventListeners();

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

    setlikeInfo(result) { // result - в index.js обявленная константа с названием result для запроса на сервер, setlikeInfo - используется в index.js
        this._likesAmountElement.textContent = `${result.likes.length}`;
    }

    _showDeleteButton() {
        if (this._userId !== this._ownerId) {
            this._trashButton.remove();
            // this._trashButton = null;
        }
    }

    handleDeleteCard() {
        this._element.remove()
        // this._element = null;
    }

    _setEventListeners() {
        this._photoElement.addEventListener('click', () => {
            this._handleCardClick(this._title, this._photo);
        });
        this._likeButtonElement.addEventListener('click', () => {
            if (this._likeButtonElement.classList.contains('element__like_active')) {
                this.removeLikeCard();
            } else {
                this.addLikeCard();
            }
        });
        this._trashButton.addEventListener('click', () => {
            this._deleteCard(this._id);
        });
    }

}
