export class Section {
    constructor({ render }, container) {
        this._render = render
        this._selector = container
    }

    tagItem(item) {
        this._selector.prepend(item)
    }

    createItems(items) {
        items.forEach(element => {
            this._render(element)
        })
    }
}