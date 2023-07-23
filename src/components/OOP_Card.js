//test OOP Card.js
// Нет слушателя событий для кнопок!!!! likeButtonElement. 
//Может быть создать setEventListeners???
import { api } from '../components/utils.js'
import { allUserId } from '../components/card.js'
export class Card {
    constructor(data, selector) {
        this._selector = selector;
        this._title = data.name;
        this._photo = data.link;
        this._likes = `${data.likes.length}`
        this._ownerId = data.owner._id;

    }

    _getElement() {
        // alert('4');
        const cardTemplate = document.querySelector(this._selector)
            .content
            // .querySelector('.element__cards')
            .cloneNode(true);
        console.log('sdfdsf', cardTemplate);

        this._likeButtonElement = cardTemplate.querySelector('.element__like');
        this._trashButtonElement = cardTemplate.querySelector('.element__delite');
        console.log('s!!!', this._likeButtonElement);
        console.log('t!!!', this._trashButtonElement);

        return cardTemplate
    }

    createCard() {
        // alert('3');
        this._element = this._getElement();
        console.log('m!!!', this._element);

        const photoElement = this._element.querySelector('.element__photo');
        photoElement.src = this._photo;
        photoElement.link = this._photoTitle;

        console.log('q!!!', this._element);        
        this._setlikeInfo();
        this._showDeleteButton();
        this._setEventListeners();
        console.log('w!!!', this._element);        
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

    _removeCard() {
        this._element.remove();
        // this._element = null;
    }

    _showDeleteButton() {
        const trashButton = this._element.querySelector('.element__delite') //???
        if (this._ownerId !== allUserId) {
            trashButton.remove();
        }
    }
}