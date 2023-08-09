export class Popup {
    constructor(popup) {
        this._popup = popup;
        // this._editButton = editButton;
        this._handleEscClose = this._handleEscClose.bind(this)
        this._overlayClickModalClose = this._overlayClickModalClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._overlayClickModalClose);
    }

    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._overlayClickModalClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    _overlayClickModalClose(evt) {
        if (evt.target.classList.contains('popup_open')) {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__button-close')) {
                this.close();
            }
        })
    }
}