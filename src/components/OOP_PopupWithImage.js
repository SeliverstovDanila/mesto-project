import {Popup} from '../components/OOP_Popup.js'

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._title = this._popup.querySelector('.popup__image-name');
        this._photo = this._popup.querySelector('.popup__image');
    }

    openZoom(title, src) {
        super.open();
        this._title.textContent = title;
        this._photo.src = src;
        this._photo.alt = title;
    }
}