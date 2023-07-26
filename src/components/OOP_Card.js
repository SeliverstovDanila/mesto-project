//test OOP Card.js
import { api } from '../components/utils.js'
import { allUserId } from '../components/card.js'
export class Card {
    constructor(data, selector) {
        this._selector = selector;
        this._title = data.name;
        this._photo = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._id = data._id
    }

    _getElement() {
        const cardTemplateElement = document.querySelector(this._selector)
            .content
            .querySelector('.element__cards')
            .cloneNode(true);

        this._likeButtonElement = cardTemplateElement.querySelector('.element__like');
        this._trashButtonElement = cardTemplateElement.querySelector('.element__delite');

        return cardTemplateElement
    }

    createCard() {
        this._element = this._getElement();

        const photoElement = this._element.querySelector('.element__photo');
        const titleElement = this._element.querySelector('.element__title');
        photoElement.src = this._photo;
        photoElement.link = this._photoTitle;
        titleElement.textContent = this._title;

        this._setlikeInfo();
        this._showLikeActive();
        this._showDeleteButton();
        this._setEventListeners();
        return this._element
    }

    _setEventListeners() {
        this._setTrashButtonEventListeners();
        this._handleLikeListener();
    }

    _setTrashButtonEventListeners() {
        this._trashButtonElement.addEventListener('click', () => {
            this._removeCard();
        })
    }

    _setlikeInfo() {
        const likesAmountElement = this._element.querySelector('.element__like-counter');
        if (this._likes.length > 0) {
            likesAmountElement.classList.add('element__like-counter_active');
            likesAmountElement.textContent = `${this._likes.length}`;
        } else {
            likesAmountElement.classList.remove('element__like-counter_active');
        }
    }

    _showLikeActive() {
        const isLiked = this._likes.some(likeData => likeData._id = this._ownerId);
        if (isLiked) {
            this._likeButtonElement.classList.add('element__like_active');
        } else {
            this._likeButtonElement.classList.remove('element__like_active');
        }
    }

    _handleLikeListener() {
        this._likeButtonElement.addEventListener('click', () => {
            if (this._likeButtonElement.classList.contains('element__like_active')) {
                this._likeButtonElement.classList.toggle('element__like_active');
                api.deleteLikeCard(this._id).then(res => {
                    this._likes = res.likes;
                    this._setlikeInfo();
                });

            } else {
                this._likeButtonElement.classList.toggle('element__like_active');
                api.putLikeCard(this._id).then(res => {
                    this._likes = res.likes;
                    this._setlikeInfo();
                });
            }
        })
    }

    _removeCard(_element) {
        api.deleteCard(this._id);
        this._element.remove();
        this._element = null;
    }

    _showDeleteButton() {
        const trashButton = this._element.querySelector('.element__delite') //???
        if (this._ownerId !== allUserId) {
            trashButton.remove();
        }
    }
}