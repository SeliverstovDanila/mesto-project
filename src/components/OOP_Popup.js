export class Popup {
    constructor(popup) {
        this._popup = popup;
        this._escapeButtonClose = this._escapeButtonClose.bind(this)
        // this._overlayClickModalClose = this._overlayClickModalClose.bind(this)?????
    }

    openModal() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', escapeButtonClose);
        this._popup.addEventListener('click', overlayClickModalClose);
    }
    
    closeModal() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', escapeButtonClose);
        this._popup.removeEventListener('click', overlayClickModalClose);
    }
    
    _escapeButtonClose(evt) {
        if (evt.key === 'Escape') {
            // const popupOpenElement = document.querySelector('.popup_open'); ????????
            this.closeModal()
        }
    }
    
    overlayClickModalClose(evt) {
        if (evt.target.classList.contains('popup_open')) {
            this.closeModal()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__button-close')) {
                this.closeModal();
            }
        })
    }
}