//test OOP Card.js
// при обновлении страницы удаленная карточка востанавливается(сервер не видит запрос)
// Много проблем с сервером, функции удалить и лайк не работают(сервер не видит запрос)(обр внимание на api.putLikeCard(this._data._id) итд)
import { api } from '../components/utils.js'
import { allUserId } from '../components/card.js'
export class Card {
    constructor(data, selector) {
        this._selector = selector;
        this._title = data.name;
        this._photo = data.link;
        this._likes = `${data.likes.length}`
        this._ownerId = data.owner._id;
        this._id = data.id
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
        photoElement.src = this._photo;
        photoElement.link = this._photoTitle;
       
        this._setlikeInfo();
        this._showDeleteButton();
        this._setEventListeners();       
        return this._element
    }

    _setEventListeners() {
        this._setLikeEventListeners();
        this._setTrashButtonEventListeners()
    }

    _setLikeEventListeners() {
        this._likeButtonElement.addEventListener('click', () => {
            if (this._likeButtonElement.classList.contains('.element__like_active')) {
                this._removeLike();
            } else {
                this._addLike()
            }
        })

    }

    _setTrashButtonEventListeners() {
        this._trashButtonElement.addEventListener('click', () => {
            this._removeCard();
        })
    }

    _setlikeInfo() {
        const likesAmountElement = this._element.querySelector('.element__like-counter');
        if (parseInt(this._likes) > 0) {
            likesAmountElement.classList.add('element__like-counter_active');
            likesAmountElement.textContent = this._likes;
        } else {
            likesAmountElement.classList.remove('element__like-counter_active');
        }
    }

    _addLike() {
        this._likeButtonElement.classList.add('element__like_active');
        api.putLikeCard(this._data._id);
    }

    _removeLike() {
        this._likeButtonElement.classList.remove('element__like_active');
        api.deleteLikeCard(this._data._id);
    }
    setLike(res) {
        this._likeCounter.textContent = `${res.likes.length}`;
    }

    _removeCard(_element) {
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