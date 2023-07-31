export class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this)
        // this._overlayClickModalClose = this._overlayClickModalClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', escapeButtonClose);
        this._popup.addEventListener('click', overlayClickModalClose);
    }
    
    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', escapeButtonClose);
        this._popup.removeEventListener('click', overlayClickModalClose);
    }
    
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            // const popupOpenElement = document.querySelector('.popup_open'); ????????
            this.close()
        }
    }
    
    overlayClickModalClose(evt) {
        if (evt.target.classList.contains('popup_open')) {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__button-close')) {
                this.close();
            }
        })
    }
}