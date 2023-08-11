export class Section {
    constructor({ render }, container) {
        this._render = render
        this._container = container
    }

    addItem(item) {
        this._container.prepend(item)
    }

    createItems(items, userId) {
        items.forEach(element => {
            this._render(element, userId)
        })
    }
}
